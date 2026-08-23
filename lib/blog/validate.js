import { SLUG_RE } from '@/lib/slugify'
import { gruposFaltantes } from '@/lib/tags/obrigatorios'

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

// Regra de classificação: todo post publicado precisa de pelo menos uma tag de
// cada grupo obrigatório (plataforma, cobertura e indústrias). Rascunho passa —
// a classificação é cobrada na hora de publicar. Fica separada de
// validatePostBody porque depende das tags cadastradas, que vêm do Firestore.
export function validatePostTags(body, allTags) {
  if (body.status !== 'published') return null

  const faltantes = gruposFaltantes('blog', body.tags, allTags)
  if (faltantes.length === 0) return null

  const labels = faltantes.map((group) => group.label).join(', ')
  return `Para publicar, selecione ao menos uma tag de: ${labels}.`
}
