import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import SectionHeading from '@/components/ui/SectionHeading'
import CasesExplorer from '@/components/cases/CasesExplorer'
import Reviews from '@/components/sections/Reviews'
import { listPublishedCases } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/cases',
    locale,
    titulo: t('cases.titulo'),
    descricao: t('cases.descricao'),
  })
}

export const revalidate = 300

// Sem credenciais do Firestore (ex.: build no CI), a página é gerada vazia — a
// regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchContent() {
  try {
    return await Promise.all([listPublishedCases(), listTags('cases'), listTagGroups('cases')])
  } catch {
    return [[], [], []]
  }
}

export default async function CasesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [cases, tags, groups] = await fetchContent()
  const t = await getTranslations({ locale, namespace: 'CasesPage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow')}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        {cases.length > 0 && (
          <section className="pb-[110px] max-mob:pb-[72px]">
            <div className="wrap">
              <SectionHeading title={t('todos')} className="reveal mb-[34px]" />
              <CasesExplorer cases={cases} tags={tags} groups={groups} />
            </div>
          </section>
        )}

        <Reviews />
      </main>
    </>
  )
}
