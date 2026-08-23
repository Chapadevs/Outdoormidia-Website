'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Palco de imagens controlado por fora: quem manda no slide é o índice que o
// pai passa. Na faixa dos Icônicos quem troca são as abas e as setas da seção —
// o palco só reage.
//
// Durante a troca as duas imagens ficam em cena, uma saindo e outra entrando;
// em repouso só a atual é montada.

const DURACAO = 620
const CURVA = 'cubic-bezier(.4,0,.2,1)'

export default function SlideStage({
  slides = [],
  index = 0,
  ratio = 'aspect-[4/3]',
  sizes = '(max-width: 980px) 100vw, 58vw',
  className = '',
}) {
  const fotos = slides.filter((foto) => foto?.src)
  const total = fotos.length

  const mostradoRef = useRef(index)
  const [deslize, setDeslize] = useState(null)
  const [semMovimento, setSemMovimento] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const aplicar = () => setSemMovimento(mq.matches)
    aplicar()
    mq.addEventListener('change', aplicar)
    return () => mq.removeEventListener('change', aplicar)
  }, [])

  const duracao = semMovimento ? 0 : DURACAO

  // O índice vem de fora, então a direção é deduzida do salto — inclusive
  // quando ele dá a volta (último → primeiro anda para a frente, não para trás).
  useEffect(() => {
    const de = mostradoRef.current
    if (de === index || total < 2) return
    mostradoRef.current = index

    const daVoltaAdiante = de === total - 1 && index === 0
    const daVoltaAtras = de === 0 && index === total - 1
    const direcao = daVoltaAdiante ? 1 : daVoltaAtras ? -1 : index > de ? 1 : -1

    setDeslize({ de, para: index, direcao, correndo: false })
  }, [index, total])

  // Dois frames antes de correr: o primeiro monta a camada que entra já fora da
  // moldura, o segundo troca o transform. Num frame só o browser agruparia as
  // duas mudanças e a imagem apareceria no lugar, sem deslizar.
  useEffect(() => {
    if (!deslize) return

    if (!deslize.correndo) {
      let segundo = 0
      const primeiro = requestAnimationFrame(() => {
        segundo = requestAnimationFrame(() =>
          setDeslize((d) => (d ? { ...d, correndo: true } : d)),
        )
      })
      return () => {
        cancelAnimationFrame(primeiro)
        cancelAnimationFrame(segundo)
      }
    }

    const t = setTimeout(() => setDeslize(null), duracao + 40)
    return () => clearTimeout(t)
  }, [deslize, duracao])

  if (!total) return null

  const transformDe = (papel) => {
    if (!deslize) return 'translateX(0%)'
    const { direcao, correndo } = deslize
    if (papel === 'entra') {
      const inicio = direcao === 1 ? '100%' : '-100%'
      return correndo ? 'translateX(0%)' : `translateX(${inicio})`
    }
    const fim = direcao === 1 ? '-100%' : '100%'
    return correndo ? `translateX(${fim})` : 'translateX(0%)'
  }

  const camada = (slot, transform, correndo) => (
    <div
      className="absolute inset-0"
      key={fotos[slot].src}
      style={{
        transform,
        transition: correndo ? `transform ${duracao}ms ${CURVA}` : 'none',
        willChange: 'transform',
      }}
    >
      <Image
        alt={fotos[slot].alt || ''}
        className="select-none object-cover"
        draggable={false}
        fill
        sizes={sizes}
        src={fotos[slot].src}
      />
    </div>
  )

  return (
    <div className={`relative w-full overflow-hidden rounded-[16px] ${ratio} ${className}`}>
      {deslize ? (
        <>
          {camada(deslize.de, transformDe('sai'), deslize.correndo)}
          {camada(deslize.para, transformDe('entra'), deslize.correndo)}
        </>
      ) : (
        camada(index, 'translateX(0%)', false)
      )}
    </div>
  )
}
