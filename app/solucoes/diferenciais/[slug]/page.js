import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import {
  DIFERENCIAIS_COM_PAGINA,
  getDiferencialBySlug,
  getOutrosDiferenciais,
} from '@/lib/diferenciais'
import { waDiferencial, waLink } from '@/lib/whatsapp'

const CARD = 'ticks rounded-[16px] border border-line bg-white p-7 max-mob:p-6'

// Só os diferenciais com página própria geram rota. Os que viram âncora para a
// plataforma ou para a seção da home aparecem como card, e o teaser de "Outros
// diferenciais" leva o leitor até lá pelo `href` deles.
export function generateStaticParams() {
  return DIFERENCIAIS_COM_PAGINA.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const diferencial = getDiferencialBySlug(slug)
  if (!diferencial) return { title: 'Diferencial não encontrado | Outdoormídia' }

  // `seo` só existe onde o documento de copy fechou title e description
  // próprios; sem ele vale o padrão, montado do nome e do texto de abertura.
  const title = diferencial.seo?.title ?? `${diferencial.title} | Outdoormídia`
  const description = diferencial.seo?.description ?? diferencial.intro
  return {
    title,
    description,
    alternates: { canonical: `/solucoes/diferenciais/${diferencial.slug}` },
    openGraph: { title, description, locale: 'pt_BR', type: 'website' },
  }
}

export default async function DiferencialPage({ params }) {
  const { slug } = await params
  const diferencial = getDiferencialBySlug(slug)
  if (!diferencial) notFound()

  const {
    aside,
    oQueE,
    prova,
    aplicacao,
    comparativo,
    ctaSecundario,
    monitoramento,
    relatorio,
    leitura,
    privacidade,
  } = diferencial
  // Toda seção é opcional: some quando o diferencial não traz o campo, em vez
  // de exibir número que o cliente não confirmou.
  //
  // São duas comparações diferentes, e nunca convivem na mesma página: a antiga
  // é o esquema de blocos que fecha a "Aplicação prática", a nova é a de foto
  // Amador/Especialista, que vive em seção própria.
  const { comparativo: comparativoBlocos, miniCase } = aplicacao ?? {}
  const outros = getOutrosDiferenciais(slug)
  // "O que é" depende do `lead`: um `oQueE` só com `cards` existe para alimentar
  // os marcadores do card na home, sem abrir a seção na página dedicada.
  const leadOQueE = oQueE?.lead ? (Array.isArray(oQueE.lead) ? oQueE.lead : [oQueE.lead]) : null
  // O hero usa `subtitulo` onde o documento de copy separou o texto da página do
  // texto do card da home; sem ele os dois continuam sendo o mesmo `intro`.
  const textoHero = diferencial.subtitulo ?? diferencial.intro

  // A numeração acompanha as seções que sobraram, para não abrir buraco.
  let secao = 0
  const proximoNum = () => String(++secao).padStart(2, '0')

  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Soluções', href: '/solucoes' },
            { label: 'Diferenciais', href: '/solucoes/diferenciais' },
            { label: diferencial.title },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div
              className={
                aside
                  ? 'grid grid-cols-[1.15fr_0.85fr] items-end gap-12 max-tab:grid-cols-1 max-tab:gap-[34px]'
                  : ''
              }
            >
              <div>
                <div className="eyebrow reveal">
                  Diferencial <b className="text-orange">{diferencial.num}</b> · Soluções
                </div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {diferencial.heading}
                </h1>
                <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">{textoHero}</p>
                {/* `semCta` é decisão de copy, não falta de conteúdo: onde os
                    botões saíram, o subtítulo é o único lugar da página em que a
                    tese aparece escrita. */}
                {!diferencial.semCta && (
                  <div className="reveal mt-[30px] flex flex-wrap gap-3">
                    <a href={waLink(waDiferencial(diferencial.title))} className="btn btn-fill">
                      {diferencial.ctaLabel}
                    </a>
                    {ctaSecundario ? (
                      <Link href={ctaSecundario.href} className="btn btn-ghost">
                        {ctaSecundario.label} →
                      </Link>
                    ) : (
                      aplicacao && (
                        <a href="#aplicacao" className="btn btn-ghost">
                          Ver na prática
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
              {aside && (
                <div className={`${CARD} reveal`}>
                  <span className="display text-[30px] leading-none text-orange">
                    {diferencial.num}
                  </span>
                  <p className="m-0 mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                    {aside.text}
                  </p>
                  {aside.footer && (
                    <div className="mt-[22px] border-t border-line pt-[18px] text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                      {aside.footer}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Capa só quando existe: painel bege vazio na primeira dobra é pior
                que capa nenhuma. */}
            {diferencial.image && (
              <CoverMedia
                src={diferencial.image}
                alt={diferencial.imageAlt}
                label={diferencial.title}
                ratio="16/7"
                sizes="100vw"
                className="reveal mt-12 max-tab:mt-9"
              />
            )}
          </div>
        </section>

        {leadOQueE && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading num={proximoNum()} title="O que é" className="reveal mb-[34px]" />
              <div className="reveal mb-[54px] flex max-w-[62ch] flex-col gap-5 text-lg text-ink-soft">
                {leadOQueE.map((paragrafo) => (
                  <p className="m-0" key={paragrafo}>
                    {paragrafo}
                  </p>
                ))}
              </div>
              {oQueE.image && (
                <CoverMedia
                  src={oQueE.image}
                  alt={oQueE.imageAlt}
                  label={diferencial.title}
                  ratio="16/7"
                  sizes="100vw"
                  className="reveal mb-[54px]"
                />
              )}
              {oQueE.cards && (
                <>
                  {oQueE.cardsTitle && (
                    <h2 className="reveal mb-[26px] text-[21px] font-extrabold leading-tight text-ink">
                      {oQueE.cardsTitle}
                    </h2>
                  )}
                  <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
                    {oQueE.cards.map((card) => (
                      <article className={`${CARD} reveal flex flex-col gap-4`} key={card.title}>
                        <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                          {card.title}
                        </h3>
                        <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                          {card.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* A seção é o vídeo, e é o vídeo que a governa: sem ele os dois
            parágrafos não sustentam uma seção inteira e o conteúdo já está dito
            no hero. */}
        {monitoramento?.video && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading
                num={proximoNum()}
                title={monitoramento.title}
                className="reveal mb-[34px]"
              />
              <div className="reveal mb-[38px] flex max-w-[62ch] flex-col gap-5 text-lg text-ink-soft">
                {monitoramento.paragrafos.map((paragrafo) => (
                  <p className="m-0" key={paragrafo}>
                    {paragrafo}
                  </p>
                ))}
              </div>
              <video
                className="reveal w-full rounded-[16px] border border-line"
                src={monitoramento.video}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
              {monitoramento.imagens?.length > 0 && (
                <div className="mt-[18px] grid grid-cols-4 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
                  {monitoramento.imagens.map((imagem) => (
                    <CoverMedia
                      key={imagem}
                      src={imagem}
                      alt={monitoramento.imagensAlt}
                      label={diferencial.title}
                      ratio="16/10"
                      sizes="(max-width: 980px) 50vw, 25vw"
                      className="reveal"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {relatorio && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading
                num={proximoNum()}
                title={relatorio.title}
                className="reveal mb-[34px]"
              />
              <p className="reveal mb-[38px] max-w-[62ch] text-lg text-ink-soft">
                {relatorio.lead}
              </p>
              {relatorio.image && (
                <CoverMedia
                  src={relatorio.image}
                  alt={relatorio.imageAlt}
                  label={relatorio.title}
                  ratio="16/9"
                  sizes="100vw"
                  className="reveal mb-[38px]"
                />
              )}
              {/* Lista, não card: são oito itens de vocabulário de mídia, e em
                  card eles competiriam entre si em vez de serem lidos em
                  sequência. */}
              <ul className="m-0 grid list-none grid-cols-2 gap-x-[38px] p-0 max-tab:grid-cols-1">
                {relatorio.itens.map((item) => (
                  <li className="reveal border-t border-line py-[22px]" key={item.title}>
                    <h3 className="m-0 text-[17px] font-extrabold leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="m-0 mt-2 text-[15.5px] leading-relaxed text-ink-soft">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="reveal mt-[38px] max-w-[62ch] text-lg font-semibold text-ink">
                {relatorio.fechamento}
              </p>
            </div>
          </section>
        )}

        {leitura && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading
                num={proximoNum()}
                title={leitura.title}
                className="reveal mb-[34px]"
              />
              {/* O período apurado vive na abertura e não sai dali: número de
                  audiência sem período declarado é o que a página combate. */}
              <p className="reveal mb-[38px] max-w-[62ch] text-lg text-ink-soft">{leitura.lead}</p>
              <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line max-mob:grid-cols-1">
                {leitura.dados.map((dado, i) => (
                  <div
                    className={`bg-white px-7 py-[38px] max-mob:px-[22px] max-mob:py-[26px] ${
                      i === 0 ? 'col-span-2 max-mob:col-span-1' : ''
                    }`}
                    key={dado.label}
                  >
                    <div className="display text-[clamp(38px,5vw,64px)] leading-[0.9] text-orange">
                      {dado.n}
                    </div>
                    <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                      {dado.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {privacidade && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading
                num={proximoNum()}
                title={privacidade.title}
                className="reveal mb-[34px]"
              />
              {/* Bloco curto, sem card e sem ícone. */}
              <div className="reveal flex max-w-[62ch] flex-col gap-5 text-lg text-ink-soft">
                {privacidade.paragrafos.map((paragrafo) => (
                  <p className="m-0" key={paragrafo}>
                    {paragrafo}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {prova && (
          <section className="bg-bone py-[110px] max-mob:py-[72px]">
            <div className="wrap">
              <SectionHeading num={proximoNum()} title="A prova" className="reveal mb-[34px]" />
              <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">{prova.lead}</p>
              <StatGrid stats={prova.stats} size="md" className="reveal" />
            </div>
          </section>
        )}

        {aplicacao && (
        <section className="py-[110px] max-mob:py-[72px]" id="aplicacao">
          <div className="wrap">
            <SectionHeading
              num={proximoNum()}
              title="Aplicação prática"
              className="reveal mb-[34px]"
            />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">{aplicacao.lead}</p>

            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {aplicacao.steps.map((step) => (
                <article className={`${CARD} reveal flex flex-col gap-4`} key={step.num}>
                  <span className="display text-[30px] leading-none text-orange">{step.num}</span>
                  <h3 className="m-0 text-[21px] font-extrabold text-ink">{step.title}</h3>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {step.items.map((item) => (
                      <li className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft" key={item}>
                        <span aria-hidden className="text-orange">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-[18px] grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              <article className="reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
                <div className="eyebrow">{comparativoBlocos.sem.label}</div>
                <div className="mt-[18px] grid grid-cols-2 gap-2 rounded-[10px] border border-dashed border-line-2 p-2.5">
                  {comparativoBlocos.sem.blocos.map((bloco) => (
                    <div
                      className="flex h-[78px] items-center justify-center rounded-[10px] bg-ink/[.08] px-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-ink-soft"
                      key={bloco}
                    >
                      {bloco}
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-[18px] text-[15.5px] leading-relaxed text-ink-soft">
                  {comparativoBlocos.sem.text}
                </p>
              </article>
              <article className={`${CARD} reveal`}>
                <div className="eyebrow">
                  Com <b className="text-orange">{comparativoBlocos.com.label}</b>
                </div>
                <div className="mt-[18px] rounded-[10px] border border-orange/35 p-2.5">
                  {comparativoBlocos.com.blocos.map((bloco) => (
                    <div
                      className="flex h-[78px] items-center justify-center rounded-[10px] bg-orange px-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-white"
                      key={bloco}
                    >
                      {bloco}
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-[18px] text-[15.5px] leading-relaxed text-ink-soft">
                  {comparativoBlocos.com.text}
                </p>
              </article>
            </div>

            <div className="reveal mt-[18px] grid grid-cols-[1.2fr_0.8fr] items-center gap-[38px] rounded-[16px] bg-ink p-[38px] text-white max-tab:grid-cols-1 max-tab:gap-7 max-mob:p-7">
              <div>
                <div className="eyebrow text-white/60">{miniCase.eyebrow}</div>
                <h3 className="m-0 mt-4 text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-[-0.02em]">
                  {miniCase.title}
                </h3>
                <p className="m-0 mt-4 max-w-[52ch] text-[15.5px] leading-[1.7] text-white/80">
                  {miniCase.text}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-white/20">
                {miniCase.stats.map((stat) => (
                  <div className="bg-ink p-6 max-mob:p-5" key={stat.label}>
                    <div className="display text-[40px] leading-[0.9] text-orange">{stat.n}</div>
                    <div className="mt-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3.5 text-[13px] text-ink-soft">
              Números do mini-case a confirmar com o time comercial antes de publicar.
            </p>
          </div>
        </section>
        )}

        {comparativo && (
          <section className="pb-[110px] max-mob:pb-[72px]" id="comparacao">
            <div className="wrap">
              <SectionHeading num={proximoNum()} title="Comparação" className="reveal mb-[34px]" />
              <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
                {[comparativo.amador, comparativo.especialista].map((lado) => (
                  <article className={`${CARD} reveal flex flex-col gap-4`} key={lado.label}>
                    <div className="eyebrow">{lado.label}</div>
                    <CoverMedia
                      src={lado.image}
                      alt={lado.imageAlt}
                      label={lado.label}
                      ratio="16/10"
                      sizes="(max-width: 560px) 100vw, 50vw"
                    />
                    {lado.legenda && (
                      <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                        {lado.legenda}
                      </p>
                    )}
                  </article>
                ))}
              </div>
              {/* A nota vale só para o lado Amador, que é mockup: a foto do lado
                  Especialista é campanha real, veiculada. */}
              <p className="reveal mt-[18px] text-[13px] text-ink-soft">{comparativo.nota}</p>
            </div>
          </section>
        )}

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading num={proximoNum()} title="Outros diferenciais" className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/solucoes/diferenciais"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-[18px] max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1">
              {outros.map((outro) => (
                <Link
                  className="ticks reveal flex flex-col gap-2.5 rounded-[16px] border border-line bg-white p-6 text-ink transition-colors duration-200 hover:border-orange max-mob:p-5"
                  href={outro.href}
                  key={outro.slug}
                >
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                    {outro.num}
                  </span>
                  <h3 className="m-0 text-[19px] font-extrabold leading-tight">{outro.title}</h3>
                  {/* `text` é o texto canônico do hub, o mesmo que monta o card
                      na home e na listagem: o teaser não diverge do hub. */}
                  <p className="m-0 text-[13.5px] leading-snug text-ink-soft">{outro.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
