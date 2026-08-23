'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'

// Galeria que vira a imagem em 3D: duas faces girando em rotateY, a de trás
// escondida por backface-visibility. Clique na metade esquerda volta, na direita
// avança — as setas do teclado fazem o mesmo.
//
// Só duas faces existem em cena, independente de quantas fotos vierem: a que
// está entrando recebe a próxima foto enquanto ainda está de costas.

const RATIOS = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
}

const MEIA_VOLTA = 180
const PERSPECTIVA = 900

const faceDe = (angulo) => (Math.abs(Math.round(angulo / MEIA_VOLTA)) % 2 === 0 ? 'a' : 'b')

export default function ImageFlip({
  images = [],
  ratio = '16/9',
  sizes = '(max-width: 980px) 100vw, 620px',
  priority = false,
  tilt = true,
  tiltLimite = 10,
  tiltEscala = 1.02,
  tiltEfeito = 'repel',
  ticks = true,
  className = '',
}) {
  const fotos = images.filter((item) => item?.src)

  const palcoRef = useRef(null)
  const [angulo, setAngulo] = useState(0)
  const [faces, setFaces] = useState({ a: 0, b: 1 })

  if (!fotos.length) return null

  const interativo = fotos.length > 1

  const virar = (direcao) => {
    if (!interativo) return
    const proximoAngulo = angulo + direcao * MEIA_VOLTA
    const atual = faces[faceDe(angulo)]
    const proxima = (atual + direcao + fotos.length) % fotos.length
    setFaces((f) => ({ ...f, [faceDe(proximoAngulo)]: proxima }))
    setAngulo(proximoAngulo)
  }

  const aoClicar = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    virar(e.clientX - rect.left < rect.width / 2 ? -1 : 1)
  }

  const aoTeclar = (e) => {
    if (e.key === 'ArrowLeft') virar(-1)
    else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      virar(1)
    }
  }

  const aoMover = (e) => {
    const el = palcoRef.current
    if (!tilt || !el) return
    const { width, height, top, left } = el.getBoundingClientRect()
    const sinal = tiltEfeito === 'repel' ? -1 : 1
    const x = ((e.clientY - top) / height - 0.5) * tiltLimite * 2 * sinal
    const y = ((e.clientX - left) / width - 0.5) * tiltLimite * -2 * sinal
    el.style.transform = `rotateX(${x}deg) rotateY(${y}deg) scale(${tiltEscala})`
  }

  const aoSair = () => {
    const el = palcoRef.current
    if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  const face = (slot, virada) => {
    const foto = fotos[slot % fotos.length]
    return (
      <div
        className="absolute inset-0 overflow-hidden rounded-[16px] border border-line [backface-visibility:hidden]"
        style={virada ? { transform: 'rotateY(180deg)' } : undefined}
      >
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="select-none object-cover"
          style={{ objectPosition: `center ${foto.focusY ?? 50}%` }}
        />
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${RATIOS[ratio]} ${ticks ? 'ticks' : ''} ${className}`}
      style={{ perspective: `${PERSPECTIVA}px` }}
    >
      <div
        ref={palcoRef}
        role={interativo ? 'button' : undefined}
        tabIndex={interativo ? 0 : undefined}
        aria-label={interativo ? 'Ver a próxima imagem' : undefined}
        onMouseMove={aoMover}
        onMouseLeave={aoSair}
        onClick={aoClicar}
        onKeyDown={aoTeclar}
        className={`relative h-full w-full transition-transform duration-200 ease-out [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${interativo ? 'cursor-pointer' : ''}`}
      >
        <motion.div
          animate={{ rotateY: angulo }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1 }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {face(faces.a, false)}
          {face(faces.b, true)}
        </motion.div>
      </div>
    </div>
  )
}
