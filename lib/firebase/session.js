import { adminAuth } from '@/lib/firebase/admin'

export const SESSION_COOKIE = '__session'
export const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000 // 5 dias

export async function createSessionCookie(idToken) {
  return adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS })
}

// Retorna as claims decodificadas se a sessão for válida E o usuário for admin;
// caso contrário, null.
export async function verifyAdminSession(sessionCookie) {
  if (!sessionCookie) return null
  try {
    const claims = await adminAuth.verifySessionCookie(sessionCookie, true)
    return claims.admin === true ? claims : null
  } catch {
    return null
  }
}
