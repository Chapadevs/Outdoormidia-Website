// Aplica a tradução de um módulo de conteúdo sobre a versão em português.
//
// Os módulos de lib/ misturam copy com estrutura que não se traduz: slug, href,
// publicado, image, componentes de ícone do lucide-react, caminhos de vídeo,
// coordenadas. Copiar o arquivo inteiro por idioma duplicaria essa estrutura e
// ela ia divergir na primeira edição.
//
// Então o arquivo em português continua sendo a fonte da estrutura, e cada
// idioma traz só os campos de texto. Campo que o overlay não declara cai no
// português, o que faz uma tradução incompleta aparecer em PT em vez de sumir
// da página.
//
// Array é mesclado por posição, e é por isso que o overlay de uma lista precisa
// ter o mesmo comprimento dela: item a mais ou a menos desalinha tudo daí para
// frente. O scripts/check-i18n.mjs confere isso.
export function aplicarOverlay(base, overlay) {
  if (overlay === undefined || overlay === null) return base

  if (Array.isArray(base)) {
    if (!Array.isArray(overlay)) return overlay
    return base.map((item, i) => aplicarOverlay(item, overlay[i]))
  }

  // Elemento de ícone e qualquer outra coisa que não seja objeto simples passa
  // direto: só objeto literal é percorrido.
  if (!ehObjetoSimples(base) || !ehObjetoSimples(overlay)) return overlay

  const saida = { ...base }
  for (const [chave, valor] of Object.entries(overlay)) {
    saida[chave] = aplicarOverlay(base[chave], valor)
  }
  return saida
}

function ehObjetoSimples(v) {
  return typeof v === 'object' && v !== null && (v.constructor === Object || v.constructor === undefined)
}

// Monta o getter de um módulo: recebe a versão PT e o mapa de overlays, e
// devolve uma função de locale que memoiza o resultado. Sem a memoização, cada
// página refaria o merge do módulo inteiro a cada render.
export function porLocale(base, overlays) {
  const cache = new Map([['pt', base]])

  return function conteudo(locale) {
    if (cache.has(locale)) return cache.get(locale)
    const resultado = aplicarOverlay(base, overlays[locale])
    cache.set(locale, resultado)
    return resultado
  }
}
