import { ORIGENS, isOrigem } from '@/lib/leads/origens'
import { cnpjValido, normalizarCnpj } from '@/lib/cnpj'

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

  const { origem, nome, empresa, cnpj, email, whatsapp, dados } = body

  if (!isOrigem(origem)) return 'Origem inválida.'

  // Origem marcada com `semNome` não pede nome ao visitante (o diagnóstico
  // captura só o e-mail). Quando o campo vem, ainda passa pelo teto de tamanho.
  if (!ORIGENS[origem].semNome) {
    if (!nome?.trim()) return 'Informe o nome.'
  }
  if (nome != null && invalido(nome, MAX_CURTO)) return 'Nome inválido.'

  for (const [campo, valor] of [
    ['Empresa', empresa],
    ['WhatsApp', whatsapp],
  ]) {
    if (valor != null && invalido(valor, MAX_CURTO)) return `${campo} inválido.`
  }

  // Opcional em toda origem; quando vem, precisa ser um CNPJ inteiro e com os
  // verificadores certos — meio CNPJ não serve ao comercial para nada.
  if (cnpj != null) {
    if (invalido(cnpj, MAX_CURTO)) return 'CNPJ inválido.'
    if (normalizarCnpj(cnpj) && !cnpjValido(cnpj)) return 'CNPJ inválido.'
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
