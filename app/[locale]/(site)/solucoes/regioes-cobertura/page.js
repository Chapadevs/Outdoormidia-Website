import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import CoverageExplorer from '@/components/sections/CoverageExplorer'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// O title lista as cidades porque é assim que a busca chega aqui: ninguém
// procura "regiões e cobertura", procura o nome da própria cidade.

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/solucoes/regioes-cobertura',
    locale,
    titulo: t('regioesCobertura.titulo'),
    descricao: t('regioesCobertura.descricao'),
  })
}

export const revalidate = 3600

export default async function RegioesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'RegioesPage' })

  return (
    <>
      <main>
        <Breadcrumb
          items={[{ label: t('breadcrumbPai'), href: '/solucoes' }, { label: t('breadcrumb') }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow')} · <b>{t('eyebrowForte')}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
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
