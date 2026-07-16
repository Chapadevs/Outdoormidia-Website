import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import { PLATFORMS } from '@/lib/platforms'

const DESCRIPTION =
  'Conheça as 9 plataformas de mídia exterior da Outdoormídia: do outdoor digital ao MUB, cobrindo Paraná e Santa Catarina.'

export const metadata = {
  title: 'Plataformas — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/plataformas' },
  openGraph: {
    title: 'Plataformas — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function PlataformasPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Plataformas' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Catálogo · 9 plataformas</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Plataformas.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Nenhuma campanha se resolve com um formato só. São 9 plataformas que se combinam
              conforme o público que você quer alcançar — do LED de alta circulação ao mobiliário
              urbano de bairro, cobrindo Paraná e Santa Catarina.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Catálogo" className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
              {PLATFORMS.map((p) => (
                <Link
                  className="group reveal flex scroll-mt-24 flex-col border border-line bg-white p-6 transition-colors duration-200 hover:border-orange max-mob:p-5"
                  href={`/plataformas/${p.slug}`}
                  key={p.slug}
                  id={p.slug}
                >
                  <div className="ticks flex aspect-[16/10] items-center justify-center border border-line bg-bone">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                      {p.name}
                    </span>
                  </div>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-display text-[15px] text-orange">{p.num}</span>
                    <h2 className="m-0 text-[21px] font-extrabold leading-none tracking-[-0.01em] transition-colors duration-200 group-hover:text-orange">
                      {p.name}
                    </h2>
                  </div>
                  <p className="eyebrow mt-3">{p.desc}</p>
                  <p className="m-0 mt-4 text-[14.5px] leading-relaxed text-ink-soft">{p.intro}</p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    Ver plataforma
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
