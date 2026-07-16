import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/api/adminGuard'
import { deleteLocation, updateLocation, validateLocationBody } from '@/lib/locations'

export const runtime = 'nodejs'

export async function PUT(request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const invalid = validateLocationBody(body)
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 })
  }

  const result = await updateLocation(id, body)
  if (!result) {
    return NextResponse.json({ error: 'Localidade não encontrada.' }, { status: 404 })
  }

  revalidatePath('/')
  return NextResponse.json({ id })
}

export async function DELETE(_request, { params }) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const { id } = await params
  const result = await deleteLocation(id)
  if (!result) {
    return NextResponse.json({ error: 'Localidade não encontrada.' }, { status: 404 })
  }

  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
