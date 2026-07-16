'use client'
import { useState } from 'react'
import PostCard from '@/components/blog/PostCard'
import TagFilter, { groupTagRows } from '@/components/ui/TagFilter'

export default function PostsExplorer({ posts, tags, groups }) {
  const [selected, setSelected] = useState({})
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))
  const rows = groupTagRows(tags, groups)

  const active = Object.values(selected).filter(Boolean)
  const filtered = posts.filter((p) => active.every((slug) => p.tags.includes(slug)))

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
        <p className="text-lg text-ink-soft">Nenhum artigo com essa combinação de filtros.</p>
      ) : (
        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              tags={post.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
