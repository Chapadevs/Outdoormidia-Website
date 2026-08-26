'use client'
import { useEffect, useRef, useState } from 'react'

/* Trilho vertical que atravessa as seções da home: uma linha no vão esquerdo do
   .wrap com um marcador na altura do título de cada seção, preenchida de laranja
   conforme a página é rolada. Some no tablet/mobile — lá o vão do .wrap (20px)
   é estreito demais para o trilho não encostar no conteúdo. */
export default function HomeTimeline({ children }) {
  const hostRef = useRef(null)
  const caixaRef = useRef({ topo: 0, altura: 1 })
  const [marcadores, setMarcadores] = useState([])
  const [altura, setAltura] = useState(1)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const medir = () => {
      const topo = host.getBoundingClientRect().top + window.scrollY
      caixaRef.current = { topo, altura: host.offsetHeight || 1 }
      setAltura(caixaRef.current.altura)
      setMarcadores(
        [...host.querySelectorAll('section[id]')].map((secao) => {
          const alvo = secao.querySelector('h2') || secao
          const caixa = alvo.getBoundingClientRect()
          return { id: secao.id, y: caixa.top + window.scrollY - topo + caixa.height / 2 }
        })
      )
    }

    const acompanhar = () => {
      const { topo, altura } = caixaRef.current
      const meio = window.scrollY + window.innerHeight * 0.5
      setProgresso(Math.min(1, Math.max(0, (meio - topo) / altura)))
    }

    let raf = 0
    const aoRolar = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(acompanhar)
    }

    medir()
    acompanhar()

    const ro = new ResizeObserver(() => {
      medir()
      acompanhar()
    })
    ro.observe(host)
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', medir)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', medir)
    }
  }, [])

  const percorrido = progresso * altura

  return (
    <div ref={hostRef} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 max-tab:hidden">
        <div className="wrap relative h-full">
          <div className="absolute inset-y-0 left-[10px] w-px bg-line">
            <div
              className="absolute inset-x-0 top-0 bg-orange transition-[height] duration-150 ease-out"
              style={{ height: `${progresso * 100}%` }}
            />
          </div>
          {marcadores.map((m) => (
            <span
              key={m.id}
              className={`absolute left-[10px] h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange transition-colors duration-200 ${
                m.y <= percorrido ? 'bg-orange' : 'bg-paper'
              }`}
              style={{ top: m.y }}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
