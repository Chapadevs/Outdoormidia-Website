import { NextResponse } from 'next/server'
import { createLead } from '@/lib/leads/leads'
import { validateLeadBody } from '@/lib/leads/validate'

export const runtime = 'nodejs'

// Único POST público do site — todas as outras escritas vivem sob /api/admin
// com requireAdmin(). Sem rate limit local de propósito: o Cloud Run escala
// horizontalmente e um contador em memória não seguraria nada. Se o spam
// aparecer, o caminho é App Check / reCAPTCHA, não código aqui.
const MAX_BODY = 8 * 1024

export async function POST(request) {
  const bruto = await request.text().catch(() => '')
  if (bruto.length > MAX_BODY) {
    return NextResponse.json({ error: 'Envio muito grande.' }, { status: 413 })
  }

  let body
  try {
    body = JSON.parse(bruto)
  } catch {
    return NextResponse.json({ error: 'Envio inválido.' }, { status: 400 })
  }

  // Honeypot: campo escondido que só um bot preenche. Responde 201 sem gravar —
  // dizer "recusado" ensinaria o robô a contornar.
  if (body?.website) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const invalid = validateLeadBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const id = await createLead(body)

  return NextResponse.json({ id }, { status: 201 })
}
