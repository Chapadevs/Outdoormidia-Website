import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import FormatSpecCard from '@/components/ui/FormatSpecCard'
import PlatformFaq from '@/components/sections/PlatformFaq'
import PlatformProposalForm from '@/components/forms/PlatformProposalForm'
import CaseCard from '@/components/cases/CaseCard'
import { getPlatformBySlug } from '@/lib/platforms'
import { getPublishedCasesByPlatform } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const platform = getPlatformBySlug(slug)
  if (!platform) return { title: 'Plataforma não encontrada — Outdoormídia' }

  return {
    title: `${platform.name} — Outdoormídia`,
    description: platform.intro,
    alternates: { canonical: `/plataformas/${platform.slug}` },
    openGraph: {
      title: `${platform.name} — Outdoormídia`,
      description: platform.intro,
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function PlatformPage({ params }) {
  const { slug } = await params
  const platform = getPlatformBySlug(slug)
  if (!platform) notFound()

  const [cases, tags] = await Promise.all([
    getPublishedCasesByPlatform(platform.slug),
    listTags('cases'),
  ])
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))
  const faqNum = cases.length > 0 ? '03' : '02'
  const formNum = cases.length > 0 ? '04' : '03'

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/plataformas' }, { label: platform.name }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1fr_1fr] items-center gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">{platform.eyebrow}</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {platform.heading}
                </h1>
                <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">{platform.intro}</p>
              </div>
              <div className="ticks reveal flex aspect-[16/10] items-center justify-center border border-line bg-bone">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                  {platform.name}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <SectionHeading num="01" title="Formatos" className="reveal mb-[34px]" />
            <FormatSpecCard formats={platform.formats} />
          </div>
        </section>

        {cases.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading num="02" title="Cases" className="reveal mb-[34px]" />
              <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
                {cases.map((caseItem) => (
                  <div className="reveal flex" key={caseItem.id}>
                    <CaseCard
                      caseItem={caseItem}
                      tags={caseItem.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
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
            <PlatformFaq faqs={platform.faqs} num={faqNum} />
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <PlatformProposalForm platformName={platform.name} num={formNum} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
