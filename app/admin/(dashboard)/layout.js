import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import HeaderShell from '@/components/layout/HeaderShell'
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
      <HeaderShell>
        <span className="eyebrow max-mob:hidden">
          Painel <b>Admin</b>
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-ink-soft max-mob:hidden">{claims.email}</span>
          <LogoutButton />
        </div>
      </HeaderShell>
      <main>{children}</main>
    </div>
  )
}
