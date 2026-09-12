import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Image from 'next/image'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('social.titulo')
  const descricao = t('social.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/sobre/social', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function SocialPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'SocialPage' })
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

        <section className="pb-[110px] max-mob:pb-[72px]" id="corajosamente-eticos">
          <div className="wrap">
            <SectionHeading title="Corajosamente Éticos" className="reveal mb-[34px]" />
            <div className="reveal grid grid-cols-[minmax(0,1fr)_minmax(200px,240px)] items-center gap-[54px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <p className="mb-6 text-lg text-ink-soft">{t('eticosP1')}</p>
                <div className="flex flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">{t('eticosP2')}</p>
                  <p className="m-0">{t('eticosP3')}</p>
                </div>
                <a
                  className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
                  href="https://corajosamenteeticos.com.br"
                  rel="noreferrer"
                  target="_blank"
                >
                  {t('eticosCta')}
                  <span
                    aria-hidden
                    className="text-base transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-line max-tab:w-[200px]">
                <Image
                  src="/media/social/corajosamente-eticos.webp"
                  alt={t('eticosAlt')}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="loja-om-do-bem">
          <div className="wrap">
            <SectionHeading title="Loja OM do Bem" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 items-start gap-[34px] max-tab:grid-cols-1">
              <CoverMedia
                src="/media/social/loja-om.webp"
                alt={t('lojaAlt')}
                label="Loja OM do Bem"
                ratio="16/10"
                sizes="(max-width: 980px) 100vw, 50vw"
                className="reveal"
              />
              <div>
                <h2 className="reveal m-0 max-w-[22ch] text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('lojaH2')}
                </h2>
                <div className="reveal mt-6 flex flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">{t('lojaP1')}</p>
                  <p className="m-0">{t('lojaP2')}</p>
                  <p className="m-0">{t('lojaP3')}</p>
                </div>
              </div>
            </div>

            <div className="ticks reveal mt-[34px] max-w-[820px] overflow-hidden rounded-[16px] border border-line bg-white">
              <CoverMedia
                src="/media/social/caminho-do-renascer.webp"
                alt={t('renascerAlt')}
                label="Caminho do Renascer"
                ratio="16/9"
                sizes="(max-width: 980px) 100vw, 820px"
                className="rounded-none border-0"
              />
              <div className="p-10 max-mob:p-7">
                <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                  Caminho do Renascer
                </h3>
                <div className="mt-4 flex max-w-[62ch] flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">{t('renascerP1')}</p>
                  <p className="m-0">{t('renascerP2')}</p>
                </div>
              </div>
            </div>

            <div className="ticks reveal mt-[34px] max-w-[820px] overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="grid grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-8 p-10 max-tab:grid-cols-1 max-mob:p-7">
                <CoverMedia
                  src="/media/social/doacao-tampinhas.webp"
                  alt={t('tampinhasAlt')}
                  label={t('tampinhasTitulo')}
                  ratio="3/4"
                  sizes="(max-width: 980px) 100vw, 220px"
                />
                <div>
                  <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {t('tampinhasTitulo')}
                  </h3>
                  <div className="mt-4 flex max-w-[62ch] flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
                    <p className="m-0">{t('tampinhasP1')}</p>
                    <p className="m-0">{t('tampinhasP2')}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="reveal mt-[34px] max-w-[70ch] text-[15.5px] leading-relaxed text-ink-soft">
              {t('lojaNota')}
            </p>

            <Link
              className="group reveal mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
              href="/sobre/ambiental"
            >
              {t('lojaCta')}
              <span
                aria-hidden
                className="text-base transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="anunciando-o-bem">
          <div className="wrap">
            <SectionHeading title={t('anunciandoTitulo')} className="reveal mb-[34px]" />
            <div className="reveal flex max-w-[70ch] flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
              <p className="m-0">{t('anunciandoP1')}</p>
              <p className="m-0">{t('anunciandoP2')}</p>
              <p className="m-0">{t('anunciandoP3')}</p>
            </div>
            <div className="ticks reveal mt-[34px] flex max-w-[380px] flex-col gap-2 rounded-[16px] border border-line bg-white p-8">
              <span className="eyebrow text-orange">{t('anunciandoStatLabel')}</span>
              <span className="text-[clamp(30px,4vw,40px)] font-extrabold leading-none text-ink">
                {t('anunciandoStatValor')}
              </span>
              <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{t('anunciandoStatTexto')}</p>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="rede-a-servico-da-cidade">
          <div className="wrap">
            <SectionHeading title={t('redeTitulo')} className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              {t('redeLead')}
            </p>
            <article className="ticks reveal grid grid-cols-2 items-start gap-[34px] rounded-[16px] border border-line bg-white p-10 max-tab:grid-cols-1 max-mob:p-7">
              <CoverMedia
                src="/media/social/midia-regenerativa-praca-pet.webp"
                alt={t('regAlt')}
                label={t('regLabel')}
                ratio="16/10"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <div>
                <span className="eyebrow">{t('regEyebrow')}</span>
                <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('regLabel')}
                </h2>
                <div className="mt-5 flex flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">{t('regP1')}</p>
                  <p className="m-0">{t('regP2')}</p>
                  <p className="m-0">{t('regP3')}</p>
                  <p className="m-0">{t('regP4')}</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
