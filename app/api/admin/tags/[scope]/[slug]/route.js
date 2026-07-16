import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { isTagScope } from '@/lib/tags/scopes'
import { deleteTag, updateTag } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'
import { validateTagBody } from '@/lib/tags/validate'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { scope, slug } = await params
  if (!isTagScope(scope)) {
    return NextResponse.json({ error: 'Escopo inválido.' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const groups = await listTagGroups(scope)
  const invalid = validateTagBody(body, groups)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const result = await updateTag(scope, slug, body)
  if (!result) {
    return NextResponse.json({ error: 'Tag não encontrada.' }, { status: 404 })
  }

  return NextResponse.json({ slug })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { scope, slug } = await params
  if (!isTagScope(scope)) {
    return NextResponse.json({ error: 'Escopo inválido.' }, { status: 404 })
  }

  const result = await deleteTag(scope, slug)
  if (!result) {
    return NextResponse.json({ error: 'Tag não encontrada.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
