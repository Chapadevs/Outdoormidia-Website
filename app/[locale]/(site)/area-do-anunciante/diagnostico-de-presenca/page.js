import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import CoverMedia from '@/components/ui/CoverMedia'
import EscadaPresenca from '@/components/ui/EscadaPresenca'
import DiagnosticoQuiz from '@/components/forms/DiagnosticoQuiz'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/area-do-anunciante/diagnostico-de-presenca',
    locale,
    titulo: t('diagnostico.titulo'),
    descricao: t('diagnostico.descricao'),
  })
}

export default async function DiagnosticoDePresencaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'DiagnosticoPage' })

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: t('breadcrumbPai'), href: '/area-do-anunciante' },
            { label: t('breadcrumb') },
          ]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow')} · <b>{t('eyebrowForte')}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              {t('tituloA')}
              <br />
              {/* O .display sobe tudo para caixa alta; o miolo volta para caixa
                  baixa para "DIAGNÓSTICO DE" e "MARCA" carregarem o destaque. */}
              <span className="lowercase font-extrabold">{t('tituloB')}</span>{' '}
              <span className="font-extrabold">{t('tituloC')}</span>
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>

            {/* A capa do hero mostra a escada inteira antes de qualquer texto
                explicar o conceito, e é a primeira imagem da página: entra com
                `priority` para não disputar a fila de carregamento. */}
            <CoverMedia
              alt={t('heroAlt')}
              className="reveal mt-11 max-mob:mt-8"
              priority
              ratio="16/9"
              sizes="(max-width: 1280px) 100vw, 1280px"
              src="/media/diagnostico/hero-diagnostico.png"
            />
          </div>
        </section>

        {/* A Escada da Presença em estado neutro. O mesmo componente reaparece no
            resultado com o degrau da pessoa aceso. */}
        <section className="pb-[54px] max-mob:pb-9">
          <div className="wrap">
            <h2 className="reveal m-0 max-w-[28ch] text-balance text-[clamp(26px,3.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              {t('escadaTitulo')}
            </h2>
            <p className="reveal mt-5 max-w-[74ch] text-ink-soft">
              {t('escadaTexto1')}
            </p>
            <p className="reveal mt-4 max-w-[74ch] text-ink-soft">
              {t('escadaTexto2')}
            </p>

            <p className="reveal mt-4 text-[12.5px] font-bold text-ink-soft/70">
              {t('fonte')}
            </p>

            <EscadaPresenca className="mt-9 max-mob:mt-7" />
          </div>
        </section>

        <DiagnosticoQuiz />
      </main>
    </>
  )
}
