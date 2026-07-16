import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { listPublishedCases } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'

export default async function Cases() {
  const [cases, tags] = await Promise.all([listPublishedCases(), listTags('cases')])
  const featured = cases.slice(0, 4)
  if (featured.length === 0) return null

  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))

  return (
    <section className="pb-[110px] max-mob:pb-[72px]" id="cases">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num="02" title="Cases" className="flex-1" />
          <Link
            className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
            href="/cases"
          >
            Ver todos →
          </Link>
        </div>
      </div>
      <div className="wrap">
        <div className="-mx-8 flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-8 pb-6 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((c) => {
            const firstTag = c.tags.map((slug) => tagMap.get(slug)).find(Boolean)
            return (
              <div
                className={`relative flex aspect-[3/4] flex-[0_0_360px] snap-start flex-col justify-between overflow-hidden bg-cover bg-center p-6 text-white after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(22,17,13,.42),transparent_60%)] after:content-[''] max-mob:flex-[0_0_78vw] ${
                  c.coverImage ? '' : 'bg-ink-soft'
                }`}
                key={c.id}
                style={c.coverImage ? { backgroundImage: `url(${c.coverImage})` } : undefined}
              >
                {firstTag && (
                  <span className="relative z-[2] self-start rounded-[2px] bg-white/18 px-[11px] py-[7px] text-[11px] font-bold uppercase tracking-[0.16em]">
                    {firstTag.name}
                  </span>
                )}
                <div className="relative z-[2]">
                  <h3 className="m-0 text-[25px] font-extrabold leading-[1.05]">{c.title}</h3>
                  {c.meta && (
                    <div className="mt-2 text-xs font-semibold tracking-[0.05em] opacity-80">
                      {c.meta}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
