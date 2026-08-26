import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { DIFERENCIAIS, getDiferencialBySlug, getOutrosDiferenciais } from '@/lib/diferenciais'
import { waDiferencial, waLink } from '@/lib/whatsapp'

const CARD = 'ticks rounded-[16px] border border-line bg-white p-7 max-mob:p-6'

export function generateStaticParams() {
  return DIFERENCIAIS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const diferencial = getDiferencialBySlug(slug)
  if (!diferencial) return { title: 'Diferencial não encontrado | Outdoormídia' }

  const title = `${diferencial.title} | Outdoormídia`
  return {
    title,
    description: diferencial.intro,
    alternates: { canonical: `/solucoes/diferenciais/${diferencial.slug}` },
    openGraph: { title, description: diferencial.intro, locale: 'pt_BR', type: 'website' },
  }
}

export default async function DiferencialPage({ params }) {
  const { slug } = await params
  const diferencial = getDiferencialBySlug(slug)
  if (!diferencial) notFound()

  const { aside, oQueE, prova, aplicacao } = diferencial
  // Diferencial recém-escrito entra sem "A prova" e sem "Aplicação prática":
  // as seções somem em vez de exibirem número que o cliente ainda não confirmou.
  const { comparativo, miniCase } = aplicacao ?? {}
  const outros = getOutrosDiferenciais(slug)
  const numOutros = String(2 + (prova ? 1 : 0) + (aplicacao ? 1 : 0)).padStart(2, '0')

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Soluções', href: '/solucoes' },
            { label: 'Diferenciais', href: '/solucoes/diferenciais' },
            { label: diferencial.title },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-12 max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">
                  Diferencial <b className="text-orange">{diferencial.num}</b> · Soluções
                </div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {diferencial.heading}
                </h1>
                <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
                  {diferencial.intro}
                </p>
                <div className="reveal mt-[30px] flex flex-wrap gap-3">
                  <a href={waLink(waDiferencial(diferencial.title))} className="btn btn-fill">
                    {diferencial.ctaLabel}
                  </a>
                  {aplicacao && (
                    <a href="#aplicacao" className="btn btn-ghost">
                      Ver na prática
                    </a>
                  )}
                </div>
              </div>
              <div className={`${CARD} reveal`}>
                <span className="display text-[30px] leading-none text-orange">
                  {diferencial.num}
                </span>
                <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">{aside.text}</p>
                <div className="mt-[22px] border-t border-line pt-[18px] text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                  {aside.footer}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="O que é" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">{oQueE.lead}</p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {oQueE.cards.map((card) => (
                <article className={`${CARD} reveal flex flex-col gap-4`} key={card.title}>
                  <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {card.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {prova && (
          <section className="bg-bone py-[110px] max-mob:py-[72px]">
            <div className="wrap">
              <SectionHeading num="02" title="A prova" className="reveal mb-[34px]" />
              <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">{prova.lead}</p>
              <StatGrid stats={prova.stats} size="md" className="reveal" />
            </div>
          </section>
        )}

        {aplicacao && (
        <section className="py-[110px] max-mob:py-[72px]" id="aplicacao">
          <div className="wrap">
            <SectionHeading num="03" title="Aplicação prática" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">{aplicacao.lead}</p>

            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {aplicacao.steps.map((step) => (
                <article className={`${CARD} reveal flex flex-col gap-4`} key={step.num}>
                  <span className="display text-[30px] leading-none text-orange">{step.num}</span>
                  <h3 className="m-0 text-[21px] font-extrabold text-ink">{step.title}</h3>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {step.items.map((item) => (
                      <li className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft" key={item}>
                        <span aria-hidden className="text-orange">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-[18px] grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              <article className="reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <div className="eyebrow">{comparativo.sem.label}</div>
                <div className="mt-[18px] grid grid-cols-2 gap-2 rounded-[10px] border border-dashed border-line-2 p-2.5">
                  {comparativo.sem.blocos.map((bloco) => (
                    <div
                      className="flex h-[78px] items-center justify-center rounded-[10px] bg-ink/[.08] px-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-ink-soft"
                      key={bloco}
                    >
                      {bloco}
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-[18px] text-[15.5px] leading-relaxed text-ink-soft">
                  {comparativo.sem.text}
                </p>
              </article>
              <article className={`${CARD} reveal`}>
                <div className="eyebrow">
                  Com <b className="text-orange">{comparativo.com.label}</b>
                </div>
                <div className="mt-[18px] rounded-[10px] border border-orange/35 p-2.5">
                  {comparativo.com.blocos.map((bloco) => (
                    <div
                      className="flex h-[78px] items-center justify-center rounded-[10px] bg-orange px-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-white"
                      key={bloco}
                    >
                      {bloco}
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-[18px] text-[15.5px] leading-relaxed text-ink-soft">
                  {comparativo.com.text}
                </p>
              </article>
            </div>

            <div className="reveal mt-[18px] grid grid-cols-[1.2fr_0.8fr] items-center gap-[38px] rounded-[16px] bg-ink p-[38px] text-white max-tab:grid-cols-1 max-tab:gap-7 max-mob:p-7">
              <div>
                <div className="eyebrow text-white/60">{miniCase.eyebrow}</div>
                <h3 className="m-0 mt-4 text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-[-0.02em]">
                  {miniCase.title}
                </h3>
                <p className="m-0 mt-4 max-w-[52ch] text-[15.5px] leading-[1.7] text-white/80">
                  {miniCase.text}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-white/20">
                {miniCase.stats.map((stat) => (
                  <div className="bg-ink p-6 max-mob:p-5" key={stat.label}>
                    <div className="display text-[40px] leading-[0.9] text-orange">{stat.n}</div>
                    <div className="mt-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3.5 text-[13px] text-ink-soft">
              Números do mini-case a confirmar com o time comercial antes de publicar.
            </p>
          </div>
        </section>
        )}

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading num={numOutros} title="Outros diferenciais" className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/solucoes/diferenciais"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-[18px] max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1">
              {outros.map((outro) => (
                <Link
                  className="ticks reveal flex flex-col gap-2.5 rounded-[16px] border border-line bg-white p-6 text-ink transition-colors duration-200 hover:border-orange max-mob:p-5"
                  href={outro.href}
                  key={outro.slug}
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                    {outro.num}
                  </span>
                  <h3 className="m-0 text-[19px] font-extrabold leading-tight">{outro.title}</h3>
                  <p className="m-0 text-[13.5px] leading-snug text-ink-soft">{outro.resumo}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
