import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'
import {
  createSessionCookie,
  SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
} from '@/lib/firebase/session'

export const runtime = 'nodejs'

export async function POST(request) {
  const { idToken } = await request.json().catch(() => ({}))
  if (!idToken) {
    return NextResponse.json({ error: 'idToken ausente' }, { status: 400 })
  }

  const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null)
  if (!decoded) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
  if (decoded.admin !== true) {
    return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 })
  }

  const sessionCookie = await createSessionCookie(idToken)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_MS / 1000,
  })

  return NextResponse.json({ status: 'ok' })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  return NextResponse.json({ status: 'ok' })
}
