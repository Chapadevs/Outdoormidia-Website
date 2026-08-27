import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'

const DESCRIPTION =
  'Corajosamente Éticos, Loja OM do Bem e Mídia Regenerativa: os valores, a economia circular da lona e o primeiro ativo de mídia exterior conectado à Muralha Digital de Curitiba.'

export const metadata = {
  title: 'Social | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre/social' },
  openGraph: {
    title: 'Social | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function SocialPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Sobre nós', href: '/sobre' }, { label: 'Social' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Sobre nós · Social</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Social.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              A Outdoormídia entende que liderança de mercado não se constrói apenas com
              inovação, tecnologia e presença urbana. Ela também se sustenta por meio de
              valores claros, coerência e responsabilidade institucional.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="corajosamente-eticos">
          <div className="wrap">
            <SectionHeading num="01" title="Corajosamente Éticos" className="reveal mb-[34px]" />
            <p className="reveal mb-6 max-w-[62ch] text-lg text-ink-soft">
              A Outdoormídia integra o Corajosamente Éticos, movimento global que promove a
              ética pessoal e profissional como base da transformação social, enfrentando a
              cultura da corrupção e defendendo um mercado justo.
            </p>
            <div className="reveal flex max-w-[62ch] flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
              <p className="m-0">
                Não é ação pontual nem campanha institucional. É compromisso contínuo com
                integridade e coerência nas relações internas e externas, incorporado à nossa
                cultura organizacional e orientando decisões, comportamentos e iniciativas.
              </p>
              <p className="m-0">
                Para quem contrata mídia exterior, isso tem efeito prático: a mesma régua que
                aplicamos internamente é a que rege o contrato, a negociação e o que prometemos
                na rua.
              </p>
            </div>
            <a
              className="group reveal mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
              href="https://corajosamenteeticos.com.br"
              rel="noreferrer"
              target="_blank"
            >
              Conheça o movimento
              <span
                aria-hidden
                className="text-base transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="loja-om-do-bem">
          <div className="wrap">
            <SectionHeading num="02" title="Loja OM do Bem" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 items-start gap-[34px] max-tab:grid-cols-1">
              {/* TODO(Imagine): ecobag de lona reaproveitada, ou a loja montada. */}
              <CoverMedia
                src=""
                label="Loja OM do Bem"
                ratio="16/10"
                sizes="(max-width: 980px) 100vw, 50vw"
                className="reveal"
              />
              <div>
                <h2 className="reveal m-0 max-w-[22ch] text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  A lona que sai da face vira renda.
                </h2>
                <div className="reveal mt-6 flex flex-col gap-4 text-[16.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">
                    A Loja OM do Bem é a iniciativa prática dentro do Corajosamente Éticos. Ela
                    materializa o compromisso da Outdoormídia com responsabilidade social,
                    economia circular e engajamento interno.
                  </p>
                  <p className="m-0">
                    Doamos, sem custo, as lonas publicitárias que já cumpriram seu ciclo de
                    exibição. Costureiras capacitadas transformam o material em ecobags e
                    outros produtos, gerando renda e tirando resíduo de circulação. Esses itens
                    são vendidos na Loja, junto de snacks e produtos rotativos.
                  </p>
                  <p className="m-0">
                    Todo o lucro é destinado integralmente à ONG Caminho do Renascer.
                  </p>
                </div>
              </div>
            </div>

            <div className="ticks reveal mt-[34px] rounded-[16px] border border-line bg-white p-10 max-mob:p-7">
              <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                Caminho do Renascer
              </h3>
              <div className="mt-4 flex max-w-[62ch] flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
                <p className="m-0">
                  Fundada em 2009 por voluntários da própria comunidade, a Caminho do Renascer
                  acolhe crianças, adolescentes e famílias em situação de vulnerabilidade no
                  bairro Campo Comprido, em Curitiba.
                </p>
                <p className="m-0">
                  Grande parte dessas famílias vive em condições precárias na área de
                  preservação da bacia do Rio Barigui, sem infraestrutura adequada e exposta a
                  risco de alagamento e insalubridade, com presença pública ainda pontual. É
                  onde o resultado da Loja chega.
                </p>
              </div>
            </div>

            <p className="reveal mt-[34px] max-w-[70ch] text-[15.5px] leading-relaxed text-ink-soft">
              A Loja OM do Bem não é produto comercial nem plataforma de mídia. Não integra o
              portfólio OOH. É uma ação de cultura e ética corporativa.
            </p>

            <Link
              className="group reveal mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-orange"
              href="/sobre/ambiental"
            >
              Veja o ciclo completo da lona
              <span
                aria-hidden
                className="text-base transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="rede-a-servico-da-cidade">
          <div className="wrap">
            <SectionHeading
              num="03"
              title="A rede a serviço da cidade"
              className="reveal mb-[34px]"
            />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O futuro do OOH não será definido pela capacidade de gerar visibilidade. Será
              definido pela capacidade de gerar valor.
            </p>
            <article className="ticks reveal grid grid-cols-2 items-start gap-[34px] rounded-[16px] border border-line bg-white p-10 max-tab:grid-cols-1 max-mob:p-7">
              {/* TODO(Imagine): estrutura na Praça Pet Batel, de preferência com o
                  botão de emergência. */}
              <CoverMedia
                src=""
                label="Mídia Regenerativa"
                ratio="16/10"
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <div>
                <span className="eyebrow">Pioneirismo · Segurança urbana</span>
                <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  Mídia Regenerativa
                </h2>
                <div className="mt-5 flex flex-col gap-4 text-[15.5px] leading-relaxed text-ink-soft">
                  <p className="m-0">
                    Praça Pet Batel. O primeiro ativo de mídia exterior conectado à Muralha
                    Digital de Curitiba, o sistema de monitoramento e inteligência urbana da
                    cidade.
                  </p>
                  <p className="m-0">
                    A estrutura continua cumprindo sua função de conectar marcas e pessoas, mas
                    passa a contribuir também para a segurança pública e a qualidade do espaço
                    urbano. São monitoramento integrado à Muralha Digital e um botão de
                    emergência instalado para apoio em situações de vulnerabilidade, em um dos
                    espaços de convivência mais usados da cidade.
                  </p>
                  <p className="m-0">
                    Somos pioneiros na integração entre mídia exterior e segurança urbana em
                    Curitiba. Em um mercado que discute ESG e cidades inteligentes, esta é a
                    diferença entre ocupar um espaço e qualificar um espaço.
                  </p>
                  <p className="m-0">
                    Para o anunciante, é a chance de estar em uma estrutura que a cidade
                    reconhece como útil. Presença urbana também é responsabilidade urbana, e a
                    melhor comunicação é a que deixa legado.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
