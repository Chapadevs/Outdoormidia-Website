import { EMPRESA } from '@/lib/empresa'

export const WHATSAPP_URL = 'https://wa.me/5541998350210'

// TODO(cliente): número do comercial de Santa Catarina. Enquanto não vier,
// cai no comercial de Curitiba.
export const WHATSAPP_URL_SC = WHATSAPP_URL

export const MERCADOOH_WHATSAPP_URL = 'https://wa.me/551153049282'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://outdoormidia.com.br'

// Assunto fixo para o RH filtrar a caixa. Usado no próprio TalentForm e na tela
// de confirmação de /obrigado.
export const MAILTO_RH = `mailto:${EMPRESA.email}?subject=${encodeURIComponent(
  'Candidatura — Banco de Talentos'
)}`

// Ponte entre o ProposalForm e /obrigado. O briefing atravessa a navegação pelo
// sessionStorage, e não pela query string: nome, empresa e praça na URL
// entrariam no histórico do navegador e no relatório de analytics.
export const CHAVE_BRIEFING = 'om-briefing'
