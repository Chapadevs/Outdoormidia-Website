'use client'
import { useEffect } from 'react'

// a família .btn mais quem optar pelo efeito com .radial-reveal
const BOTOES = '.btn, .btn-fill, .btn-on-orange, .btn-ghost, .radial-reveal'

// o mesmo tempo da transição de --rr-r em globals.css
const DURACAO = 420

export default function RadialReveal() {
  useEffect(() => {
    const entrouEm = new WeakMap()

    /* Reancora o círculo no ponteiro e mede o raio que cobre o canto mais
       distante dali. `circle()` resolve porcentagem contra √(w²+h²)/√2, então a
       distância até o canto precisa virar essa unidade antes de ir para o CSS. */
    const ancorar = (el, e) => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const unidade = Math.hypot(r.width, r.height) / Math.SQRT2
      const canto = Math.max(
        Math.hypot(x, y),
        Math.hypot(r.width - x, y),
        Math.hypot(x, r.height - y),
        Math.hypot(r.width - x, r.height - y)
      )
      el.style.setProperty('--rr-x', `${(x / r.width) * 100}%`)
      el.style.setProperty('--rr-y', `${(y / r.height) * 100}%`)
      // +2% para o antialias não deixar costura no canto
      el.style.setProperty('--rr-max', `${(canto / unidade) * 100 + 2}%`)
    }

    /* pointerover/pointerout borbulham (pointerenter/leave não), então um par de
       listeners no documento cobre todo botão da página, inclusive os que ainda
       vão ser montados. Em compensação eles também disparam ao passar de um
       filho para outro dentro do botão: só interessa cruzar a borda dele. */
    const alvo = (e) => {
      const el = e.target instanceof Element ? e.target.closest(BOTOES) : null
      if (!el) return null
      return e.relatedTarget instanceof Node && el.contains(e.relatedTarget) ? null : el
    }

    const aoEntrar = (e) => {
      const el = alvo(e)
      if (!el) return
      entrouEm.set(el, performance.now())
      ancorar(el, e)
    }

    const aoSair = (e) => {
      const el = alvo(e)
      if (!el) return
      /* Recuar em direção ao ponto de saída só vale quando o círculo já cobre o
         botão inteiro: no meio do crescimento, mover a origem rasga um buraco no
         preenchimento. */
      if (performance.now() - (entrouEm.get(el) ?? 0) >= DURACAO) ancorar(el, e)
    }

    document.addEventListener('pointerover', aoEntrar)
    document.addEventListener('pointerout', aoSair)
    return () => {
      document.removeEventListener('pointerover', aoEntrar)
      document.removeEventListener('pointerout', aoSair)
    }
  }, [])

  return null
}
