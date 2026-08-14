import TagBadge from '@/components/blog/TagBadge'
import CoverMedia from '@/components/ui/CoverMedia'

const CARD_SIZES = '(max-width: 560px) 100vw, (max-width: 980px) 50vw, 400px'

export default function CaseCard({ caseItem, tags = [] }) {
  return (
    <article className="flex flex-1 flex-col overflow-hidden rounded-[16px] border border-line bg-white">
      {/* dentro de um card com overflow-hidden: sem borda e sem raio próprios,
          senão dobra a linha do topo do card */}
      <CoverMedia
        src={caseItem.coverImage}
        alt={caseItem.coverAlt || caseItem.title}
        label="Case"
        sizes={CARD_SIZES}
        className="rounded-none border-0 border-b"
      />
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
