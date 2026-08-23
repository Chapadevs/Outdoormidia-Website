import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LegalDoc from '@/components/ui/LegalDoc'
import { ATUALIZADO_EM, CONTATO_PRIVACIDADE, PRIVACIDADE } from '@/lib/legal'

const DESCRIPTION =
  'Como a Outdoormídia coleta, usa e protege os dados de quem entra em contato pelo site: finalidades, bases legais da LGPD, prazos de guarda e como exercer os seus direitos.'

export const metadata = {
  title: 'Política de Privacidade | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/privacidade' },
  openGraph: {
    title: 'Política de Privacidade | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Política de privacidade' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Jurídico · <b>LGPD</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Política de privacidade.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Que dados pedimos, por que pedimos, com quem compartilhamos e por quanto tempo
              guardamos. Em português, sem letra miúda.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <LegalDoc
            atualizadoEm={ATUALIZADO_EM}
            contato={CONTATO_PRIVACIDADE}
            secoes={PRIVACIDADE}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
