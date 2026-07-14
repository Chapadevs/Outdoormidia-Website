import { NextResponse } from 'next/server'

const SESSION_COOKIE = '__session'

// Checagem rápida de presença do cookie (Edge runtime não roda firebase-admin).
// A verificação real da sessão + claim admin acontece em app/admin/(dashboard)/layout.js.
export function proxy(request) {
  const hasSession = request.cookies.has(SESSION_COOKIE)
  if (!hasSession) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
}
