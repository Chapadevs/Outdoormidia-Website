import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import SuaMarcaNoOoh from '@/components/forms/SuaMarcaNoOoh'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getPlatformsListagem } from '@/lib/platforms'
import { PLATAFORMAS_COM_MOCKUP } from '@/lib/suaMarca'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('suaMarcaNoOoh.titulo')
  const descricao = t('suaMarcaNoOoh.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/area-do-anunciante/sua-marca-no-ooh', locale),
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

export default async function SuaMarcaNoOohPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'SuaMarcaPage' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })

  // Só as plataformas que têm foto de painel entram no seletor, na ordem da
  // listagem do site. Plataforma sem foto não sobe como botão apagado: seria
  // anunciar na página o que ainda não existe.
  const plataformas = getPlatformsListagem(locale)
    .filter((p) => PLATAFORMAS_COM_MOCKUP.includes(p.slug))
    .map(({ slug, name }) => ({ slug, name }))

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: tNav('areaDoAnunciante'), href: '/area-do-anunciante' },
            { label: tNav('suaMarcaNoOoh') },
          ]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow')}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              {t('h1A')}
              <br />
              {t('h1B')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{t('lead')}</p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SuaMarcaNoOoh plataformas={plataformas} />
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
