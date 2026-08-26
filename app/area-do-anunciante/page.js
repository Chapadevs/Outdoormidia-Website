import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { WA_ANUNCIANTE, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Diagnóstico de presença, Guia do Anunciante para download, Sua marca no OOH e FAQ: as ferramentas para você resolver sozinho antes de falar com o comercial.'

const FERRAMENTAS = [
  {
    href: '/area-do-anunciante/diagnostico-de-presenca',
    eyebrow: 'Ferramenta · 10 perguntas',
    title: 'Diagnóstico de presença',
    text: 'Descubra em um minuto em qual dos cinco degraus da Escada da Presença a sua marca está, e o que fazer para subir.',
    cta: 'Fazer o diagnóstico',
  },
  {
    href: '/area-do-anunciante/sua-marca-no-ooh',
    eyebrow: 'Ferramenta · Estimativa',
    title: 'Sua marca no OOH',
    text: 'Praça, plataforma e período: veja quantos impactos a campanha gera e a faixa de investimento antes de pedir proposta.',
    cta: 'Simular campanha',
  },
  {
    href: '/area-do-anunciante/guia-do-anunciante',
    eyebrow: 'Downloads',
    title: 'Guia do Anunciante',
    text: 'Kit comercial, especificações técnicas por plataforma, tabela de praças e assets de marca.',
    cta: 'Ver materiais',
  },
  {
    href: '/area-do-anunciante/faq',
    eyebrow: 'Dúvidas',
    title: 'FAQ',
    text: 'Praças, formatos, exclusividade do ponto, medição de resultados e como pedir uma proposta.',
    cta: 'Tirar dúvidas',
  },
]

export const metadata = {
  title: 'Área do anunciante | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/area-do-anunciante' },
  openGraph: {
    title: 'Área do anunciante | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function AnunciantePage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Área do anunciante' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Autoatendimento · 4 ferramentas</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Área do
              <br />
              anunciante.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Tudo o que dá para resolver sem falar com vendedor está aqui. Quando você
              procurar o time comercial, já vai saber o que pedir.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="As ferramentas" className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {FERRAMENTAS.map((f) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={f.href}
                  key={f.href}
                >
                  <span className="eyebrow">{f.eyebrow}</span>
                  <h2 className="m-0 text-[25px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {f.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{f.text}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {f.cta}
                    <span
                      aria-hidden
                      className="text-base transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="reveal mt-9 text-[15px] text-ink-soft">
              Prefere resolver com gente?{' '}
              <a
                href={waLink(WA_ANUNCIANTE)}
                className="font-bold text-orange hover:underline"
              >
                Fale com um especialista no WhatsApp.
              </a>
            </p>
          </div>
        </section>

        <NovaCampanha />
      </main>
      <Footer />
    </>
  )
}
