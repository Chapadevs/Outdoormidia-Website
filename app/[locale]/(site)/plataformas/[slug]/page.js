import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Schema from '@/components/widgets/Schema'
import { service } from '@/lib/schema'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import FormatSpecCard from '@/components/ui/FormatSpecCard'
import BigNumbers from '@/components/ui/BigNumbers'
import AtivoCard from '@/components/ui/AtivoCard'
import MapaRodovias from '@/components/ui/MapaRodovias'
import PlatformFaq from '@/components/sections/PlatformFaq'
import Process from '@/components/sections/Process'
import NovaCampanha from '@/components/sections/NovaCampanha'
import CaseCard from '@/components/cases/CaseCard'
import ProdutoCard from '@/components/ui/ProdutoCard'
import { getPlatformBySlug, getPlatformBySlugLocale } from '@/lib/platforms'
import { getAtivoBySlugLocale } from '@/lib/iconicos'
import { getProdutosPorPlataformaLocale } from '@/lib/produtos'
import { getPublishedCasesByPlatform } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { comIdioma, waLink, waPlataforma } from '@/lib/whatsapp'

export const revalidate = 300

// `**negrito**` é o único realce que o texto dos passos do Sob Demanda usa,
// mesmo padrão de components/ui/Accordion.jsx.
function comDestaque(texto) {
  return texto
    .split(/\*\*(.+?)\*\*/g)
    .map((parte, i) => (i % 2 ? <strong className="font-bold text-ink" key={i}>{parte}</strong> : parte))
}

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
  const { locale, slug } = await params
  const platform = getPlatformBySlugLocale(slug, locale)
  if (!platform) {
    const t = await getTranslations({ locale, namespace: 'PlatformPage' })
    return { title: t('naoEncontrada') }
  }

  return metaDe({
    path: `/plataformas/${platform.slug}`,
    locale,
    titulo: `${platform.name} | Outdoormídia`,
    descricao: platform.intro,
  })
}

export default async function PlatformPage({ params }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const tProcess = await getTranslations({ locale, namespace: 'Process' })
  const t = await getTranslations({ locale, namespace: 'PlatformPage' })

  const platform = getPlatformBySlugLocale(slug, locale)
  if (!platform) notFound()

  // A mensagem de WhatsApp vai em português com o nome PT do catálogo, que é o
  // que o comercial reconhece; o rótulo do botão é o que muda de idioma.
  const hrefComercial = waLink(comIdioma(waPlataforma(getPlatformBySlug(platform.slug).name), locale))

  const [cases, tags] = await fetchCases(platform.slug)
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))

  // Os ativos nomeados vêm dos Icônicos pelo slug: a plataforma guarda a
  // referência, nunca uma segunda cópia do texto (regra C8 do handoff).
  const ativos = (platform.ativos ?? []).map((slugAtivo) => getAtivoBySlugLocale(slugAtivo, locale)).filter(Boolean)
  const produtos = getProdutosPorPlataformaLocale(platform.slug, locale)

  // Produtos e Formatos dividem uma seção só. `semFormatos` desliga o lado do
  // diagrama sem tocar no dos produtos: é o caso de Rodovias, onde o painel é
  // sob demanda e proporção fixa mentiria sobre o que a plataforma entrega.
  const mostraFormatos = produtos.length > 0 || !platform.semFormatos

  return (
    <>
      <main>
        <Schema data={service(platform, locale)} />
        <Breadcrumb
          items={[{ label: t('breadcrumb'), href: '/plataformas' }, { label: platform.name }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="grid grid-cols-[1fr_1fr] items-center gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">{platform.eyebrow}</div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {platform.heading}
                </h1>
                <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">{platform.intro}</p>
                <a
                  className="btn btn-fill reveal mt-8 max-mob:whitespace-normal max-mob:text-center"
                  href={hrefComercial}
                >
                  {t('falarComercial')}
                </a>
              </div>
              {/* Capa recortada (`imageRecorte`) é retrato: sem teto de largura
                  ela abriria um hero de mais de 800px de altura na coluna de 1fr.
                  Nenhuma entrada usa hoje; Digital Signage usou até 13/09/2026. */}
              <CoverMedia
                alt={platform.imageAlt}
                className={`reveal ${platform.imageRecorte ? 'mx-auto max-w-[420px]' : ''}`}
                label={platform.name}
                priority
                ratio={platform.imageRatio}
                recorte={platform.imageRecorte}
                sizes="(max-width: 980px) 100vw, 50vw"
                src={platform.image}
                video={platform.video}
              />
            </div>

            {platform.quando?.length > 0 && (
              <div className="reveal mt-[70px] max-mob:mt-12">
                {platform.quandoKicker ? (
                  <h2 className="m-0 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                    {platform.quandoKicker}
                  </h2>
                ) : (
                  <h2 className="m-0 text-[clamp(21px,2.2vw,27px)] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                    {t('quandoTitulo')}
                  </h2>
                )}
                <ul
                  className={`m-0 mt-6 grid list-none gap-[18px] p-0 max-tab:grid-cols-1 ${
                    typeof platform.quando[0] === 'string' ? 'grid-cols-3' : 'grid-cols-2'
                  }`}
                >
                  {platform.quando.map((item, i) => {
                    const isCard = typeof item !== 'string'
                    const Icone = platform.quandoIcones?.[i]
                    return (
                      <li
                        className="ticks rounded-[16px] border border-line bg-white p-6 text-[15.5px] leading-relaxed text-ink-soft max-mob:p-5"
                        key={isCard ? item.title : item}
                      >
                        {Icone && <Icone className="mb-3 text-orange" size={24} />}
                        {isCard ? (
                          <>
                            <p className="m-0 mb-2 font-extrabold text-ink">{item.title}</p>
                            <p className="m-0">{item.text}</p>
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    )
                  })}
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
                title={platform.blocosTitle}
                className="reveal mb-[34px]"
              />
              <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
                {platform.blocos.map((bloco, i) => {
                  const Icone = platform.blocosIcones?.[i]
                  return (
                    <article
                      className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                      key={bloco.title}
                    >
                      {Icone && <Icone className="mb-4 text-orange" size={24} />}
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
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {ativos.length > 0 && (
          <section className="border-t border-line bg-bone py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading title={t('ativosEmDestaque')} className="reveal mb-[34px]" />
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
                title={t('comoFuncionaSobDemanda')}
                className="reveal mb-[34px]"
              />
              <ol className="m-0 grid list-none grid-cols-3 gap-[18px] p-0 max-tab:grid-cols-2 max-mob:grid-cols-1">
                {platform.passos.map((passo, i) => (
                  <li
                    className="ticks reveal flex flex-col rounded-[16px] border border-line bg-white p-6 max-mob:p-5"
                    key={passo.title}
                  >
                    <div className="flex items-center justify-between">
                      <span className="display text-[30px] leading-none text-orange">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {passo.Icone && <passo.Icone size={24} className="text-orange" />}
                    </div>
                    <h3 className="m-0 mt-5 text-[17px] font-extrabold leading-tight text-ink">
                      {passo.title}
                    </h3>
                    <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                      {comDestaque(passo.text)}
                    </p>
                  </li>
                ))}
              </ol>
              {platform.passosFases?.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
                  {platform.passosFases.map((fase) => (
                    <div
                      className="reveal rounded-[16px] border border-line bg-bone p-6 max-mob:p-5"
                      key={fase.title}
                    >
                      <span className="eyebrow text-orange">{fase.title}</span>
                      <p className="m-0 mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                        {fase.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {platform.passosVideo && (
                <CoverMedia
                  className="reveal mt-8"
                  label={t('sobDemanda')}
                  ratio="16/9"
                  video={platform.passosVideo}
                />
              )}
            </div>
          </section>
        )}

        {/* Produtos substituem o diagrama de proporções onde existem: o handoff
            trocou a lista de formatos pelos cards de produto. Onde a plataforma
            ainda não tem produto de catálogo (Aeroporto), o diagrama continua
            sendo o que descreve o formato. Rodovias não tem nenhum dos dois:
            marcada com `semFormatos`, ela pula a seção inteira. */}
        {mostraFormatos && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              {produtos.length > 0 ? (
                <>
                  <SectionHeading
                    title={produtos.length === 1 ? 'Produto' : 'Produtos'}
                    className="reveal mb-[34px]"
                  />
                  <div
                    className={
                      produtos.length === 1
                        ? 'grid max-w-[640px] grid-cols-1'
                        : 'grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1'
                    }
                  >
                    {produtos.map((produto) => (
                      <ProdutoCard key={produto.slug} produto={produto} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <SectionHeading title={t('formatos')} className="reveal mb-[34px]" />
                  <FormatSpecCard formats={platform.formats} />
                </>
              )}
            </div>
          </section>
        )}

        {platform.mapaRede && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading title={t('mapaDaRede')} className="reveal mb-[34px]" />
              <p className="reveal mb-8 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                {t('mapaDaRedeLead')}
              </p>
              <MapaRodovias />

              {/* As capturas dos dois mapas têm proporções opostas (uma em
                  retrato, outra em paisagem) e os marcadores vão até a borda
                  de cada uma: cortar com `object-cover` levaria Curitiba ou
                  Itajaí. A caixa quadrada com a imagem contida é o que deixa
                  os dois cards da mesma altura sem perder marcador nenhum. */}
              {platform.mapasExternos && (
                <div className="mt-[18px] grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
                  {platform.mapasExternos.map((mapa) => (
                    <article
                      className="ticks reveal flex flex-col overflow-hidden rounded-[16px] border border-line bg-white"
                      key={mapa.id}
                    >
                      <div className="relative aspect-square w-full bg-bone">
                        <Image
                          alt={t(`mapasExternos.${mapa.id}.alt`)}
                          className="object-contain"
                          fill
                          sizes="(max-width: 560px) 100vw, 50vw"
                          src={mapa.image}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-7 max-mob:p-5">
                        <h3 className="text-[19px] font-bold leading-tight text-ink">
                          {t(`mapasExternos.${mapa.id}.titulo`)}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-ink-soft">
                          {t(`mapasExternos.${mapa.id}.texto`)}
                        </p>
                        <a
                          className="btn btn-ghost mt-auto self-start max-mob:whitespace-normal max-mob:text-center"
                          href={mapa.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {t(`mapasExternos.${mapa.id}.botao`)}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {cases.length > 0 && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <SectionHeading title={t('cases')} className="reveal mb-[34px]" />
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

        {/* Cartaz pronto do cliente, com título e fundo já desenhados na peça:
            sobe sem SectionHeading, que duplicaria o título da imagem. Só
            Digital Signage traz `clientesImage` hoje. */}
        {platform.clientesImage && (
          <section className="border-t border-line py-[90px] max-mob:py-[60px]">
            <div className="wrap">
              <CoverMedia
                alt={platform.clientesImageAlt}
                className="reveal mx-auto max-w-[960px]"
                label={platform.name}
                ratio="16/9"
                sizes="(max-width: 980px) 100vw, 960px"
                src={platform.clientesImage}
              />
            </div>
          </section>
        )}

        <section className="border-t border-line py-[90px] max-mob:py-[60px]">
          <div className="wrap">
            <PlatformFaq faqs={platform.faqs} platformName={platform.name} />
          </div>
        </section>

        <Process title={tProcess('tituloComoContratar')} />

        <NovaCampanha contexto={platform.name} />
      </main>
    </>
  )
}
