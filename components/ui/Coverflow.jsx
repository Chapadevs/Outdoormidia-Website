'use client'

import { motion, motionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Carrossel de coverflow: um item centralizado em tamanho cheio e os vizinhos
// girados para dentro, apagados e recuados. Substitui o `.rail` onde a leitura
// precisa ser de um item por vez.
//
// A posição não vem de state: o scroll nativo continua sendo a fonte de
// verdade (snap, trackpad, swipe e teclado saem de graça) e cada card recebe um
// motion value com a própria distância até o centro, em larguras de card. Isso
// mantém a animação fora do ciclo de render do React.
//
// Medida sempre por offsetLeft/offsetWidth, nunca por getBoundingClientRect:
// o rect já vem com a transformação aplicada e realimentaria o cálculo.

// Mola que suaviza o valor cru do scroll. A roda do mouse entrega o
// deslocamento em degraus, e sem ela a rotação anda aos saltos junto. Rígida o
// bastante para não parecer atraso, macia o bastante para arredondar o degrau.
const MOLA = { stiffness: 320, damping: 42, mass: 0.55, restDelta: 0.0005 }

// Queda suavizada (smoothstep) em vez de linear: perto do centro o card quase
// não reage, e a diferença acontece no meio do caminho. A derivada é zero na
// origem, então a troca de sinal do giro atravessa o centro sem quebra.
const queda = (valor, alcance) => {
  const t = Math.min(Math.abs(valor) / alcance, 1)
  return t * t * (3 - 2 * t)
}

const sinal = (valor) => (valor < 0 ? -1 : 1)

function Item({ ativo, offset, onSelect, semMovimento, children }) {
  const suave = useSpring(offset, MOLA)

  const rotateY = useTransform(suave, (v) => (semMovimento ? 0 : sinal(v) * 27 * queda(v, 1.3)))
  const scale = useTransform(suave, (v) => 1 - 0.13 * queda(v, 1.6))
  const z = useTransform(suave, (v) => (semMovimento ? 0 : -110 * queda(v, 1.6)))
  const opacity = useTransform(suave, (v) => 1 - 0.55 * queda(v, 1.3))
  const zIndex = useTransform(suave, (v) => 10 - Math.round(10 * queda(v, 1.6)))

  // O eixo do giro acompanha a borda interna do card: o lateral abre como
  // página, em vez de girar em torno do próprio meio. É o que dá a leitura de
  // profundidade em vez de card torto.
  const transformOrigin = useTransform(
    suave,
    (v) => `${50 - sinal(v) * 42 * queda(v, 1.3)}% 50%`
  )

  return (
    <motion.div
      className="flex-none snap-center [width:var(--cw)] [backface-visibility:hidden] [will-change:transform,opacity]"
      // Card fora do centro não dispara o conteúdo: o primeiro clique traz ele
      // para o meio. Fase de captura, para chegar antes do botão de play.
      onClickCapture={(e) => {
        if (ativo) return
        e.preventDefault()
        e.stopPropagation()
        onSelect()
      }}
      style={{ rotateY, scale, z, opacity, zIndex, transformOrigin }}
    >
      {children}
    </motion.div>
  )
}

export default function Coverflow({
  children,
  gap = 28,
  inicial = 0,
  labels = [],
  label,
  rotulo = 'item',
  width = 'clamp(250px,24vw,330px)',
}) {
  const items = Children.toArray(children)
  const railRef = useRef(null)
  const frameRef = useRef(0)
  const arrasteRef = useRef(null)
  const suprimirCliqueRef = useRef(false)
  const centralizouRef = useRef(false)
  const [arrastando, setArrastando] = useState(false)
  const [active, setActive] = useState(inicial)
  const semMovimento = useReducedMotion()

  const offsets = useMemo(
    () => Array.from({ length: items.length }, () => motionValue(0)),
    [items.length]
  )

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const meio = rail.clientWidth / 2
    let melhor = 0
    let menorDistancia = Infinity
    Array.from(rail.children).forEach((card, i) => {
      const centro = card.offsetLeft - rail.scrollLeft + card.offsetWidth / 2
      const distancia = (centro - meio) / (card.offsetWidth + gap)
      offsets[i]?.set(distancia)
      if (Math.abs(distancia) < menorDistancia) {
        menorDistancia = Math.abs(distancia)
        melhor = i
      }
    })
    setActive((anterior) => (anterior === melhor ? anterior : melhor))
  }, [gap, offsets])

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(sync)
  }, [sync])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    // Abre com o item pedido no centro. Sem rolagem suave: é posição de
    // partida, não navegação, e o ref garante que só aconteça na montagem —
    // recentralizar depois jogaria fora onde o visitante parou.
    const card = rail.children[inicial]
    if (card && !centralizouRef.current) {
      centralizouRef.current = true
      rail.scrollLeft = Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2)
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(rail)
    return () => {
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
    }
  }, [inicial, sync])

  const goTo = useCallback((i) => {
    const rail = railRef.current
    const card = rail?.children[i]
    if (!card) return
    rail.scrollTo({
      left: Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2),
      behavior: 'smooth',
    })
  }, [])

  // Arrasto com o mouse. O toque já tem inércia nativa e o trackpad já tem
  // scroll horizontal, então nos dois o navegador faz melhor sozinho: só o
  // ponteiro de mouse entra aqui.
  //
  // Enquanto arrasta, o snap é desligado. Com `snap-mandatory` ligado o
  // navegador puxa a posição de volta a cada `scrollLeft` escrito na mão, e o
  // card gruda no lugar em vez de acompanhar o cursor.
  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const rail = railRef.current
    if (!rail) return
    arrasteRef.current = { x: e.clientX, left: rail.scrollLeft, moveu: false }
    suprimirCliqueRef.current = false
    rail.style.scrollSnapType = 'none'
    rail.setPointerCapture(e.pointerId)
    setArrastando(true)
  }, [])

  const onPointerMove = useCallback((e) => {
    const arraste = arrasteRef.current
    const rail = railRef.current
    if (!arraste || !rail) return
    const dx = e.clientX - arraste.x
    if (Math.abs(dx) > 4) arraste.moveu = true
    rail.scrollLeft = arraste.left - dx
  }, [])

  const encerrarArraste = useCallback(
    (e) => {
      const arraste = arrasteRef.current
      const rail = railRef.current
      if (!arraste || !rail) return
      arrasteRef.current = null
      suprimirCliqueRef.current = arraste.moveu
      setArrastando(false)
      rail.style.scrollSnapType = ''
      if (rail.hasPointerCapture?.(e.pointerId)) rail.releasePointerCapture(e.pointerId)
      // Sem inércia: solta e assenta no card mais próximo, que é o mesmo
      // destino a que o snap chegaria.
      if (arraste.moveu) goTo(active)
    },
    [active, goTo]
  )

  // Arrastar não é clicar: sem isto, soltar o mouse sobre o card abriria o
  // vídeo no fim de cada arrasto.
  const onClickCapture = useCallback((e) => {
    if (!suprimirCliqueRef.current) return
    suprimirCliqueRef.current = false
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div>
      {/* O padding lateral é o que permite ao primeiro e ao último card
          alcançarem o centro. A perspectiva mora no scroller, para que todos os
          cards compartilhem o mesmo ponto de fuga. */}
      <div
        aria-label={label}
        className={`flex snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden py-2 [-ms-overflow-style:none] [perspective:1400px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          arrastando ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        onClickCapture={onClickCapture}
        // Sem isto o navegador inicia o arrasto nativo da imagem no meio do gesto.
        onDragStart={(e) => e.preventDefault()}
        onPointerCancel={encerrarArraste}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={encerrarArraste}
        onScroll={onScroll}
        ref={railRef}
        role="group"
        style={{
          '--cw': width,
          gap: `${gap}px`,
          paddingInline: 'calc((100% - var(--cw)) / 2)',
        }}
      >
        {items.map((item, i) => (
          <Item
            ativo={i === active}
            key={item.key ?? i}
            offset={offsets[i]}
            onSelect={() => goTo(i)}
            semMovimento={semMovimento}
          >
            {item}
          </Item>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2.5">
        {items.map((item, i) => (
          <button
            aria-label={labels[i] ? `Ir para ${labels[i]}` : `Ir para o ${rotulo} ${i + 1}`}
            className={`h-2 cursor-pointer rounded-full border-none p-0 transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
              i === active ? 'w-[30px] bg-orange' : 'w-2 bg-ink/25'
            }`}
            key={item.key ?? i}
            onClick={() => goTo(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
