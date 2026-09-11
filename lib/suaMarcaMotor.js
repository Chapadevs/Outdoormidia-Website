// O motor de encaixe da ferramenta Sua marca no OOH, separado do componente.
//
// A logo precisa parecer colada no painel da foto, que está em perspectiva e
// quase nunca é um retângulo. Dois mecanismos resolvem isso, e este arquivo tem
// os dois:
//
// 1. Homografia por face. A matriz 3×3 que leva o retângulo plano da arte
//    (`arte` em lib/suaMarca.js) aos 4 cantos da face na foto. O render é por
//    amostragem inversa: para cada pixel da foto, a matriz inversa diz que ponto
//    da textura cai ali, e a leitura é bilinear. Não substituir por transform
//    CSS, object-fit ou dois triângulos afins: os primeiros não resolvem
//    perspectiva e o último distorce na diagonal.
//
// 2. Máscara de cor da própria foto. A área útil vem pintada de laranja sólido
//    sobre foto em preto e branco, então o laranja é o único pixel saturado da
//    imagem. A cobertura de cada pixel sai da saturação, com rampa na franja de
//    compressão, e só pixel coberto é pintado. É o que dá cobertura exata da área
//    útil, borda anti-serrilhada, e borda curva (Champagnat Square) sem precisar
//    empurrar os cantos para fora à mão, como o protótipo fazia.
//
// Os cantos decidem **onde** a logo cai; a máscara decide **quais pixels** são
// do painel. Pixel coberto que cai fora do retângulo da face (franja, curva)
// lê a textura grampeada na borda, que ali é cor sólida.
//
// Tudo aqui é função pura sobre typed arrays, sem DOM, como lib/carrosselMidia.js:
// dá para conferir a matriz e a máscara em Node, e o componente fica só com o
// canvas.

/* ------------------------------------------------------------ homografia -- */

// Gauss com pivô parcial, para o sistema 8×8 da homografia.
function resolver(A, b) {
  const n = b.length
  for (let i = 0; i < n; i++) {
    let p = i
    for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r
    ;[A[i], A[p]] = [A[p], A[i]]
    ;[b[i], b[p]] = [b[p], b[i]]
    const d = A[i][i]
    if (Math.abs(d) < 1e-12) continue
    for (let c = i; c < n; c++) A[i][c] /= d
    b[i] /= d
    for (let r = 0; r < n; r++) {
      if (r === i) continue
      const f = A[r][i]
      if (!f) continue
      for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]
      b[r] -= f * b[i]
    }
  }
  return b
}

// A matriz que leva (u, v) do retângulo w×h a (x, y) do quadrilátero `cantos`,
// na ordem [TL, TR, BR, BL]. Devolve os 9 termos, linha a linha, com o último
// fixado em 1.
export function homografia(w, h, cantos) {
  const origem = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ]
  const A = []
  const b = []
  for (let i = 0; i < 4; i++) {
    const [u, v] = origem[i]
    const [x, y] = cantos[i]
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x])
    b.push(x)
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y])
    b.push(y)
  }
  const s = resolver(A, b)
  return [s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], 1]
}

export function inverter(m) {
  const [a, b, c, d, e, f, g, h, i] = m
  const A = e * i - f * h
  const B = f * g - d * i
  const C = d * h - e * g
  const det = a * A + b * B + c * C
  return [
    A / det,
    (c * h - b * i) / det,
    (b * f - c * e) / det,
    B / det,
    (a * i - c * g) / det,
    (c * d - a * f) / det,
    C / det,
    (b * g - a * h) / det,
    (a * e - b * d) / det,
  ]
}

// Aplica a matriz a um ponto, com a divisão de perspectiva.
export function projetar(m, x, y) {
  const w = m[6] * x + m[7] * y + m[8]
  return [(m[0] * x + m[1] * y + m[2]) / w, (m[3] * x + m[4] * y + m[5]) / w]
}

/* ------------------------------------------------------------- geometria -- */

const distancia = ([ax, ay], [bx, by]) => Math.hypot(bx - ax, by - ay)

// Caixa envolvente das faces, com folga para a franja, recortada na foto.
export function caixaEnvolvente(faces, largura, altura, folga = 3) {
  const pontos = faces.flatMap((f) => f.cantos)
  const xs = pontos.map((p) => p[0])
  const ys = pontos.map((p) => p[1])
  const x0 = Math.max(0, Math.floor(Math.min(...xs)) - folga)
  const y0 = Math.max(0, Math.floor(Math.min(...ys)) - folga)
  const x1 = Math.min(largura, Math.ceil(Math.max(...xs)) + folga)
  const y1 = Math.min(altura, Math.ceil(Math.max(...ys)) + folga)
  return { x0, y0, x1, y1, largura: x1 - x0, altura: y1 - y0 }
}

// Tamanho da textura de uma face: a proporção de `arte`, no dobro do maior lado
// da face na foto. É o supersample que a leitura bilinear pede; ir além disso
// (o tamanho cheio da arte, como no protótipo) só encarece o render, e o Totem
// em 1080×1920 vezes dois seriam 8 megapixels por troca de cor.
export function tamanhoTextura(face) {
  const [tl, tr, br, bl] = face.cantos
  const maiorLado = Math.max(distancia(tl, tr), distancia(bl, br), distancia(tl, bl), distancia(tr, br))
  const [aw, ah] = face.arte
  const k = (2 * maiorLado) / Math.max(aw, ah)
  return { tw: Math.max(64, Math.round(aw * k)), th: Math.max(64, Math.round(ah * k)) }
}

/* --------------------------------------------------------------- máscara -- */

// Abaixo deste valor de saturação o pixel é da foto em preto e branco; acima do
// teto ele é laranja sólido. Entre os dois fica a franja de compressão, de 1 a
// 2 px na borda, que é onde a rampa faz a borda anti-serrilhada.
const SATURACAO_PISO = 16
const SATURACAO_TETO = 240

// Cobertura 0–255 por pixel de um bloco RGBA. Laranja é r > g > b; um pixel
// saturado de outra cor (não existe nas fotos tratadas) fica de fora.
export function mascaraDoPainel(rgba) {
  const n = rgba.length >> 2
  const mascara = new Uint8ClampedArray(n)
  const faixa = SATURACAO_TETO - SATURACAO_PISO
  for (let i = 0; i < n; i++) {
    const r = rgba[i * 4]
    const g = rgba[i * 4 + 1]
    const b = rgba[i * 4 + 2]
    if (!(r > g && g > b)) continue
    const sat = r - b
    if (sat <= SATURACAO_PISO) continue
    mascara[i] = Math.min(255, Math.round(((sat - SATURACAO_PISO) / faixa) * 255))
  }
  return mascara
}

/* ------------------------------------------------------------------ mapa -- */

const FORA = 255

// Para cada pixel coberto do bloco, que face o pinta e em que ponto (u, v) da
// textura dela. Calculado uma vez por painel: não depende da cor, da logo nem
// da escala, então as trocas seguintes só amostram.
//
// A face escolhida é a primeira em que (u, v) cai dentro do retângulo; pixel
// coberto que não cai em nenhuma (franja, borda curva, a junção de duas faces)
// vai para a mais próxima, com (u, v) grampeado na borda da textura.
export function mapearFaces(caixa, mascara, faces) {
  const n = caixa.largura * caixa.altura
  const indice = new Uint8Array(n).fill(FORA)
  const us = new Float32Array(n)
  const vs = new Float32Array(n)

  const inversas = faces.map((f) => inverter(homografia(f.tw, f.th, f.cantos)))

  for (let y = 0; y < caixa.altura; y++) {
    for (let x = 0; x < caixa.largura; x++) {
      const i = y * caixa.largura + x
      if (mascara[i] === 0) continue
      const px = caixa.x0 + x + 0.5
      const py = caixa.y0 + y + 0.5

      let melhor = -1
      let melhorFora = Infinity
      let melhorU = 0
      let melhorV = 0

      for (let f = 0; f < faces.length; f++) {
        const [u, v] = projetar(inversas[f], px, py)
        const { tw, th } = faces[f]
        const fora = Math.max(0, -u, u - tw) / tw + Math.max(0, -v, v - th) / th
        if (fora < melhorFora) {
          melhorFora = fora
          melhor = f
          melhorU = u
          melhorV = v
        }
        if (fora === 0) break
      }

      const { tw, th } = faces[melhor]
      indice[i] = melhor
      // Grampeado a meio pixel da borda: a leitura bilinear lê os dois vizinhos.
      us[i] = Math.min(Math.max(melhorU, 0), tw - 1.001)
      vs[i] = Math.min(Math.max(melhorV, 0), th - 1.001)
    }
  }

  return { indice, us, vs }
}

/* ----------------------------------------------------------------- compor -- */

// Pinta as faces sobre o bloco de fundo, no lugar. `texturas[f]` é o RGBA
// opaco da textura da face f (cor de fundo mais a logo), com `tw`, `th` e `luz`.
//
// Na franja (cobertura parcial) o pixel da foto é uma mistura de laranja com o
// cinza que estava atrás, e misturar a textura sobre ele deixaria um halo
// laranja. O cinza original é recuperado pelo canal azul, que o laranja quase
// não tem: azul do pixel ≈ (1 − cobertura) × cinza.
export function compor(fundo, mascara, mapa, texturas) {
  const n = mascara.length
  for (let i = 0; i < n; i++) {
    const cobertura = mascara[i]
    if (cobertura === 0) continue

    const tex = texturas[mapa.indice[i]]
    const { dados, tw, luz } = tex
    const u = mapa.us[i]
    const v = mapa.vs[i]
    const ix = u | 0
    const iy = v | 0
    const fx = u - ix
    const fy = v - iy
    const p00 = (iy * tw + ix) * 4
    const p10 = p00 + 4
    const p01 = p00 + tw * 4
    const p11 = p01 + 4
    const w00 = (1 - fx) * (1 - fy)
    const w10 = fx * (1 - fy)
    const w01 = (1 - fx) * fy
    const w11 = fx * fy

    let r = (dados[p00] * w00 + dados[p10] * w10 + dados[p01] * w01 + dados[p11] * w11) * luz
    let g = (dados[p00 + 1] * w00 + dados[p10 + 1] * w10 + dados[p01 + 1] * w01 + dados[p11 + 1] * w11) * luz
    let b = (dados[p00 + 2] * w00 + dados[p10 + 2] * w10 + dados[p01 + 2] * w01 + dados[p11 + 2] * w11) * luz

    const o = i * 4
    if (cobertura < 250) {
      const a = cobertura / 255
      const cinza = Math.min(255, fundo[o + 2] / (1 - a))
      r = r * a + cinza * (1 - a)
      g = g * a + cinza * (1 - a)
      b = b * a + cinza * (1 - a)
    }

    fundo[o] = r
    fundo[o + 1] = g
    fundo[o + 2] = b
    fundo[o + 3] = 255
  }
  return fundo
}
