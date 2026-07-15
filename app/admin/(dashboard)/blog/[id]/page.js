import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PostEditorForm from '@/components/forms/PostEditorForm'
import { getPostById } from '@/lib/blog/posts'
import { listTags } from '@/lib/blog/tags'

export const metadata = {
  title: 'Editar post — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function EditPostPage({ params }) {
  const { id } = await params
  const [post, tags] = await Promise.all([getPostById(id), listTags()])
  if (!post) notFound()

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Blog', href: '/admin/blog' },
          { label: 'Editar post' },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-8 text-[clamp(36px,5vw,64px)] text-ink">Editar post</h1>
        <PostEditorForm initialPost={post} allTags={tags} />
      </div>
    </section>
  )
}
