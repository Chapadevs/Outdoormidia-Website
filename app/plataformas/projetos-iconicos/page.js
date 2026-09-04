import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import BigNumbers from '@/components/ui/BigNumbers'
import AtivoCard from '@/components/ui/AtivoCard'
import LinhaTabs from '@/components/ui/LinhaTabs'
import Iconicos from '@/components/sections/Iconicos'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { ICONICOS, ICONICOS_ASSINATURA } from '@/lib/iconicos'

const DESCRIPTION =
  'Estruturas de assinatura da Outdoormídia: esquinas digitais em 3D, painéis híbridos, jardins vivos e requalificação urbana em Curitiba e Joinville.'

// Os quatro números do handoff. Os dois de impacto são por ativo, não somados:
// somar impacto de painéis diferentes produziria um número que ninguém apurou.
const NUMEROS = [
  { n: '4', label: 'Ícones de assinatura' },
  { n: '3', label: 'Linhas exclusivas' },
  { n: 'até 1 mi', label: 'Impactos/mês por esquina digital' },
  { n: '800 mil', label: 'Impactos/mês no Distrito de Mídia' },
]

export const metadata = {
  title: 'Projetos Icônicos | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/plataformas/projetos-iconicos' },
  openGraph: {
    title: 'Projetos Icônicos | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ProjetosIconicosPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/plataformas' }, { label: 'Projetos Icônicos' }]}
        />

        {/* Hero em duas colunas com o card lateral, como nas outras páginas de
            hub. A coluna da direita é o que diferencia Icônicos do catálogo, e
            some do fluxo de leitura quando a tela estreita. */}
        <section className="relative overflow-hidden pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
            src="/media/cases-videos/video-iconicos.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="wrap relative z-10">
            <div className="grid grid-cols-[1.15fr_0.85fr] items-end gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">Ícones · Mobiliário de assinatura</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  Icônicos.
                </h1>
                <p className="reveal mt-6 max-w-[58ch] text-lg text-ink-soft">
                  Existem endereços que a cidade já reconhece. Os Projetos Icônicos ocupam esses
                  pontos com estruturas desenhadas uma a uma, sem molde de catálogo. É o produto
                  que a Outdoormídia projeta, não o que ela replica.
                </p>
                <div className="reveal mt-8 flex flex-wrap gap-3">
                  <a className="btn btn-fill" href="#nova-campanha">
                    Quero avaliar um Icônico
                  </a>
                  <a className="btn btn-ghost" href="#assinatura">
                    Ver os ícones
                  </a>
                </div>
              </div>
              <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <p className="m-0 text-[15px] leading-relaxed text-ink-soft">
                  A diferença para as 8 plataformas do catálogo é o ponto de partida: aqui a
                  estrutura nasce do endereço. Cada projeto passa por briefing, estudo de
                  viabilidade e desenho antes de existir na rua.
                </p>
                <p className="eyebrow mt-5">Briefing → viabilidade → estrutura</p>
              </div>
            </div>
            <BigNumbers className="reveal mt-[64px]" stats={NUMEROS} />
          </div>
        </section>

        <Iconicos linkTitulo={false} num="01" />

        <section
          className="scroll-mt-24 border-t border-line py-[90px] max-mob:py-[60px]"
          id="assinatura"
        >
          <div className="wrap">
            <SectionHeading num="02" title="Ícones de assinatura" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[58ch] text-lg text-ink-soft">
              Quatro estruturas que não pertencem a nenhuma linha, porque cada uma resolveu um
              problema que não se repete. Três estão no Distrito de Mídia do Aeroporto, uma na
              Avenida das Torres.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
              {ICONICOS_ASSINATURA.map((ativo, i) => (
                <AtivoCard ativo={ativo} key={ativo.slug} prioridadeImagem={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Sem `bg-bone` aqui de propósito: o Gestão 360 logo abaixo já é bege,
            e as duas seções juntas viravam um bloco só. */}
        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <SectionHeading num="03" title="As três linhas" className="reveal mb-[34px]" />
            <LinhaTabs linhas={ICONICOS} />
          </div>
        </section>

        <Process num="04" title="Como contratar" />

        <NovaCampanha contexto="Projetos Icônicos" />
      </main>
      <Footer />
    </>
  )
}
