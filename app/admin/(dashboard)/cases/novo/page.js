import Breadcrumb from '@/components/ui/Breadcrumb'
import CaseEditorForm from '@/components/forms/CaseEditorForm'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

export const metadata = {
  title: 'Novo case — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function NewCasePage() {
  const [tags, groups] = await Promise.all([listTags('cases'), listTagGroups('cases')])

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Cases', href: '/admin/cases' },
          { label: 'Novo case' },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-8 text-[clamp(36px,5vw,64px)] text-ink">Novo case</h1>
        <CaseEditorForm allTags={tags} groups={groups} />
      </div>
    </section>
  )
}
