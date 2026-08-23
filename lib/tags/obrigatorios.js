// Grupos que a estrutura do site exige. Existem sempre — mesmo sem documento em
// `tagGroups` — e o admin não pode renomeá-los nem excluí-los: a validação do
// post depende dos slugs. O que o admin cadastra são as tags dentro deles.
const GRUPOS_OBRIGATORIOS = {
  blog: [
    { slug: 'plataforma', label: 'Plataforma' },
    { slug: 'cobertura', label: 'Cobertura' },
    { slug: 'industrias', label: 'Indústrias' },
  ],
}

export function gruposObrigatorios(scope) {
  return GRUPOS_OBRIGATORIOS[scope] ?? []
}

export function isGrupoObrigatorio(scope, slug) {
  return gruposObrigatorios(scope).some((group) => group.slug === slug)
}

// Grupos obrigatórios sem nenhuma tag marcada. `tags` são slugs; `allTags` é a
// lista do escopo, de onde sai o grupo de cada slug.
export function gruposFaltantes(scope, tags, allTags) {
  const grupoPorSlug = new Map(allTags.map((tag) => [tag.slug, tag.group]))
  const marcados = new Set((tags ?? []).map((slug) => grupoPorSlug.get(slug)))
  return gruposObrigatorios(scope).filter((group) => !marcados.has(group.slug))
}
