import Link from 'next/link'
import HeaderShell from '@/components/layout/HeaderShell'
import AdminLoginForm from '@/components/forms/AdminLoginForm'

export const metadata = {
  title: 'Entrar — Painel Outdoormídia',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper">
      <HeaderShell>
        <Link href="/" className="btn btn-ghost ml-auto">
          ← Voltar ao site
        </Link>
      </HeaderShell>

      <section className="py-[110px] max-mob:py-[72px]">
        <div className="wrap flex justify-center">
          <div className="w-full max-w-[440px]">
            <div className="eyebrow">
              <b>Área restrita</b>
            </div>
            <h1 className="display mt-[18px] text-[clamp(40px,6vw,64px)] text-ink">
              Entrar.
            </h1>
            <p className="mb-8 mt-5 text-lg text-ink-soft">
              Acesso exclusivo à equipe Outdoormídia.
            </p>
            <AdminLoginForm />
          </div>
        </div>
      </section>
    </div>
  )
}
