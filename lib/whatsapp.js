import { MERCADOOH_WHATSAPP_URL, WHATSAPP_URL } from '@/lib/constants'

export function waLink(mensagem) {
  return mensagem ? `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}` : WHATSAPP_URL
}

export function waLinkMercadoOoh(mensagem) {
  return mensagem
    ? `${MERCADOOH_WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`
    : MERCADOOH_WHATSAPP_URL
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

export const WA_COBERTURA_CURITIBA = [
  'Olá! Vi que Curitiba tem 13 milhões de impactos por mês e quero entender como aparecer nesse fluxo.',
  'Praça de interesse: ',
  'Período da campanha: ',
].join('\n')

export const WA_ANUNCIAR_JA = [
  'Olá! Quero anunciar em mídia exterior e falar com um especialista agora.',
  'Empresa: ',
  'Cidade onde quero aparecer: ',
].join('\n')

export const WA_SOLUCOES = [
  'Olá! Estava vendo as soluções da Outdoormídia e quero ajuda para escolher.',
  'O que quero anunciar: ',
  'Cidade/região de interesse: ',
].join('\n')

export const WA_ANUNCIANTE =
  'Olá! Usei as ferramentas da área do anunciante no site e quero falar com um especialista.'

export const WA_MIDIA_KIT = [
  'Olá! Quero receber o mídia kit completo da Outdoormídia.',
  'Empresa: ',
  'Material que preciso: ',
].join('\n')

export const WA_SOCIAL = [
  'Olá! Vi a página Social da Outdoormídia e quero propor um projeto.',
  'Instituição / projeto: ',
  'Cidade: ',
  'O que precisamos: ',
].join('\n')

export const WA_GOVERNANCA = [
  'Olá! Vim da página de Governança e preciso de um documento para cadastro de fornecedor.',
  'Empresa: ',
  'Documento que preciso: ',
].join('\n')

export function waFaqPage(pergunta) {
  return pergunta
    ? `Olá! Vim da página de FAQ do site e fiquei com uma dúvida sobre "${pergunta}".`
    : 'Olá! Vim da página de FAQ do site e minha dúvida não estava lá.'
}

export function waSimulador({ praca, plataforma, periodo, impactos }) {
  return [
    'Olá! Simulei uma campanha no site e quero fechar os números com o time.',
    linhas([
      ['Praça', praca],
      ['Plataforma', plataforma],
      ['Período', periodo],
      ['Impactos estimados', impactos],
    ]),
  ].join('\n')
}

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

export function waQualificador({ intencao, objetivo, praca, nome, empresa }) {
  return [
    'Olá! Respondi as perguntas do site e quero uma sugestão de campanha.',
    linhas([
      ['Momento', intencao],
      ['Objetivo', objetivo],
      ['Praça', praca],
      ['Nome', nome],
      ['Empresa', empresa],
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
