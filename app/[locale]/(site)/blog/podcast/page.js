import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { PODCAST, getPodcast, getEpisodios } from '@/lib/podcast'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('podcast.titulo')
  const descricao = t('podcast.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/blog/podcast', locale),
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

export default async function PodcastPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const podcast = getPodcast(locale)
  const episodios = getEpisodios(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Podcast' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Blog · <b>{PODCAST.title}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Podcast.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{podcast.text}</p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title="Episódios" className="reveal mb-[34px]" />

            <ul className="m-0 grid list-none grid-cols-3 gap-[18px] p-0 max-tab:grid-cols-2 max-mob:grid-cols-1">
              {episodios.map((ep) => (
                <li
                  key={ep.slug}
                  className="ticks reveal flex flex-col gap-4 rounded-[16px] border border-line bg-white p-9 max-mob:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[34px] leading-none text-orange">
                      {ep.num}
                    </span>
                    <span className="rounded-full border border-line px-[11px] py-[6px] text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                      {ep.date}
                    </span>
                  </div>
                  <h2 className="m-0 text-[21px] font-extrabold leading-[1.2] text-ink">
                    {ep.title}
                  </h2>
                  <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{ep.text}</p>
                  <div className="mt-auto flex flex-col gap-3 border-t border-line pt-5">
                    <span className="eyebrow">
                      {ep.guest} · {ep.duration}
                    </span>
                    {ep.audio ? (
                      <a
                        href={ep.audio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost self-start"
                      >
                        Ouvir episódio
                      </a>
                    ) : (
                      <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-line-2">
                        Gravação em produção
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="reveal mt-9 max-w-[62ch] text-[15px] leading-relaxed text-ink-soft">
              {podcast.tagline} Os episódios entram aqui assim que forem gravados, e também
              nas plataformas de áudio.
            </p>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
