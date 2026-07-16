import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import TagManager from '@/components/forms/TagManager'
import TagGroupManager from '@/components/forms/TagGroupManager'
import SectionHeading from '@/components/ui/SectionHeading'
import { TAG_SCOPES, getScope } from '@/lib/tags/scopes'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

export const metadata = {
  title: 'Tags — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminTagsPage({ params }) {
  const { scope } = await params
  const meta = getScope(scope)
  if (!meta) notFound()

  const [tags, groups] = await Promise.all([listTags(scope), listTagGroups(scope)])

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb
        items={[
          { label: 'Painel Admin', href: '/admin' },
          { label: 'Tags', href: '/admin/tags' },
          { label: meta.label },
        ]}
      />
      <div className="wrap mt-9 max-w-[920px]">
        <h1 className="display mb-4 text-[clamp(36px,5vw,64px)] text-ink">Tags</h1>

        <nav className="flex flex-wrap gap-7 border-b border-line-2">
          {TAG_SCOPES.map((s) => (
            <Link
              key={s.id}
              href={`/admin/tags/${s.id}`}
              aria-current={s.id === scope ? 'page' : undefined}
              className={`eyebrow -mb-px border-b-2 pb-3 transition-colors duration-150 ${
                s.id === scope
                  ? 'border-orange text-orange'
                  : 'border-transparent hover:text-orange'
              }`}
            >
              {s.label}
            </Link>
          ))}
        </nav>

        <p className="mb-10 mt-6 max-w-[60ch] text-ink-soft">{meta.desc}</p>

        <div className="flex flex-col gap-12">
          <div>
            <SectionHeading num="01" title="Grupos" className="mb-[34px]" />
            <TagGroupManager scope={scope} groups={groups} />
          </div>
          <div>
            <SectionHeading num="02" title="Tags" className="mb-[34px]" />
            <TagManager scope={scope} groups={groups} tags={tags} />
          </div>
        </div>
      </div>
    </section>
  )
}
