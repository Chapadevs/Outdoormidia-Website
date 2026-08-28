'use client'
import { useEffect, useRef, useState } from 'react'
import { DEGRAUS } from '@/lib/diagnostico'

// A Escada da Presença nos dois estados previstos na copy: neutro (bloco
// educativo, antes das perguntas) e aceso (resultado, com o degrau da pessoa
// destacado). Um componente só, o estado vem do `ativo`.
//
// A barra laranja no topo de cada card cresce de 20% em 20% — é o que dá a
// leitura de escada sem precisar escalonar altura, que quebraria o grid no
// mobile empilhado.
//
// A entrada é em cascata, degrau a degrau (regras `.escada` em globals.css), e o
// gatilho é sempre a rolagem: o fade só roda quando a escada aparece na tela.
//
// O observer é do próprio componente, e não o `RevealObserver` global, porque no
// resultado a escada é montada no clique — o observer global varre a página uma
// única vez, por rota, e nunca veria esses nós. Rodando na montagem, a cascata
// acontecia fora da tela e a pessoa chegava rolando num bloco já parado.
const ATRASO_DEGRAU = 0.1

export default function EscadaPresenca({ ativo = null, className = '' }) {
  const neutro = ativo === null
  const [visivel, setVisivel] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const alvo = ref.current
    if (!alvo) return
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setVisivel(true)
        io.disconnect()
      },
      { threshold: 0.15 }
    )
    io.observe(alvo)
    return () => io.disconnect()
  }, [])

  return (
    <ol
      ref={ref}
      className={`escada m-0 grid list-none grid-cols-5 gap-3 p-0 max-tab:grid-cols-2 max-mob:grid-cols-1 ${
        visivel ? 'in' : ''
      } ${className}`}
    >
      {DEGRAUS.map((degrau, i) => {
        const aceso = degrau.n === ativo
        const apagado = !neutro && !aceso
        // O degrau apagado não pode levar `opacity-55`: utility do Tailwind vence
        // o `@layer components` e trava a opacidade que a animação precisa mover.
        // A opacidade final vira variável, e quem a aplica é a regra da cascata.
        return (
          <li
            aria-current={aceso ? 'step' : undefined}
            style={{
              '--degrau-opacidade': apagado ? 0.55 : 1,
              transitionDelay: `${i * ATRASO_DEGRAU}s`,
            }}
            className={`flex flex-col gap-2 rounded-[16px] border p-5 max-tab:last:col-span-2 max-mob:last:col-span-1 max-mob:p-4 ${
              aceso
                ? degrau.card
                : apagado
                  ? 'border-line bg-paper text-ink-soft'
                  : 'border-line bg-white text-ink'
            }`}
            key={degrau.key}
          >
            <span
              aria-hidden="true"
              className={`h-1 rounded-full ${aceso ? 'bg-current opacity-70' : 'bg-orange'} ${
                apagado ? 'opacity-40' : ''
              }`}
              style={{ width: `${(i + 1) * 20}%` }}
            />
            <span className="mt-1 flex items-center gap-2.5">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${
                  aceso ? degrau.icone : 'bg-orange/10 text-orange'
                } ${apagado ? 'opacity-70' : ''}`}
              >
                <degrau.Icone size={20} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
                Degrau {degrau.n}
              </span>
            </span>
            <span className="text-[15px] font-extrabold leading-tight">{degrau.nome}</span>
            <p
              className={`m-0 text-[13.5px] leading-[1.45] ${
                aceso ? degrau.soft : 'text-ink-soft'
              }`}
            >
              {degrau.linha}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
