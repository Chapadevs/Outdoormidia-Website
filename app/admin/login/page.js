import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import AdminLoginForm from '@/components/forms/AdminLoginForm'

export const metadata = {
  title: 'Entrar — Painel Outdoormídia',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-[60] border-b border-line bg-paper/85 backdrop-blur-[10px]">
        <div className="wrap flex h-[74px] items-center gap-[30px] max-mob:h-16 max-mob:gap-4">
          <Logo />
          <div className="ml-auto flex items-center">
            <Link href="/" className="btn">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </header>

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
