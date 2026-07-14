import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { createTag } from '@/lib/blog/tags'
import { validateTagBody } from '@/lib/blog/validate'

export const runtime = 'nodejs'

export async function POST(request) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const body = await request.json().catch(() => ({}))
  const invalid = validateTagBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const slug = await createTag(body)
  if (!slug) {
    return NextResponse.json({ error: 'Já existe uma tag com esse nome.' }, { status: 409 })
  }

  return NextResponse.json({ slug }, { status: 201 })
}
