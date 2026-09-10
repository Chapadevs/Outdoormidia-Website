import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import SectionHeading from '@/components/ui/SectionHeading'
import CasesExplorer from '@/components/cases/CasesExplorer'
import { listPublishedCases } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('cases.titulo')
  const descricao = t('cases.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/cases', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
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

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Cases' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Resultados · Out of Home</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Cases.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Campanhas reais nas ruas do Paraná e de Santa Catarina, do lançamento que ocupou
              Curitiba ao circuito segmentado que falou com o público certo. Filtre por segmento e
              veja o que o Out of Home entrega.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title="Todos os cases" className="reveal mb-[34px]" />
            <CasesExplorer cases={cases} tags={tags} groups={groups} />
          </div>
        </section>
      </main>
    </>
  )
}
