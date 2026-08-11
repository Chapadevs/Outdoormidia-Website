import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Institutional from '@/components/sections/Institutional'
import Diferenciais from '@/components/sections/Diferenciais'
import Impact from '@/components/sections/Impact'
import Platforms from '@/components/sections/Platforms'
import Cases from '@/components/sections/Cases'
import Process from '@/components/sections/Process'
import Reviews from '@/components/sections/Reviews'
import BlogTeaser from '@/components/sections/BlogTeaser'
import Coverage from '@/components/sections/Coverage'
import LeadCta from '@/components/sections/LeadCta'
import Faq from '@/components/sections/Faq'
import Footer from '@/components/layout/Footer'

export const revalidate = 3600

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <Institutional />
      <Diferenciais />
      <Impact />
      <Platforms />
      <Cases />
      <Process />
      <Reviews />
      <BlogTeaser />
      <Coverage />
      <LeadCta />
      <Faq />
      <Footer />
    </>
  )
}
