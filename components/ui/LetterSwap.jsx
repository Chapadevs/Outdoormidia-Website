'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'

// Troca de letras em ordem sorteada: cada caractere sobe e sai de cena enquanto
// uma cópia idêntica entra por baixo, no mesmo movimento. Como as duas cópias
// são a mesma letra, o texto continua legível o tempo todo, ao contrário do
// sorteio de caracteres aleatórios que isto substituiu.
//
// Dispara uma vez, quando o texto entra em cena na rolagem, e depois nunca
// para: `repeat: Infinity` faz a letra girar de novo a cada ciclo, porque o
// salto de volta ao início (`repeatType: 'loop'`) é invisível, já que as duas
// cópias são o mesmo caractere. O `delay` inicial é o que dá a entrada rápida
// e escalonada do primeiro scroll; o `repeatDelay`, bem maior, é o que segura
// o giro seguinte, contínuo, num ritmo lento e preguiçoso.
//
// A letra e a cópia viajam juntas dentro de um trilho: é o trilho que anda
// -100%, e a moldura com overflow-hidden recorta o que sai. Um elemento animado
// por letra, não dois.
//
// O sorteio mexe só no atraso de cada letra, nunca na ordem do DOM. Por isso ele
// pode nascer no useState sem desencontrar o HTML do servidor: o embaralhamento
// não aparece na marcação, só na transição.
//
// Espaço fica de fora do sorteio, para não gastar um degrau da escada com um
// caractere que ninguém vê se mexer.

const ESCADA_S = 0.14
const MOLA = { type: 'spring', duration: 0.7, bounce: 0.15 }
const REPEAT_DELAY_S = 5

function embaralha(indices) {
  const a = [...indices]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function LetterSwap({ text, delay = 0, escada = ESCADA_S, className = '' }) {
  const texto = String(text)
  const chars = [...texto]

  const ref = useRef(null)
  const emCena = useInView(ref, { once: true, amount: 0.4 })
  const semMovimento = useReducedMotion()
  const trocar = emCena && !semMovimento

  const [ordem] = useState(() =>
    embaralha(chars.reduce((acc, char, i) => (char === ' ' ? acc : [...acc, i]), []))
  )
  const posicao = new Map(ordem.map((idx, i) => [idx, i]))

  return (
    <span className={`relative inline-flex items-end ${className}`} ref={ref}>
      <span className="sr-only">{texto}</span>
      {chars.map((char, i) =>
        char === ' ' ? (
          <span aria-hidden="true" className="whitespace-pre" key={i}>
            {char}
          </span>
        ) : (
          <span aria-hidden="true" className="relative inline-block overflow-hidden" key={i}>
            <motion.span
              animate={{ y: trocar ? '-100%' : '0%' }}
              className="relative inline-block"
              transition={{
                ...MOLA,
                delay: delay + posicao.get(i) * escada,
                ...(trocar && {
                  repeat: Infinity,
                  repeatType: 'loop',
                  repeatDelay: REPEAT_DELAY_S + posicao.get(i) * escada,
                }),
              }}
            >
              {char}
              <span className="absolute left-0 top-full">{char}</span>
            </motion.span>
          </span>
        )
      )}
    </span>
  )
}
