import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import LeadCta from '@/components/sections/LeadCta'
import {
  AMBIENTAL_AUTORIDADE,
  AMBIENTAL_COMPROMISSOS,
  AMBIENTAL_INDICADORES,
  AMBIENTAL_PRODUTOS,
} from '@/lib/esg'

const DESCRIPTION =
  'Gestão de resíduos de lona, iluminação LED, origem da energia dos painéis e contrapartida em mobiliário urbano: os compromissos ambientais da operação da Outdoormídia no Paraná e em Santa Catarina.'

const indicadores = AMBIENTAL_INDICADORES.filter((i) => i.n)

export const metadata = {
  title: 'Ambiental — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre/ambiental' },
  // TODO(cliente): remover o `robots` quando os números e as certificações
  // forem preenchidos em lib/esg.js — até lá a página não deve ser indexada.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Ambiental — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function AmbientalPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Sobre nós', href: '/sobre' }, { label: 'Ambiental' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Sobre nós · Ambiental</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Ambiental.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Mídia exterior ocupa a cidade — e isso vem com conta. Aqui só entra compromisso
              com número e com prazo: o que a operação faz com a lona que sai da face, com a
              energia que acende o painel e com o espaço que ocupa na rua.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="compromissos">
          <div className="wrap">
            <SectionHeading num="01" title="Compromissos" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Quatro frentes que dependem da nossa operação, não de intenção. Cada uma com meta
              e data — quando o número está fechado, ele aparece aqui.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {AMBIENTAL_COMPROMISSOS.map((c) => (
                <div
                  className={`ticks reveal flex flex-col gap-3 rounded-[16px] border border-line p-7 max-mob:p-6 ${
                    c.n ? 'bg-white' : 'bg-bone'
                  }`}
                  key={c.slug}
                >
                  <span className="eyebrow">{c.meta}</span>
                  {c.n ? (
                    <span className="display text-[44px] leading-none text-orange">{c.n}</span>
                  ) : null}
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {c.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{c.text}</p>
                  {c.n ? null : (
                    <span className="mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-line-2">
                      Em breve
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="produtos-verdes">
          <div className="wrap">
            <SectionHeading
              num="02"
              title="Projetos de menor impacto"
              className="reveal mb-[34px]"
            />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Onde o posicionamento ambiental da marca aparece na própria estrutura de mídia.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
              {AMBIENTAL_PRODUTOS.map((p) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={p.href}
                  key={p.href}
                >
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {p.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {p.cta}
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

        <section className="pb-[110px] max-mob:pb-[72px]" id="autoridade">
          <div className="wrap">
            <SectionHeading num="03" title="Autoridade externa" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O que outra parte atesta sobre a nossa operação. Sem selo verificável, é só
              adjetivo.
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {AMBIENTAL_AUTORIDADE.map((a) => {
                const conteudo = (
                  <>
                    <span className="eyebrow">{a.tipo}</span>
                    <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                      {a.title}
                    </h2>
                    <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{a.text}</p>
                    <span
                      className={`mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] ${
                        a.url ? 'text-orange' : 'text-line-2'
                      }`}
                    >
                      {a.url ? 'Ver comprovação →' : 'Em breve'}
                    </span>
                  </>
                )

                return a.url ? (
                  <a
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                    href={a.url}
                    key={a.slug}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {conteudo}
                  </a>
                ) : (
                  <div
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-bone p-7 max-mob:p-6"
                    key={a.slug}
                  >
                    {conteudo}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {indicadores.length === AMBIENTAL_INDICADORES.length && (
          <section className="pb-[110px] max-mob:pb-[72px]" id="indicadores">
            <div className="wrap">
              <SectionHeading num="04" title="Indicadores" className="reveal mb-[34px]" />
              <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
                Os números do último ano fechado, atualizados quando o balanço da operação sai.
              </p>
              <StatGrid stats={indicadores} size="md" className="reveal" />
            </div>
          </section>
        )}

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
