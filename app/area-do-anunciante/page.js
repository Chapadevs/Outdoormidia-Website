import Link from 'next/link'
import { CircleQuestionMark, Gauge, Presentation } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { FAQS } from '@/lib/faq'
import { WA_ANUNCIANTE, waLink } from '@/lib/whatsapp'

const DESCRIPTION =
  'Diagnóstico de presença, Sua marca no OOH e FAQ: as ferramentas para você resolver sozinho antes de falar com o comercial.'

// A ordem não muda: as duas ferramentas interativas primeiro, o FAQ depois.
//
// O card 02 é o mais perigoso da página. A ferramenta aplica logo ou peça
// pronta sobre a foto real do painel, e nada além disso: não há tabela de preço
// nem alcance validado na base para sustentar quantidade de impactos ou faixa de
// investimento. Foram o kicker "Estimativa" e a palavra "Simulador" que criaram
// essa expectativa, e por isso os dois saíram. O nome Simulador OOH fica
// reservado para o dia em que existir cálculo real de audiência ou investimento.
const FERRAMENTAS = [
  {
    href: '/area-do-anunciante/diagnostico-de-presenca',
    Icone: Gauge,
    eyebrow: 'Ferramenta · 10 perguntas',
    title: 'Diagnóstico de presença',
    text: 'Sua marca é lembrada primeiro, ou só reconhecida depois que alguém diz o nome? Em apenas 1 minuto, entenda como o mercado enxerga a sua marca hoje.',
    cta: 'Fazer o diagnóstico',
  },
  {
    href: '/area-do-anunciante/sua-marca-no-ooh',
    Icone: Presentation,
    eyebrow: 'Ferramenta · Pré-visualização',
    title: 'Sua marca no OOH',
    text: 'Escolha a praça e o formato, suba a sua logo ou a peça pronta, e veja a sua marca aplicada no painel real. Baixe a imagem e mande para quem decide.',
    cta: 'Ver minha marca no painel',
  },
  {
    // O checklist pedia "18 perguntas", contagem anterior à revisão do FAQ de
    // 26/08/2026, que fechou em 19. O número acompanha o que está publicado:
    // kicker com contagem errada é a primeira coisa que o visitante confere.
    href: '/area-do-anunciante/faq',
    Icone: CircleQuestionMark,
    eyebrow: `Dúvidas · ${FAQS.length} perguntas`,
    title: 'FAQ',
    text: 'Preço, prazo de veiculação, quem faz a arte, exclusividade do ponto e como saber se a campanha veiculou. As perguntas que o comercial mais recebe, respondidas antes da conversa.',
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
              {FERRAMENTAS.map((f, i) => (
                <Link
                  className={`ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6 ${
                    // Em número ímpar de cards o último ocupa a linha inteira:
                    // meio card sozinho na segunda linha abre buraco na página.
                    i === FERRAMENTAS.length - 1 && FERRAMENTAS.length % 2
                      ? 'col-span-2 max-mob:col-span-1'
                      : ''
                  }`}
                  href={f.href}
                  key={f.href}
                >
                  <f.Icone size={24} className="text-orange" />
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
              Prefere resolver diretamente com a gente?{' '}
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
