export const TAG_SCOPES = [
  {
    id: 'blog',
    label: 'Blog',
    desc: 'Classificam os posts e suas imagens. Aparecem nos cards do blog e na página de cada artigo.',
  },
  {
    id: 'cases',
    label: 'Cases',
    desc: 'Classificam os cases de clientes por segmento, plataforma e objetivo de campanha.',
  },
  {
    id: 'localidades',
    label: 'Localidades',
    desc: 'Classificam as praças e regiões de cobertura no Paraná e em Santa Catarina.',
  },
]

export function isTagScope(scope) {
  return TAG_SCOPES.some((s) => s.id === scope)
}

export function getScope(scope) {
  return TAG_SCOPES.find((s) => s.id === scope) || null
}

export function scopedDocId(scope, slug) {
  return `${scope}__${slug}`
}
