import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const SESSION_COOKIE = '__session'

const trataLocale = createMiddleware(routing)

// Duas responsabilidades no mesmo hook, porque o Next só permite um.
//
// O admin é resolvido primeiro e sai antes de encostar no next-intl: ele vive
// fora do segmento [locale] e não pode ganhar prefixo de idioma, senão /admin
// viraria /pt/admin e sumiria. Todo o resto é rota pública e vai para o
// middleware de locale.
export function proxy(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    // O login é a única rota do admin aberta: é onde quem não tem sessão cai.
    if (pathname === '/admin/login') return NextResponse.next()

    // Checagem rápida de presença do cookie (Edge runtime não roda
    // firebase-admin). A verificação real da sessão + claim admin acontece em
    // app/(admin)/admin/(dashboard)/layout.js.
    if (!request.cookies.has(SESSION_COOKIE)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  return trataLocale(request)
}

// O `.*\..*` exclui tudo que tem extensão, o que cobre /media/* (que tem header
// de cache próprio), o conteúdo de /public e os arquivos gerados na raiz
// (sitemap.xml, robots.txt, llms.txt) — nenhum deles pode ganhar prefixo de
// idioma.
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
