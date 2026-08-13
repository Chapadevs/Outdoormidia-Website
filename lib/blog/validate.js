import { SLUG_RE } from '@/lib/slugify'

// Rotas estáticas sob /blog. O artigo vive em /blog/<slug>, então um post com
// um desses slugs seria criado sem erro e nunca alcançado — no App Router a
// rota estática ganha da dinâmica. Manter em dia com app/blog/.
const SLUG_RESERVADOS = new Set(['artigos', 'podcast'])

// Valida o body de criação/edição de post. Retorna a mensagem de erro em
// PT-BR ou null se válido.
export function validatePostBody(body) {
  const { title, slug, excerpt, content, status, author, tags } = body
  if (!title?.trim() || !slug?.trim() || !excerpt?.trim() || !content?.trim()) {
    return 'Preencha título, slug, resumo e conteúdo.'
  }
  if (!SLUG_RE.test(slug)) {
    return 'Slug inválido: use apenas letras minúsculas, números e hífens.'
  }
  if (SLUG_RESERVADOS.has(slug)) {
    return `"${slug}" é uma rota do site e não pode ser usada como slug de post.`
  }
  if (status !== 'draft' && status !== 'published') {
    return 'Status inválido.'
  }
  if (author != null && (typeof author !== 'string' || author.length > 120)) {
    return 'Autor inválido.'
  }
  if (tags != null) {
    const valid =
      Array.isArray(tags) &&
      tags.length <= 12 &&
      tags.every((tag) => typeof tag === 'string' && SLUG_RE.test(tag))
    if (!valid) return 'Tags inválidas.'
  }
  return null
}
