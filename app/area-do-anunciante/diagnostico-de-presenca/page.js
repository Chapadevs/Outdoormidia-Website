import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import EscadaPresenca from '@/components/ui/EscadaPresenca'
import DiagnosticoQuiz from '@/components/forms/DiagnosticoQuiz'

const DESCRIPTION =
  'Responda 10 perguntas em um minuto e descubra em qual dos cinco degraus da Escada da Presença a sua marca está hoje, e o que fazer para subir.'

export const metadata = {
  title: 'Diagnóstico de Presença de Marca | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/area-do-anunciante/diagnostico-de-presenca' },
  openGraph: {
    title: 'Diagnóstico de Presença de Marca | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function DiagnosticoDePresencaPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Diagnóstico de presença' },
          ]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Diagnóstico · <b>10 perguntas</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              Diagnóstico de
              <br />
              presença de marca.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Toda marca ocupa um espaço na cabeça do cliente. Responda em apenas um minuto, e
              descubra em qual degrau a sua está hoje.
            </p>
            <p className="eyebrow reveal mt-7">
              Presença gera lembrança. Lembrança gera escolha. <b>Escolha gera resultados.</b>
            </p>
          </div>
        </section>

        {/* A Escada da Presença em estado neutro. O mesmo componente reaparece no
            resultado com o degrau da pessoa aceso. */}
        <section className="pb-[54px] max-mob:pb-9">
          <div className="wrap">
            <h2 className="reveal m-0 max-w-[28ch] text-balance text-[clamp(26px,3.4vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
              Referência não é sorte. Ninguém chega ao topo de uma vez.
            </h2>
            <p className="reveal mt-5 max-w-[74ch] text-ink-soft">
              No Brasil, a mídia exterior alcança 89% da população e é o segundo meio mais consumido
              do país. O espaço existe, e ele já está ocupado por alguém. A pergunta nunca foi se a
              sua marca pode ser vista, e sim quantas vezes ela já foi vista pela mesma pessoa,
              porque é a repetição que transforma quem viu em quem lembra.
            </p>
            <p className="reveal mt-4 max-w-[74ch] text-ink-soft">
              Toda empresa ocupa um degrau nessa escala, e cada degrau muda a forma como o cliente
              decide. Antes de responder, veja o caminho inteiro.
            </p>

            <EscadaPresenca className="reveal mt-9 max-mob:mt-7" />

            <p className="reveal mt-4 text-[12.5px] text-ink-soft/70">
              Fonte: Kantar Ibope Media, Target Group Index, 2024.
            </p>
          </div>
        </section>

        <DiagnosticoQuiz />
      </main>
      <Footer />
    </>
  )
}
