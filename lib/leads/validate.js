import { ORIGENS, isOrigem } from '@/lib/leads/origens'

// Tetos generosos para o visitante e apertados para quem tenta usar a rota
// como depósito: este é o único POST público do site.
const MAX_CURTO = 200
const MAX_LONGO = 1000

function invalido(valor, maximo) {
  return typeof valor !== 'string' || valor.length > maximo
}

// Valida o body do POST público de lead. Retorna a mensagem de erro em PT-BR
// ou null se válido.
export function validateLeadBody(body) {
  if (!body || typeof body !== 'object') return 'Envio inválido.'

  const { origem, nome, empresa, email, whatsapp, dados } = body

  if (!isOrigem(origem)) return 'Origem inválida.'
  if (!nome?.trim()) return 'Informe o nome.'
  if (invalido(nome, MAX_CURTO)) return 'Nome inválido.'

  for (const [campo, valor] of [
    ['Empresa', empresa],
    ['WhatsApp', whatsapp],
  ]) {
    if (valor != null && invalido(valor, MAX_CURTO)) return `${campo} inválido.`
  }

  if (email != null) {
    if (invalido(email, MAX_CURTO)) return 'E-mail inválido.'
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'E-mail inválido.'
    }
  }

  if (dados != null) {
    if (typeof dados !== 'object' || Array.isArray(dados)) return 'Respostas inválidas.'
    const permitidos = new Map(ORIGENS[origem].campos.map((c) => [c.key, c.longo]))
    for (const [key, valor] of Object.entries(dados)) {
      if (!permitidos.has(key)) return 'Respostas inválidas.'
      if (invalido(valor, permitidos.get(key) ? MAX_LONGO : MAX_CURTO)) {
        return 'Respostas inválidas.'
      }
    }
  }

  return null
}
