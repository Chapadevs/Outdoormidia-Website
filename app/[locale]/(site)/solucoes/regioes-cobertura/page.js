import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import CoverageExplorer from '@/components/sections/CoverageExplorer'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// O title lista as cidades porque é assim que a busca chega aqui: ninguém
// procura "regiões e cobertura", procura o nome da própria cidade.

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('regioesCobertura.titulo')
  const descricao = t('regioesCobertura.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/solucoes/regioes-cobertura', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export const revalidate = 3600

export default async function RegioesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb
          items={[{ label: 'Soluções', href: '/solucoes' }, { label: 'Regiões / Cobertura' }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Cobertura · <b>+530 milhões de impactos por mês</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Regiões.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Do Batel ao litoral, das rodovias às praias de Santa Catarina. Veja abaixo em quais
              regiões a Outdoormídia opera e quais plataformas existem em cada uma.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <CoverageExplorer />
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
