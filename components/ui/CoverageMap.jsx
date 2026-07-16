'use client'

import { useEffect, useRef, useState } from 'react'
import { MAP_W, MAP_H, STATES } from '@/lib/mapShapes'
import { projectToMap, unprojectFromMap } from '@/lib/mapProjection'

const PIN = 26
const PIN_CORE = 9
const HIT = 64

export default function CoverageMap({ locations, editable = false, onMapClick, draft = null }) {
  const containerRef = useRef(null)
  const pathRefs = useRef({})
  const [activeId, setActiveId] = useState(null)
  const [hoverId, setHoverId] = useState(null)
  const [hoverStateId, setHoverStateId] = useState(null)
  const [activeState, setActiveState] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, flip: false })

  useEffect(() => {
    function onPointerDown(e) {
      if (!containerRef.current?.contains(e.target)) {
        setActiveId(null)
        setActiveState(null)
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setActiveId(null)
        setActiveState(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const shownId = hoverId || activeId
  const shown = locations.find((l) => l.id === shownId)
  const shownPos = shown ? projectToMap(shown.lat, shown.lng) : null
  const draftPos = draft ? projectToMap(draft.lat, draft.lng) : null

  function handleEditClick(e) {
    if (!editable || !onMapClick) return
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * MAP_W
    const y = ((e.clientY - rect.top) / rect.height) * MAP_H
    onMapClick(unprojectFromMap(x, y))
  }

  function handleStateSelect(e, state) {
    e.stopPropagation()
    const pathEl = pathRefs.current[state.id]
    if (!pathEl) return
    setActiveId(null)
    setHoverId(null)
    setActiveState((cur) => {
      if (cur?.id === state.id) return null
      const matched = locations.filter((loc) => {
        const p = projectToMap(loc.lat, loc.lng)
        return pathEl.isPointInFill(new DOMPoint(p.x, p.y))
      })
      return { id: state.id, name: state.name, locations: matched }
    })
  }

  function handlePointerMove(e) {
    if (!activeState) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = Math.min(Math.max(e.clientY - rect.top, 20), rect.height - 20)
    setCursor({ x, y, flip: x > rect.width * 0.62 })
  }

  function togglePin(id) {
    setActiveState(null)
    setActiveId((cur) => (cur === id ? null : id))
  }

  return (
    <div ref={containerRef} className="relative" onMouseMove={handlePointerMove}>
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Mapa de cobertura — Paraná e Santa Catarina"
      >
        {STATES.map((s) => (
          <path
            key={s.id}
            ref={(el) => {
              pathRefs.current[s.id] = el
            }}
            d={s.path}
            fill={
              hoverStateId === s.id || activeState?.id === s.id
                ? 'var(--color-orange-2)'
                : 'var(--color-orange)'
            }
            stroke="var(--color-paper)"
            strokeWidth="3"
            strokeLinejoin="round"
            className={editable ? 'cursor-crosshair' : 'cursor-pointer'}
            style={{ transition: 'fill 150ms ease' }}
            onMouseEnter={() => setHoverStateId(s.id)}
            onMouseLeave={() => setHoverStateId(null)}
            onClick={(e) => (editable ? handleEditClick(e) : handleStateSelect(e, s))}
          />
        ))}
        {STATES.map((s) => (
          <text
            key={`label-${s.id}`}
            x={s.labelX}
            y={s.labelY}
            textAnchor="middle"
            fill="var(--color-paper)"
            fontSize="34"
            fontWeight="800"
            letterSpacing="4"
            className="pointer-events-none select-none uppercase"
          >
            {s.name}
          </text>
        ))}

        {locations.map((loc) => {
          const { x, y } = projectToMap(loc.lat, loc.lng)
          const on = shownId === loc.id
          return (
            <g
              key={loc.id}
              transform={`translate(${x} ${y})${on ? ' scale(1.15)' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`${loc.name}${loc.desc ? ` — ${loc.desc}` : ''}`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => setHoverId(loc.id)}
              onMouseLeave={() => setHoverId(null)}
              onClick={(e) => {
                e.stopPropagation()
                togglePin(loc.id)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  togglePin(loc.id)
                }
              }}
            >
              <rect x={-HIT / 2} y={-HIT / 2} width={HIT} height={HIT} fill="transparent" />
              <rect
                x={-PIN / 2}
                y={-PIN / 2}
                width={PIN}
                height={PIN}
                rx="2"
                fill={on ? 'var(--color-paper)' : 'var(--color-ink)'}
                stroke={on ? 'var(--color-ink)' : 'var(--color-paper)'}
                strokeWidth="2.5"
              />
              <rect
                x={-PIN_CORE / 2}
                y={-PIN_CORE / 2}
                width={PIN_CORE}
                height={PIN_CORE}
                fill={on ? 'var(--color-ink)' : 'var(--color-paper)'}
              />
            </g>
          )
        })}

        {draftPos && (
          <g transform={`translate(${draftPos.x} ${draftPos.y})`} className="pointer-events-none">
            <rect
              x={-PIN / 2}
              y={-PIN / 2}
              width={PIN}
              height={PIN}
              rx="2"
              fill="var(--color-orange-2)"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
            <rect
              x={-PIN_CORE / 2}
              y={-PIN_CORE / 2}
              width={PIN_CORE}
              height={PIN_CORE}
              fill="var(--color-paper)"
            />
          </g>
        )}
      </svg>

      {shown && shownPos && (
        <div
          className="pointer-events-none absolute z-10 w-max max-w-[240px]"
          style={{
            left: `min(max(${(shownPos.x / MAP_W) * 100}%, 124px), calc(100% - 124px))`,
            top: `${(shownPos.y / MAP_H) * 100}%`,
            transform:
              shownPos.y < MAP_H * 0.16
                ? 'translate(-50%, 26px)'
                : 'translate(-50%, calc(-100% - 26px))',
          }}
        >
          <div className="border-[1.5px] border-ink bg-paper px-4 py-3 shadow-[6px_6px_0_rgba(22,17,13,.18)]">
            <span className="block text-[15px] font-extrabold leading-tight text-ink">
              {shown.name}
            </span>
            {shown.desc && (
              <span className="mt-1 block text-[13px] leading-snug text-ink-soft">
                {shown.desc}
              </span>
            )}
          </div>
        </div>
      )}

      {activeState && (
        <div
          className="pointer-events-none absolute z-20 w-max max-w-[260px]"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: cursor.flip ? 'translate(calc(-100% - 18px), -50%)' : 'translate(18px, -50%)',
          }}
        >
          <div className="border-[1.5px] border-ink bg-paper px-4 py-3 shadow-[6px_6px_0_rgba(22,17,13,.18)]">
            <span className="eyebrow block text-orange">{activeState.name}</span>
            {activeState.locations.length === 0 ? (
              <p className="mt-2 text-[13px] text-ink-soft">Nenhuma localidade cadastrada.</p>
            ) : (
              <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
                {activeState.locations.map((loc) => (
                  <li key={loc.id}>
                    <span className="block text-[14px] font-extrabold leading-tight text-ink">
                      {loc.name}
                    </span>
                    {loc.desc && (
                      <span className="block text-[12px] leading-snug text-ink-soft">
                        {loc.desc}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
