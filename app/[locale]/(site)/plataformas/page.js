import { Images } from 'lucide-react'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import BigNumbers from '@/components/ui/BigNumbers'
import NovaCampanha from '@/components/sections/NovaCampanha'
import PlatformsCatalog from '@/components/sections/PlatformsCatalog'
import { getPlatformsListagem } from '@/lib/platforms'
import { PRODUTOS } from '@/lib/produtos'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('plataformas.titulo')
  const descricao = t('plataformas.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/plataformas', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function PlataformasPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const plataformas = getPlatformsListagem(locale)
  const t = await getTranslations({ locale, namespace: 'PlataformasPage' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })

  // Os quatro números da marca, iguais aos da home. A contagem de plataformas é
  // derivada da própria listagem para nunca divergir do que a grade mostra, e
  // por isso o quadro é montado aqui dentro, onde a listagem já existe.
  const numeros = [
    { n: String(plataformas.length), label: t('numeros.plataformas') },
    { n: '175', label: t('numeros.telas') },
    { n: '+530 mi', label: t('numeros.impactos') },
    { n: '67', label: t('numeros.anos') },
  ]

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: tNav('plataformas') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow', { n: plataformas.length })}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[64ch] text-lg text-ink-soft">
              {t('lead', { n: plataformas.length })}
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a className="btn btn-fill" href="#nova-campanha">
                {t('ctaPlanejar')}
              </a>
              <a className="btn btn-ghost" href="#formatos">
                {t('ctaFormatos')}
              </a>
            </div>
            <BigNumbers className="reveal mt-[64px]" stats={numeros} />
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={tNav('plataformas')} className="reveal mb-5" />
            <PlatformsCatalog plataformas={plataformas} />
          </div>
        </section>

        <section
          className="scroll-mt-24 border-t border-line py-[90px] max-mob:py-[60px]"
          id="formatos"
        >
          <div className="wrap">
            <SectionHeading title={t('formatosTitulo')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-[1.1fr_0.9fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-8">
              {/* A contagem sai de `lib/produtos.js`, não da mão: o handoff fala
                  em 22 produtos e enumera menos que isso (ver pendências). Número
                  derivado nunca diverge do que a página realmente lista. */}
              <div>
                <p className="reveal m-0 max-w-[58ch] text-lg text-ink-soft">
                  {t('formatosTexto', { n: PRODUTOS.length })}
                </p>
                <Link className="btn btn-ghost reveal mt-7" href="/solucoes#tipos-de-midia">
                  <Images size={20} />
                  {t('verTiposDeMidia')}
                </Link>
                <p className="reveal m-0 mt-3 text-[13.5px] text-ink-soft/85">
                  {t('cliqueFotos')}
                </p>
              </div>
              <div className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <h3 className="m-0 text-[19px] font-extrabold leading-tight text-ink">
                  {t('comoLerTitulo')}
                </h3>
                <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                  {t('comoLerTexto')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
