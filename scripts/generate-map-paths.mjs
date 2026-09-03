/*
 * Gera lib/mapShapes.js a partir das malhas do IBGE (PR + SC).
 * Uso: node scripts/generate-map-paths.mjs [qualidade] [epsilon] [epsilon da divisa]
 *   qualidade — minima | intermediaria (padrão) | maxima
 *   epsilon   — desvio máximo, em unidades do mapa, da simplificação (padrão 6)
 *   divisa    — o mesmo, só para a divisa PR/SC (padrão: epsilon × 1.6)
 * Roda uma única vez — o resultado é commitado. Não faz parte do build.
 *
 * O contorno cru do IBGE é uma polilinha serrilhada. O pipeline aqui é:
 * projetar, descartar anéis degenerados, simplificar (Ramer-Douglas-Peucker) e
 * suavizar (Catmull-Rom convertido em Bézier cúbica).
 *
 * O epsilon é alto de propósito. O mapa é exibido com menos de 500px de largura,
 * então o detalhe geográfico fino não chega a ser lido como costa: chega como
 * ruído. Buscar fidelidade cartográfica aqui piora a peça. Mais baixo que 4 o
 * serrilhado volta; mais alto que 8 a divisa vira reta e o contorno deixa de ser
 * reconhecível como Paraná e Santa Catarina.
 *
 * A divisa PR/SC é desenhada duas vezes, uma por estado, e qualquer divergência
 * entre as duas viraria uma fresta visível. Por isso a simplificação é topológica:
 * os vértices que os dois estados compartilham são isolados em arcos próprios,
 * simplificados uma única vez e reaproveitados nos dois lados. A suavização é
 * local e simétrica, então o mesmo trecho percorrido em sentido contrário produz
 * a mesma curva.
 */

const QUALITY = process.argv[2] || 'intermediaria'
const EPSILON = Number(process.argv[3] ?? 6)
/* A divisa PR/SC é branca sobre laranja no meio do mapa, então cada ondulação
   dela pesa mais que a mesma ondulação na silhueta externa. Ganha epsilon
   próprio, maior. Como o arco é simplificado uma vez e reaproveitado nos dois
   estados, afrouxar aqui não abre fresta. */
const EPSILON_DIVISA = Number(process.argv[4] ?? EPSILON * 1.6)
const MAP_W = 1000
const MIN_RING_AREA = 200
const MIN_VERTEX_GAP = 0.4
const PAD = 6
const TENSION = 1

const STATES = [
  { code: 41, id: 'PR', name: 'Paraná' },
  { code: 42, id: 'SC', name: 'Santa Catarina' },
]

const RAD = Math.PI / 180
const mx = (lng) => lng * RAD
const my = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))
const key = (p) => `${p[0].toFixed(6)},${p[1].toFixed(6)}`

function collectRings(geometry) {
  if (geometry.type === 'Polygon') return geometry.coordinates
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat()
  throw new Error(`Geometria não suportada: ${geometry.type}`)
}

async function fetchRings({ code }) {
  const url = `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${code}?formato=application/vnd.geo+json&qualidade=${QUALITY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`IBGE ${code}: HTTP ${res.status}`)
  const geo = await res.json()
  const features = geo.type === 'FeatureCollection' ? geo.features : [geo]
  return features.flatMap((f) => collectRings(f.geometry))
}

function projectRing(ring, proj) {
  const pts = []
  for (const [lng, lat] of ring) {
    const p = [(mx(lng) - proj.xMin) * proj.k, (proj.yMax - my(lat)) * proj.k]
    const prev = pts[pts.length - 1]
    if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) pts.push(p)
  }
  const first = pts[0]
  const last = pts[pts.length - 1]
  if (pts.length > 1 && first[0] === last[0] && first[1] === last[1]) pts.pop()
  return pts
}

function signedArea(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    a += x1 * y2 - x2 * y1
  }
  return a / 2
}

function centroid(pts) {
  let cx = 0
  let cy = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    const cross = x1 * y2 - x2 * y1
    cx += (x1 + x2) * cross
    cy += (y1 + y2) * cross
  }
  const area = signedArea(pts)
  return { x: +(cx / (6 * area)).toFixed(1), y: +(cy / (6 * area)).toFixed(1) }
}

/* Ramer-Douglas-Peucker sobre uma polilinha aberta; extremos sempre preservados. */
function rdp(pts, eps) {
  if (pts.length < 3) return pts.slice()
  const keep = new Uint8Array(pts.length)
  keep[0] = 1
  keep[pts.length - 1] = 1
  const stack = [[0, pts.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()
    if (b - a < 2) continue
    const [ax, ay] = pts[a]
    const [bx, by] = pts[b]
    const dx = bx - ax
    const dy = by - ay
    const len = Math.hypot(dx, dy)
    let far = -1
    let max = eps
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i]
      const d =
        len === 0
          ? Math.hypot(px - ax, py - ay)
          : Math.abs(dy * px - dx * py + bx * ay - by * ax) / len
      if (d > max) {
        max = d
        far = i
      }
    }
    if (far >= 0) {
      keep[far] = 1
      stack.push([a, far], [far, b])
    }
  }
  return pts.filter((_, i) => keep[i])
}

/*
 * Simplifica um arco de divisa uma única vez e devolve o mesmo resultado aos dois
 * estados. O RDP desempata pelo índice, então percorrer o arco ao contrário
 * poderia eleger outro vértice; o cache canônico elimina esse risco.
 */
function simplifyShared(arc, cache, eps) {
  const forward = arc.map(key).join('|')
  const reverse = arc.map(key).reverse().join('|')
  const canonical = forward <= reverse ? forward : reverse
  if (!cache.has(canonical)) {
    cache.set(canonical, rdp(forward <= reverse ? arc : arc.slice().reverse(), eps))
  }
  const simplified = cache.get(canonical)
  return forward <= reverse ? simplified : simplified.slice().reverse()
}

/*
 * A malha de um estado às vezes traz, colado num vértice de divisa, um vértice
 * próprio que o estado vizinho não tem — uma farpa de décimo de unidade na
 * origem. Ela parte o arco de divisa em dois e impede o reaproveitamento entre
 * os dois lados. Some aqui, antes da classificação em arcos.
 */
function dropSlivers(pts, isShared) {
  const n = pts.length
  const near = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < MIN_VERTEX_GAP
  return pts.filter((p, i) => {
    if (isShared(p)) return true
    const prev = pts[(i - 1 + n) % n]
    const next = pts[(i + 1) % n]
    return !((isShared(prev) && near(p, prev)) || (isShared(next) && near(p, next)))
  })
}

function simplifyRing(pts, isShared, cache, eps) {
  const n = pts.length
  const flags = pts.map(isShared)

  if (!flags.some(Boolean)) {
    /* Sem divisa: corta o anel nos dois extremos horizontais, para não deixar
       artefato no vértice de índice 0, que é arbitrário. */
    let lo = 0
    let hi = 0
    for (let i = 1; i < n; i++) {
      if (pts[i][0] < pts[lo][0]) lo = i
      if (pts[i][0] > pts[hi][0]) hi = i
    }
    const [a, b] = lo < hi ? [lo, hi] : [hi, lo]
    const head = rdp(pts.slice(a, b + 1), eps)
    const tail = rdp([...pts.slice(b), ...pts.slice(0, a + 1)], eps)
    return [...head.slice(0, -1), ...tail.slice(0, -1)]
  }

  const start = flags.findIndex((f, i) => f && !flags[(i - 1 + n) % n])
  const ring = [...pts.slice(start), ...pts.slice(0, start)]
  const ringFlags = [...flags.slice(start), ...flags.slice(0, start)]

  const arcs = []
  let i = 0
  while (i < n) {
    const shared = ringFlags[i]
    let j = i
    while (j + 1 < n && ringFlags[j + 1] === shared) j++
    /* O arco de divisa é só de vértices compartilhados; o arco privado ancora
       nos vértices de divisa das duas pontas, para emendar exatamente onde o
       arco compartilhado termina. */
    const arc = shared
      ? ring.slice(i, j + 1)
      : [ring[(i - 1 + n) % n], ...ring.slice(i, j + 1), ring[(j + 1) % n]]
    arcs.push({ shared, arc })
    i = j + 1
  }

  const out = []
  for (const { shared, arc } of arcs) {
    const simplified = shared ? simplifyShared(arc, cache, EPSILON_DIVISA) : rdp(arc, eps)
    for (const p of simplified) {
      const prev = out[out.length - 1]
      if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) out.push(p)
    }
  }
  const first = out[0]
  const last = out[out.length - 1]
  if (out.length > 1 && first[0] === last[0] && first[1] === last[1]) out.pop()
  return out
}

const num = (v) => String(+v.toFixed(2))
const pt = (p) => `${num(p[0])},${num(p[1])}`

/*
 * Tangente de Catmull-Rom, limitada a um terço do segmento para a curva não
 * ultrapassar os vértices em trechos de espaçamento irregular.
 *
 * No ponto tríplice, onde a divisa encontra a costa ou a fronteira de outro
 * estado, a tangente é zerada: os vizinhos ali são diferentes em cada estado e
 * a curva sairia divergente nos dois lados, abrindo uma fresta. Zerada, os dois
 * calculam o mesmo controle, e geometricamente aquilo é mesmo um canto.
 */
function control(anchor, back, forward, seg, corner) {
  if (corner) return anchor
  let vx = ((forward[0] - back[0]) * TENSION) / 6
  let vy = ((forward[1] - back[1]) * TENSION) / 6
  const m = Math.hypot(vx, vy)
  const max = seg / 3
  if (m > max && m > 0) {
    vx = (vx * max) / m
    vy = (vy * max) / m
  }
  return [anchor[0] + vx, anchor[1] + vy]
}

function ringToPath(pts, isShared) {
  const n = pts.length
  if (n < 3) return ''
  const corners = pts.map(
    (p, i) => isShared(p) && !(isShared(pts[(i - 1 + n) % n]) && isShared(pts[(i + 1) % n]))
  )
  let d = `M${pt(pts[0])}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const seg = Math.hypot(p2[0] - p1[0], p2[1] - p1[1])
    const c1 = control(p1, p0, p2, seg, corners[i])
    const c2 = control(p2, p3, p1, seg, corners[(i + 1) % n])
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`
  }
  return `${d}Z`
}

const rawRings = await Promise.all(STATES.map(fetchRings))

let xMin = Infinity
let xMax = -Infinity
let yMin = Infinity
let yMax = -Infinity
for (const rings of rawRings) {
  for (const ring of rings) {
    for (const [lng, lat] of ring) {
      const x = mx(lng)
      const y = my(lat)
      if (x < xMin) xMin = x
      if (x > xMax) xMax = x
      if (y < yMin) yMin = y
      if (y > yMax) yMax = y
    }
  }
}

/* A Bézier passa um pouco por fora dos vértices e o stroke ainda soma meia
   largura, então a costa oeste do Paraná encostava na borda do viewBox e saía
   raspada. A margem é dobrada no próprio PROJ, como deslocamento de origem, e
   mapProjection continua sem precisar saber que ela existe. */
const k = (MAP_W - 2 * PAD) / (xMax - xMin)
const MAP_H = Math.ceil((yMax - yMin) * k + 2 * PAD)
const proj = { xMin: xMin - PAD / k, yMax: yMax + PAD / k, k }

const projected = rawRings.map((rings, i) => {
  const kept = []
  for (const ring of rings) {
    const pts = projectRing(ring, proj)
    const area = Math.abs(signedArea(pts))
    if (pts.length < 4 || area < MIN_RING_AREA) {
      console.log(`${STATES[i].id}: anel descartado — ${pts.length} vértices, área ${area.toFixed(1)}`)
      continue
    }
    kept.push(pts)
  }
  return kept
})

/* Um vértice é de divisa quando aparece em mais de um estado. */
const owners = new Map()
projected.forEach((rings, i) => {
  for (const ring of rings) {
    for (const p of ring) {
      const k2 = key(p)
      if (!owners.has(k2)) owners.set(k2, new Set())
      owners.get(k2).add(i)
    }
  }
})
const isShared = (p) => (owners.get(key(p))?.size ?? 0) > 1

const sharedCache = new Map()
const states = STATES.map((state, i) => {
  const rings = projected[i].map((pts) =>
    simplifyRing(dropSlivers(pts, isShared), isShared, sharedCache, EPSILON)
  )
  const path = rings.map((pts) => ringToPath(pts, isShared)).join('')
  const largest = rings.slice().sort((a, b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a)))[0]
  const label = centroid(largest)
  const before = projected[i].reduce((a, r) => a + r.length, 0)
  const after = rings.reduce((a, r) => a + r.length, 0)
  return { id: state.id, name: state.name, path, labelX: label.x, labelY: label.y, before, after }
})

const out = `// Arquivo gerado por scripts/generate-map-paths.mjs (IBGE, qualidade ${QUALITY}, epsilon ${EPSILON}) — não editar manualmente.
export const MAP_W = ${MAP_W}
export const MAP_H = ${MAP_H}
export const PROJ = { xMin: ${proj.xMin}, yMax: ${proj.yMax}, k: ${k} }
export const STATES = [
${states
  .map(
    (s) =>
      `  {\n    id: '${s.id}',\n    name: '${s.name}',\n    labelX: ${s.labelX},\n    labelY: ${s.labelY},\n    path: '${s.path}',\n  },`
  )
  .join('\n')}
]
`

const { writeFile } = await import('node:fs/promises')
await writeFile(new URL('../lib/mapShapes.js', import.meta.url), out)
console.log(`lib/mapShapes.js gerado — viewBox 0 0 ${MAP_W} ${MAP_H}, qualidade ${QUALITY}, epsilon ${EPSILON}`)
for (const s of states) {
  console.log(
    `${s.id}: ${s.before} → ${s.after} vértices, path ${s.path.length} chars, label em ${s.labelX},${s.labelY}`
  )
}
