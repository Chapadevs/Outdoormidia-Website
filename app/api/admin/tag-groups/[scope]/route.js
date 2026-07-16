import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { isTagScope } from '@/lib/tags/scopes'
import { createTagGroup } from '@/lib/tags/groups'
import { validateTagGroupBody } from '@/lib/tags/validate'

export const runtime = 'nodejs'

export async function POST(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { scope } = await params
  if (!isTagScope(scope)) {
    return NextResponse.json({ error: 'Escopo inválido.' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const invalid = validateTagGroupBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const slug = await createTagGroup(scope, body)
  if (!slug) {
    return NextResponse.json({ error: 'Já existe um grupo com esse nome neste escopo.' }, { status: 409 })
  }

  return NextResponse.json({ slug }, { status: 201 })
}
