import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { createCase, isCaseSlugTaken } from '@/lib/cases/cases'
import { validateCaseBody } from '@/lib/cases/validate'

export const runtime = 'nodejs'

export async function POST(request) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const body = await request.json().catch(() => ({}))
  const invalid = validateCaseBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  if (await isCaseSlugTaken(body.slug)) {
    return NextResponse.json({ error: 'Já existe um case com esse slug.' }, { status: 409 })
  }

  const id = await createCase(body)

  return NextResponse.json({ id }, { status: 201 })
}
