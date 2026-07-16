import { SLUG_RE } from '@/lib/slugify'
import { PLATFORMS } from '@/lib/platforms'

const PLATFORM_SLUGS = new Set(PLATFORMS.map((p) => p.slug))

// Valida o body de criação/edição de case. Retorna a mensagem de erro em
// PT-BR ou null se válido.
export function validateCaseBody(body) {
  const { title, slug, desc, meta, coverAlt, status, tags, platforms, results } = body
  if (!title?.trim() || !slug?.trim() || !desc?.trim()) {
    return 'Preencha título, slug e descrição.'
  }
  if (!SLUG_RE.test(slug)) {
    return 'Slug inválido: use apenas letras minúsculas, números e hífens.'
  }
  if (status !== 'draft' && status !== 'published') {
    return 'Status inválido.'
  }
  if (meta != null && (typeof meta !== 'string' || meta.length > 160)) {
    return 'Linha de contexto inválida (máx. 160 caracteres).'
  }
  if (coverAlt != null && (typeof coverAlt !== 'string' || coverAlt.length > 220)) {
    return 'Texto alternativo inválido.'
  }
  if (tags != null) {
    const valid =
      Array.isArray(tags) &&
      tags.length <= 12 &&
      tags.every((tag) => typeof tag === 'string' && SLUG_RE.test(tag))
    if (!valid) return 'Tags inválidas.'
  }
  if (platforms != null) {
    const valid = Array.isArray(platforms) && platforms.every((p) => PLATFORM_SLUGS.has(p))
    if (!valid) return 'Plataformas inválidas.'
  }
  if (results != null) {
    const valid =
      Array.isArray(results) &&
      results.length <= 4 &&
      results.every(
        (r) =>
          r &&
          typeof r.value === 'string' &&
          typeof r.label === 'string' &&
          r.value.trim() &&
          r.label.trim() &&
          r.value.length <= 20 &&
          r.label.length <= 60
      )
    if (!valid) return 'Resultados inválidos: preencha valor e rótulo de cada linha (máx. 4).'
  }
  return null
}
