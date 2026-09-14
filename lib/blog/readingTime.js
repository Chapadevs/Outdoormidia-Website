const WORDS_PER_MINUTE = 200

// Minutos de leitura, sem rótulo: quem monta a frase é o componente, com a
// tradução de `Blog.minLeitura` (messages/*.json).
export function readingTimeMinutes(markdown) {
  const text = (markdown || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`|-]+/g, ' ')

  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
