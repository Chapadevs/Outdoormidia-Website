import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Institutional from '@/components/sections/Institutional'
import Diferenciais from '@/components/sections/Diferenciais'
import PlatformsCarousel from '@/components/sections/PlatformsCarousel'
import { getPlatformsListagem } from '@/lib/platforms'
import Cases from '@/components/sections/Cases'
import Process from '@/components/sections/Process'
import Reviews from '@/components/sections/Reviews'
import BlogTeaser from '@/components/sections/BlogTeaser'
import Coverage from '@/components/sections/Coverage'
import NovaCampanha from '@/components/sections/NovaCampanha'
import Faq from '@/components/sections/Faq'
import { getFaqsHome } from '@/lib/faq'
import HomeTimeline from '@/components/widgets/HomeTimeline'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { metaDe } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Site' })

  return metaDe({
    path: '/',
    locale,
    titulo: t('titulo'),
    descricao: t('descricao'),
    openGraph: { description: t('descricaoCurta') },
  })
}

export default async function Home({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HomeTimeline />
      <div className="desloca-trilho">
        <Hero />
        <Ticker />
        <Institutional />
        <Diferenciais />
        <PlatformsCarousel plataformas={getPlatformsListagem(locale)} />
        <Coverage />
        <Reviews />
        <Cases />
        <Process />
        <NovaCampanha />
        <BlogTeaser />
        <Faq items={getFaqsHome(locale)} />
      </div>
    </>
  )
}
