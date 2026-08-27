import { EMPRESA } from '@/lib/empresa'

export const WHATSAPP_URL = 'https://wa.me/5541998350210'

// TODO(cliente): número do comercial de Santa Catarina. Enquanto não vier,
// cai no comercial de Curitiba.
export const WHATSAPP_URL_SC = WHATSAPP_URL

export const MERCADOOH_WHATSAPP_URL = 'https://wa.me/551153049282'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoormidia.com.br'

// Assunto fixo para o RH filtrar a caixa. Usado na alternativa ao cadastro em
// /trabalhe-conosco e na tela de confirmação de /obrigado.
export const MAILTO_RH = `mailto:${EMPRESA.emailRh}?subject=${encodeURIComponent(
  'Candidatura para o Banco de Talentos'
)}`

// Banco de talentos. O cadastro deixou de ser formulário no site em 25/08/2026:
// as respostas caem direto no Drive do cliente e o RH gerencia sem depender de
// terceiro. As áreas de atuação vivem dentro do formulário, não na página.
export const TALENTOS_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd0QWbQEogRuqDg5wwOApyeP4pf5xacy46VE7-HkpNm0Vdi1A/viewform'

// Ponte entre o ProposalForm e /obrigado. O briefing atravessa a navegação pelo
// sessionStorage, e não pela query string: nome, empresa e praça na URL
// entrariam no histórico do navegador e no relatório de analytics.
export const CHAVE_BRIEFING = 'om-briefing'
