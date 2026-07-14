import Link from 'next/link'
import PostEditorForm from '@/components/forms/PostEditorForm'
import { listTags } from '@/lib/blog/tags'

export const metadata = {
  title: 'Novo post — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const tags = await listTags()

  return (
    <section className="py-[72px] max-mob:py-12">
      <div className="wrap max-w-[920px]">
        <Link href="/admin/blog" className="eyebrow hover:text-orange">
          ← Voltar aos posts
        </Link>
        <h1 className="display mb-8 mt-3 text-[clamp(36px,5vw,64px)] text-ink">Novo post</h1>
        <PostEditorForm allTags={tags} />
      </div>
    </section>
  )
}
