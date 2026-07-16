import TagBadge from '@/components/blog/TagBadge'

export default function CaseCard({ caseItem, tags = [] }) {
  return (
    <article className="flex flex-1 flex-col overflow-hidden rounded-[2px] border border-line bg-white">
      {caseItem.coverImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={caseItem.coverImage}
          alt={caseItem.coverAlt || caseItem.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="ticks flex aspect-[16/10] items-center justify-center border-b border-line bg-bone">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
            Case
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 max-mob:p-5">
        {tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
        )}
        <h3 className="m-0 text-[21px] font-extrabold leading-[1.1]">{caseItem.title}</h3>
        <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-ink-soft">{caseItem.desc}</p>
        {caseItem.meta && <div className="eyebrow mt-4">{caseItem.meta}</div>}
        {caseItem.results.length > 0 && (
          <div className="mt-auto pt-6">
            <div className="grid grid-cols-2 gap-[18px] border-t border-line pt-5">
              {caseItem.results.map((r) => (
                <div key={r.label}>
                  <div className="font-display text-[26px] text-orange">{r.value}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
