import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Institutional from '@/components/sections/Institutional'
import Diferenciais from '@/components/sections/Diferenciais'
import PlatformsCarousel from '@/components/sections/PlatformsCarousel'
import Iconicos from '@/components/sections/Iconicos'
import Cases from '@/components/sections/Cases'
import Process from '@/components/sections/Process'
import Reviews from '@/components/sections/Reviews'
import BlogTeaser from '@/components/sections/BlogTeaser'
import Coverage from '@/components/sections/Coverage'
import NovaCampanha from '@/components/sections/NovaCampanha'
import Faq from '@/components/sections/Faq'
import Footer from '@/components/layout/Footer'
import HomeTimeline from '@/components/widgets/HomeTimeline'

export const revalidate = 3600

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <HomeTimeline>
        <Institutional />
        <Diferenciais />
        <PlatformsCarousel />
        <Iconicos />
        <Coverage />
        <Reviews />
        <Cases />
        <Process />
        <NovaCampanha />
        <BlogTeaser />
        <Faq />
      </HomeTimeline>
      <Footer />
    </>
  )
}
