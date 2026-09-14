import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listPublishedCases } from '@/lib/cases/cases'
import { readingTimeMinutes } from '@/lib/blog/readingTime'
import { dataLonga } from '@/lib/format'
import { getPodcast, getEpisodios } from '@/lib/podcast'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/blog',
    locale,
    titulo: t('blog.titulo'),
    descricao: t('blog.descricao'),
  })
}

export const revalidate = 300

const DESTAQUE_SIZES = '(max-width: 980px) 100vw, 620px'

// Sem credenciais do Firestore (ex.: build no CI), o hub é gerado sem conteúdo —
// a regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchContent() {
  try {
    return await Promise.all([listPublishedPosts(), listPublishedCases()])
  } catch {
    return [[], []]
  }
}

export default async function BlogPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  const tb = await getTranslations({ locale, namespace: 'Blog' })
  const podcast = getPodcast(locale)
  const episodios = getEpisodios(locale)

  const [posts, cases] = await fetchContent()

  const destaque = posts[0]
  const recentes = posts.slice(1, 4)
  const caseRecente = cases[0]

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
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        {destaque && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading title={t('emDestaque')} className="reveal mb-[34px]" />
              <Link
                href={`/blog/${destaque.slug}`}
                className="ticks reveal group grid grid-cols-[1.1fr_1fr] items-stretch overflow-hidden rounded-[16px] border border-line bg-white transition-colors duration-200 hover:border-orange max-tab:grid-cols-1"
              >
                <CoverMedia
                  src={destaque.coverImage}
                  alt={destaque.coverAlt || destaque.title}
                  label={tb('artigo')}
                  sizes={DESTAQUE_SIZES}
                  className="rounded-none border-0"
                />
                <div className="flex flex-col justify-center gap-4 p-11 max-mob:p-7">
                  <span className="eyebrow">
                    {tb('artigo')}
                    {destaque.publishedAt && ` · ${dataLonga(locale).format(new Date(destaque.publishedAt))}`}
                    {` · ${tb('minLeitura', { n: readingTimeMinutes(destaque.content) })}`}
                  </span>
                  <h2 className="m-0 text-[clamp(26px,3.4vw,38px)] font-extrabold leading-[1.1] text-ink transition-colors duration-200 group-hover:text-orange">
                    {destaque.title}
                  </h2>
                  <p className="m-0 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                    {destaque.excerpt}
                  </p>
                  <span className="mt-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange">
                    {tb('lerArtigo')}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading
              title={t('porOndeComecar')}
              className="reveal mb-[34px]"
            />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              <Link
                href="/cases"
                className={`reveal group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[16px] bg-ink bg-cover bg-center p-10 text-white after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(22,17,13,.78),rgba(22,17,13,.25))] after:content-[''] max-mob:min-h-[260px] max-mob:p-7`}
                style={
                  caseRecente?.coverImage
                    ? { backgroundImage: `url(${caseRecente.coverImage})` }
                    : undefined
                }
              >
                <span className="relative z-[2] self-start rounded-full bg-white/18 px-[11px] py-[7px] text-[11px] font-bold uppercase tracking-[0.16em]">
                  {t('cases.tag')}
                </span>
                <div className="relative z-[2]">
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9]">
                    {t('cases.titulo')}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/85">
                    {t('cases.texto')}
                  </p>
                  <span className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em]">
                    {t('cases.cta')}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>

              <Link
                href="/blog/artigos"
                className="ticks reveal group flex min-h-[340px] flex-col justify-between rounded-[16px] border border-line bg-white p-10 transition-colors duration-200 hover:border-orange max-mob:min-h-[260px] max-mob:p-7"
              >
                <span className="eyebrow">{t('artigos.tag')}</span>
                <div>
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9] text-ink transition-colors duration-200 group-hover:text-orange">
                    {t('artigos.titulo')}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                    {t('artigos.texto')}
                  </p>
                  {recentes.length > 0 && (
                    <ul className="m-0 mt-6 flex list-none flex-col gap-2 border-t border-line p-0 pt-5">
                      {recentes.map((p) => (
                        <li
                          className="truncate text-[14px] font-semibold text-ink-soft"
                          key={p.id}
                        >
                          • {p.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {t('artigos.cta')}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>

              <Link
                href="/blog/podcast"
                className="ticks reveal group flex min-h-[340px] flex-col justify-between rounded-[16px] border border-line bg-bone p-10 transition-colors duration-200 hover:border-orange max-mob:min-h-[260px] max-mob:p-7"
              >
                <span className="eyebrow">{t('podcast.tag')}</span>
                <div>
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9] text-ink transition-colors duration-200 group-hover:text-orange">
                    {t('podcast.titulo')}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                    {podcast.tagline} {t('podcast.texto')}
                  </p>
                  <ul className="m-0 mt-6 flex list-none flex-col gap-2 border-t border-line p-0 pt-5">
                    {episodios.slice(0, 3).map((ep) => (
                      <li className="truncate text-[14px] font-semibold text-ink-soft" key={ep.slug}>
                        • {ep.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {t('podcast.cta')}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </div>

            {posts.length === 0 && cases.length === 0 && (
              <p className="reveal mt-9 text-lg text-ink-soft">
                {t('vazio')}
              </p>
            )}
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
