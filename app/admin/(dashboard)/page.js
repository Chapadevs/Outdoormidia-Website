import Link from 'next/link'

export const metadata = {
  title: 'Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export default function AdminDashboardPage() {
  return (
    <section className="py-[110px] max-mob:py-[72px]">
      <div className="wrap">
        <div className="eyebrow">
          <b>Área restrita</b>
        </div>
        <h1 className="display mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
          Painel
          <br />
          administrativo.
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
          Gerencie os conteúdos do site. Leads, cases e demais áreas chegam em breve.
        </p>
        <div className="mt-9">
          <Link href="/admin/blog" className="btn btn-fill">
            Gerenciar blog
          </Link>
        </div>
      </div>
    </section>
  )
}
