import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { deletePost, isSlugTaken, updatePost } from '@/lib/blog/posts'
import { validatePostBody } from '@/lib/blog/validate'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const invalid = validatePostBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  if (await isSlugTaken(body.slug, id)) {
    return NextResponse.json({ error: 'Já existe um post com esse slug.' }, { status: 409 })
  }

  const result = await updatePost(id, body)
  if (!result) {
    return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ id })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const result = await deletePost(id)
  if (!result) {
    return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
