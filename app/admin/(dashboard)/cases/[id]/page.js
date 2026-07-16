import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CaseEditorForm from '@/components/forms/CaseEditorForm'
import { getCaseById } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

export const metadata = {
  title: 'Editar case — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function EditCasePage({ params }) {
  const { id } = await params
  const [caseItem, tags, groups] = await Promise.all([
    getCaseById(id),
    listTags('cases'),
    listTagGroups('cases'),
  ])
  if (!caseItem) notFound()

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Cases', href: '/admin/cases' },
          { label: 'Editar case' },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-8 text-[clamp(36px,5vw,64px)] text-ink">Editar case</h1>
        <CaseEditorForm initialCase={caseItem} allTags={tags} groups={groups} />
      </div>
    </section>
  )
}
