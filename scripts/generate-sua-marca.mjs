/*
 * Gera os painéis da ferramenta Sua marca no OOH
 * (/area-do-anunciante/sua-marca-no-ooh): os WebP servidos em
 * public/media/sua-marca e a geometria de encaixe em lib/suaMarcaGeometria.js.
 * Uso: node scripts/generate-sua-marca.mjs
 * Roda uma vez, quando entra ou muda uma foto. O resultado é commitado; não faz
 * parte do build. Precisa do `sharp`, que já vem com o Next.
 *
 * A entrada é a foto tratada em public/media/images/sua-marca/<id>.jpg (fora do
 * versionamento, como todos os originais), no padrão do protótipo da Imagine
 * Concept: a área útil do painel pintada de laranja sólido e o resto da foto em
 * preto e branco. Esse contraste é o que torna o painel detectável sem clique
 * manual: o laranja é o único pixel saturado da imagem.
 *
 * O que sai daqui, por painel:
 *   1. o WebP de 1672px que o navegador carrega. A geometria é medida nele, e não
 *      no JPG, porque é dele que a ferramenta lê a máscara em runtime;
 *   2. os 4 cantos de cada face, [TL, TR, BR, BL], em px do WebP. São os
 *      extremos da máscara: TL é o pixel de menor x+y, TR o de maior x−y, BR o de
 *      maior x+y, BL o de maior y−x. Conferido contra os 12 cantos calibrados à
 *      mão no protótipo: diferença de 2 a 4 px, que era o "overshoot" que o
 *      protótipo aplicava para cobrir a franja do JPEG. Aqui a franja é coberta
 *      pela máscara em runtime, então os cantos ficam exatos.
 *
 * Painel de duas faces (Batel Square, Champagnat Square) é uma mancha só na
 * máscara. `dobra` é a coluna x onde as faces se encontram: a máscara é dividida
 * ali e cada metade recebe os próprios 4 cantos. A junção real é quase vertical
 * nas duas fotos (inclinação de 3 px em 300), e o que a coluna erra fica dentro
 * da margem de cor sólida que a logo nunca alcança.
 *
 * Os cantos decidem onde a logo cai (homografia); o que decide quais pixels são
 * do painel é a máscara lida em runtime. Ver lib/suaMarcaMotor.js.
 */

import sharp from 'sharp'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGINAIS = join(raiz, 'public', 'media', 'images', 'sua-marca')
const SERVIDOS = join(raiz, 'public', 'media', 'sua-marca')
const SAIDA = join(raiz, 'lib', 'suaMarcaGeometria.js')

// Qualidade alta de propósito: a máscara é lida do WebP, e compressão forte
// espalharia o laranja pela borda do painel.
const QUALIDADE = 90

// Um pixel é painel quando a saturação (max − min dos canais) passa deste teto
// e a cor é laranja (r > g > b). A franja do JPEG fica abaixo dele e é tratada
// pela rampa da máscara em runtime, não aqui.
const SATURACAO_MINIMA = 120

/* ---------------------------------------------------------------- entrada -- */

// `id` é o nome do arquivo; `dobra`, só nos painéis de duas faces, é a coluna x
// da junção. Nome, plataformas, proporção da arte e brilho de cada face são
// dados do produto e vivem em lib/suaMarca.js.
const ALVOS = [
  { id: 'batel-square', dobra: 956 },
  { id: 'champagnat-square', dobra: 571 },
  { id: 'top-sight' },
  { id: 'poster-sight' },
  { id: 'billboard' },
  { id: 'super-top-digital-urbanity' },
  { id: 'mega-banner' },
  { id: 'jardim-vertical' },
  { id: 'banca-horizontal' },
  { id: 'banca-vertical' },
  { id: 'relogio' },
  { id: 'totem' },
]

/* ---------------------------------------------------------------- máscara -- */

function ehPainel(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b) > SATURACAO_MINIMA && r > g && g > b
}

// Os 4 cantos da mancha de uma face. `dentro(x)` limita a busca à metade da
// dobra quando o painel tem duas faces.
function cantosDaFace(pixels, largura, altura, dentro) {
  let tl = null
  let tr = null
  let br = null
  let bl = null
  let n = 0

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      if (!dentro(x)) continue
      const i = (y * largura + x) * 3
      if (!ehPainel(pixels[i], pixels[i + 1], pixels[i + 2])) continue
      n++
      if (!tl || x + y < tl[0] + tl[1]) tl = [x, y]
      if (!tr || x - y > tr[0] - tr[1]) tr = [x, y]
      if (!br || x + y > br[0] + br[1]) br = [x, y]
      if (!bl || y - x > bl[1] - bl[0]) bl = [x, y]
    }
  }

  if (n === 0) return null

  // O extremo é um pixel; o canto da face é a quina dele que aponta para fora.
  return {
    pixels: n,
    cantos: [
      [tl[0], tl[1]],
      [tr[0] + 1, tr[1]],
      [br[0] + 1, br[1] + 1],
      [bl[0], bl[1] + 1],
    ],
  }
}

const distancia = ([ax, ay], [bx, by]) => Math.hypot(bx - ax, by - ay)

// Proporção largura/altura do quadrilátero, média dos dois lados. Em foto
// frontal é a proporção real da face; em perspectiva forte é só orientação.
function proporcaoMedida([tl, tr, br, bl]) {
  const largura = (distancia(tl, tr) + distancia(bl, br)) / 2
  const altura = (distancia(tl, bl) + distancia(tr, br)) / 2
  return largura / altura
}

/* ------------------------------------------------------------------ corpo -- */

if (!existsSync(SERVIDOS)) mkdirSync(SERVIDOS, { recursive: true })

const geometria = {}
const relatorio = []

for (const alvo of ALVOS) {
  const origem = join(ORIGINAIS, `${alvo.id}.jpg`)
  if (!existsSync(origem)) {
    console.error(`falta o original: ${origem}`)
    process.exit(1)
  }

  const webp = await sharp(origem).webp({ quality: QUALIDADE }).toBuffer()
  await writeFile(join(SERVIDOS, `${alvo.id}.webp`), webp)

  // A geometria é medida no WebP já codificado, o mesmo arquivo que o navegador
  // vai decodificar.
  const { data, info } = await sharp(webp).raw().toBuffer({ resolveWithObject: true })
  const { width: largura, height: altura } = info

  const metades = alvo.dobra
    ? [(x) => x < alvo.dobra, (x) => x >= alvo.dobra]
    : [() => true]

  const faces = metades.map((dentro) => cantosDaFace(data, largura, altura, dentro))
  if (faces.some((f) => f === null)) {
    console.error(`${alvo.id}: nenhum pixel laranja em uma das faces — conferir a foto ou a dobra`)
    process.exit(1)
  }

  geometria[alvo.id] = { largura, altura, faces: faces.map((f) => ({ cantos: f.cantos })) }
  relatorio.push({ id: alvo.id, kb: Math.round(webp.length / 1024), faces })
}

/* ------------------------------------------------------------------ saída -- */

const linhasFaces = (faces) =>
  faces
    .map(
      (f) =>
        `      { cantos: [${f.cantos.map(([x, y]) => `[${x}, ${y}]`).join(', ')}] },`
    )
    .join('\n')

const arquivo = `// Arquivo gerado por scripts/generate-sua-marca.mjs — não editar manualmente.
// Cantos [TL, TR, BR, BL] de cada face de painel, em px do WebP servido em
// /media/sua-marca/<id>.webp. É a geometria de encaixe da ferramenta Sua marca
// no OOH; nome, plataformas e proporção da arte vivem em lib/suaMarca.js.
export const GEOMETRIA = {
${Object.entries(geometria)
  .map(
    ([id, g]) => `  '${id}': {
    largura: ${g.largura},
    altura: ${g.altura},
    faces: [
${linhasFaces(g.faces)}
    ],
  },`
  )
  .join('\n')}
}
`

await writeFile(SAIDA, arquivo)

console.log(`lib/suaMarcaGeometria.js gerado — ${ALVOS.length} painéis`)
for (const r of relatorio) {
  console.log(`\n${r.id} · ${r.kb} KB`)
  r.faces.forEach((f, i) => {
    console.log(
      `  face ${i + 1}: ${f.pixels} px · cantos ${JSON.stringify(f.cantos)} · proporção medida ${proporcaoMedida(f.cantos).toFixed(2)}`
    )
  })
}

// Auditoria da proporção declarada contra a medida. Importado só agora porque
// lib/suaMarca.js lê a geometria recém-escrita.
const { getMockups } = await import('../lib/suaMarca.js')
console.log('\nproporção da arte × medida na foto (diferença grande em foto frontal é arte errada):')
for (const m of getMockups()) {
  m.faces.forEach((face, i) => {
    const declarada = face.arte[0] / face.arte[1]
    const medida = proporcaoMedida(face.cantos)
    const alerta = Math.abs(declarada - medida) / declarada > 0.15 ? '  ← conferir' : ''
    console.log(
      `  ${m.id} face ${i + 1}: arte ${face.arte.join('×')} (${declarada.toFixed(2)}) · medida ${medida.toFixed(2)}${alerta}`
    )
  })
}
