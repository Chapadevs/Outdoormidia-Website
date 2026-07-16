'use client'

const CHIP =
  'cursor-pointer rounded-[2px] border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150'
const CHIP_ON = 'border-orange bg-orange text-white'
const CHIP_OFF = 'border-line text-ink-soft hover:border-orange hover:text-orange'

export function groupTagRows(tags, groups) {
  const rows = groups
    .map((group) => ({
      key: group.slug,
      label: group.label,
      tags: tags.filter((t) => t.group === group.slug),
    }))
    .filter((row) => row.tags.length > 0)
  const orphans = tags.filter((t) => !groups.some((g) => g.slug === t.group))
  if (orphans.length > 0) rows.push({ key: '__outras', label: 'Outras', tags: orphans })
  return rows
}

export default function TagFilter({ rows, selected, onToggle, onClear }) {
  const hasActive = Object.values(selected).some(Boolean)

  return (
    <div className="mb-[34px] flex flex-col gap-3">
      {rows.map((row) => (
        <div key={row.key} className="flex flex-wrap items-center gap-2.5">
          <span className="w-[110px] shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft max-mob:w-full">
            {row.label}
          </span>
          {row.tags.map((tag) => {
            const isActive = selected[row.key] === tag.slug
            return (
              <button
                aria-pressed={isActive}
                className={`${CHIP} ${isActive ? CHIP_ON : CHIP_OFF}`}
                key={tag.slug}
                onClick={() => onToggle(row.key, tag.slug)}
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      ))}
      {hasActive && (
        <button
          className="self-start text-[12px] font-bold uppercase tracking-[0.1em] text-ink-soft underline transition-colors duration-150 hover:text-orange"
          onClick={onClear}
        >
          Limpar filtros ×
        </button>
      )}
    </div>
  )
}
