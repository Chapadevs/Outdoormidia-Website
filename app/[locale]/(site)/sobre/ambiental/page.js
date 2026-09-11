import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getAmbientalPraticas, getAmbientalRealidade } from '@/lib/esg'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// TODO(Imagine): remover o `robots` quando a foto da Praça de Carregamento
// Elétrico existir. É o único item que bloqueia a publicação da página —
// sem ela a seção 01 não sustenta o peso que ganhou.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('ambiental.titulo')
  const descricao = t('ambiental.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/sobre/ambiental', locale),
    robots: { index: false, follow: true },
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function AmbientalPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'AmbientalPage' })
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

        <section className="pb-[110px] max-mob:pb-[72px]" id="realidade">
          <div className="wrap">
            <SectionHeading title={t('realidadeTitulo')} className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              {t('realidadeLead')}
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {getAmbientalRealidade(locale).map((p) => (
                <article
                  className="ticks reveal scroll-mt-24 flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  id={p.slug}
                  key={p.slug}
                >
                  <CoverMedia
                    src={p.image}
                    alt={p.title}
                    label={p.title}
                    ratio="16/9"
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="mb-1"
                  />
                  <span className="eyebrow">{p.tag}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {p.title}
                  </h2>
                  {p.text.map((paragrafo) => (
                    <p
                      className="m-0 text-[15.5px] leading-relaxed text-ink-soft"
                      key={paragrafo}
                    >
                      {paragrafo}
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <p className="reveal mt-[34px] max-w-[70ch] text-[15.5px] leading-relaxed text-ink-soft">
              {t('realidadeNotaAntes')}
              <strong className="font-extrabold text-ink">{t('realidadeNotaMarca')}</strong>
              {t('realidadeNotaDepois')}
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="ciclo-da-lona">
          <div className="wrap">
            <SectionHeading title={t('cicloTitulo')} className="reveal mb-[34px]" />
            <div className="ticks reveal grid grid-cols-[1fr_1.15fr] items-center gap-10 rounded-[16px] border border-line bg-white p-10 max-tab:grid-cols-1 max-mob:p-7">
              <CoverMedia video="/media/ambiental/ciclo-da-lona.mp4" ratio="16/9" />
              <div>
                <h2 className="m-0 max-w-[24ch] text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('cicloH2')}
                </h2>
                <div className="mt-6 flex max-w-[62ch] flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">{t('cicloP1')}</p>
                  <p className="m-0">{t('cicloP2')}</p>
                  <p className="m-0">{t('cicloP3')}</p>
                </div>
                <Link
                  className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
                  href="/sobre/social"
                >
                  {t('cicloCta')}
                  <span
                    aria-hidden
                    className="text-base transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="doacao-instituto-kopher">
          <div className="wrap">
            <SectionHeading title={t('kopherTitulo')} className="reveal mb-[34px]" />
            <div className="ticks reveal grid grid-cols-[280px_1fr] gap-10 rounded-[16px] border border-line bg-white p-10 max-tab:grid-cols-1 max-mob:p-7">
              <div className="flex flex-col gap-5 self-start">
                <CoverMedia
                  src="/media/ambiental/Logo-instituto-Kopher.jpeg"
                  alt={t('kopherLogoAlt')}
                  ratio="2/1"
                  sizes="(max-width: 980px) 100vw, 280px"
                />
                <CoverMedia
                  src="/media/ambiental/certificado-kopher.png"
                  alt={t('kopherCertificadoAlt')}
                  ratio="a4"
                  sizes="(max-width: 980px) 100vw, 280px"
                />
              </div>
              <div className="flex max-w-[62ch] flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                <p className="m-0">{t('kopherP1')}</p>
                <p className="m-0">{t('kopherP2')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="operacao">
          <div className="wrap">
            <SectionHeading title={t('operacaoTitulo')} className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              {t('operacaoLead')}
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {getAmbientalPraticas(locale).map((p) => (
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

        <NovaCampanha />
      </main>
    </>
  )
}
