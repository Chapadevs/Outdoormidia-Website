import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import DiagnosticoQuiz from '@/components/forms/DiagnosticoQuiz'

const DESCRIPTION =
  'Responda 7 perguntas e descubra em menos de um minuto se a sua marca é invisível, conhecida ou presente no mercado, e o que fazer a partir disso.'

export const metadata = {
  title: 'Diagnóstico de Presença de Marca | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/diagnostico' },
  openGraph: {
    title: 'Diagnóstico de Presença de Marca | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function DiagnosticoPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Diagnóstico de Marca' }]} />
        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Diagnóstico · <b>7 perguntas</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              Diagnóstico de
              <br />
              presença de marca.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Descubra como sua marca está sendo vista e lembrada no mercado. São 7 perguntas, nota
              de 0 a 10 em cada uma, e um resultado na hora.
            </p>
            <p className="eyebrow reveal mt-7">
              Presença gera lembrança. Lembrança gera escolha. <b>Escolha gera resultados.</b>
            </p>
          </div>
        </section>
        <DiagnosticoQuiz />
      </main>
      <Footer />
    </>
  )
}
