/*
 * Gera lib/mapaRodovias.js — o mapa da rede de Rodovias de /plataformas/rodovias.
 * Uso: node scripts/generate-rodovias-map.mjs
 * Roda uma única vez — o resultado é commitado. Não faz parte do build.
 *
 * A entrada são coordenadas reais (lat/lng) das cidades e dos waypoints de cada
 * corredor. A saída é geometria pronta: o `d` de cada via e as transformações
 * das setas de sentido, das etiquetas de BR e do selo de São Paulo.
 *
 * O protótipo desta peça calculava tudo no browser, com d3 para projetar e
 * curvar e com getPointAtLength para medir o traçado. Nada disso muda depois que
 * a página carrega, então roda aqui: o site não ganha dependência nova e o
 * componente não faz conta nenhuma para pintar o primeiro frame. É o mesmo
 * caminho de scripts/generate-map-paths.mjs, que gera lib/mapShapes.js.
 *
 * Três portes acontecem aqui, e cada um precisa ser fiel ao d3 para o desenho
 * sair idêntico ao aprovado:
 *   1. d3.geoMercator().fitExtent — Mercator cru mais o ajuste de escala e
 *      translação que encaixa os 18 pontos na área útil do viewBox.
 *   2. d3.curveCatmullRom.alpha(0.6) — a curva que liga os pontos de cada
 *      corredor. É a implementação do d3-shape transcrita, não uma aproximação.
 *   3. getPointAtLength — amostragem numérica das próprias Béziers, que é o que
 *      posiciona seta e etiqueta a uma fração do comprimento da via.
 *
 * O que NÃO é portado é o solucionador de colisão de rótulos. No protótipo ele
 * media o texto com getBBox() para escolher de que lado de cada cidade o nome
 * cai; conferido contra o desenho aprovado, os 18 rótulos ficaram no lado que já
 * vinha declarado em `rotulo`, sem uma única troca. O lado entra como dado, o
 * resultado é o mesmo, e o componente deixa de depender de medição de texto —
 * que é justamente o que mudaria de resultado ao trocar a fonte do protótipo
 * pela Poppins do site.
 */

/* ---------------------------------------------------------------- entrada -- */

/* tier: 1 hub · 2 principal · 3 no corredor · 4 ponto de apoio
   rotulo: lado em que o nome da cidade fica (t, r, b, l) */
const NOS = [
  { id: 'cwb', nome: 'Curitiba', lat: -25.4372, lng: -49.2696, tier: 1, rotulo: 't' },
  { id: 'pnl', nome: 'Paranaguá', lat: -25.5205, lng: -48.5095, tier: 2, rotulo: 'r' },
  { id: 'flo', nome: 'Florianópolis', lat: -27.596, lng: -48.549, tier: 2, rotulo: 'r' },
  { id: 'joi', nome: 'Joinville', lat: -26.304, lng: -48.846, tier: 2, rotulo: 'l' },
  { id: 'pgr', nome: 'Ponta Grossa', lat: -25.095, lng: -50.161, tier: 2, rotulo: 'b' },

  { id: 'sjp', nome: 'São José\ndos Pinhais', lat: -25.533, lng: -49.203, tier: 3, rotulo: 'b' },
  { id: 'cla', nome: 'Campo Largo', lat: -25.459, lng: -49.528, tier: 3, rotulo: 'b' },
  { id: 'frg', nome: 'Fazenda\nRio Grande', lat: -25.657, lng: -49.307, tier: 3, rotulo: 'l' },
  { id: 'blu', nome: 'Blumenau', lat: -26.919, lng: -49.066, tier: 3, rotulo: 'l' },
  { id: 'bcm', nome: 'Bal.\nCamboriú', lat: -26.992, lng: -48.634, tier: 3, rotulo: 'r' },
  { id: 'nav', nome: 'Navegantes', lat: -26.898, lng: -48.654, tier: 3, rotulo: 'l' },

  { id: 'cgs', nome: 'Campina Grande do Sul', lat: -25.305, lng: -49.053, tier: 4, rotulo: 'r' },
  { id: 'pir', nome: 'Piraquara', lat: -25.442, lng: -49.062, tier: 4, rotulo: 'r' },
  { id: 'man', nome: 'Mandirituba', lat: -25.777, lng: -49.325, tier: 4, rotulo: 'l' },
  { id: 'gar', nome: 'Garuva', lat: -26.032, lng: -48.851, tier: 4, rotulo: 'l' },
  { id: 'gua', nome: 'Guaratuba', lat: -25.883, lng: -48.575, tier: 4, rotulo: 'r' },
  { id: 'ptl', nome: 'Pontal do Paraná', lat: -25.673, lng: -48.512, tier: 4, rotulo: 'r' },
  { id: 'bvl', nome: 'Barra Velha', lat: -26.632, lng: -48.685, tier: 4, rotulo: 'r' },
]

/* Cada corredor é uma sequência de nós e de waypoints [lat, lng]. Os waypoints
   existem só para a curva acompanhar o traçado real da estrada: não são ponto de
   rede e não aparecem no desenho.
   `at` é a fração do comprimento onde a etiqueta de BR pousa. */
const CORREDORES = [
  {
    id: 'br277w',
    at: 0.58,
    br: 'BR-277',
    nome: 'Curitiba a Ponta Grossa',
    w: 15,
    traco: ['cwb', 'cla', [-25.36, -49.78], [-25.2, -50.0], 'pgr'],
  },
  {
    id: 'br277e',
    at: 0.74,
    br: 'BR-277',
    nome: 'Curitiba ao Porto de Paranaguá',
    w: 15,
    traco: ['cwb', 'sjp', [-25.5, -49.0], [-25.47, -48.83], [-25.52, -48.65], 'pnl'],
  },
  {
    id: 'br116n',
    at: 0.35,
    br: 'BR-116',
    nome: 'Contorno Norte, sentido São Paulo',
    w: 14,
    traco: ['cwb', [-25.36, -49.32], [-25.335, -49.21], [-25.35, -49.11], 'cgs', [-25.2, -48.95]],
  },
  {
    id: 'contorno',
    semEtiqueta: true,
    br: 'BR-116',
    nome: 'Contorno Leste, por Piraquara',
    w: 11,
    traco: [[-25.35, -49.11], [-25.42, -49.07], 'pir', [-25.52, -49.1], 'sjp'],
  },
  {
    id: 'br116s',
    semEtiqueta: true,
    br: 'BR-116',
    nome: 'Curitiba a Mandirituba',
    w: 13,
    traco: ['cwb', 'frg', 'man', [-25.9, -49.42]],
  },
  {
    id: 'br376',
    at: 0.5,
    br: 'BR-376',
    nome: 'Curitiba a Garuva',
    w: 15,
    traco: ['sjp', [-25.7, -49.15], [-25.85, -49.05], 'gar'],
  },
  {
    id: 'br101',
    at: 0.3,
    br: 'BR-101',
    nome: 'Garuva a Florianópolis',
    w: 16,
    traco: ['gar', 'joi', 'bvl', 'nav', [-26.94, -48.64], 'bcm', [-27.25, -48.6], 'flo'],
  },
  {
    id: 'br470',
    at: 0.5,
    br: 'BR-470',
    nome: 'Navegantes a Blumenau',
    w: 11,
    traco: ['nav', [-26.9, -48.85], 'blu'],
  },
  {
    id: 'br407',
    at: 0.42,
    br: 'BR-407',
    nome: 'Paranaguá a Guaratuba',
    w: 11,
    traco: ['pnl', 'ptl', [-25.8, -48.53], 'gua', [-25.96, -48.7], 'gar'],
  },
]

/* Referência de distância, fora da área do mapa. Não é região atendida: a página
   não afirma cobertura em São Paulo em texto nenhum. */
const SAO_PAULO = { label: 'São Paulo', sub: '369 km', at: [-25.2, -48.95] }

const VIEW_W = 820
const VIEW_H = 1120
const MARGEM = { top: 104, right: 150, bottom: 74, left: 132 }

/* Raio do marcador e corpo do rótulo, por tier. */
const RAIO = { 1: 21, 2: 16, 3: 11, 4: 6.5 }
const CORPO = { 1: 17, 2: 14, 3: 11.5, 4: 10.5 }

/* Navegantes e Balneário Camboriú caem quase no mesmo pixel; o marcador de
   Navegantes sobe para os dois não se sobreporem. A via continua passando pela
   coordenada real. */
const DESLOCA = { nav: [0, -6] }

const ALPHA = 0.6
const SETA_A_CADA = 300
const AMOSTRAS = 512

/* ------------------------------------------------------- projeção Mercator -- */

const RAD = Math.PI / 180
const mercX = (lng) => lng * RAD
const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2))

/* d3.geoMercator() sai com escala 150 e translação [0,0], e a projeção inverte o
   eixo Y — daí o sinal. fitExtent mede o conteúdo nessa escala e resolve fator e
   translação para ele caber centralizado na área útil. */
const bruto = (lat, lng) => [150 * mercX(lng), -150 * mercY(lat)]

const extent = [
  [MARGEM.left, MARGEM.top],
  [VIEW_W - MARGEM.right, VIEW_H - MARGEM.bottom],
]

const brutos = NOS.map((no) => bruto(no.lat, no.lng))
const b0x = Math.min(...brutos.map((p) => p[0]))
const b1x = Math.max(...brutos.map((p) => p[0]))
const b0y = Math.min(...brutos.map((p) => p[1]))
const b1y = Math.max(...brutos.map((p) => p[1]))

const larguraUtil = extent[1][0] - extent[0][0]
const alturaUtil = extent[1][1] - extent[0][1]
const K = Math.min(larguraUtil / (b1x - b0x), alturaUtil / (b1y - b0y))
const TX = extent[0][0] + (larguraUtil - K * (b1x + b0x)) / 2
const TY = extent[0][1] + (alturaUtil - K * (b1y + b0y)) / 2

const P = (lat, lng) => {
  const [x, y] = bruto(lat, lng)
  return [TX + K * x, TY + K * y]
}

const porId = new Map(NOS.map((no) => [no.id, no]))
const resolve = (p) =>
  typeof p === 'string' ? P(porId.get(p).lat, porId.get(p).lng) : P(p[0], p[1])

/* -------------------------------------------------- curva Catmull-Rom (d3) -- */

const EPS = 1e-12

/*
 * Transcrição de d3-shape/src/curve/catmullRom.js, com alpha configurável. A
 * parametrização eleva a distância entre pontos a alpha, e é isso que impede a
 * curva de dar laço onde os vértices estão irregularmente espaçados — o caso
 * daqui, com waypoints densos nas curvas da serra e esparsos na reta.
 *
 * Devolve os segmentos cúbicos, não só o `d`: são eles que a amostragem por
 * comprimento percorre logo abaixo.
 */
function catmullRom(pontos, alpha) {
  const segmentos = []
  let x0
  let y0
  let x1
  let y1
  let x2
  let y2
  let l01a = 0
  let l12a = 0
  let l23a = 0
  let l012a = 0
  let l122a = 0
  let l232a = 0
  let contador = 0

  const curva = (x, y) => {
    let c1x = x1
    let c1y = y1
    let c2x = x2
    let c2y = y2
    if (l01a > EPS) {
      const a = 2 * l012a + 3 * l01a * l12a + l122a
      const n = 3 * l01a * (l01a + l12a)
      c1x = (x1 * a - x0 * l122a + x2 * l012a) / n
      c1y = (y1 * a - y0 * l122a + y2 * l012a) / n
    }
    if (l23a > EPS) {
      const b = 2 * l232a + 3 * l23a * l12a + l122a
      const m = 3 * l23a * (l23a + l12a)
      c2x = (x2 * b + x1 * l232a - x * l122a) / m
      c2y = (y2 * b + y1 * l232a - y * l122a) / m
    }
    segmentos.push([
      [x1, y1],
      [c1x, c1y],
      [c2x, c2y],
      [x2, y2],
    ])
  }

  for (const [px, py] of pontos) {
    if (contador) {
      const dx = x2 - px
      const dy = y2 - py
      l232a = Math.pow(dx * dx + dy * dy, alpha)
      l23a = Math.sqrt(l232a)
    }
    if (contador === 0) contador = 1
    else if (contador === 1) contador = 2
    else {
      if (contador === 2) contador = 3
      curva(px, py)
    }
    l01a = l12a
    l12a = l23a
    l012a = l122a
    l122a = l232a
    x0 = x1
    x1 = x2
    x2 = px
    y0 = y1
    y1 = y2
    y2 = py
  }
  if (contador === 3) curva(x2, y2)

  return segmentos
}

/* --------------------------------------- amostragem por comprimento de arco -- */

const emT = (seg, t) => {
  const u = 1 - t
  const [p0, c1, c2, p3] = seg
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p3[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p3[1],
  ]
}

/*
 * Tabela cumulativa de comprimento de corda. Substitui getTotalLength e
 * getPointAtLength do SVG, que também são amostragem, só que dentro do
 * navegador. Com 512 passos por cúbica o erro fica bem abaixo do pixel, e o que
 * depende disso (posição de seta e de etiqueta) tem folga de sobra.
 */
function medir(segmentos) {
  const amostras = []
  let acumulado = 0
  let anterior = emT(segmentos[0], 0)
  amostras.push({ len: 0, p: anterior })
  for (const seg of segmentos) {
    for (let i = 1; i <= AMOSTRAS; i++) {
      const p = emT(seg, i / AMOSTRAS)
      acumulado += Math.hypot(p[0] - anterior[0], p[1] - anterior[1])
      amostras.push({ len: acumulado, p })
      anterior = p
    }
  }
  return { amostras, total: acumulado }
}

function pontoEm({ amostras, total }, alvo) {
  const l = Math.max(0, Math.min(total, alvo))
  let lo = 0
  let hi = amostras.length - 1
  while (lo < hi) {
    const meio = (lo + hi) >> 1
    if (amostras[meio].len < l) lo = meio + 1
    else hi = meio
  }
  if (lo === 0) return amostras[0].p
  const a = amostras[lo - 1]
  const b = amostras[lo]
  const vao = b.len - a.len
  const f = vao === 0 ? 0 : (l - a.len) / vao
  return [a.p[0] + (b.p[0] - a.p[0]) * f, a.p[1] + (b.p[1] - a.p[1]) * f]
}

/* ------------------------------------------------------------------ saída -- */

const n = (v) => String(+v.toFixed(2))
const pt = (p) => `${n(p[0])},${n(p[1])}`

const corredores = []
const setas = []
const etiquetas = []
const comprimentos = []

for (const c of CORREDORES) {
  const segmentos = catmullRom(c.traco.map(resolve), ALPHA)
  const d =
    `M${pt(segmentos[0][0])}` +
    segmentos.map((s) => `C${pt(s[1])} ${pt(s[2])} ${pt(s[3])}`).join('')
  const medida = medir(segmentos)
  const total = medida.total
  comprimentos.push({ id: c.id, br: c.br, total })

  corredores.push({
    id: c.id,
    br: c.br,
    nome: c.nome,
    d,
    w: c.w,
    nos: c.traco.filter((p) => typeof p === 'string'),
  })

  /* Setas de sentido: uma a cada ~300 unidades, espelhadas dos dois lados da
     via, porque todo corredor daqui é de mão dupla. */
  const marcas = Math.max(1, Math.round(total / SETA_A_CADA))
  for (let i = 1; i <= marcas; i++) {
    const t = total * (i / (marcas + 1))
    const a = pontoEm(medida, t - 6)
    const b = pontoEm(medida, t + 6)
    const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
    const fora = c.w / 2 + 13
    for (const lado of [1, -1]) {
      const x = a[0] + Math.sin(ang * RAD) * fora * lado
      const y = a[1] - Math.cos(ang * RAD) * fora * lado
      setas.push({
        id: c.id,
        transform: `translate(${n(x)},${n(y)}) rotate(${n(lado === 1 ? ang : ang + 180)})`,
      })
    }
  }

  /* A etiqueta acompanha a inclinação da via, virada para nunca sair de cabeça
     para baixo, e sobe acima do asfalto. */
  if (!c.semEtiqueta) {
    const at = c.at ?? 0.52
    const m = pontoEm(medida, total * at)
    const a = pontoEm(medida, total * at - 14)
    const b = pontoEm(medida, total * at + 14)
    let ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
    if (ang > 90) ang -= 180
    if (ang < -90) ang += 180
    etiquetas.push({
      id: c.id,
      br: c.br,
      largura: +(c.br.length * 8.4 + 16).toFixed(2),
      transform: `translate(${n(m[0])},${n(m[1])}) rotate(${n(ang)}) translate(0,${n(-(c.w / 2 + 30))})`,
    })
  }
}

/* Rótulo da cidade: lado, ancoragem e deslocamento resolvidos aqui, para o
   componente não precisar medir texto no browser. */
const nos = NOS.map((no) => {
  const [px, py] = P(no.lat, no.lng)
  const desloca = DESLOCA[no.id] ?? [0, 0]
  const r = RAIO[no.tier]
  const fs = CORPO[no.tier]
  const linhas = no.nome.split('\n').map((l) => l.toUpperCase())
  const vao = r + (no.tier === 1 ? 15 : 9)
  const entrelinha = fs * 1.1
  const lado = no.rotulo
  const anchor = lado === 'l' ? 'end' : lado === 'r' ? 'start' : 'middle'
  const tx = lado === 'l' ? -vao : lado === 'r' ? vao : 0
  const ty =
    lado === 'b'
      ? vao + fs * 0.86
      : lado === 't'
        ? -(vao + (linhas.length - 1) * entrelinha)
        : -((linhas.length - 1) * entrelinha) / 2 + fs * 0.34

  return {
    id: no.id,
    nome: no.nome.replace('\n', ' '),
    tier: no.tier,
    x: +n(px + desloca[0]),
    y: +n(py + desloca[1]),
    r,
    fs,
    anchor,
    tx: +n(tx),
    ty: +n(ty),
    entrelinha: +n(entrelinha),
    linhas,
  }
})

const [spx, spy] = P(SAO_PAULO.at[0], SAO_PAULO.at[1])

/* Barra de escala: 50 km medidos na latitude do meio do mapa, convertidos em
   unidades do viewBox pela própria projeção. */
const KM = 50
const LAT_ESCALA = -27.2
const ea = P(LAT_ESCALA, -49)
const eb = P(LAT_ESCALA, -49 + KM / (111.32 * Math.cos(LAT_ESCALA * RAD)))
const escalaPx = Math.abs(eb[0] - ea[0])

const brs = [...new Set(CORREDORES.map((c) => c.br))].sort(
  (a, b) => Number(a.slice(3)) - Number(b.slice(3))
)

const arquivo = `// Arquivo gerado por scripts/generate-rodovias-map.mjs — não editar manualmente.
// Geometria do mapa da rede de Rodovias, projetada em Mercator de coordenadas reais.
export const VIEW_W = ${VIEW_W}
export const VIEW_H = ${VIEW_H}

export const CORREDORES = [
${corredores
  .map(
    (c) =>
      `  {\n    id: '${c.id}',\n    br: '${c.br}',\n    nome: '${c.nome}',\n    w: ${c.w},\n    nos: [${c.nos
        .map((id) => `'${id}'`)
        .join(', ')}],\n    d: '${c.d}',\n  },`
  )
  .join('\n')}
]

export const SETAS = [
${setas.map((s) => `  { id: '${s.id}', transform: '${s.transform}' },`).join('\n')}
]

export const ETIQUETAS = [
${etiquetas
  .map(
    (e) =>
      `  { id: '${e.id}', br: '${e.br}', largura: ${e.largura}, transform: '${e.transform}' },`
  )
  .join('\n')}
]

export const NOS = [
${nos
  .map(
    (no) =>
      `  { id: '${no.id}', nome: '${no.nome}', tier: ${no.tier}, x: ${no.x}, y: ${no.y}, r: ${no.r}, fs: ${no.fs}, anchor: '${no.anchor}', tx: ${no.tx}, ty: ${no.ty}, entrelinha: ${no.entrelinha}, linhas: [${no.linhas
        .map((l) => `'${l}'`)
        .join(', ')}] },`
  )
  .join('\n')}
]

// Referência de distância, não região atendida.
export const SAO_PAULO = { x: ${n(spx)}, y: ${n(spy - 2)}, label: '${SAO_PAULO.label.toUpperCase()}', sub: '${SAO_PAULO.sub}' }

export const ESCALA = { x: 60, y: ${VIEW_H - 54}, px: ${n(escalaPx)}, label: '${KM} KM' }
export const NORTE = { x: 74, y: ${VIEW_H - 132} }

// Ordem oficial das BRs (regra 3 do handoff), usada nos filtros.
export const BRS = [${brs.map((br) => `'${br}'`).join(', ')}]
`

const { writeFile } = await import('node:fs/promises')
await writeFile(new URL('../lib/mapaRodovias.js', import.meta.url), arquivo)

console.log(`lib/mapaRodovias.js gerado — viewBox 0 0 ${VIEW_W} ${VIEW_H}`)
console.log(`projeção: k=${K.toFixed(4)} tx=${TX.toFixed(2)} ty=${TY.toFixed(2)}`)
console.log(
  `${corredores.length} corredores · ${setas.length} setas · ${etiquetas.length} etiquetas · ${nos.length} nós · ${brs.length} BRs`
)
console.log(`escala: ${KM} km = ${escalaPx.toFixed(1)} unidades do viewBox`)
for (const c of comprimentos) {
  const marcas = Math.max(1, Math.round(c.total / SETA_A_CADA))
  console.log(
    `  ${c.id.padEnd(9)} ${c.br}  comprimento ${c.total.toFixed(1)}  ${marcas} marca(s) de sentido`
  )
}
