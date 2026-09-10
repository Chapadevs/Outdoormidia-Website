import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import CoverMedia from '@/components/ui/CoverMedia'
import EscadaPresenca from '@/components/ui/EscadaPresenca'
import DiagnosticoQuiz from '@/components/forms/DiagnosticoQuiz'
import { getTranslations, setRequestLocale } from 'next-intl/server'

const HERO_ALT =
  'A teoria da Escada da Presença: pessoa subindo cinco degraus de concreto, nomeados existência, descoberta, reconhecimento, preferência e referência, até um outdoor iluminado da Outdoormídia no topo.'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('diagnostico.titulo')
  const descricao = t('diagnostico.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/area-do-anunciante/diagnostico-de-presenca', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function DiagnosticoDePresencaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Diagnóstico de presença' },
          ]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Diagnóstico · <b>10 perguntas</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              Diagnóstico de
              <br />
              {/* O .display sobe tudo para caixa alta; o miolo volta para caixa
                  baixa para "DIAGNÓSTICO DE" e "MARCA" carregarem o destaque. */}
              <span className="lowercase">presença de</span>{' '}
              <span className="font-extrabold">marca.</span>
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Toda marca ocupa um espaço na cabeça do cliente. Responda em apenas um minuto, e
              descubra em qual degrau a sua está hoje.
            </p>

            {/* A capa do hero mostra a escada inteira antes de qualquer texto
                explicar o conceito, e é a primeira imagem da página: entra com
                `priority` para não disputar a fila de carregamento. */}
            <CoverMedia
              alt={HERO_ALT}
              className="reveal mt-11 max-mob:mt-8"
              priority
              ratio="16/9"
              sizes="(max-width: 1280px) 100vw, 1280px"
              src="/media/hero-diagnostico.png"
            />
          </div>
        </section>

        {/* A Escada da Presença em estado neutro. O mesmo componente reaparece no
            resultado com o degrau da pessoa aceso. */}
        <section className="pb-[54px] max-mob:pb-9">
          <div className="wrap">
            <h2 className="reveal m-0 max-w-[28ch] text-balance text-[clamp(26px,3.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              Referência não é sorte. Ninguém chega ao topo de uma vez.
            </h2>
            <p className="reveal mt-5 max-w-[74ch] text-ink-soft">
              No Brasil, a mídia exterior alcança 89% da população e é o segundo meio mais consumido
              do país. O espaço existe, e ele já está ocupado por alguém. A pergunta nunca foi se a
              sua marca pode ser vista, e sim quantas vezes ela já foi vista pela mesma pessoa,
              porque é a repetição que transforma quem viu em quem lembra.
            </p>
            <p className="reveal mt-4 max-w-[74ch] text-ink-soft">
              Toda empresa ocupa um degrau nessa escala, e cada degrau muda a forma como o cliente
              decide. Antes de responder, veja o caminho inteiro.
            </p>

            <EscadaPresenca className="mt-9 max-mob:mt-7" />

            <p className="reveal mt-4 text-[12.5px] text-ink-soft/70">
              Fonte: Kantar Ibope Media, Target Group Index, 2024.
            </p>
          </div>
        </section>

        <DiagnosticoQuiz />
      </main>
    </>
  )
}
