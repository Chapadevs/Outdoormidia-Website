import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { createPost, isSlugTaken } from '@/lib/blog/posts'
import { validatePostBody } from '@/lib/blog/validate'

export const runtime = 'nodejs'

export async function POST(request) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const body = await request.json().catch(() => ({}))
  const invalid = validatePostBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  if (await isSlugTaken(body.slug)) {
    return NextResponse.json({ error: 'Já existe um post com esse slug.' }, { status: 409 })
  }

  const id = await createPost(body)

  return NextResponse.json({ id }, { status: 201 })
}
