import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import BigNumbers from '@/components/ui/BigNumbers'
import NovaCampanha from '@/components/sections/NovaCampanha'
import PlatformsCatalog from '@/components/sections/PlatformsCatalog'
import { PLATFORMS_LISTAGEM } from '@/lib/platforms'
import { PRODUTOS } from '@/lib/produtos'

const DESCRIPTION =
  'Conheça as plataformas de mídia exterior da Outdoormídia: do outdoor digital ao MUB, mais os Projetos Icônicos, cobrindo Paraná e Santa Catarina.'

// Os quatro números da marca, iguais aos da home. A contagem de plataformas é
// derivada da própria listagem para nunca divergir do que a grade mostra.
const NUMEROS = [
  { n: String(PLATFORMS_LISTAGEM.length), label: 'Plataformas' },
  { n: '175', label: 'Telas digitais' },
  { n: '+530 mi', label: 'Impactos por mês' },
  { n: '67', label: 'Anos de operação' },
]

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
              Catálogo · {PLATFORMS_LISTAGEM.length} plataformas
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Plataformas.
            </h1>
            <p className="reveal mt-6 max-w-[64ch] text-lg text-ink-soft">
              Nenhuma campanha se resolve com um formato só. São {PLATFORMS_LISTAGEM.length}{' '}
              plataformas que se combinam conforme o público que você precisa alcançar, do LED de
              alta circulação ao mobiliário urbano de bairro, cobrindo Paraná e Santa Catarina.
              Abrindo a lista, os Projetos Icônicos: estruturas de assinatura desenhadas ponto a
              ponto.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a className="btn btn-fill" href="#nova-campanha">
                Planejar campanha
              </a>
              <a className="btn btn-ghost" href="#formatos">
                Ver formatos
              </a>
            </div>
            <BigNumbers className="reveal mt-[64px]" stats={NUMEROS} />
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Plataformas" className="reveal mb-5" />
            <PlatformsCatalog plataformas={PLATFORMS_LISTAGEM} />
          </div>
        </section>

        <section
          className="scroll-mt-24 border-t border-line py-[90px] max-mob:py-[60px]"
          id="formatos"
        >
          <div className="wrap">
            <SectionHeading
              num="02"
              title="Plataforma é onde. Formato é como."
              className="reveal mb-[34px]"
            />
            <div className="grid grid-cols-[1.1fr_0.9fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-8">
              {/* A contagem sai de `lib/produtos.js`, não da mão: o handoff fala
                  em 22 produtos e enumera menos que isso (ver pendências). Número
                  derivado nunca diverge do que a página realmente lista. */}
              <p className="reveal m-0 max-w-[58ch] text-lg text-ink-soft">
                A plataforma define o ambiente que sua marca ocupa. O formato define o tamanho, a
                proporção e o tipo de peça que vai no ar. São {PRODUTOS.length} produtos de
                catálogo, e cada plataforma trabalha com um recorte deles.
              </p>
              <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <h3 className="m-0 text-[19px] font-extrabold leading-tight text-ink">
                  Como ler os nomes
                </h3>
                <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                  Top é vertical, o mesmo enquadramento de um reel. Poster é horizontal, o mesmo
                  enquadramento de um vídeo. Tudo que começa com Super tem o dobro do tamanho.
                </p>
              </div>
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
