import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { isTagScope } from '@/lib/tags/scopes'
import { deleteTagGroup, updateTagGroup } from '@/lib/tags/groups'
import { validateTagGroupBody } from '@/lib/tags/validate'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { scope, slug } = await params
  if (!isTagScope(scope)) {
    return NextResponse.json({ error: 'Escopo inválido.' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const invalid = validateTagGroupBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const result = await updateTagGroup(scope, slug, body)
  if (!result) {
    return NextResponse.json({ error: 'Grupo não encontrado.' }, { status: 404 })
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

  const result = await deleteTagGroup(scope, slug)
  if (!result) {
    return NextResponse.json({ error: 'Grupo não encontrado.' }, { status: 404 })
  }
  if (result.error === 'has-tags') {
    return NextResponse.json(
      {
        error: `Este grupo tem ${result.count} tag(s). Mova ou exclua as tags antes de excluir o grupo.`,
      },
      { status: 409 }
    )
  }

  return NextResponse.json({ ok: true })
}
