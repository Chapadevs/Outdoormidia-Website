import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Culture from '@/components/sections/Culture'
import BancoDeTalentos from '@/components/sections/BancoDeTalentos'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('trabalheConosco.titulo')
  const descricao = t('trabalheConosco.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/trabalhe-conosco', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function TrabalheConoscoPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Trabalhe Conosco' }]} />
        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Carreiras · <b>PR + SC</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Trabalhe conosco.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Há 67 anos colocamos marcas nas ruas do Paraná e de Santa Catarina. Se você quer
              trabalhar com mídia que a cidade inteira vê, seu lugar pode ser aqui.
            </p>
          </div>
        </section>
        <Culture />
        <BancoDeTalentos />
      </main>
    </>
  )
}
