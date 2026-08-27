import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { AMBIENTAL_PRATICAS, AMBIENTAL_REALIDADE } from '@/lib/esg'

const DESCRIPTION =
  'Praça de Carregamento Elétrico, Praça Pet Batel e Jardim Vertical, o ciclo da lona e as práticas que reduzem o impacto da operação: a frente ambiental da Outdoormídia no Paraná e em Santa Catarina.'

export const metadata = {
  title: 'Ambiental | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre/ambiental' },
  // TODO(Imagine): remover o `robots` quando a foto da Praça de Carregamento
  // Elétrico existir. É o único item que bloqueia a publicação da página —
  // sem ela a seção 01 não sustenta o peso que ganhou.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Ambiental | Outdoormídia',
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
              Ocupar a cidade por 67 anos cria obrigação com ela. Nossa resposta não é
              relatório: são praças entregues, painéis vivos e lona que volta como produto.
              Mídia exterior que devolve na prática para o espaço que ela ocupa.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="realidade">
          <div className="wrap">
            <SectionHeading num="01" title="O que já é realidade" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Não falamos de intenção ambiental. Falamos de estrutura entregue, com endereço,
              manutenção por nossa conta e uso público diário. Cada projeto abaixo é um ativo
              de mídia exterior que a cidade usa mesmo quando não está olhando para a marca.
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {AMBIENTAL_REALIDADE.map((p) => (
                <article
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.slug}
                >
                  <CoverMedia
                    src={p.image}
                    alt={p.title}
                    label={p.title}
                    ratio="16/9"
                    sizes="(max-width: 980px) 100vw, 33vw"
                    className="mb-1"
                  />
                  <span className="eyebrow">{p.tag}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {p.title}
                  </h2>
                  {p.text.map((paragrafo) => (
                    <p
                      className="m-0 text-[15.5px] leading-relaxed text-ink-soft"
                      key={paragrafo}
                    >
                      {paragrafo}
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <p className="reveal mt-[34px] max-w-[70ch] text-[15.5px] leading-relaxed text-ink-soft">
              Todos integram a carteira <strong className="font-extrabold text-ink">Gentileza
              Urbana</strong>, que reúne ainda o MUB Garden, primeiro mobiliário urbano digital
              de Curitiba com jardim vivo, o Jardim Digital e as demais praças pet da cidade.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="ciclo-da-lona">
          <div className="wrap">
            <SectionHeading num="02" title="O ciclo da lona" className="reveal mb-[34px]" />
            <div className="ticks reveal rounded-[16px] border border-line bg-white p-10 max-mob:p-7">
              <h2 className="m-0 max-w-[24ch] text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                A lona sai da face e volta como produto.
              </h2>
              <div className="mt-6 flex max-w-[62ch] flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                <p className="m-0">
                  Toda campanha impressa termina com uma lona retirada. O destino padrão do
                  setor é o aterro. O nosso não é.
                </p>
                <p className="m-0">
                  A Outdoormídia doa, sem custo, as lonas publicitárias que já cumpriram o
                  ciclo de exibição. Costureiras capacitadas transformam o material em ecobags
                  e outros produtos, gerando renda e tirando o resíduo de circulação. Economia
                  circular com processo verificável, não com selo comprado.
                </p>
                <p className="m-0">
                  A iniciativa faz parte do programa Corajosamente Éticos, e todo o resultado é
                  destinado a projeto social parceiro.
                </p>
              </div>
              <Link
                className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
                href="/sobre/social"
              >
                Conheça o programa completo
                <span
                  aria-hidden
                  className="text-base transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="operacao">
          <div className="wrap">
            <SectionHeading
              num="03"
              title="Como a operação reduz impacto"
              className="reveal mb-[34px]"
            />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Painel iluminado consome energia e face impressa gera resíduo. São duas contas
              que a mídia exterior paga todo mês, e que a nossa operação trata como decisão
              técnica, não como discurso.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {AMBIENTAL_PRATICAS.map((p) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.slug}
                >
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {p.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
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
