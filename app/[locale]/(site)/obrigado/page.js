import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import ObrigadoCta from '@/components/widgets/ObrigadoCta'
import { getOrigens, getSugestoes } from '@/lib/obrigado'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// Tela de confirmação não vai ao índice: só faz sentido para quem acabou de
// enviar um formulário. Por isso também fica fora de lib/seo.js.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/obrigado',
    locale,
    titulo: t('obrigado.titulo'),
    descricao: t('obrigado.descricao'),
    noindex: true,
  })
}

export default async function ObrigadoPage({ params, searchParams }) {
  const { locale } = await params
  setRequestLocale(locale)

  const { origem } = await searchParams
  const origens = getOrigens(locale)
  const conteudo = origens[origem] ?? origens.padrao
  const t = await getTranslations({ locale, namespace: 'ObrigadoPage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              <b>{conteudo.eyebrow}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {conteudo.titulo.map((linha) => (
                <span className="block" key={linha}>
                  {linha}
                </span>
              ))}
            </h1>
            <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">{conteudo.texto}</p>
            <div className="reveal mt-[30px]">
              <ObrigadoCta origem={origem} />
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('proximosPassos')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {conteudo.passos.map((p) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={p.num}
                >
                  <span className="font-display text-[15px] text-orange">{p.num}</span>
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
            <SectionHeading title={t('enquantoIsso')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
              {getSugestoes(locale).map((s) => (
                <Link
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={s.href}
                  key={s.href}
                >
                  <span className="eyebrow">{s.meta}</span>
                  <h2 className="m-0 text-[21px] font-extrabold leading-tight text-ink">
                    {s.title}
                  </h2>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{s.text}</p>
                  <span className="mt-auto pt-5 text-[13px] font-bold uppercase tracking-[0.1em] text-orange">
                    {t('ver')} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
