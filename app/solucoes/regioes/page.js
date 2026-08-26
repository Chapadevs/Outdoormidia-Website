import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverageExplorer from '@/components/sections/CoverageExplorer'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getLocations } from '@/lib/locations'

const DESCRIPTION =
  'Onde a Outdoormídia coloca sua marca: Curitiba e região metropolitana, litoral do Paraná, rodovias de PR e SC, Joinville, Itajaí e Balneário Camboriú.'

export const metadata = {
  title: 'Regiões e Cobertura | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/solucoes/regioes' },
  openGraph: {
    title: 'Regiões e Cobertura | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 3600

export default async function RegioesPage() {
  const locations = await getLocations()

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Soluções', href: '/solucoes' }, { label: 'Regiões / Cobertura' }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Cobertura · <b>+530 milhões de impactos por mês</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Regiões.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Do Batel ao litoral, das rodovias às praias de Santa Catarina. Passe o mouse pelo
              mapa para ver o que existe em cada praça, ou consulte a lista completa abaixo.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <CoverageExplorer locations={locations} num="01" />
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="02" title="Praças atendidas" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Cada praça com as plataformas disponíveis nela. Não achou a sua cidade? Fale com o
              time. A rede cresce por demanda.
            </p>
            <div className="reveal border-t border-ink">
              {locations.map((loc) => (
                <div
                  className="grid grid-cols-[1fr_1.4fr] items-start gap-8 border-b border-line py-8 max-tab:grid-cols-1 max-tab:gap-3"
                  key={loc.id}
                >
                  <div>
                    <h3 className="m-0 text-[25px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
                      {loc.name}
                    </h3>
                    {loc.desc && (
                      <p className="mt-2 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-soft">
                        {loc.desc}
                      </p>
                    )}
                  </div>
                  {loc.formats?.length > 0 && (
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {loc.formats.map((format) => (
                        <li
                          className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-bold text-ink-soft"
                          key={format}
                        >
                          {format}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
