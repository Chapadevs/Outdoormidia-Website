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

const COMPROMISSO = [
  {
    href: '/sobre/ambiental',
    eyebrow: 'Compromisso · Ambiental',
    title: 'Ambiental',
    text: 'Destinação da lona, iluminação LED, origem da energia dos painéis e contrapartida em mobiliário urbano.',
    cta: 'Ver compromissos',
  },
  {
    href: '/sobre/social',
    eyebrow: 'Compromisso · Social',
    title: 'Social',
    text: 'Campanhas de utilidade pública, instituições apoiadas e a rede à disposição quando a cidade precisa avisar.',
    cta: 'Ver projetos',
  },
  {
    href: '/sobre/governanca',
    eyebrow: 'Compromisso · Governança',
    title: 'Governança',
    text: 'Pontos licenciados, exclusividade em contrato e os documentos que o seu jurídico vai pedir.',
    cta: 'Ver documentos',
  },
]

const DESCRIPTION =
  'A Outdoormídia coloca marcas nas ruas do Paraná e de Santa Catarina desde 1959: 67 anos de operação própria em mídia exterior, do outdoor impresso ao painel de LED.'

export const metadata = {
  title: 'Sobre nós | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre nós | Outdoormídia',
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
              67 anos colocando marcas onde a cidade passa. Da negociação à
              instalação, a operação é nossa, e é isso que sustenta o que prometemos na rua.
            </p>

            <div className="reveal mt-[54px] grid grid-cols-[220px_1fr] gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="eyebrow text-orange">Sobre a OM</div>
              <div className="flex max-w-[68ch] flex-col gap-5 text-[15.5px] leading-relaxed text-ink-soft">
                <p className="m-0">
                  Tudo começou em 1959, nas margens das estradas do Paraná, com um balde de
                  cola, papel e uma ideia na cabeça. O Sr. Euclides Aristides Farias não vendia
                  mídia. Ele colava sonhos em painéis de papel, conectando mensagens ao
                  movimento das pessoas que cruzavam as rodovias.
                </p>
                <p className="m-0">
                  Ao lado de seu genro, Hamilton Pontarola, transformou talento em visão e essa
                  visão em negócio. Assim nasceu a Outdoormídia.
                </p>
                <p className="m-0">
                  De uma pequena empresa familiar em Curitiba, viramos referência em Out of
                  Home. Crescemos acompanhando o movimento das ruas, das cidades, da tecnologia
                  e principalmente, das pessoas.
                </p>
                <p className="m-0">
                  Hoje, mais de seis décadas depois, ainda carregamos o mesmo espírito: o de
                  marcar presença de forma inesquecível. Hoje, somos a empresa que lidera a
                  inovação em OOH no Sul do país, com soluções que unem estratégia, tecnologia e
                  inteligência de audiência.
                </p>
                <p className="m-0">
                  Mas essa transformação não aconteceu sozinha. Ela foi construída com cada
                  cliente que acreditou que dava pra fazer diferente e com um time que faz isso
                  acontecer todos os dias, com paixão, técnica e visão de futuro.
                </p>
              </div>
            </div>

            <div className="reveal mt-[54px] grid grid-cols-[220px_1fr] gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="eyebrow text-orange">Presença</div>
              <div className="flex max-w-[68ch] flex-col gap-5">
                <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                  Estamos presentes em Curitiba, Região Metropolitana, Litoral do Paraná,
                  Joinville, Itajaí e Balneário Camboriú, sempre nos pontos de maior fluxo,
                  visibilidade e impacto real.
                </p>
                <ul className="m-0 flex flex-wrap gap-2 p-0">
                  {[
                    'Curitiba',
                    'Região Metropolitana',
                    'Litoral do Paraná',
                    'Joinville',
                    'Itajaí',
                    'Balneário Camboriú',
                  ].map((praca) => (
                    <li
                      className="rounded-full border border-line px-4 py-1.5 text-[13.5px] font-bold text-ink-soft"
                      key={praca}
                    >
                      {praca}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Institutional />
        <Impact />

        <section className="py-[110px] max-mob:py-[72px]" id="linha-do-tempo">
          <div className="wrap">
            <SectionHeading num="01" title="Linha do tempo" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O que mudou desde a primeira face na rua, e o que não mudou.
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

        <section className="pb-[110px] max-mob:pb-[72px]" id="compromisso">
          <div className="wrap">
            <SectionHeading num="03" title="Nosso compromisso" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Ocupar a rua por 67 anos cria obrigação com ela. O que fazemos com os resíduos, o
              que devolvemos para a cidade e o que assinamos em contrato.
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {COMPROMISSO.map((c) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={c.href}
                  key={c.href}
                >
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
