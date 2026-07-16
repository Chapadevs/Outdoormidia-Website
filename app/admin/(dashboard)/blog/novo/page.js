import Breadcrumb from '@/components/ui/Breadcrumb'
import PostEditorForm from '@/components/forms/PostEditorForm'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

export const metadata = {
  title: 'Novo post — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const [tags, groups] = await Promise.all([listTags('blog'), listTagGroups('blog')])

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Blog', href: '/admin/blog' },
          { label: 'Novo post' },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-8 text-[clamp(36px,5vw,64px)] text-ink">Novo post</h1>
        <PostEditorForm allTags={tags} groups={groups} />
      </div>
    </section>
  )
}
