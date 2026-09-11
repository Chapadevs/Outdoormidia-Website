// Gera o pôster de cada vídeo que entra num carrossel, no mesmo padrão dos
// `-capa.webp` de `public/media/cases-videos/`.
//
// Por que existe: dentro do `CarrosselContinuo` o vídeo não tem `src` até o
// card se aproximar do centro (é o carrossel que anexa a fonte, para não haver
// sete decodificadores vivos ao mesmo tempo). Sem `poster`, um `<video>` sem
// fonte não pinta nada, e o card subia vazio — só o véu laranja sobre o fundo
// bege — até a fonte chegar. Com o pôster o card nasce com a imagem certa e o
// carrossel pode anexar o vídeo bem mais tarde, que é o que tira as trocas de
// fonte de cima do movimento.
//
// O quadro é sempre o **0**, nunca um quadro "bonito" escolhido no meio: o
// vídeo começa a tocar do zero quando a fonte é anexada, então só o quadro 0
// entrega a troca sem salto. Foi conferido que nenhum dos nove abre em fade
// preto (rodovias e frontlights são noturnos de verdade, não fade).
//
// Roda uma vez, quando entra ou muda um vídeo de carrossel:
//   node scripts/generate-video-posters.mjs
// Precisa de ffmpeg no PATH. Os .webp gerados são versionados, como os capas
// dos depoimentos.

import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// `largura` é a maior medida em que o pôster aparece na tela, não a do vídeo:
// o card de plataforma vai a 820px CSS e o de diferencial a 360px, e o pôster
// é transitório — sai de cena assim que a fonte do vídeo chega.
const ALVOS = [
  { video: 'media/plataformas/video-iconicos.mp4', largura: 1280 },
  { video: 'media/plataformas/outdoor-digital.mp4', largura: 1280 },
  { video: 'media/plataformas/frontlights.mp4', largura: 1280 },
  { video: 'media/plataformas/aeroporto.mp4', largura: 1280 },
  { video: 'media/plataformas/midia-movel.mp4', largura: 1280 },
  { video: 'media/plataformas/rodovias.mp4', largura: 1280 },
  { video: 'media/plataformas/digital-signage.mp4', largura: 1280 },
  { video: 'media/diferenciais/monitoramento.mp4', largura: 760 },
  { video: 'media/diferenciais/gestao-360-om.mp4', largura: 760 },
]

const QUALIDADE = 72

for (const { video, largura } of ALVOS) {
  const entrada = join(raiz, 'public', video)
  if (!existsSync(entrada)) {
    console.warn(`ausente, pulando: ${video}`)
    continue
  }
  const saida = entrada.replace(/\.mp4$/, '-capa.webp')

  execFileSync(
    'ffmpeg',
    [
      '-v', 'error',
      '-i', entrada,
      '-frames:v', '1',
      '-vf', `scale=${largura}:-2:flags=lanczos`,
      '-c:v', 'libwebp',
      '-quality', String(QUALIDADE),
      saida,
      '-y',
    ],
    { stdio: 'inherit' }
  )

  const kb = Math.round(statSync(saida).size / 1024)
  console.log(`${saida.slice(raiz.length + 1).replace(/\\/g, '/')}  ${largura}px  ${kb} KB`)
}
