import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import LeadCta from '@/components/sections/LeadCta'
import { GOV_CERTIFICACOES, GOV_DOCUMENTOS, GOV_PILARES } from '@/lib/esg'
import { WA_GOVERNANCA, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Licenças dos pontos, exclusividade em contrato, tratamento de dados de audiência e documentos para cadastro de fornecedor: como a Outdoormídia opera e o que entrega por escrito.'

export const metadata = {
  title: 'Governança | Outdoormídia',
  description: DESCRIPTION,
  // TODO(cliente): remover o `robots` quando as certificações e os PDFs de
  // GOV_CERTIFICACOES/GOV_DOCUMENTOS existirem em lib/esg.js. Mesma régua da
  // página Ambiental.
  robots: { index: false, follow: true },
  alternates: { canonical: '/sobre/governanca' },
  openGraph: {
    title: 'Governança | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function GovernancaPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Sobre nós', href: '/sobre' }, { label: 'Governança' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Sobre nós · Governança</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Governança.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Somos uma empresa de capital fechado: não há estrutura de acionistas para
              apresentar. O que existe é o que sustenta um contrato: ponto licenciado,
              exclusividade por escrito e documento na mão de quem precisa aprovar a compra.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="estrutura">
          <div className="wrap">
            <SectionHeading num="01" title="Estrutura e compliance" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {GOV_PILARES.map((p) => (
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

        <section className="pb-[110px] max-mob:pb-[72px]" id="certificacoes">
          <div className="wrap">
            <SectionHeading num="02" title="Certificações" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O que é atestado por terceiro: mensuração auditada, filiação setorial e
              regularidade fiscal.
            </p>
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {GOV_CERTIFICACOES.map((c) => {
                const conteudo = (
                  <>
                    <span className="eyebrow">{c.meta}</span>
                    <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{c.text}</p>
                    <span
                      className={`mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] ${
                        c.url ? 'text-orange' : 'text-line-2'
                      }`}
                    >
                      {c.url ? 'Ver certificação →' : 'Em breve'}
                    </span>
                  </>
                )

                return c.url ? (
                  <a
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                    href={c.url}
                    key={c.slug}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {conteudo}
                  </a>
                ) : (
                  <div
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-bone p-7 max-mob:p-6"
                    key={c.slug}
                  >
                    {conteudo}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="documentos">
          <div className="wrap">
            <SectionHeading num="03" title="Documentos" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              O pacote que o jurídico e o setor de compras costumam pedir antes de aprovar a
              primeira campanha.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {GOV_DOCUMENTOS.map((d) => {
                const disponivel = Boolean(d.file || d.href)
                const conteudo = (
                  <>
                    <span className="eyebrow">{d.meta}</span>
                    <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                      {d.title}
                    </h3>
                    <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{d.text}</p>
                    <span
                      className={`mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] ${
                        disponivel ? 'text-orange' : 'text-line-2'
                      }`}
                    >
                      {d.href ? 'Ler →' : disponivel ? 'Baixar →' : 'Em breve'}
                    </span>
                  </>
                )

                const classeCard =
                  'ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6'

                if (d.href) {
                  return (
                    <Link className={classeCard} href={d.href} key={d.slug}>
                      {conteudo}
                    </Link>
                  )
                }

                return disponivel ? (
                  <a className={classeCard} download href={d.file} key={d.slug}>
                    {conteudo}
                  </a>
                ) : (
                  <div
                    className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-bone p-7 max-mob:p-6"
                    key={d.slug}
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
                  Precisa de um documento agora?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Certidão para cadastro de fornecedor, minuta de contrato ou dado cadastral
                  para licitação. Diga o que o seu processo exige e enviamos.
                </p>
              </div>
              <a href={waLink(WA_GOVERNANCA)} className="btn btn-fill whitespace-nowrap">
                Solicitar documento
              </a>
            </div>
          </div>
        </section>

        <LeadCta />
      </main>
      <Footer />
    </>
  )
}
