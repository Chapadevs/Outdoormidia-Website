import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { deleteTag, updateTag } from '@/lib/blog/tags'
import { validateTagBody } from '@/lib/blog/validate'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { slug } = await params
  const body = await request.json().catch(() => ({}))
  const invalid = validateTagBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const result = await updateTag(slug, body)
  if (!result) {
    return NextResponse.json({ error: 'Tag não encontrada.' }, { status: 404 })
  }

  return NextResponse.json({ slug })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { slug } = await params
  const result = await deleteTag(slug)
  if (!result) {
    return NextResponse.json({ error: 'Tag não encontrada.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
