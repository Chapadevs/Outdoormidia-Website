'use client'

import { motion, motionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import {
  Children,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

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
//
// A geometria dos cards é medida uma vez (montagem e resize) e guardada num
// ref: largura e passo não mudam com a rolagem. Durante o gesto o único valor
// lido é o `scrollLeft`, e ele é lido no próprio evento de scroll, antes de a
// Motion escrever as transformações do frame. Medir depois da escrita obriga o
// navegador a refazer o layout no meio do frame, e era daí que vinha a travada.
//
// Com `loop`, a fita ganha uma cópia do conjunto de cada lado e o scroll salta
// uma cópia inteira quando o card central sai do conjunto do meio. O salto tem
// exatamente o tamanho do conjunto, então nada muda na tela: o visitante
// atravessa a emenda sem ver, e o primeiro item passa a ter vizinho à esquerda.

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

// Cópias do conjunto no modo contínuo: uma antes e uma depois da real. É o
// mínimo que garante conjunto cheio dos dois lados em qualquer posição, porque
// o reposicionamento acontece assim que o card central deixa o do meio.
const COPIAS = 3

// Tempo sem evento de scroll que encerra uma rolagem suave. Enquanto ela corre,
// o reposicionamento fica suspenso: escrever `scrollLeft` no meio de um
// `behavior: 'smooth'` cancela a animação.
const REPOUSO = 140

// Loja externa constante: o único dado que ela publica é "já estamos no
// cliente". É como as cópias do modo contínuo entram só depois da hidratação,
// sem state escrito dentro de efeito.
const SEM_ASSINATURA = () => () => {}
const NO_CLIENTE = () => true
const NO_SERVIDOR = () => false

// `memo` com props estáveis (índice, motion value, ref e callback fixos): o
// card não é reconciliado de novo enquanto o visitante rola. O que muda a cada
// card que passa pelo centro é só a fileira de bolinhas.
const Item = memo(function Item({
  ativoRef,
  clone,
  index,
  offset,
  onSelect,
  semMovimento,
  children,
}) {
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
        if (ativoRef.current === index) return
        e.preventDefault()
        e.stopPropagation()
        onSelect(index)
      }}
      style={{ rotateY, scale, z, opacity, zIndex, transformOrigin }}
    >
      {/* A cópia é decoração: `inert` a tira da ordem de tabulação e do leitor
          de tela, para o mesmo link não existir três vezes. O clique continua
          chegando ao card acima, que é quem centraliza. */}
      <div inert={clone || undefined}>{children}</div>
    </motion.div>
  )
})

export default function Coverflow({
  children,
  gap = 28,
  inicial = 0,
  labels = [],
  label,
  loop = false,
  rotulo = 'item',
  width = 'clamp(250px,24vw,330px)',
}) {
  const items = Children.toArray(children)
  const n = items.length
  const railRef = useRef(null)
  const geoRef = useRef({ meio: 0, cards: [], conjunto: 0 })
  const arrasteRef = useRef(null)
  const suprimirCliqueRef = useRef(false)
  const centralizadoRef = useRef(null)
  const ativoRef = useRef(inicial)
  const animandoRef = useRef(false)
  const repousoRef = useRef(null)
  const syncRef = useRef(null)
  const [arrastando, setArrastando] = useState(false)
  const [active, setActive] = useState(inicial)
  const semMovimento = useReducedMotion()

  // As cópias só entram depois da hidratação: o HTML servido continua trazendo
  // cada item uma vez, e quem lê o documento sem executar JS (busca, leitor de
  // tela) não recebe o conjunto triplicado.
  const hidratado = useSyncExternalStore(SEM_ASSINATURA, NO_CLIENTE, NO_SERVIDOR)

  const continuo = loop && hidratado && n > 1
  const copias = continuo ? COPIAS : 1
  const total = n * copias
  // Onde começa o conjunto real dentro da fita: com as cópias ele é o do meio;
  // sem elas, é o único que existe.
  const base = continuo ? n : 0

  const offsets = useMemo(() => Array.from({ length: total }, () => motionValue(0)), [total])

  // Uma medida por montagem e por resize. Posição e largura do card não mudam
  // com a rolagem, só o quanto do trilho já passou.
  const medir = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const cards = Array.from(rail.children).map((card) => ({
      centro: card.offsetLeft + card.offsetWidth / 2,
      passo: card.offsetWidth + gap,
    }))
    geoRef.current = {
      meio: rail.clientWidth / 2,
      cards,
      // Distância entre um card e o mesmo card na cópia seguinte. Somar ou
      // subtrair esse valor do scroll não muda um pixel na tela, e é isso que
      // torna a emenda invisível.
      conjunto: continuo && cards.length ? cards[0].passo * n : 0,
    }
  }, [continuo, gap, n])

  const posicaoDe = useCallback((i) => {
    const rail = railRef.current
    const card = rail?.children[i]
    if (!card) return null
    return Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2)
  }, [])

  const sync = useCallback(() => {
    const rail = railRef.current
    const { meio, cards, conjunto } = geoRef.current
    if (!rail || !cards.length) return

    let scroll = rail.scrollLeft
    let melhor = 0
    let menorDistancia = Infinity
    for (let i = 0; i < cards.length; i++) {
      const distancia = Math.abs((cards[i].centro - scroll - meio) / cards[i].passo)
      if (distancia < menorDistancia) {
        menorDistancia = distancia
        melhor = i
      }
    }

    // Contínuo: assim que o card central sai do conjunto do meio, o scroll
    // salta uma cópia inteira de volta para ele. A tela não muda, e a fita
    // volta a ter um conjunto cheio de cada lado.
    if (conjunto && !animandoRef.current) {
      const delta = melhor < n ? conjunto : melhor >= 2 * n ? -conjunto : 0
      if (delta) {
        scroll += delta
        melhor += delta > 0 ? n : -n
        rail.scrollLeft = scroll
        // O arrasto guarda de onde partiu; sem corrigir junto, o próximo
        // movimento do ponteiro devolveria o scroll para antes do salto.
        if (arrasteRef.current) arrasteRef.current.left += delta
      }
    }

    for (let i = 0; i < cards.length; i++) {
      offsets[i]?.set((cards[i].centro - scroll - meio) / cards[i].passo)
    }

    ativoRef.current = melhor
    const real = (((melhor - base) % n) + n) % n
    setActive((anterior) => (anterior === real ? anterior : real))

    if (animandoRef.current) {
      clearTimeout(repousoRef.current)
      repousoRef.current = setTimeout(() => {
        animandoRef.current = false
        syncRef.current?.()
      }, REPOUSO)
    }
  }, [base, n, offsets])

  // O `sync` agendado pelo temporizador de repouso precisa ser o mais recente,
  // e ele é recriado a cada mudança de arranjo.
  useEffect(() => {
    syncRef.current = sync
  }, [sync])

  useEffect(() => () => clearTimeout(repousoRef.current), [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    medir()
    // Abre com o item pedido no centro. Sem rolagem suave: é posição de
    // partida, não navegação. O ref guarda para qual arranjo já centralizamos,
    // então isto roda na montagem e de novo quando as cópias entram —
    // recentralizar fora disso jogaria fora onde o visitante parou.
    if (centralizadoRef.current !== total) {
      centralizadoRef.current = total
      const posicao = posicaoDe(base + inicial)
      if (posicao !== null) rail.scrollLeft = posicao
    }
    sync()
    const observer = new ResizeObserver(() => {
      medir()
      sync()
    })
    observer.observe(rail)
    return () => observer.disconnect()
  }, [base, inicial, medir, posicaoDe, sync, total])

  // Navegação por índice de DOM: é o que o clique no card lateral conhece.
  const goTo = useCallback(
    (i) => {
      const rail = railRef.current
      const posicao = posicaoDe(i)
      if (!rail || posicao === null) return
      animandoRef.current = true
      rail.scrollTo({ left: posicao, behavior: 'smooth' })
    },
    [posicaoDe]
  )

  // Navegação por item (as bolinhas). No contínuo o mesmo item existe em três
  // lugares da fita: vale o mais próximo de onde estamos, que é o que permite
  // ir do último ao primeiro andando para a direita.
  const irPara = useCallback(
    (i) => {
      if (!continuo) return goTo(i)
      let destino = base + i
      let menor = Infinity
      for (let c = 0; c < COPIAS; c++) {
        const candidato = c * n + i
        const distancia = Math.abs(candidato - ativoRef.current)
        if (distancia < menor) {
          menor = distancia
          destino = candidato
        }
      }
      goTo(destino)
    },
    [base, continuo, goTo, n]
  )

  // Arrasto com o mouse. O toque já tem inércia nativa e o trackpad já tem
  // scroll horizontal, então nos dois o navegador faz melhor sozinho: só o
  // ponteiro de mouse entra aqui.
  //
  // A captura do ponteiro só acontece quando o gesto vira arrasto de verdade
  // (movimento além do limiar), nunca no `pointerdown` em si: capturar de
  // largada redireciona o `click` sintético para o próprio trilho, e um botão
  // ou link dentro do card parava de responder ao clique — o gesto nunca saía
  // do lugar, mas o clique não chegava nele.
  //
  // Enquanto arrasta, o snap é desligado. Com `snap-mandatory` ligado o
  // navegador puxa a posição de volta a cada `scrollLeft` escrito na mão, e o
  // card gruda no lugar em vez de acompanhar o cursor.
  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const rail = railRef.current
    if (!rail) return
    animandoRef.current = false
    arrasteRef.current = { x: e.clientX, left: rail.scrollLeft, moveu: false, pointerId: e.pointerId }
    suprimirCliqueRef.current = false
  }, [])

  const onPointerMove = useCallback((e) => {
    const arraste = arrasteRef.current
    const rail = railRef.current
    if (!arraste || !rail) return
    const dx = e.clientX - arraste.x
    if (!arraste.moveu && Math.abs(dx) > 4) {
      arraste.moveu = true
      rail.style.scrollSnapType = 'none'
      rail.setPointerCapture(arraste.pointerId)
      setArrastando(true)
    }
    if (arraste.moveu) rail.scrollLeft = arraste.left - dx
  }, [])

  const encerrarArraste = useCallback(
    (e) => {
      const arraste = arrasteRef.current
      const rail = railRef.current
      if (!arraste || !rail) return
      arrasteRef.current = null
      suprimirCliqueRef.current = arraste.moveu
      if (!arraste.moveu) return
      setArrastando(false)
      rail.style.scrollSnapType = ''
      if (rail.hasPointerCapture?.(e.pointerId)) rail.releasePointerCapture(e.pointerId)
      // Sem inércia: solta e assenta no card mais próximo, que é o mesmo
      // destino a que o snap chegaria.
      goTo(ativoRef.current)
    },
    [goTo]
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
        onScroll={sync}
        ref={railRef}
        role="group"
        style={{
          '--cw': width,
          gap: `${gap}px`,
          paddingInline: 'calc((100% - var(--cw)) / 2)',
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const item = items[i % n]
          return (
            <Item
              ativoRef={ativoRef}
              clone={i < base || i >= base + n}
              index={i}
              key={`${item.key ?? i % n}-${Math.floor(i / n)}`}
              offset={offsets[i]}
              onSelect={goTo}
              semMovimento={semMovimento}
            >
              {item}
            </Item>
          )
        })}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2.5">
        {items.map((item, i) => (
          <button
            aria-label={labels[i] ? `Ir para ${labels[i]}` : `Ir para o ${rotulo} ${i + 1}`}
            className={`h-2 cursor-pointer rounded-full border-none p-0 transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
              i === active ? 'w-[30px] bg-orange' : 'w-2 bg-ink/25'
            }`}
            key={item.key ?? i}
            onClick={() => irPara(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
