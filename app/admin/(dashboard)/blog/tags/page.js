import Link from 'next/link'
import TagManager from '@/components/forms/TagManager'
import { listTags } from '@/lib/blog/tags'

export const metadata = {
  title: 'Tags — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminTagsPage() {
  const tags = await listTags()

  return (
    <section className="py-[72px] max-mob:py-12">
      <div className="wrap max-w-[920px]">
        <Link href="/admin/blog" className="eyebrow hover:text-orange">
          ← Voltar aos posts
        </Link>
        <h1 className="display mb-4 mt-3 text-[clamp(36px,5vw,64px)] text-ink">Tags</h1>
        <p className="mb-8 max-w-[60ch] text-ink-soft">
          Tags classificam os posts e suas imagens por localização, plataforma e tema. Elas
          aparecem nos cards do blog e na página de cada artigo.
        </p>
        <TagManager tags={tags} />
      </div>
    </section>
  )
}
