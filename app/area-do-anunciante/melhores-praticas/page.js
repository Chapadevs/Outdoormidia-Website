import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import { MATERIAIS } from '@/lib/midiakit'
import { WA_MIDIA_KIT, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Kit comercial, especificações técnicas por plataforma, tabela de praças e assets de marca da Outdoormídia para download.'

export const metadata = {
  title: 'Melhores Práticas | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/area-do-anunciante/melhores-praticas' },
  openGraph: {
    title: 'Melhores Práticas | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function MelhoresPraticasPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Melhores Práticas' },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Área do anunciante · Downloads</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Melhores
              <br />
              Práticas.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              O material para você defender o plano internamente. A ficha técnica completa fica
              no site, em{' '}
              <Link href="/plataformas" className="font-bold text-orange hover:underline">
                Plataformas
              </Link>{' '}
              e o PDF é a versão que vai para a reunião.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Materiais" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {MATERIAIS.map((m) => {
                const disponivel = Boolean(m.file)
                const conteudo = (
                  <>
                    <span className="eyebrow">{m.meta}</span>
                    <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                      {m.title}
                    </h2>
                    <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{m.text}</p>
                    <span
                      className={`mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] ${
                        disponivel ? 'text-orange' : 'text-line-2'
                      }`}
                    >
                      {disponivel ? 'Baixar →' : 'Em breve'}
                    </span>
                  </>
                )

                return disponivel ? (
                  <a
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                    download
                    href={m.file}
                    key={m.slug}
                  >
                    {conteudo}
                  </a>
                ) : (
                  <div
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-bone p-7 max-mob:p-6"
                    key={m.slug}
                  >
                    {conteudo}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  Precisa de um material específico?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Proposta por praça, mockup do seu criativo no ponto ou tabela sob medida para a
                  sua apresentação. É só pedir.
                </p>
              </div>
              <a href={waLink(WA_MIDIA_KIT)} className="btn btn-fill whitespace-nowrap">
                Pedir material
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
