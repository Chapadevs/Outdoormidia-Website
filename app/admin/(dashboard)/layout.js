import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import LogoutButton from '@/components/widgets/LogoutButton'
import { SESSION_COOKIE, verifyAdminSession } from '@/lib/firebase/session'

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies()
  const claims = await verifyAdminSession(cookieStore.get(SESSION_COOKIE)?.value)

  if (!claims) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-[60] border-b border-line bg-paper/85 backdrop-blur-[10px]">
        <div className="wrap flex h-[74px] items-center gap-[30px] max-mob:h-16 max-mob:gap-4">
          <Logo />
          <span className="eyebrow max-mob:hidden">
            Painel <b>Admin</b>
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-ink-soft max-mob:hidden">{claims.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
