import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import NovaCampanha from '@/components/sections/NovaCampanha'
import ProgramaticaBlocos from '@/components/sections/ProgramaticaBlocos'
import { DADO_MERCADO, MODELOS, SSPS } from '@/lib/programatica'
import { WA_PROGRAMATICA_AGENCIA, waLinkOrigem } from '@/lib/whatsapp'

const DESCRIPTION =
  'O inventário da Outdoormídia está conectado às principais SSPs do mercado: compre as telas da nossa operação pela DSP que a sua agência ou trading desk já usa.'

export const metadata = {
  title: 'Mídia Programática | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/area-do-anunciante/programatica' },
  openGraph: {
    title: 'Mídia Programática | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function ProgramaticaPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Mídia Programática' },
          ]}
        />

        {/* Única página do site com hero escuro. A exceção de paleta é a mesma
            do card de Mídia Programática na home, e pela mesma razão:
            tecnologia e público ultraqualificado. Do bloco de SSPs em diante a
            paleta volta ao normal. */}
        <section className="bg-ink pb-[86px] pt-[54px] text-white max-mob:pb-[62px] max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal text-white/70">
              Área do anunciante · DOOH programático
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)]">
              Mídia
              <br />
              programática.
            </h1>
            {/* A primeira frase é a ponte para quem não conhece o assunto. A
                segunda é a informação que a agência veio buscar. */}
            <p className="reveal mt-6 max-w-[62ch] text-lg text-white/[.92]">
              A mesma rua, comprada como mídia digital. Nosso inventário está conectado às
              principais SSPs do mercado, o que permite comprar as telas da Outdoormídia pela
              DSP que a sua operação já usa.
            </p>

            {/* Credencial de canal, e credencial se lê de passagem: linha de
                texto, nunca card com número grande. A fonte anda junto com o
                dado, sempre. */}
            {DADO_MERCADO.publicado && (
              <div className="reveal mt-9 max-w-[62ch] border-l-2 border-orange pl-5">
                <p className="m-0 text-[17px] leading-relaxed text-white/[.92]">
                  {DADO_MERCADO.texto}
                </p>
                <p className="m-0 mt-2.5 text-[13px] text-white/60">{DADO_MERCADO.fonte}</p>
              </div>
            )}
          </div>
        </section>

        {/* Bloco mais importante da página, e por isso o primeiro: é a única
            coisa aqui que a concorrência regional não diz sem provar. */}
        <section className="py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <div className="eyebrow reveal">Conexões ativas</div>
            <h2 className="reveal m-0 mt-3.5 max-w-[20ch] text-balance text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
              A Outdoormídia está plugada nestas SSPs.
            </h2>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Nosso inventário está conectado às principais SSPs do mercado, que recebem e
              processam as demandas vindas de trading desks e DSPs. Se a sua operação já
              compra por uma delas, as nossas telas já estão ao seu alcance.
            </p>

            {/* Lista de texto com destaque tipográfico enquanto a autorização de
                uso das logos não sai. O bloco não sai da página em hipótese
                alguma; o que muda é a forma. */}
            <div className="mt-11 grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {SSPS.map((grupo) => (
                <div
                  className="ticks reveal rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={grupo.titulo}
                >
                  <span className="eyebrow">{grupo.titulo}</span>
                  <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-3 gap-y-2.5 p-0">
                    {grupo.nomes.map((nome) => (
                      <li
                        className="rounded-full border border-line px-4 py-2 text-[16px] font-extrabold leading-none text-ink"
                        key={nome}
                      >
                        {nome}
                      </li>
                    ))}
                  </ul>
                  {grupo.nota && (
                    <p className="m-0 mt-5 text-[14px] text-ink-soft">{grupo.nota}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bone py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <div className="eyebrow reveal">Tipos de venda</div>
            <h2 className="reveal m-0 mt-3.5 max-w-[24ch] text-balance text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
              Três formas de fechar, conforme a garantia que a campanha precisa.
            </h2>

            <div className="mt-11 grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {MODELOS.map((modelo) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={modelo.sigla}
                >
                  <span className="text-[34px] font-extrabold leading-none text-orange">
                    {modelo.sigla}
                  </span>
                  <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {modelo.nome}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                    {modelo.texto}
                  </p>
                </div>
              ))}
            </div>

            {/* Sem esta linha o bloco expulsa exatamente quem a página deveria
                educar: o anunciante que leu os três e não se reconheceu em
                nenhum. */}
            <p className="reveal mt-9 max-w-[62ch] text-[15px] text-ink-soft">
              Se ainda não estiver claro qual modelo se aplica ao seu caso, o time comercial
              define junto com a sua agência ou trading desk.
            </p>
          </div>
        </section>

        <ProgramaticaBlocos />

        <section className="pb-[70px] max-mob:pb-12">
          <div className="wrap">
            <p className="reveal m-0 text-[15px] text-ink-soft">
              Compra por trading desk e quer falar direto com o comercial?{' '}
              <a
                className="font-bold text-orange hover:underline"
                href={waLinkOrigem(WA_PROGRAMATICA_AGENCIA, 'programatica')}
              >
                Fale com um especialista no WhatsApp.
              </a>
            </p>
          </div>
        </section>

        <NovaCampanha contexto="Mídia Programática" />
      </main>
      <Footer />
    </>
  )
}
