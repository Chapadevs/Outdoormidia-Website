import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SimuladorForm from '@/components/forms/SimuladorForm'
import LeadCta from '@/components/sections/LeadCta'
import { getLocations } from '@/lib/locations'
import { PLATFORMS } from '@/lib/platforms'

const DESCRIPTION =
  'Escolha praça, plataforma e período e veja quantos impactos a sua campanha de mídia exterior pode gerar no Paraná e em Santa Catarina.'

export const metadata = {
  title: 'Simulador OOH | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/anunciante/simulador' },
  openGraph: {
    title: 'Simulador OOH | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 3600

export default async function SimuladorPage() {
  const locations = await getLocations()
  const platforms = PLATFORMS.map(({ slug, name }) => ({ slug, name }))

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Área do anunciante', href: '/anunciante' }, { label: 'Simulador' }]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Área do anunciante · Ferramenta</div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              Simulador OOH.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Quatro escolhas e você tem a ordem de grandeza da campanha antes de falar com
              qualquer vendedor: quantas pessoas ela alcança e quanto costuma custar.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SimuladorForm locations={locations} platforms={platforms} />
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
