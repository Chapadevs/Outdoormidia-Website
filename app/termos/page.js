import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import LegalDoc from '@/components/ui/LegalDoc'
import { ATUALIZADO_EM, CONTATO_TERMOS, TERMOS } from '@/lib/legal'

const DESCRIPTION =
  'As regras de uso do site da Outdoormídia: propriedade do conteúdo, materiais para download, caráter estimativo do simulador e do diagnóstico, e limites de responsabilidade.'

export const metadata = {
  title: 'Termos de Uso — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/termos' },
  openGraph: {
    title: 'Termos de Uso — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function TermosPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Termos de uso' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Jurídico · <b>Termos</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Termos de uso.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              O que você pode fazer com o conteúdo deste site, o que os nossos números
              significam e até onde vai a responsabilidade de cada lado.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <LegalDoc atualizadoEm={ATUALIZADO_EM} contato={CONTATO_TERMOS} secoes={TERMOS} />
        </section>
      </main>
      <Footer />
    </>
  )
}
