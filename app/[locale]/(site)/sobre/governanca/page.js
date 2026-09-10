import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getGovPilares } from '@/lib/esg'
import { WA_GOVERNANCA, waLink } from '@/lib/whatsapp'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('governanca.titulo')
  const descricao = t('governanca.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/sobre/governanca', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function GovernancaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'GovernancaPage' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: tNav('sobre'), href: '/sobre' }, { label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow')}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{t('lead')}</p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="quem-responde">
          <div className="wrap">
            <SectionHeading title={t('quemTitulo')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-start gap-[44px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <figure className="reveal m-0">
                <CoverMedia
                  src="/media/governanca/halisson-pontarola.jpg"
                  label="Halisson Pontarola"
                  ratio="16/10"
                  sizes="(max-width: 980px) 100vw, 40vw"
                />
                {/* A legenda identifica quem está na foto. Enquanto o texto ao lado
                    for institucional, ela não pode virar assinatura: isso atribuiria
                    a uma pessoa real uma declaração que ela ainda não aprovou. */}
                <figcaption className="mt-3 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                  {t('ceoLegenda')}
                </figcaption>
              </figure>
              <div className="reveal flex max-w-[58ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-soft">
                <p className="m-0">{t('ceoP1')}</p>
                <p className="m-0">{t('ceoP2')}</p>
                <p className="m-0">{t('ceoP3')}</p>
                <p className="m-0">{t('ceoP4')}</p>
                <p className="m-0">{t('ceoP5')}</p>
                <p className="m-0">{t('ceoP6')}</p>
                <p className="m-0">{t('ceoP7')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="estrutura">
          <div className="wrap">
            <SectionHeading title={t('estruturaTitulo')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {getGovPilares(locale).map((p) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.slug}
                >
                  <p.Icone size={24} className="text-orange" />
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {p.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('docTitulo')}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  {t('docTexto')}
                </p>
              </div>
              <a href={waLink(WA_GOVERNANCA)} className="btn btn-fill whitespace-nowrap">
                {t('docCta')}
              </a>
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
