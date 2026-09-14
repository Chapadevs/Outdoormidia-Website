import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import CoverMedia from '@/components/ui/CoverMedia'
import BigNumbers from '@/components/ui/BigNumbers'
import Iconicos from '@/components/sections/Iconicos'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// Os quatro números do handoff. Os dois de impacto são por ativo, não somados:
// somar impacto de painéis diferentes produziria um número que ninguém apurou.
// Número e rótulo vivem em `IconicosPage.numeros` nos messages/*.json, porque
// "até 1 mi" e "800 mil" também mudam de idioma.

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/plataformas/projetos-iconicos',
    locale,
    titulo: t('projetosIconicos.titulo'),
    descricao: t('projetosIconicos.descricao'),
  })
}

export default async function ProjetosIconicosPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const tProcess = await getTranslations({ locale, namespace: 'Process' })
  const t = await getTranslations({ locale, namespace: 'IconicosPage' })

  return (
    <>
      <main>
        <Breadcrumb
          items={[{ label: t('breadcrumbPai'), href: '/plataformas' }, { label: t('breadcrumb') }]}
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
                <div className="eyebrow reveal">{t('eyebrow')}</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {t('h1')}
                </h1>
                <p className="reveal mt-6 max-w-[58ch] text-lg text-ink-soft">
                  {t('lead')}
                </p>
                <div className="reveal mt-8 flex flex-wrap gap-3">
                  <a className="btn btn-fill" href="#nova-campanha">
                    {t('cta')}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <CoverMedia
                  className="reveal"
                  label={t('breadcrumb')}
                  priority
                  ratio="16/9"
                  video="/media/plataformas/video-iconicos.mp4"
                />
                <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                  <p className="m-0 text-[15px] leading-relaxed text-ink-soft">
                    {t('cardTexto')}
                  </p>
                  <p className="eyebrow mt-5">{t('cardFluxo')}</p>
                </div>
              </div>
            </div>
            <BigNumbers className="reveal mt-[64px]" stats={t.raw('numeros')} />
          </div>
        </section>

        <Iconicos linkTitulo={false} />

        <Process title={tProcess('tituloComoContratar')} />

        <NovaCampanha contexto="Projetos Icônicos" />
      </main>
    </>
  )
}
