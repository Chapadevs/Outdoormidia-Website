// Formatadores compartilhados. Instanciar Intl.DateTimeFormat é caro e estava
// sendo refeito em cada arquivo que exibia data.

// Páginas públicas — "12 de agosto de 2026".
export const DATA_LONGA = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

// Listagens do admin — "12/08/26, 14:30".
export const DATA_CURTA = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})
