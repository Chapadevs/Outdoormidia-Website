import Breadcrumb from '@/components/ui/Breadcrumb'
import CoverMedia from '@/components/ui/CoverMedia'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Culture from '@/components/sections/Culture'
import BancoDeTalentos from '@/components/sections/BancoDeTalentos'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// A foto aérea da sede é a mesma capa do topo de /sobre; o arquivo é 16/9
// exato, então a proporção do card é a da foto e nada é cortado.
const SEDE = '/media/sobre-nos/foto-da-sede.webp'


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
            {/* Mesmo hero de duas colunas das páginas de plataforma: texto à
                esquerda e, ao lado, a foto aérea da sede que também abre /sobre.
                O time na frente do prédio continua sendo a foto do Banco de
                Talentos, mais abaixo nesta mesma página. */}
            <div className="grid grid-cols-[1fr_1fr] items-center gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">
                  Carreiras · <b>PR + SC</b>
                </div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  Trabalhe conosco.
                </h1>
                <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">
                  Há 67 anos colocamos marcas nas ruas do Paraná e de Santa Catarina. Se você quer
                  trabalhar com mídia que a cidade inteira vê, seu lugar pode ser aqui.
                </p>
              </div>
              <CoverMedia
                alt="Vista aérea da sede da Outdoormídia, em Curitiba: os galpões com placas solares e a fachada com a marca"
                className="reveal"
                priority
                ratio="16/9"
                sizes="(max-width: 980px) 100vw, 50vw"
                src={SEDE}
              />
            </div>
          </div>
        </section>
        <Culture />
        <BancoDeTalentos />
      </main>
    </>
  )
}
