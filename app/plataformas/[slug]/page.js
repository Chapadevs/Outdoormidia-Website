import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import FormatSpecCard from '@/components/ui/FormatSpecCard'
import BigNumbers from '@/components/ui/BigNumbers'
import AtivoCard from '@/components/ui/AtivoCard'
import PlatformFaq from '@/components/sections/PlatformFaq'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import CaseCard from '@/components/cases/CaseCard'
import ProdutoCard from '@/components/ui/ProdutoCard'
import { getPlatformBySlug } from '@/lib/platforms'
import { getAtivoBySlug } from '@/lib/iconicos'
import { getProdutosPorPlataforma } from '@/lib/produtos'
import { getPublishedCasesByPlatform } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'

export const revalidate = 300

// Sem credenciais do Firestore (ex.: build no CI), a página sai sem os cases —
// a regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchCases(slug) {
  try {
    return await Promise.all([getPublishedCasesByPlatform(slug), listTags('cases')])
  } catch {
    return [[], []]
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const platform = getPlatformBySlug(slug)
  if (!platform) return { title: 'Plataforma não encontrada | Outdoormídia' }

  return {
    title: `${platform.name} | Outdoormídia`,
    description: platform.intro,
    alternates: { canonical: `/plataformas/${platform.slug}` },
    openGraph: {
      title: `${platform.name} | Outdoormídia`,
      description: platform.intro,
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function PlatformPage({ params }) {
  const { slug } = await params
  const platform = getPlatformBySlug(slug)
  if (!platform) notFound()

  const [cases, tags] = await fetchCases(platform.slug)
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))

  // Os ativos nomeados vêm dos Icônicos pelo slug: a plataforma guarda a
  // referência, nunca uma segunda cópia do texto (regra C8 do handoff).
  const ativos = (platform.ativos ?? []).map(getAtivoBySlug).filter(Boolean)
  const produtos = getProdutosPorPlataforma(platform.slug)

  // Quase toda seção é condicional, porque depende de dado que pode não ter
  // vindo do cliente. A numeração é contada na ordem em que as seções
  // sobrevivem, para não abrir buraco entre 01 e 03.
  let contador = 0
  const proximo = () => String(++contador).padStart(2, '0')
  const numBlocos = platform.blocos?.length > 0 ? proximo() : null
  const numAtivos = ativos.length > 0 ? proximo() : null
  const numPassos = platform.passos?.length > 0 ? proximo() : null
  const numFormatos = proximo()
  const numCases = cases.length > 0 ? proximo() : null
  const numFaq = proximo()
  const numProcesso = proximo()

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Plataformas', href: '/plataformas' }, { label: platform.name }]}
        />

        <section className="relative overflow-hidden pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          {platform.slug === 'aeroporto' && (
            <>
              <video
                autoPlay
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
                loop
                muted
                playsInline
                src="/media/aeroporto-midia.mp4"
              />
              <div className="pointer-events-none absolute inset-0 -z-10 bg-paper/40" />
            </>
          )}
          <div className="wrap">
            <div className="grid grid-cols-[1fr_1fr] items-center gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">{platform.eyebrow}</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {platform.heading}
                </h1>
                <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">{platform.intro}</p>
              </div>
              <CoverMedia
                alt={platform.imageAlt}
                className="reveal"
                label={platform.name}
                priority
                sizes="(max-width: 980px) 100vw, 50vw"
                src={platform.image}
              />
            </div>

            {platform.quando?.length > 0 && (
              <div className="reveal mt-[70px] max-mob:mt-12">
                <h2 className="m-0 text-[clamp(21px,2.2vw,27px)] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                  Quando essa plataforma é a escolha certa
                </h2>
                <ul className="m-0 mt-6 grid list-none grid-cols-3 gap-[18px] p-0 max-tab:grid-cols-1">
                  {platform.quando.map((item) => (
                    <li
                      className="ticks rounded-[16px] border border-line bg-white p-6 text-[15.5px] leading-relaxed text-ink-soft max-mob:p-5"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Componente C1: só sobe onde há número validado. Sem `bignumbers`
                a página fica sem o quadro, em vez de exibir um dado inventado. */}
            <BigNumbers className="reveal mt-[54px]" stats={platform.bignumbers} />
          </div>
        </section>

        {platform.blocos?.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading
                num={numBlocos}
                title={platform.blocosTitle}
                className="reveal mb-[34px]"
              />
              <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
                {platform.blocos.map((bloco) => (
                  <article
                    className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                    key={bloco.title}
                  >
                    {bloco.image && (
                      <CoverMedia
                        alt={bloco.imageAlt}
                        className="mb-5"
                        label={bloco.title}
                        ratio="16/9"
                        sizes="(max-width: 980px) 100vw, 33vw"
                        src={bloco.image}
                      />
                    )}
                    <h3 className="m-0 text-[19px] font-extrabold leading-tight text-ink">
                      {bloco.title}
                    </h3>
                    <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                      {bloco.text}
                    </p>
                    {bloco.apoio && (
                      <p className="eyebrow mt-auto pt-6 text-ink-soft">{bloco.apoio}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {ativos.length > 0 && (
          <section className="border-t border-line bg-bone py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading num={numAtivos} title="Ativos em destaque" className="reveal mb-[34px]" />
              <div className="grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
                {ativos.map((ativo) => (
                  <AtivoCard ativo={ativo} key={ativo.slug} />
                ))}
              </div>
            </div>
          </section>
        )}

        {platform.passos?.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading
                num={numPassos}
                title="Como funciona o Sob Demanda"
                className="reveal mb-[34px]"
              />
              <ol className="m-0 grid list-none grid-cols-4 gap-[18px] p-0 max-tab:grid-cols-2 max-mob:grid-cols-1">
                {platform.passos.map((passo, i) => (
                  <li
                    className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-6 max-mob:p-5"
                    key={passo.title}
                  >
                    <span className="display text-[30px] leading-none text-orange">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="m-0 mt-5 text-[17px] font-extrabold leading-tight text-ink">
                      {passo.title}
                    </h3>
                    <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                      {passo.text}
                    </p>
                  </li>
                ))}
              </ol>
              {platform.passosApoio && (
                <p className="reveal mt-8 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                  {platform.passosApoio}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Produtos substituem o diagrama de proporções onde existem: o handoff
            trocou a lista de formatos pelos cards de produto. Onde a plataforma
            ainda não tem produto de catálogo (Aeroporto e Rodovias), o diagrama
            continua sendo o que descreve o formato. */}
        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            {produtos.length > 0 ? (
              <>
                <SectionHeading num={numFormatos} title="Produtos" className="reveal mb-[34px]" />
                <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
                  {produtos.map((produto) => (
                    <ProdutoCard
                      key={produto.slug}
                      produto={produto}
                      tecnologiaPadrao={platform.tecnologiaPadrao}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <SectionHeading num={numFormatos} title="Formatos" className="reveal mb-[34px]" />
                <FormatSpecCard formats={platform.formats} />
              </>
            )}
          </div>
        </section>

        {cases.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading num={numCases} title="Cases" className="reveal mb-[34px]" />
              <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
                {cases.map((caseItem) => (
                  <div className="reveal flex" key={caseItem.id}>
                    <CaseCard
                      caseItem={caseItem}
                      tags={caseItem.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
                    />
                  </div>
                ))}
              </div>
              <Link
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 hover:text-orange"
                href="/cases"
              >
                Ver todos os cases <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        )}

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <PlatformFaq faqs={platform.faqs} num={numFaq} platformName={platform.name} />
          </div>
        </section>

        <Process num={numProcesso} title="Como contratar" />

        <NovaCampanha contexto={platform.name} />
      </main>
      <Footer />
    </>
  )
}
