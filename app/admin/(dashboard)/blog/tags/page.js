import Breadcrumb from '@/components/ui/Breadcrumb'
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
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Blog', href: '/admin/blog' },
          { label: 'Tags' },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-4 text-[clamp(36px,5vw,64px)] text-ink">Tags</h1>
        <p className="mb-8 max-w-[60ch] text-ink-soft">
          Tags classificam os posts e suas imagens por localização, plataforma e tema. Elas
          aparecem nos cards do blog e na página de cada artigo.
        </p>
        <TagManager tags={tags} />
      </div>
    </section>
  )
}
