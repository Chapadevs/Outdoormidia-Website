import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import LeadCta from '@/components/sections/LeadCta'
import { SOCIAL_IMPACTO, SOCIAL_PROJETOS } from '@/lib/esg'
import { WA_SOCIAL, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Campanhas de utilidade pública, instituições apoiadas e patrocínio a cultura e esporte: como a rede de mídia exterior da Outdoormídia é usada pelas cidades do Paraná e de Santa Catarina.'

const impacto = SOCIAL_IMPACTO.filter((i) => i.n)

export const metadata = {
  title: 'Social — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/sobre/social' },
  openGraph: {
    title: 'Social — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function SocialPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Sobre nós', href: '/sobre' }, { label: 'Social' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Sobre nós · Social</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Social.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              A mesma face que vende também avisa, arrecada e chama voluntário. Quando a cidade
              precisa falar com ela mesma, a rede está de pé — e é isso que a gente coloca à
              disposição.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="projetos">
          <div className="wrap">
            <SectionHeading num="01" title="Projetos apoiados" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {SOCIAL_PROJETOS.map((p) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.slug}
                >
                  <span className="eyebrow">{p.meta}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {p.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="impacto">
          <div className="wrap">
            <SectionHeading num="02" title="Impacto na cidade" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Curitiba, região metropolitana, litoral e o norte de Santa Catarina: onde a nossa
              rede está, a causa também aparece — no mesmo ponto de maior fluxo que uma marca
              disputaria.
            </p>
            {impacto.length === SOCIAL_IMPACTO.length && (
              <StatGrid stats={impacto} size="md" className="reveal" />
            )}
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <div className="ticks reveal flex items-center justify-between gap-8 rounded-[16px] border border-line bg-bone p-10 max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-7">
              <div>
                <h2 className="m-0 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-tight text-ink">
                  Tem um projeto para propor?
                </h2>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Instituição, coletivo ou campanha de utilidade pública: conte o que precisa
                  comunicar e em qual cidade. A gente avalia o que dá para ceder no período.
                </p>
              </div>
              <a href={waLink(WA_SOCIAL)} className="btn btn-fill whitespace-nowrap">
                Propor projeto
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
