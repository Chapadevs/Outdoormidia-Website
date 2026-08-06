import { WHATSAPP_URL } from '@/lib/constants'

export function waLink(mensagem) {
  return mensagem ? `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}` : WHATSAPP_URL
}

function linhas(pares) {
  return pares
    .filter(([, valor]) => valor)
    .map(([rotulo, valor]) => `${rotulo}: ${valor}`)
    .join('\n')
}

export const WA_FLUTUANTE = 'Olá! Vim pelo site da Outdoormídia e quero falar com o time comercial.'

export const WA_HEADER =
  'Olá! Quero falar agora com o comercial da Outdoormídia sobre anunciar em mídia exterior.'

export const WA_COBERTURA = [
  'Olá! Quero consultar disponibilidade de pontos.',
  'Cidade/região de interesse: ',
  'Período da campanha: ',
].join('\n')

export const WA_LEAD_CTA = [
  'Olá! Quero uma sugestão de campanha.',
  '1) Primeira campanha em mídia exterior: ',
  '2) Cidade onde quero aparecer: ',
  '3) Empresa / CNPJ: ',
].join('\n')

export function waFaqHome(pergunta) {
  return pergunta
    ? `Olá! Vim pelo FAQ do site e fiquei com uma dúvida sobre "${pergunta}".`
    : 'Olá! Vim pelo FAQ do site e fiquei com uma dúvida que não encontrei por lá.'
}

export function waFaqPlataforma(plataforma, pergunta) {
  return pergunta
    ? `Olá! Estava no FAQ de ${plataforma} no site e fiquei com uma dúvida sobre "${pergunta}".`
    : `Olá! Estava vendo ${plataforma} no site e fiquei com uma dúvida.`
}

export function waDiagnostico(score, total, faixa) {
  return `Olá! Fiz o diagnóstico de marca no site. Minha nota foi ${score}/${total} — ${faixa}. Quero um plano de mídia exterior a partir desse resultado.`
}

export function waBriefing({ nome, empresa, cidade, formato, periodo }) {
  return [
    'Olá! Acabei de enviar o briefing pelo site e quero adiantar a conversa.',
    linhas([
      ['Nome', nome],
      ['Empresa', empresa],
      ['Praça', cidade],
      ['Formato', formato],
      ['Período', periodo],
    ]),
  ].join('\n')
}

export function waBriefingPlataforma(plataforma, { nome, empresa, cidade, periodo }) {
  return [
    `Olá! Acabei de enviar o briefing de ${plataforma} pelo site e quero adiantar a conversa.`,
    linhas([
      ['Nome', nome],
      ['Empresa', empresa],
      ['Praça', cidade],
      ['Período', periodo],
    ]),
  ].join('\n')
}
