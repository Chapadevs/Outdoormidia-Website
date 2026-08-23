'use client'

import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

// Fundo vivo para faixas laranja: três manchas de luz que derivam em ritmos
// diferentes, um grão fino por cima e um brilho difuso que acompanha o cursor.
//
// Nenhum padrão geométrico de propósito — grid de pontos vira textura sobre o
// conteúdo em vez de fundo. O que dá profundidade aqui é a variação de tom do
// próprio laranja, e o grão é o que tira o aspecto chapado da cor sólida.
//
// Decorativo: `aria-hidden`, `pointer-events-none` e atrás de todo o conteúdo.

// Grão em SVG inline: mais barato que uma textura em PNG e não pede requisição.
const GRAO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23g)' opacity='.42'/%3E%3C/svg%3E\")"

export default function AuroraField({ className = '' }) {
  const campoRef = useRef(null)

  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const mola = { stiffness: 220, damping: 30, mass: 0.5 }
  const molaX = useSpring(x, mola)
  const molaY = useSpring(y, mola)

  // O ponteiro é escutado na seção inteira, não numa camada própria: uma camada
  // atrás do conteúdo pararia de receber mousemove assim que o cursor passasse
  // sobre o título, e o brilho congelaria no lugar.
  useEffect(() => {
    const el = campoRef.current
    const secao = el?.parentElement
    if (!el || !secao) return

    const escrever = (nome) => (valor) => el.style.setProperty(nome, `${valor}px`)
    const cancelaX = molaX.on('change', escrever('--luz-x'))
    const cancelaY = molaY.on('change', escrever('--luz-y'))

    const aoMover = (e) => {
      const rect = secao.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
    const acender = () => el.style.setProperty('--luz-opacidade', '1')
    const apagar = () => el.style.setProperty('--luz-opacidade', '0')

    secao.addEventListener('mousemove', aoMover)
    secao.addEventListener('mouseenter', acender)
    secao.addEventListener('mouseleave', apagar)

    return () => {
      cancelaX()
      cancelaY()
      secao.removeEventListener('mousemove', aoMover)
      secao.removeEventListener('mouseenter', acender)
      secao.removeEventListener('mouseleave', apagar)
    }
  }, [molaX, molaY, x, y])

  return (
    <div
      ref={campoRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ '--luz-x': '50%', '--luz-y': '50%', '--luz-opacidade': 0 }}
    >
      {/* manchas de luz — três tons do laranja derivando fora de sincronia */}
      <div
        className="absolute -inset-1/3 motion-safe:animate-aurora-a"
        style={{
          background:
            'radial-gradient(42% 46% at 26% 30%, rgba(255,196,140,.55), transparent 68%)',
        }}
      />
      <div
        className="absolute -inset-1/3 motion-safe:animate-aurora-b"
        style={{
          background:
            'radial-gradient(46% 50% at 74% 62%, rgba(214,80,0,.52), transparent 66%)',
        }}
      />
      <div
        className="absolute -inset-1/3 motion-safe:animate-aurora-c"
        style={{
          background:
            'radial-gradient(38% 44% at 52% 88%, rgba(255,255,255,.20), transparent 70%)',
        }}
      />

      {/* brilho que segue o cursor — difuso, sem contorno */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: 'var(--luz-opacidade)',
          background:
            'radial-gradient(circle 460px at var(--luz-x) var(--luz-y), rgba(255,225,195,.26), transparent 60%)',
        }}
      />

      {/* vinheta quente — aprofunda as bordas para o texto branco sobressair */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 108% at 50% 44%, transparent 52%, rgba(150,48,0,.34) 100%)',
        }}
      />

      {/* grão — tira o aspecto chapado da cor sólida */}
      <div
        className="absolute inset-0 opacity-[.14] mix-blend-overlay"
        style={{ backgroundImage: GRAO, backgroundSize: '140px 140px' }}
      />
    </div>
  )
}
