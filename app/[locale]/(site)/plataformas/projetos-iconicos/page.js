import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import CoverMedia from '@/components/ui/CoverMedia'
import BigNumbers from '@/components/ui/BigNumbers'
import Iconicos from '@/components/sections/Iconicos'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// Os quatro números do handoff. Os dois de impacto são por ativo, não somados:
// somar impacto de painéis diferentes produziria um número que ninguém apurou.
const NUMEROS = [
  { n: '4', label: 'Ícones de assinatura' },
  { n: '3', label: 'Linhas exclusivas' },
  { n: 'até 1 mi', label: 'Impactos/mês por esquina digital' },
  { n: '800 mil', label: 'Impactos/mês no Distrito de Mídia' },
]

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('projetosIconicos.titulo')
  const descricao = t('projetosIconicos.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/plataformas/projetos-iconicos', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function ProjetosIconicosPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const tProcess = await getTranslations({ locale, namespace: 'Process' })

  return (
    <>
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/plataformas' }, { label: 'Projetos Icônicos' }]}
        />

        {/* Hero em duas colunas com o card lateral, como nas outras páginas de
            hub. A coluna da direita é o que diferencia Icônicos do catálogo, e
            some do fluxo de leitura quando a tela estreita. O vídeo mora no
            próprio card, não mais como fundo baixo-opacidade da seção
            inteira. */}
        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1.15fr_0.85fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
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
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <CoverMedia
                  className="reveal"
                  label="Projetos Icônicos"
                  priority
                  ratio="16/9"
                  video="/media/plataformas/video-iconicos.mp4"
                />
                <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                  <p className="m-0 text-[15px] leading-relaxed text-ink-soft">
                    A diferença para as 8 plataformas do catálogo é o ponto de partida: aqui a
                    estrutura nasce do endereço. Cada projeto passa por briefing, estudo de
                    viabilidade e desenho antes de existir na rua.
                  </p>
                  <p className="eyebrow mt-5">Briefing → viabilidade → estrutura</p>
                </div>
              </div>
            </div>
            <BigNumbers className="reveal mt-[64px]" stats={NUMEROS} />
          </div>
        </section>

        <Iconicos comAtivos linkTitulo={false} />

        <Process title={tProcess('tituloComoContratar')} />

        <NovaCampanha contexto="Projetos Icônicos" />
      </main>
    </>
  )
}
