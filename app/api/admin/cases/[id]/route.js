import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { deleteCase, isCaseSlugTaken, updateCase } from '@/lib/cases/cases'
import { validateCaseBody } from '@/lib/cases/validate'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const invalid = validateCaseBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  if (await isCaseSlugTaken(body.slug, id)) {
    return NextResponse.json({ error: 'Já existe um case com esse slug.' }, { status: 409 })
  }

  const result = await updateCase(id, body)
  if (!result) {
    return NextResponse.json({ error: 'Case não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ id })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const result = await deleteCase(id)
  if (!result) {
    return NextResponse.json({ error: 'Case não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
