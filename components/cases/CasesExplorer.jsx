'use client'
import { useState } from 'react'
import CaseCard from '@/components/cases/CaseCard'
import TagFilter, { groupTagRows } from '@/components/ui/TagFilter'

export default function CasesExplorer({ cases, tags, groups }) {
  const [selected, setSelected] = useState({})
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))
  const rows = groupTagRows(tags, groups)

  const active = Object.values(selected).filter(Boolean)
  const filtered = cases.filter((c) => active.every((slug) => c.tags.includes(slug)))

  function toggle(groupKey, tagSlug) {
    setSelected((s) => ({ ...s, [groupKey]: s[groupKey] === tagSlug ? null : tagSlug }))
  }

  return (
    <div>
      {rows.length > 0 && (
        <TagFilter
          rows={rows}
          selected={selected}
          onToggle={toggle}
          onClear={() => setSelected({})}
        />
      )}
      {filtered.length === 0 ? (
        <p className="text-lg text-ink-soft">
          {cases.length === 0
            ? 'Nenhum case publicado ainda. Volte em breve.'
            : 'Nenhum case com essa combinação de filtros.'}
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
          {filtered.map((caseItem) => (
            <CaseCard
              caseItem={caseItem}
              key={caseItem.id}
              tags={caseItem.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
