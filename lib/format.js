// Formatadores compartilhados. Instanciar Intl.DateTimeFormat é caro e estava
// sendo refeito em cada arquivo que exibia data.

// Páginas públicas — "12 de agosto de 2026".
export const DATA_LONGA = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

// A mesma data longa no idioma da página. O formatador de cada idioma é criado
// uma vez e reaproveitado; idioma desconhecido cai no português.
const TAG_INTL = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', zh: 'zh-CN' }
const longaPorLocale = new Map([['pt', DATA_LONGA]])

export function dataLonga(locale) {
  if (!longaPorLocale.has(locale)) {
    longaPorLocale.set(
      locale,
      new Intl.DateTimeFormat(TAG_INTL[locale] ?? 'pt-BR', { dateStyle: 'long' })
    )
  }
  return longaPorLocale.get(locale)
}

// Listagens do admin — "12/08/26, 14:30".
export const DATA_CURTA = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})
