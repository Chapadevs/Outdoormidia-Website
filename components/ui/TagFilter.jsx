'use client'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

const TRIGGER =
  'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150'
const TRIGGER_ON = 'border-orange bg-orange text-white'
const TRIGGER_OFF = 'border-line text-ink-soft hover:border-orange hover:text-orange'

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

// Quantos itens sobram por tag se ela for a escolha do próprio grupo — os
// filtros dos outros grupos continuam valendo. É o que permite apagar a opção
// que não leva a lugar nenhum em vez de deixar o visitante achar o vazio.
export function contarPorTag(items, rows, selected) {
  const counts = {}
  for (const row of rows) {
    const outros = Object.entries(selected)
      .filter(([key, slug]) => slug && key !== row.key)
      .map(([, slug]) => slug)
    for (const tag of row.tags) {
      counts[tag.slug] = items.filter(
        (item) => item.tags.includes(tag.slug) && outros.every((slug) => item.tags.includes(slug)),
      ).length
    }
  }
  return counts
}

function GroupDropdown({ row, selectedSlug, counts, onToggle, isOpen, onOpen }) {
  const tagAtiva = row.tags.find((t) => t.slug === selectedSlug)
  const disponiveis = row.tags.filter((tag) => (counts[tag.slug] ?? 1) > 0 || tag.slug === selectedSlug)
  if (disponiveis.length === 0) return null

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`${TRIGGER} ${tagAtiva ? TRIGGER_ON : TRIGGER_OFF}`}
        onClick={() => onOpen(isOpen ? null : row.key)}
        type="button"
      >
        {tagAtiva ? `${row.label}: ${tagAtiva.name}` : row.label}
        <ChevronDown
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          size={14}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-30 max-h-[320px] w-[min(280px,calc(100vw-56px))] overflow-y-auto rounded-[16px] border border-line bg-paper p-2 shadow-[0_18px_44px_rgba(22,17,13,.14)]"
          role="listbox"
        >
          <button
            className="w-full cursor-pointer rounded-[10px] px-3 py-2 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft transition-colors duration-150 hover:bg-bone"
            onClick={() => {
              if (tagAtiva) onToggle(row.key, tagAtiva.slug)
              onOpen(null)
            }}
            type="button"
          >
            Todas
          </button>
          {disponiveis.map((tag) => {
            const isActive = tag.slug === selectedSlug
            return (
              <button
                aria-selected={isActive}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors duration-150 ${
                  isActive ? 'bg-orange text-white' : 'text-ink hover:bg-bone'
                }`}
                key={tag.slug}
                onClick={() => {
                  onToggle(row.key, tag.slug)
                  onOpen(null)
                }}
                role="option"
                type="button"
              >
                <span>{tag.name}</span>
                <span className={isActive ? 'text-white/70' : 'text-ink-soft'}>
                  {counts[tag.slug] ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function TagFilter({ rows, selected, counts = {}, total, onToggle, onClear }) {
  const [openKey, setOpenKey] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (!openKey) return
    function onPointer(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenKey(null)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpenKey(null)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [openKey])

  const ativos = rows
    .map((row) => ({ row, tag: row.tags.find((t) => t.slug === selected[row.key]) }))
    .filter((item) => item.tag)

  return (
    <div className="mb-[34px] flex flex-col gap-3" ref={ref}>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
          Filtrar por
        </span>
        {rows.map((row) => (
          <GroupDropdown
            counts={counts}
            isOpen={openKey === row.key}
            key={row.key}
            onOpen={setOpenKey}
            onToggle={onToggle}
            row={row}
            selectedSlug={selected[row.key]}
          />
        ))}
      </div>

      {ativos.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5">
          {ativos.map(({ row, tag }) => (
            <button
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-orange bg-orange px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              key={row.key}
              onClick={() => onToggle(row.key, tag.slug)}
              type="button"
            >
              {tag.name}
              <X size={13} />
            </button>
          ))}
          <button
            className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.1em] text-ink-soft underline transition-colors duration-150 hover:text-orange"
            onClick={onClear}
            type="button"
          >
            Limpar filtros
          </button>
          {typeof total === 'number' && (
            <span className="text-[12px] text-ink-soft">
              {total === 1 ? '1 resultado' : `${total} resultados`}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
