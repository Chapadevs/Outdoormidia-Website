// Escolha do visitante no aviso de cookies, guardada no navegador. É o que
// decide se o Google Analytics carrega (components/widgets/Analytics.jsx):
// sem 'aceito' gravado, nenhum script de medição entra na página.
//
// A chave antiga (om-aviso-cookies = '1', do aviso que só tinha "Entendi")
// vale como aviso já lido, mas nunca como consentimento: quem fechou aquele
// aviso leu que o site não rastreava, e essa leitura não autoriza medição.

const CHAVE = 'om-consentimento'
const CHAVE_ANTIGA = 'om-aviso-cookies'

export const ACEITO = 'aceito'
export const RECUSADO = 'recusado'

const ouvintes = new Set()

export function assinarConsentimento(onChange) {
  ouvintes.add(onChange)
  return () => ouvintes.delete(onChange)
}

// null = ainda não escolheu (o aviso precisa aparecer).
export function lerConsentimento() {
  try {
    const valor = localStorage.getItem(CHAVE)
    if (valor === ACEITO || valor === RECUSADO) return valor
    if (localStorage.getItem(CHAVE_ANTIGA)) return RECUSADO
    return null
  } catch {
    return null
  }
}

export function gravarConsentimento(valor) {
  try {
    localStorage.setItem(CHAVE, valor)
    localStorage.removeItem(CHAVE_ANTIGA)
  } catch {}
  ouvintes.forEach((onChange) => onChange())
}
