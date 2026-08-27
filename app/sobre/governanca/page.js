import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CoverMedia from '@/components/ui/CoverMedia'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { GOV_PILARES } from '@/lib/esg'
import { WA_GOVERNANCA, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Quem responde pela empresa, licenças dos pontos, exclusividade em contrato, tratamento de dados de audiência e conduta comercial: como a Outdoormídia opera e o que entrega por escrito.'

export const metadata = {
  title: 'Governança | Outdoormídia',
  description: DESCRIPTION,
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
              Aprovar uma compra de mídia exterior exige saber com que licença o ponto opera, o
              que está escrito no contrato e quem assina por ele. Em uma empresa familiar de
              capital fechado, essa última resposta tem nome e sobrenome.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="quem-responde">
          <div className="wrap">
            <SectionHeading num="01" title="Quem responde" className="reveal mb-[34px]" />
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-start gap-[44px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <figure className="reveal m-0">
                {/* TODO(cliente): retrato profissional do Halisson Pontarola, fundo
                    neutro, meio corpo, olhar para a câmera. Não serve recorte de foto
                    de evento nem imagem de palco. */}
                <CoverMedia
                  src=""
                  label="Halisson Pontarola"
                  ratio="16/10"
                  sizes="(max-width: 980px) 100vw, 40vw"
                />
                {/* A legenda identifica quem está na foto. Enquanto o texto ao lado
                    for institucional, ela não pode virar assinatura: isso atribuiria
                    a uma pessoa real uma declaração que ela ainda não aprovou. */}
                <figcaption className="mt-3 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                  Halisson Pontarola, CEO
                </figcaption>
              </figure>
              <div className="reveal flex max-w-[58ch] flex-col gap-5 text-[16.5px] leading-relaxed text-ink-soft">
                <p className="m-0">
                  Reputação em mídia exterior não se constrói durante a campanha. Se constrói
                  no que acontece depois dela.
                </p>
                <p className="m-0">
                  São 67 anos de operação familiar. O ponto instalado hoje continua nosso daqui
                  a dez anos, e o anunciante atendido também. Isso muda como se negocia, o que
                  se promete e o que se recusa a fazer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="estrutura">
          <div className="wrap">
            <SectionHeading num="02" title="Estrutura e compliance" className="reveal mb-[34px]" />
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

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
