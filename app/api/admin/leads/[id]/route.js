import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { deleteLead, updateLeadStatus } from '@/lib/leads/leads'
import { isStatusLead } from '@/lib/leads/origens'

export const runtime = 'nodejs'

export async function PATCH(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  if (!isStatusLead(body.status)) {
    return NextResponse.json({ error: 'Status inválido.' }, { status: 400 })
  }

  const result = await updateLeadStatus(id, body.status)
  if (!result) {
    return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ id })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const result = await deleteLead(id)
  if (!result) {
    return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
