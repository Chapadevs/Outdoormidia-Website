import { MERCADOOH_WHATSAPP_URL, WHATSAPP_URL, WHATSAPP_URL_SC } from '@/lib/constants'

export function waLink(mensagem) {
  return mensagem ? `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}` : WHATSAPP_URL
}

export function waLinkSc(mensagem) {
  return mensagem ? `${WHATSAPP_URL_SC}?text=${encodeURIComponent(mensagem)}` : WHATSAPP_URL_SC
}

// A praça escolhida decide qual comercial atende o lead. Aceita uma praça ou
// a lista do qualificador, que é de seleção múltipla: só vai para SC quando
// tudo o que foi marcado é de Santa Catarina.
const PRACAS_SC = ['Santa Catarina', 'Joinville', 'Itajaí e Balneário Camboriú']

export function waLinkPorPraca(praca, mensagem) {
  const escolhidas = [].concat(praca ?? []).filter(Boolean)
  const soSc = escolhidas.length > 0 && escolhidas.every((p) => PRACAS_SC.includes(p))
  return soSc ? waLinkSc(mensagem) : waLink(mensagem)
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

// TODO(cliente): as duas portas abaixo, previstas no documento de copy, ainda
// não têm destino próprio. "Mídia programática" cai no WhatsApp da MercadoOOH,
// como o "Anunciar já", e "Atendimento agora" cai no comercial. Confirmar se
// existe uma plataforma de espaços disponíveis e um atendimento automatizado.
export const WA_PROGRAMATICA = [
  'Olá! Quero ver os espaços disponíveis para compra de mídia exterior.',
  'Cidade/região de interesse: ',
  'Período da campanha: ',
].join('\n')

export const WA_ATENDIMENTO_AGORA =
  'Olá! Quero atendimento agora sobre anunciar com a Outdoormídia.'

export const WA_SOLUCOES = [
  'Olá! Estava vendo as soluções da Outdoormídia e quero ajuda para escolher.',
  'O que quero anunciar: ',
  'Cidade/região de interesse: ',
].join('\n')

export const WA_ANUNCIANTE =
  'Olá! Usei as ferramentas da área do anunciante no site e quero falar com um especialista.'

export const WA_GOVERNANCA = [
  'Olá! Vim da página de Governança e preciso de um documento para cadastro de fornecedor.',
  'Empresa: ',
  'Documento que preciso: ',
].join('\n')

export const WA_ICONICOS = [
  'Olá! Vi os projetos icônicos no site e quero avaliar um projeto sob medida para a minha marca.',
  'Empresa: ',
  'Região onde quero aparecer: ',
].join('\n')

// Fallback da tela de confirmação: quem chega em /obrigado sem o briefing
// guardado (recarregou a página ou abriu a URL direto) cai nesta mensagem.
export const WA_OBRIGADO =
  'Olá! Acabei de enviar uma solicitação pelo site da Outdoormídia e quero adiantar a conversa.'

export const WA_404 = [
  'Olá! Estava procurando uma coisa no site da Outdoormídia e não encontrei.',
  'O que eu procurava: ',
].join('\n')

export function waDiferencial(diferencial) {
  return [
    `Olá! Vim da página de ${diferencial} no site e quero entender como isso funciona na prática.`,
    'Empresa: ',
    'Cidade onde quero aparecer: ',
  ].join('\n')
}

export function waIconico(projeto) {
  return [
    `Olá! Vim da página do projeto ${projeto} no site e quero avaliar a viabilidade para a minha marca.`,
    'Empresa: ',
    'Endereço ou praça de interesse: ',
  ].join('\n')
}

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

// Os dois CTAs do resultado do diagnóstico. O de fim de página leva a nota e o
// degrau; o do ponto frágil leva a pergunta de menor nota, que é o que diz ao
// comercial por onde a conversa começa.
export function waDiagnostico(score, total, degrau) {
  return `Olá! Fiz o diagnóstico de presença no site. Minha nota foi ${score}/${total}, no ${degrau}. Quero um plano de mídia exterior a partir desse resultado.`
}

export function waDiagnosticoFragil(degrau, pergunta) {
  return [
    `Olá! Fiz o diagnóstico de presença no site e fiquei no ${degrau}.`,
    `Meu ponto mais frágil foi "${pergunta}".`,
    'Quero falar com um especialista sobre como resolver isso.',
  ].join('\n')
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

export function waQualificador({
  intencao,
  objetivo,
  praca,
  periodo,
  segmento,
  nome,
  empresa,
  email,
  celular,
  contato,
  verba,
}) {
  return [
    'Olá! Respondi as perguntas do site e quero uma sugestão de campanha.',
    linhas([
      ['Momento', intencao],
      ['Objetivo', objetivo],
      ['Praça', praca],
      ['Período', periodo],
      ['Segmento', segmento],
      ['Nome', nome],
      ['Empresa', empresa],
      ['E-mail', email],
      ['Celular', celular],
      ['Prefere contato por', contato],
      ['Investimento previsto', verba],
    ]),
  ].join('\n')
}
