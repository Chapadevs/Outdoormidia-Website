'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function FormatosGallery({ formatos }) {
  const [aberto, setAberto] = useState(null)

  useEffect(() => {
    if (!aberto) return
    const onKeyDown = (e) => e.key === 'Escape' && setAberto(null)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [aberto])

  return (
    <>
      <ul className="m-0 flex flex-wrap gap-2 p-0">
        {formatos.map((f) => {
          const temImagem = f.images?.length > 0

          return (
            <li key={f.name}>
              {temImagem ? (
                <button
                  className="radial-reveal reveal cursor-pointer rounded-full border border-line px-4 py-2 text-[13.5px] font-bold text-ink-soft transition-colors duration-150 [--rr-fill:var(--color-orange)] hover:text-white"
                  onClick={() => setAberto(f)}
                  type="button"
                >
                  {f.name} <span className="font-normal opacity-70">({f.tech})</span>
                </button>
              ) : (
                <span className="reveal block rounded-full border border-line px-4 py-2 text-[13.5px] font-bold text-ink-soft">
                  {f.name} <span className="font-normal text-ink-soft/70">({f.tech})</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>

      {aberto && (
        <div
          aria-label={`Formato ${aberto.name}`}
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-6 backdrop-blur-[3px]"
          onClick={() => setAberto(null)}
          role="dialog"
        >
          <button
            aria-label="Fechar"
            className="absolute right-6 top-6 grid size-11 cursor-pointer place-items-center rounded-full border border-white/40 text-[22px] text-white transition-colors duration-150 hover:bg-white hover:text-ink"
            onClick={() => setAberto(null)}
            type="button"
          >
            ×
          </button>
          <div
            className="flex max-h-[86vh] w-full max-w-[900px] flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="m-0 text-center text-[22px] font-extrabold text-white">
              {aberto.name}
            </h3>
            <div
              className={`grid gap-4 ${aberto.images.length > 1 ? 'grid-cols-2 max-mob:grid-cols-1' : 'grid-cols-1'}`}
            >
              {aberto.images.map((img) => (
                <figure className="m-0 flex flex-col gap-2" key={img.src}>
                  <div className="ticks relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-bone">
                    <Image
                      alt={img.label ? `${aberto.name} (${img.label})` : aberto.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 560px) 90vw, 440px"
                      src={img.src}
                    />
                  </div>
                  {img.label && (
                    <figcaption className="text-center text-[13px] font-bold uppercase tracking-[0.1em] text-white/80">
                      {img.label}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
