import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import LeadCta from '@/components/sections/LeadCta'
import { ICONICOS } from '@/lib/iconicos'
import { WA_ICONICOS, waLink } from '@/lib/whatsapp'

const CARD_SIZES = '(max-width: 560px) 100vw, (max-width: 980px) 50vw, 400px'

const DESCRIPTION =
  'Elegancy, Green e Regenerativo: os projetos icônicos da Outdoormídia — estruturas de assinatura desenhadas ponto a ponto, fora do catálogo de plataformas.'

export const metadata = {
  title: 'Projetos Icônicos — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/plataformas/projetos-iconicos' },
  openGraph: {
    title: 'Projetos Icônicos — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ProjetosIconicosPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/plataformas' }, { label: 'Projetos Icônicos' }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">Assinatura · 3 projetos</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  Projetos Icônicos.
                </h1>
                <p className="reveal mt-6 max-w-[58ch] text-lg text-ink-soft">
                  Nem toda mídia cabe num catálogo. São três linhas de projeto sob medida —
                  desenhadas ponto a ponto, com estrutura própria e fluxo comercial que começa no
                  briefing, não na tabela.
                </p>
                <a className="btn btn-fill reveal mt-8" href={waLink(WA_ICONICOS)}>
                  Falar sobre um projeto
                </a>
              </div>
              <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <p className="m-0 text-[15px] leading-relaxed text-ink-soft">
                  A diferença para as 7 plataformas do catálogo é o ponto de partida: aqui a
                  estrutura nasce do endereço. Cada projeto passa por briefing, estudo de
                  viabilidade e desenho antes de existir na rua.
                </p>
                <p className="eyebrow mt-5">Briefing → viabilidade → estrutura</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <SectionHeading num="01" title="Os três projetos" className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
              {ICONICOS.map((iconico) => (
                <article
                  className="group reveal flex flex-col rounded-[16px] border border-line bg-white p-6 transition-colors duration-200 hover:border-orange max-mob:p-5"
                  key={iconico.slug}
                >
                  <CoverMedia
                    src={iconico.image}
                    alt={iconico.name}
                    label={iconico.name}
                    sizes={CARD_SIZES}
                  />
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-display text-[15px] text-orange">{iconico.num}</span>
                    <h3 className="m-0 text-[21px] font-extrabold leading-none tracking-[-0.01em] transition-colors duration-200 group-hover:text-orange">
                      <Link href={iconico.href}>{iconico.name}</Link>
                    </h3>
                  </div>
                  <p className="eyebrow mt-3">{iconico.tagline}</p>
                  <p className="m-0 mt-4 text-[14.5px] leading-relaxed text-ink-soft">
                    {iconico.short}
                  </p>
                  {iconico.linhas.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {iconico.linhas.map((linha) => (
                        <Link
                          className="rounded-full border border-line px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-ink-soft transition-colors duration-200 hover:border-orange hover:text-orange"
                          href={`${iconico.href}#${linha.slug}`}
                          key={linha.slug}
                        >
                          {linha.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:text-orange"
                    href={iconico.href}
                  >
                    Ver projeto
                    <span aria-hidden className="text-base">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <SectionHeading num="02" title="Procurando o catálogo?" className="reveal mb-[34px]" />
            <div className="reveal flex items-end justify-between gap-8 max-mob:flex-col max-mob:items-start max-mob:gap-5">
              <p className="m-0 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                Para campanhas com formato, praça e período definidos, o caminho são as 7
                plataformas de mídia exterior — do outdoor digital ao MUB, com disponibilidade e
                estimativa imediatas.
              </p>
              <Link className="btn btn-ghost shrink-0" href="/plataformas">
                Ver as plataformas →
              </Link>
            </div>
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
