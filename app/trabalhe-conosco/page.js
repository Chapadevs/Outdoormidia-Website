import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Culture from '@/components/sections/Culture'
import TalentForm from '@/components/forms/TalentForm'

const DESCRIPTION =
  'Faça parte da empresa que ocupa as ruas do Sul do Brasil desde 1959. Cadastre-se no banco de talentos da Outdoormídia e seja avisado quando abrir uma vaga na sua área.'

export const metadata = {
  title: 'Trabalhe Conosco — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/trabalhe-conosco' },
  openGraph: {
    title: 'Trabalhe Conosco — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function TrabalheConoscoPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Trabalhe Conosco' }]} />
        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Carreiras · <b>PR + SC</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Trabalhe conosco.
            </h1>
            <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">
              Há 66 anos colocamos marcas nas ruas do Paraná e de Santa Catarina. Se você quer
              trabalhar com mídia que a cidade inteira vê, seu lugar pode ser aqui.
            </p>
          </div>
        </section>
        <Culture />
        <TalentForm />
      </main>
      <Footer />
    </>
  )
}
