import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import FormatSpecCard from '@/components/ui/FormatSpecCard'
import PlatformFaq from '@/components/sections/PlatformFaq'
import PlatformProposalForm from '@/components/forms/PlatformProposalForm'
import { PLATFORMS, getPlatformBySlug } from '@/lib/platforms'

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }))
}

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

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/#plataformas' }, { label: platform.name }]}
        />
        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{platform.eyebrow}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {platform.heading}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{platform.intro}</p>
          </div>
        </section>
        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Formatos" className="reveal mb-[34px]" />
            <FormatSpecCard formats={platform.formats} />
          </div>
        </section>
        <PlatformFaq faqs={platform.faqs} num="02" />
        <PlatformProposalForm platformName={platform.name} num="03" />
      </main>
      <Footer />
    </>
  )
}
