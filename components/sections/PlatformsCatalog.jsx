'use client'

import Link from 'next/link'
import { useState } from 'react'

// Catálogo das plataformas em dois modos: grade (card com diagrama de formatos)
// e lista (linha densa, para comparar as nove de uma vez).
//
// O diagrama entrou no lugar da capa do `CoverMedia`: as fotos das plataformas
// ainda não vieram do cliente e o painel bege vazio ocupava a primeira dobra do
// card sem informar nada. Os retângulos são desenhados na proporção real de cada
// formato, na mesma escala dentro do card, então dá para comparar a geometria
// antes de abrir a página.
//
// Os cards e as linhas não levam `.reveal`: o observer global só varre o DOM na
// montagem da rota, e o que a troca de modo remonta ficaria preso em opacidade 0.

function medir(formats, maxW, maxH) {
  return formats.map((f) => {
    const [w, h] = f.aspect.split('/').map(Number)
    const proporcao = w / h
    const altura = Math.min(maxH, maxW / proporcao)
    return { dims: f.dims, w: Math.round(altura * proporcao), h: Math.round(altura) }
  })
}

function escalaCard(total) {
  if (total === 1) return [150, 78]
  if (total === 2) return [104, 68]
  return [74, 60]
}

const PONTILHADO = {
  backgroundImage: 'radial-gradient(rgba(22,17,13,.14) 1px, transparent 1px)',
  backgroundSize: '14px 14px',
}

function Diagrama({ formats }) {
  const [maxW, maxH] = escalaCard(formats.length)
  const medidos = medir(formats, maxW, maxH)

  return (
    <div className="relative w-full overflow-hidden rounded-[12px] border border-line bg-bone transition-colors duration-300 aspect-[16/10] group-hover:bg-orange/5">
      <div aria-hidden className="absolute inset-0 opacity-50" style={PONTILHADO} />
      <div className="absolute left-3.5 top-3 text-[9.5px] font-bold uppercase tracking-[0.16em] text-ink-soft transition-colors duration-300 group-hover:text-orange">
        {formats.length === 1 ? '1 formato' : `${formats.length} formatos`}
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-[18px] px-[18px] pb-3.5 pt-[34px]">
        {medidos.map((f, i) => (
          <div className="flex flex-col items-center gap-[7px]" key={`${f.dims}-${i}`}>
            <div
              className="rounded-[3px] border-[1.5px] border-line-2 bg-white/60 transition-colors duration-300 group-hover:border-orange group-hover:bg-orange/10"
              style={{ width: `${f.w}px`, height: `${f.h}px` }}
            />
            <div className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-300 group-hover:text-orange">
              {f.dims}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({ p }) {
  return (
    <Link
      className="group flex scroll-mt-24 flex-col rounded-[16px] border border-line bg-white p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-orange hover:shadow-[0_18px_40px_-28px_rgba(22,17,13,0.55)] max-mob:p-5"
      href={p.href}
      id={p.slug}
    >
      {p.formats.length > 0 && <Diagrama formats={p.formats} />}
      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-[15px] text-orange">{p.num}</span>
        <h2 className="m-0 text-[21px] font-extrabold leading-none tracking-[-0.01em] transition-colors duration-200 group-hover:text-orange">
          {p.name}
        </h2>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <p className="eyebrow m-0">{p.desc}</p>
        {p.marcador && (
          <span className="rounded-full border border-orange px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-orange">
            {p.marcador}
          </span>
        )}
      </div>
      <p className="m-0 mt-4 text-[14.5px] leading-relaxed text-ink-soft">{p.intro}</p>
      <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-200 group-hover:text-orange">
        {p.cta}
        <span
          aria-hidden
          className="text-base transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  )
}

function Linha({ p }) {
  const medidos = medir(p.formats, 40, 30)

  return (
    <Link
      className="group block scroll-mt-24 border-b border-line transition-colors duration-300 hover:bg-orange"
      href={p.href}
      id={p.slug}
    >
      <div className="grid grid-cols-[64px_minmax(0,1fr)_240px_auto_54px] items-center gap-6 px-3 py-6 max-tab:grid-cols-[46px_minmax(0,1fr)_auto] max-tab:gap-4 max-mob:py-5">
        <span className="font-display text-xl text-ink-soft transition-colors duration-200 group-hover:text-white/70">
          {p.num}
        </span>
        <span className="text-[clamp(22px,2.6vw,38px)] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-200 group-hover:text-white">
          {p.name}
        </span>
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 group-hover:text-white/70 max-tab:hidden">
          {p.desc}
        </span>
        <span className="flex h-[34px] items-end gap-2.5 max-tab:hidden">
          {medidos.map((f, i) => (
            <span
              className="block rounded-[2px] border-[1.5px] border-line-2 transition-colors duration-200 group-hover:border-white/80"
              key={`${f.dims}-${i}`}
              style={{ width: `${f.w}px`, height: `${f.h}px` }}
            />
          ))}
        </span>
        <span
          aria-hidden
          className="justify-self-end text-[22px] text-ink-soft transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-white"
        >
          →
        </span>
      </div>
    </Link>
  )
}

function BotaoModo({ ativo, children, onClick }) {
  return (
    <button
      aria-pressed={ativo}
      className={`cursor-pointer rounded-full px-[18px] py-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 ${
        ativo ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default function PlatformsCatalog({ plataformas }) {
  const [modo, setModo] = useState('grade')

  return (
    <>
      <div className="reveal mb-[26px] flex flex-wrap items-center justify-between gap-[18px]">
        <p className="m-0 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
          Cada plataforma abre com os formatos que ela entrega, em escala. Compare a geometria antes
          de abrir a página.
        </p>
        <div className="inline-flex gap-1 rounded-full border-[1.5px] border-line bg-white p-1">
          <BotaoModo ativo={modo === 'grade'} onClick={() => setModo('grade')}>
            Grade
          </BotaoModo>
          <BotaoModo ativo={modo === 'lista'} onClick={() => setModo('lista')}>
            Lista
          </BotaoModo>
        </div>
      </div>

      {modo === 'grade' ? (
        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
          {plataformas.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div className="border-t border-ink">
          {plataformas.map((p) => (
            <Linha key={p.slug} p={p} />
          ))}
        </div>
      )}
    </>
  )
}
