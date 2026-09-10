import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import LegalDoc from '@/components/ui/LegalDoc'
import { ATUALIZADO_EM, getContatoTermos, getTermos } from '@/lib/legal'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('termos.titulo')
  const descricao = t('termos.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/termos', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function TermosPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Termos de uso' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Jurídico · <b>Termos</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Termos de uso.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              O que você pode fazer com o conteúdo deste site, o que os nossos números
              significam e até onde vai a responsabilidade de cada lado.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <LegalDoc atualizadoEm={ATUALIZADO_EM} contato={getContatoTermos(locale)} secoes={getTermos(locale)} />
        </section>
      </main>
    </>
  )
}
