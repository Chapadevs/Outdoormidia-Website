/*
 * Gera lib/mapShapes.js a partir das malhas do IBGE (PR + SC).
 * Uso: node scripts/generate-map-paths.mjs [minima|intermediaria]
 * Roda uma única vez — o resultado é commitado. Não faz parte do build.
 */

const QUALITY = process.argv[2] || 'minima'
const STATES = [
  { code: 41, id: 'PR', name: 'Paraná' },
  { code: 42, id: 'SC', name: 'Santa Catarina' },
]

const RAD = Math.PI / 180
const mx = (lng) => lng * RAD
const my = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))

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

function ringToPoints(ring, proj) {
  const pts = []
  for (const [lng, lat] of ring) {
    const x = +((mx(lng) - proj.xMin) * proj.k).toFixed(1)
    const y = +((proj.yMax - my(lat)) * proj.k).toFixed(1)
    const prev = pts[pts.length - 1]
    if (!prev || prev[0] !== x || prev[1] !== y) pts.push([x, y])
  }
  return pts
}

function pointsToPath(pts) {
  return `M${pts.map((p) => p.join(' ')).join('L')}Z`
}

function centroid(pts) {
  let area = 0
  let cx = 0
  let cy = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    const cross = x1 * y2 - x2 * y1
    area += cross
    cx += (x1 + x2) * cross
    cy += (y1 + y2) * cross
  }
  area /= 2
  return { x: +(cx / (6 * area)).toFixed(1), y: +(cy / (6 * area)).toFixed(1), area: Math.abs(area) }
}

const stateRings = await Promise.all(STATES.map(fetchRings))

let xMin = Infinity
let xMax = -Infinity
let yMin = Infinity
let yMax = -Infinity
for (const rings of stateRings) {
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

const MAP_W = 1000
const k = MAP_W / (xMax - xMin)
const MAP_H = Math.ceil((yMax - yMin) * k)
const proj = { xMin, yMax, k }

const states = STATES.map((state, i) => {
  const rings = stateRings[i].map((ring) => ringToPoints(ring, proj))
  const path = rings.map(pointsToPath).join('')
  const largest = rings
    .map((pts) => ({ pts, c: centroid(pts) }))
    .sort((a, b) => b.c.area - a.c.area)[0].c
  return { id: state.id, name: state.name, path, labelX: largest.x, labelY: largest.y }
})

const out = `// Arquivo gerado por scripts/generate-map-paths.mjs (IBGE, qualidade ${QUALITY}) — não editar manualmente.
export const MAP_W = ${MAP_W}
export const MAP_H = ${MAP_H}
export const PROJ = { xMin: ${xMin}, yMax: ${yMax}, k: ${k} }
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
console.log(`lib/mapShapes.js gerado — viewBox 0 0 ${MAP_W} ${MAP_H}, qualidade ${QUALITY}`)
for (const s of states) console.log(`${s.id}: path ${s.path.length} chars, label em ${s.labelX},${s.labelY}`)
