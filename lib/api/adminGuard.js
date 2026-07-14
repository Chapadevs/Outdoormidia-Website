import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE, verifyAdminSession } from '@/lib/firebase/session'

// Retorna { claims } se a sessão for de um admin válido; caso contrário,
// { response } com 401 pronto para ser devolvido pela rota.
export async function requireAdmin() {
  const cookieStore = await cookies()
  const claims = await verifyAdminSession(cookieStore.get(SESSION_COOKIE)?.value)
  if (!claims) {
    return { response: NextResponse.json({ error: 'Não autorizado.' }, { status: 401 }) }
  }
  return { claims }
}
