// Pôster do vídeo que entra num carrossel.
//
// Dentro do `CarrosselContinuo` o `<video>` sobe sem `src`: quem anexa a fonte
// é o carrossel, e só quando o card se aproxima do centro, para não haver sete
// decodificadores vivos ao mesmo tempo. Um `<video>` sem fonte não pinta nada,
// então sem pôster o card subia vazio (só o véu laranja sobre o fundo bege) até
// a fonte chegar. Com o pôster o card nasce com a imagem certa, e o carrossel
// pode anexar o vídeo bem mais tarde — que é o que tira as trocas de fonte de
// cima do movimento.
//
// O nome é derivado do próprio vídeo, e não um campo a mais em cada entrada de
// `lib/platforms.js` e `lib/diferenciais.js`: são nove arquivos, e nove campos
// escritos à mão é onde a divergência nasce. `scripts/generate-video-posters.mjs`
// grava exatamente este nome — rodar o script é o que mantém os dois lados
// juntos.
//
// A query de versão (`?v=`), quando existe, passa para o pôster: os dois vivem
// sob o mesmo `Cache-Control` de sete dias, e trocar o vídeo sem trocar a URL
// deixava o navegador de quem já tinha visitado a página com o arquivo antigo.
export function posterDoVideo(video) {
  if (!video) return undefined
  return video.replace(/\.mp4(\?[^#]*)?$/, '-capa.webp$1')
}
