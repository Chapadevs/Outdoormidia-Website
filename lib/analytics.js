// Google Analytics 4. O ID vem do ambiente (apphosting.yaml em produção); sem
// ele, nada carrega e registrarEvento é um no-op, então dev e emulador não
// mandam nada para a propriedade do cliente.
//
// Só o gtag global é usado: o script entra por components/widgets/Analytics.jsx
// depois do aceite no aviso de cookies (lib/consentimento.js). Antes do aceite
// window.gtag não existe e os eventos são descartados, que é o comportamento
// esperado de quem recusou.

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Nomes dos eventos que a propriedade marca como conversão.
export const EVENTO_LEAD = 'gerar_lead'
export const EVENTO_WHATSAPP = 'contato_whatsapp'

export function registrarEvento(nome, parametros = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', nome, parametros)
}
