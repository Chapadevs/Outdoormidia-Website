import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FaqCategorias from '@/components/sections/FaqCategorias'
import LeadCta from '@/components/sections/LeadCta'

const DESCRIPTION =
  'Dúvidas sobre anunciar em mídia exterior no Paraná e em Santa Catarina: praças, formatos, medição de resultados, exclusividade do ponto e como pedir uma proposta.'

export const metadata = {
  title: 'FAQ — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/anunciante/faq' },
  openGraph: {
    title: 'FAQ — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[{ label: 'Área do anunciante', href: '/anunciante' }, { label: 'FAQ' }]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Área do anunciante · Dúvidas</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Perguntas
              <br />
              frequentes.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              O que o nosso time mais ouve, respondido antes de você precisar perguntar. Se
              faltar alguma, o WhatsApp está no fim da página.
            </p>
          </div>
        </section>

        <FaqCategorias />

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
