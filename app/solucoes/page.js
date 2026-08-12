import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import Diferenciais from '@/components/sections/Diferenciais'
import Platforms from '@/components/sections/Platforms'
import LeadCta from '@/components/sections/LeadCta'
import { getLocations } from '@/lib/locations'

const DESCRIPTION =
  'Tudo o que a Outdoormídia coloca na rua: os diferenciais que sustentam a operação, as praças de PR e SC, as 7 plataformas de mídia exterior e os projetos icônicos.'

export const metadata = {
  title: 'Soluções — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/solucoes' },
  openGraph: {
    title: 'Soluções — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 3600

export default async function SolucoesPage() {
  const locations = await getLocations()

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Soluções' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Núcleo comercial · PR + SC</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Soluções.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Comece por onde faz sentido para você: pelo que nos diferencia, pela praça onde
              sua marca precisa aparecer ou direto pelo formato que você já tem em mente.
            </p>
          </div>
        </section>

        <Diferenciais num="01" moreHref="/solucoes/diferenciais" />

        <section className="py-[110px] max-mob:py-[72px]" id="regioes">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading num="02" title="Regiões" className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/solucoes/regioes"
              >
                Ver o mapa →
              </Link>
            </div>
            <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
              Uma malha contínua nos dois estados onde o Sul se movimenta. Escolha a praça — a
              gente mostra o que existe nela.
            </p>
            <div className="grid grid-cols-5 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {locations.map((loc) => (
                <Link
                  className="ticks reveal flex flex-col gap-2.5 rounded-[16px] border border-line bg-white p-6 transition-colors duration-200 hover:border-orange"
                  href="/solucoes/regioes"
                  key={loc.id}
                >
                  {loc.formats?.length > 0 && (
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                      {loc.formats.length}{' '}
                      {loc.formats.length === 1 ? 'plataforma' : 'plataformas'}
                    </span>
                  )}
                  <h3 className="m-0 text-[19px] font-extrabold leading-[1.15] text-ink">
                    {loc.name}
                  </h3>
                  {loc.desc && (
                    <p className="m-0 text-[13.5px] leading-[1.45] text-ink-soft">{loc.desc}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Platforms num="03" />

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
