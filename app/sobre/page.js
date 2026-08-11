import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import Institutional from '@/components/sections/Institutional'
import Impact from '@/components/sections/Impact'
import Culture from '@/components/sections/Culture'
import LeadCta from '@/components/sections/LeadCta'
import { MARCOS } from '@/lib/sobre'

const DESCRIPTION =
  'A Outdoormídia coloca marcas nas ruas do Paraná e de Santa Catarina desde 1959: 66 anos de operação própria em mídia exterior, do outdoor impresso ao painel de LED.'

export const metadata = {
  title: 'Sobre nós — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre nós — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Sobre nós' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Desde 1959 · PR + SC</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Sobre nós.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Seis décadas e meia colocando marcas onde a cidade passa. Da negociação à
              instalação, a operação é nossa — e é isso que sustenta o que prometemos na rua.
            </p>
          </div>
        </section>

        <Institutional />
        <Impact />

        <section className="py-[110px] max-mob:py-[72px]" id="linha-do-tempo">
          <div className="wrap">
            <SectionHeading num="01" title="Linha do tempo" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O que mudou desde a primeira face na rua — e o que não mudou.
            </p>
            <ol className="m-0 grid list-none grid-cols-5 gap-[18px] p-0 max-tab:grid-cols-2 max-mob:grid-cols-1">
              {MARCOS.map((m) => (
                <li
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-6"
                  key={m.ano}
                >
                  <span className="display text-[30px] leading-none text-orange">{m.ano}</span>
                  <h3 className="m-0 text-[17px] font-extrabold leading-tight text-ink">
                    {m.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Culture num="02" />

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  Quer trabalhar com a rua?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Não temos vaga aberta o tempo todo, mas temos banco de talentos. Deixe seu
                  currículo e a gente chama quando o time crescer.
                </p>
              </div>
              <Link href="/trabalhe-conosco" className="btn btn-ghost whitespace-nowrap">
                Trabalhe conosco
              </Link>
            </div>
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
