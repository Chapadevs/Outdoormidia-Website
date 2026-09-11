import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import { CircleQuestionMark, Gauge, Lightbulb, Presentation, Zap } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { FAQS } from '@/lib/faq'
import { PRATICAS } from '@/lib/melhoresPraticas'
import { WA_ANUNCIANTE, waLink } from '@/lib/whatsapp'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// A ordem não muda: as duas ferramentas interativas primeiro, depois os dois
// conteúdos de leitura, Melhores práticas e FAQ.
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
    // O kicker segue o padrão dos cards de Diagnóstico e FAQ, que já trazem
    // número. A contagem é derivada de PRATICAS, para não divergir da página.
    href: '/area-do-anunciante/melhores-praticas',
    Icone: Lightbulb,
    eyebrow: `Conteúdo · ${PRATICAS.length} práticas`,
    title: 'Melhores práticas',
    text: 'Conteúdos e ideias para tirar mais da sua campanha: como escolher a praça certa, o que funciona em cada formato e as práticas que fazem uma marca ser lembrada na mídia exterior.',
    cta: 'Ver as práticas',
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

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('areaDoAnunciante.titulo')
  const descricao = t('areaDoAnunciante.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/area-do-anunciante', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function AnunciantePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Área do anunciante' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            {/* A contagem é a da grade, derivada dela para não divergir. A
                faixa de Mídia Programática logo abaixo não entra na conta: ela
                é frente comercial, não ferramenta de autoatendimento, e é
                justamente por isso que não virou card. */}
            <div className="eyebrow reveal">
              Autoatendimento · {FERRAMENTAS.length} ferramentas
            </div>
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
            <SectionHeading title="As ferramentas" className="reveal mb-[34px]" />
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
            {/* Programática é a página filha que não é ferramenta de
                autoatendimento, é frente comercial. Por isso entra como faixa
                abaixo da grade, e não como mais um card: a hierarquia é o que
                diz o que ela é. Fundo escuro acompanhando a exceção de paleta
                do card de Mídia Programática e do hero da própria página. */}
            <Link
              className="group reveal mt-[18px] flex items-center gap-5 rounded-[16px] border border-ink bg-ink p-7 text-white transition-colors duration-200 hover:border-orange max-mob:flex-wrap max-mob:gap-4 max-mob:p-6"
              href="/area-do-anunciante/programatica"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-white/15">
                <Zap size={20} />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="eyebrow text-white/70">Mídia Programática</span>
                <span className="text-[17px] font-extrabold leading-tight">
                  Compre as telas da Outdoormídia pela DSP que você já usa.
                </span>
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-white/[.92] transition-colors duration-200 group-hover:text-orange max-mob:ml-0">
                Ver como funciona
                <span
                  aria-hidden
                  className="text-base transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>

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
    </>
  )
}
