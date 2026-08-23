import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import LeadCta from '@/components/sections/LeadCta'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listPublishedCases } from '@/lib/cases/cases'
import { readingTimeLabel } from '@/lib/blog/readingTime'
import { DATA_LONGA } from '@/lib/format'
import { PODCAST, EPISODIOS } from '@/lib/podcast'

const DESCRIPTION =
  'Conteúdo Out of Home da Outdoormídia: cases de campanhas reais no Paraná e em Santa Catarina e artigos sobre mídia exterior, audiência e formatos.'

export const metadata = {
  title: 'Blog | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
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

export default async function BlogPage() {
  const [posts, cases] = await fetchContent()

  const destaque = posts[0]
  const recentes = posts.slice(1, 4)
  const caseRecente = cases[0]

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Blog' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Conteúdo Out of Home</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Blog.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Três leituras da mesma rua: o que já aconteceu nela, nos cases; o que você precisa
              saber antes de ocupá-la, nos artigos; e quem decide onde a marca aparece, no podcast.
            </p>
          </div>
        </section>

        {destaque && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading num="01" title="Em destaque" className="reveal mb-[34px]" />
              <Link
                href={`/blog/${destaque.slug}`}
                className="ticks reveal group grid grid-cols-[1.1fr_1fr] items-stretch overflow-hidden rounded-[16px] border border-line bg-white transition-colors duration-200 hover:border-orange max-tab:grid-cols-1"
              >
                <CoverMedia
                  src={destaque.coverImage}
                  alt={destaque.coverAlt || destaque.title}
                  label="Artigo"
                  sizes={DESTAQUE_SIZES}
                  className="rounded-none border-0"
                />
                <div className="flex flex-col justify-center gap-4 p-11 max-mob:p-7">
                  <span className="eyebrow">
                    Artigo
                    {destaque.publishedAt && ` · ${DATA_LONGA.format(new Date(destaque.publishedAt))}`}
                    {` · ${readingTimeLabel(destaque.content)}`}
                  </span>
                  <h2 className="m-0 text-[clamp(26px,3.4vw,38px)] font-extrabold leading-[1.1] text-ink transition-colors duration-200 group-hover:text-orange">
                    {destaque.title}
                  </h2>
                  <p className="m-0 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                    {destaque.excerpt}
                  </p>
                  <span className="mt-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange">
                    Ler artigo
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
              num={destaque ? '02' : '01'}
              title="Por onde começar"
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
                  Prova
                </span>
                <div className="relative z-[2]">
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9]">
                    Cases
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/85">
                    Campanhas que já ocuparam a rua: marca, praça e resultado. Filtre por
                    segmento e veja o que o Out of Home entrega.
                  </p>
                  <span className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em]">
                    Ver cases
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
                <span className="eyebrow">Aprender</span>
                <div>
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9] text-ink transition-colors duration-200 group-hover:text-orange">
                    Artigos
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                    Métricas, formatos, escolha de praça e o que muda entre um outdoor e um
                    painel digital. Para decidir antes de contratar.
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
                    Ver artigos
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
                <span className="eyebrow">Ouvir</span>
                <div>
                  <h3 className="m-0 font-display text-[clamp(34px,5vw,54px)] uppercase leading-[0.9] text-ink transition-colors duration-200 group-hover:text-orange">
                    Podcast
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
                    {PODCAST.tagline} Conversas com quem decide onde uma marca aparece.
                  </p>
                  <ul className="m-0 mt-6 flex list-none flex-col gap-2 border-t border-line p-0 pt-5">
                    {EPISODIOS.slice(0, 3).map((ep) => (
                      <li className="truncate text-[14px] font-semibold text-ink-soft" key={ep.slug}>
                        • {ep.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    Ver episódios
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
                Ainda não há conteúdo publicado. Volte em breve.
              </p>
            )}
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
