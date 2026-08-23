// Gravação do lead a partir do browser. Nunca lança: o fluxo do visitante
// (abrir o WhatsApp, ir para /obrigado) não pode depender da rede. Se o POST
// falhar, o lead se perde exatamente como se perdia antes — mas a tela segue.
export async function enviarLead(payload) {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
