import Link from 'next/link'
import { notFound } from 'next/navigation'
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
    <section className="py-[72px] max-mob:py-12">
      <div className="wrap max-w-[920px]">
        <Link href="/admin/blog" className="eyebrow hover:text-orange">
          ← Voltar aos posts
        </Link>
        <h1 className="display mb-8 mt-3 text-[clamp(36px,5vw,64px)] text-ink">Editar post</h1>
        <PostEditorForm initialPost={post} allTags={tags} />
      </div>
    </section>
  )
}
