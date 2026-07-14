import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Formats from '@/components/sections/Formats'
import Platforms from '@/components/sections/Platforms'
import Cases from '@/components/sections/Cases'
import Impact from '@/components/sections/Impact'
import Coverage from '@/components/sections/Coverage'
import LeadCta from '@/components/sections/LeadCta'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Ticker />
      <Formats />
      <Platforms />
      <Cases />
      <Impact />
      <Coverage />
      <LeadCta />
      <Footer />
    </>
  )
}
