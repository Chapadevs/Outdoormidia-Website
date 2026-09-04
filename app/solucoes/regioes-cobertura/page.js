import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverageExplorer from '@/components/sections/CoverageExplorer'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getLocations } from '@/lib/locations'

// O title lista as cidades porque é assim que a busca chega aqui: ninguém
// procura "regiões e cobertura", procura o nome da própria cidade.
const TITLE = 'Onde anunciamos: Curitiba, Litoral, Joinville, Itajaí e Balneário | Outdoormídia'

const DESCRIPTION =
  'Mídia exterior em Curitiba, Região Metropolitana, Litoral do PR, Joinville, Itajaí, Balneário Camboriú e nas rodovias que ligam PR e SC.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/solucoes/regioes-cobertura' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 3600

// A contagem vem sempre de `formats`, nunca escrita à mão: a linha e os chips
// vivem lado a lado, e qualquer divergência entre o número e o que aparece ao
// lado dele fica visível para o visitante.
function contagemPlataformas(total) {
  return `${total} ${total === 1 ? 'plataforma' : 'plataformas'}`
}

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
              Do Batel ao litoral, das rodovias às praias de Santa Catarina. Veja abaixo em quais
              regiões a Outdoormídia opera e quais plataformas existem em cada uma.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <CoverageExplorer locations={locations} num="01" mapaEstatico />
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="02" title="Regiões atendidas" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Cada região com as plataformas disponíveis nela. Não achou a sua cidade? Fale com o
              time: a rede cresce por demanda.
            </p>
            <div className="reveal border-t border-ink">
              {locations.map((loc) => (
                <div
                  className="grid grid-cols-[1fr_1.4fr] items-start gap-8 border-b border-line py-8 max-tab:grid-cols-1 max-tab:gap-3"
                  key={loc.id}
                >
                  <div>
                    {loc.formats?.length > 0 && (
                      <div className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                        {contagemPlataformas(loc.formats.length)}
                      </div>
                    )}
                    <h3 className="m-0 mt-2.5 text-[25px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
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
