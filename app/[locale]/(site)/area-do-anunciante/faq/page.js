import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import FaqCategorias from '@/components/sections/FaqCategorias'
import { getCategoriasFaq, getFaqs } from '@/lib/faq'
import NovaCampanha from '@/components/sections/NovaCampanha'
import FaqJsonLd from '@/components/widgets/FaqJsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/area-do-anunciante/faq',
    locale,
    titulo: t('faq.titulo'),
    descricao: t('faq.descricao'),
  })
}

export default async function FaqPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'FaqPage' })

  return (
    <>
      <FaqJsonLd faqs={getFaqs(locale)} />
      <main>
        <Breadcrumb
          items={[{ label: t('breadcrumbPai'), href: '/area-do-anunciante' }, { label: t('breadcrumb') }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow')}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('tituloA')}
              <br />
              {t('tituloB')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <FaqCategorias faqs={getFaqs(locale)} categorias={getCategoriasFaq(locale)} />

        <NovaCampanha />
      </main>
    </>
  )
}
