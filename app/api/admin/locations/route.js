import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/api/adminGuard'
import { createLocation, validateLocationBody } from '@/lib/locations'

export const runtime = 'nodejs'

export async function POST(request) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const body = await request.json().catch(() => ({}))
  const invalid = validateLocationBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const id = await createLocation(body)
  revalidatePath('/')

  return NextResponse.json({ id }, { status: 201 })
}
