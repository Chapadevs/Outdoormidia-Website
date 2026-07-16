import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { isTagScope } from '@/lib/tags/scopes'
import { createTag } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'
import { validateTagBody } from '@/lib/tags/validate'

export const runtime = 'nodejs'

export async function POST(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { scope } = await params
  if (!isTagScope(scope)) {
    return NextResponse.json({ error: 'Escopo inválido.' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const groups = await listTagGroups(scope)
  const invalid = validateTagBody(body, groups)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const slug = await createTag(scope, body)
  if (!slug) {
    return NextResponse.json({ error: 'Já existe uma tag com esse nome neste escopo.' }, { status: 409 })
  }

  return NextResponse.json({ slug }, { status: 201 })
}
