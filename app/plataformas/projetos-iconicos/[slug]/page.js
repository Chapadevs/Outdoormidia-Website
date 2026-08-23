import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import FormatSpecCard from '@/components/ui/FormatSpecCard'
import PlatformFaq from '@/components/sections/PlatformFaq'
import LeadCta from '@/components/sections/LeadCta'
import CaseCard from '@/components/cases/CaseCard'
import { ICONICOS, getIconicoBySlug, getOutrosIconicos } from '@/lib/iconicos'
import { getPublishedCasesByPlatform } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { waIconico, waLink } from '@/lib/whatsapp'

const CARD = 'ticks rounded-[16px] border border-line bg-white p-7 max-mob:p-6'

export const revalidate = 300

export function generateStaticParams() {
  return ICONICOS.map((i) => ({ slug: i.slug }))
}

// Sem credenciais do Firestore (ex.: build no CI), a página sai sem os cases —
// a regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchCases(slug) {
  try {
    return await Promise.all([getPublishedCasesByPlatform(slug), listTags('cases')])
  } catch {
    return [[], []]
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const iconico = getIconicoBySlug(slug)
  if (!iconico) return { title: 'Projeto não encontrado | Outdoormídia' }

  const title = `${iconico.name} | Projetos Icônicos | Outdoormídia`
  return {
    title,
    description: iconico.intro,
    alternates: { canonical: `/plataformas/projetos-iconicos/${iconico.slug}` },
    openGraph: { title, description: iconico.intro, locale: 'pt_BR', type: 'website' },
  }
}

export default async function IconicoPage({ params }) {
  const { slug } = await params
  const iconico = getIconicoBySlug(slug)
  if (!iconico) notFound()

  const { aside, oQueE, linhas } = iconico
  const [cases, tags] = await fetchCases(iconico.slug)
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))
  const outros = getOutrosIconicos(slug)

  // Duas seções são condicionais (Linhas só no Elegancy, Cases só quando há),
  // então a numeração é contada na ordem em que as seções aparecem.
  let contador = 0
  const proximo = () => String(++contador).padStart(2, '0')
  const numOQueE = proximo()
  const numLinhas = linhas.length > 0 ? proximo() : null
  const numFormatos = proximo()
  const numCases = cases.length > 0 ? proximo() : null
  const numFaq = proximo()
  const numOutros = proximo()

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Plataformas', href: '/plataformas' },
            { label: 'Projetos Icônicos', href: '/plataformas/projetos-iconicos' },
            { label: iconico.name },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-12 max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">{iconico.eyebrow}</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {iconico.heading}
                </h1>
                <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{iconico.intro}</p>
                <div className="reveal mt-[30px] flex flex-wrap gap-3">
                  <a className="btn btn-fill" href={waLink(waIconico(iconico.name))}>
                    {iconico.ctaLabel}
                  </a>
                  <a className="btn btn-ghost" href="#formatos">
                    Ver formatos
                  </a>
                </div>
              </div>
              <div className={`${CARD} reveal`}>
                <span className="display text-[30px] leading-none text-orange">{iconico.num}</span>
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
            <SectionHeading num={numOQueE} title="O que é" className="reveal mb-[34px]" />
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

        {linhas.length > 0 && (
          <section className="bg-bone py-[110px] max-mob:py-[72px]">
            <div className="wrap">
              <SectionHeading num={numLinhas} title="Linhas" className="reveal mb-[34px]" />
              <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
                Duas escalas da mesma linguagem. A escolha entre elas é do endereço, não do
                orçamento.
              </p>
              <div className="flex flex-col gap-[70px] max-mob:gap-[54px]">
                {linhas.map((linha) => (
                  <div className="scroll-mt-24" id={linha.slug} key={linha.slug}>
                    <div className="reveal flex items-baseline gap-4 border-b border-line pb-5">
                      <h3 className="m-0 text-[clamp(26px,3vw,38px)] font-extrabold leading-none tracking-[-0.02em]">
                        {linha.name}
                      </h3>
                      <span className="eyebrow">{linha.tagline}</span>
                    </div>
                    <p className="reveal mb-[34px] mt-6 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                      {linha.text}
                    </p>
                    <FormatSpecCard formats={linha.formats} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-[110px] max-mob:py-[72px]" id="formatos">
          <div className="wrap">
            <SectionHeading
              num={numFormatos}
              title="Formatos e medidas"
              className="reveal mb-[34px]"
            />
            <FormatSpecCard formats={iconico.formats} />
            <p className="mt-3.5 text-[13px] text-ink-soft">
              As dimensões finais saem do estudo de viabilidade de cada endereço; confirme com o
              time comercial antes de fechar a arte.
            </p>
          </div>
        </section>

        {cases.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading num={numCases} title="Cases" className="reveal mb-[34px]" />
              <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
                {cases.map((caseItem) => (
                  <div className="reveal flex" key={caseItem.id}>
                    <CaseCard
                      caseItem={caseItem}
                      tags={caseItem.tags.map((tag) => tagMap.get(tag)).filter(Boolean)}
                    />
                  </div>
                ))}
              </div>
              <Link
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:text-orange"
                href="/cases"
              >
                Ver todos os cases <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        )}

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <PlatformFaq faqs={iconico.faqs} num={numFaq} platformName={iconico.name} />
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading num={numOutros} title="Os outros dois" className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/plataformas/projetos-iconicos"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {outros.map((outro) => (
                <Link
                  className="ticks reveal flex flex-col gap-2.5 rounded-[16px] border border-line bg-white p-6 text-ink transition-colors duration-200 hover:border-orange max-mob:p-5"
                  href={outro.href}
                  key={outro.slug}
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                    {outro.num} · {outro.tagline}
                  </span>
                  <h3 className="m-0 text-[19px] font-extrabold leading-tight">{outro.name}</h3>
                  <p className="m-0 text-[13.5px] leading-snug text-ink-soft">{outro.short}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
