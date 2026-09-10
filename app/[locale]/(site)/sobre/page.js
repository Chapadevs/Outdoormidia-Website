import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CoverMedia from '@/components/ui/CoverMedia'
import PracaChips from '@/components/ui/PracaChips'
import SectionHeading from '@/components/ui/SectionHeading'
import Institutional from '@/components/sections/Institutional'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import LinhaDoTempo from '@/components/sections/LinhaDoTempo'
import { getMarcos } from '@/lib/sobre'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// A capa do topo é a mesma foto da sede que abre o Banco de Talentos: o time
// reunido na frente do prédio. O arquivo é 2000x1125, 16/9 exato, então a capa
// sobe nessa proporção e nada é cortado — em 16/7 o corte cairia justamente nos
// pés de quem está agachado na ponta direita.
const CAPA = { src: '/media/trabalhe-conosco/time-outdoormidia.webp' }

// `**negrito**` é o único realce que os parágrafos de "Sobre a OM" usam, mesmo
// padrão de components/ui/Accordion.jsx. O realce vive dentro da mensagem, e não
// no JSX, porque a palavra destacada muda de posição em cada idioma.
function comDestaque(texto) {
  return texto
    .split(/\*\*(.+?)\*\*/g)
    .map((parte, i) => (i % 2 ? <strong className="font-bold text-ink" key={i}>{parte}</strong> : parte))
}

// A lista de praças e o texto dos cards vivem em messages/*.json: aqui fica
// só a estrutura que não se traduz.

const COMPROMISSO = [
  { href: '/sobre/ambiental', image: '/media/sobre-nos/ambiental.webp' },
  { href: '/sobre/social', image: '/media/sobre-nos/social.webp' },
  { href: '/sobre/governanca', image: '/media/sobre-nos/governanca.webp' },
]


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('sobre.titulo')
  const descricao = t('sobre.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/sobre', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function SobrePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'SobrePage' })

  // O texto de cada card entra por posição sobre a estrutura de COMPROMISSO.
  const compromisso = COMPROMISSO.map((c, i) => ({ ...c, ...t.raw('compromisso')[i] }))

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow')}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{t('lead')}</p>

            {CAPA && (
              <CoverMedia
                alt={t('capaAlt')}
                className="reveal mt-[54px]"
                priority
                ratio="16/9"
                sizes="(max-width: 1280px) 100vw, 1216px"
                src={CAPA.src}
              />
            )}

            <div className="reveal mt-[54px] grid grid-cols-[220px_1fr] gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="eyebrow text-orange">{t('sobreOmLabel')}</div>
              <div className="flex max-w-[68ch] flex-col gap-5 text-[15.5px] leading-relaxed text-ink-soft">
                <p className="m-0">{comDestaque(t('sobreOmP1'))}</p>
                <p className="m-0">{comDestaque(t('sobreOmP2'))}</p>
                <p className="m-0">{comDestaque(t('sobreOmP3'))}</p>
                <p className="m-0">{comDestaque(t('sobreOmP4'))}</p>
                <p className="m-0">{comDestaque(t('sobreOmP5'))}</p>
              </div>
            </div>

            <div className="reveal mt-[54px] grid grid-cols-[220px_1fr] gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="eyebrow text-orange">{t('presencaLabel')}</div>
              <div className="flex max-w-[68ch] flex-col gap-5">
                <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                  {t('presencaTexto')}
                </p>
                <PracaChips pracas={t.raw('pracas')} />
              </div>
            </div>
          </div>
        </section>

        <Institutional />

        <LinhaDoTempo marcos={getMarcos(locale)} />

        <Process title={t('processTitulo')} />

        <section className="py-[110px] max-mob:py-[72px]" id="compromisso">
          <div className="wrap">
            <SectionHeading title={t('compromissoTitulo')} className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              {t('compromissoLead')}
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {compromisso.map((c) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={c.href}
                  key={c.href}
                >
                  {c.image && (
                    <CoverMedia
                      alt={c.imageAlt}
                      className="mb-1"
                      label={c.title}
                      ratio="16/9"
                      sizes="(max-width: 980px) 100vw, 400px"
                      src={c.image}
                    />
                  )}
                  <span className="eyebrow">{c.eyebrow}</span>
                  <h3 className="m-0 text-[25px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {c.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{c.text}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {c.cta}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  {t('timeTitulo')}
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  {t('timeTexto')}
                </p>
              </div>
              <Link href="/trabalhe-conosco" className="btn btn-ghost whitespace-nowrap">
                {t('timeCta')}
              </Link>
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
