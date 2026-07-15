import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Platforms from '@/components/sections/Platforms'
import Cases from '@/components/sections/Cases'
import Impact from '@/components/sections/Impact'
import Reviews from '@/components/sections/Reviews'
import Coverage from '@/components/sections/Coverage'
import Faq from '@/components/sections/Faq'
import LeadCta from '@/components/sections/LeadCta'
import Footer from '@/components/layout/Footer'

export const revalidate = 3600

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <Platforms />
      <Cases />
      <Impact />
      <Reviews />
      <Coverage />
      <Faq />
      <LeadCta />
      <Footer />
    </>
  )
}
