import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import { CircleQuestionMark, Gauge, Lightbulb, Presentation } from 'lucide-react'
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
//
// Kicker, título, texto e CTA de cada card vivem em `AnunciantePage.cards` nos
// messages/*.json, chaveados pelo id; aqui fica só o que não se traduz. As
// contagens de práticas e de perguntas são derivadas de PRATICAS e FAQS, para
// não divergir das páginas (o checklist pedia "18 perguntas", contagem
// anterior à revisão do FAQ de 26/08/2026, que fechou em 19).
const FERRAMENTAS = [
  { id: 'diagnostico', href: '/area-do-anunciante/diagnostico-de-presenca', Icone: Gauge },
  { id: 'suaMarca', href: '/area-do-anunciante/sua-marca-no-ooh', Icone: Presentation },
  { id: 'praticas', href: '/area-do-anunciante/melhores-praticas', Icone: Lightbulb, n: PRATICAS.length },
  { id: 'faq', href: '/area-do-anunciante/faq', Icone: CircleQuestionMark, n: FAQS.length },
]

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/area-do-anunciante',
    locale,
    titulo: t('areaDoAnunciante.titulo'),
    descricao: t('areaDoAnunciante.descricao'),
  })
}

export default async function AnunciantePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'AnunciantePage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow', { n: FERRAMENTAS.length })}
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('tituloA')}
              <br />
              {t('tituloB')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('ferramentas')} className="reveal mb-[34px]" />
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
                  <span className="eyebrow">{t(`cards.${f.id}.eyebrow`, { n: f.n })}</span>
                  <h2 className="m-0 text-[25px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {t(`cards.${f.id}.title`)}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{t(`cards.${f.id}.text`)}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
                    {t(`cards.${f.id}.cta`)}
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
              {t('prefereDireto')}{' '}
              <a
                href={waLink(WA_ANUNCIANTE)}
                className="font-bold text-orange hover:underline"
              >
                {t('faleEspecialista')}
              </a>
            </p>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
