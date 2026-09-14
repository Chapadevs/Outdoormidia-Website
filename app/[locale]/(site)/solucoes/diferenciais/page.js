import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import DiferencialCard from '@/components/ui/DiferencialCard'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getDiferenciais } from '@/lib/diferenciais'
import { getTranslations, setRequestLocale } from 'next-intl/server'


// Os rótulos vivem em `DiferenciaisPage.prova` nos messages/*.json e entram
// por posição sobre os números.
const PROVA = ['+530M', '175', '24×7', '6']

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/solucoes/diferenciais',
    locale,
    titulo: t('diferenciais.titulo'),
    descricao: t('diferenciais.descricao'),
  })
}

export default async function DiferenciaisPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'DiferenciaisPage' })
  const prova = PROVA.map((n, i) => ({ n, label: t.raw('prova')[i] }))

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumbPai'), href: '/solucoes' }, { label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow', { n: getDiferenciais(locale).length })}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('osDiferenciais')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {getDiferenciais(locale).map((d) => (
                <div className="reveal" key={d.slug}>
                  <DiferencialCard
                    d={d}
                    sizes="(max-width: 560px) 86vw, (max-width: 980px) 44vw, 340px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title={t('aProva')} className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              {t('provaLead')}
            </p>
            <StatGrid stats={prova} size="md" className="reveal" />
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
