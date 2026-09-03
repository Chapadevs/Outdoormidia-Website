import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import PlatformsCatalog from '@/components/sections/PlatformsCatalog'
import { PLATFORMS, PLATFORMS_LISTAGEM } from '@/lib/platforms'

const DESCRIPTION =
  'Conheça as plataformas de mídia exterior da Outdoormídia: do outdoor digital ao MUB, mais os Projetos Icônicos, cobrindo Paraná e Santa Catarina.'

export const metadata = {
  title: 'Plataformas | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/plataformas' },
  openGraph: {
    title: 'Plataformas | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function PlataformasPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Plataformas' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Catálogo · {PLATFORMS.length} plataformas + Icônicos
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Plataformas.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Nenhuma campanha se resolve com um formato só. São {PLATFORMS_LISTAGEM.length} plataformas que se combinam
              conforme o público que você quer alcançar, do LED de alta circulação ao mobiliário
              urbano de bairro, cobrindo Paraná e Santa Catarina. Fechando a lista, os Icônicos:
              projetos de assinatura desenhados ponto a ponto.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Catálogo" className="reveal mb-5" />
            <PlatformsCatalog plataformas={PLATFORMS_LISTAGEM} />
          </div>
        </section>

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <SectionHeading num="02" title="Fora do catálogo" className="reveal mb-[34px]" />
            <div className="reveal flex items-end justify-between gap-8 max-mob:flex-col max-mob:items-start max-mob:gap-5">
              <p className="m-0 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                Quando o endereço pede uma estrutura que não existe em tabela, o caminho são os
                Projetos Icônicos: Elegancy, Green e Regenerativo, desenhados ponto a ponto, do
                briefing à instalação.
              </p>
              <Link className="btn btn-ghost shrink-0" href="/plataformas/projetos-iconicos">
                Ver os Projetos Icônicos →
              </Link>
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
