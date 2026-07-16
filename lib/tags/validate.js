export function validateTagBody(body, groups) {
  const { name, group } = body
  if (!name?.trim()) {
    return 'Informe o nome da tag.'
  }
  if (!groups.some((g) => g.slug === group)) {
    return 'Grupo inválido.'
  }
  return null
}

export function validateTagGroupBody(body) {
  const { label } = body
  if (!label?.trim()) {
    return 'Informe o nome do grupo.'
  }
  if (label.trim().length > 60) {
    return 'O nome do grupo deve ter no máximo 60 caracteres.'
  }
  return null
}
