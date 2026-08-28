'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

/* Trilho vertical fixo no vão esquerdo da home: um traço por seção, com o número
   e o nome. O nome de cada seção só aparece quando ela é a seção em tela (ou no
   hover do traço) — o trilho fica um risco discreto e só se identifica no ponto
   em que o visitante está. Some abaixo de 1080px, onde o vão à esquerda do
   `.wrap` some e o trilho encostaria no conteúdo, e some de novo quando o
   rodapé entra em tela: ali a navegação já é a do próprio rodapé. */

// Ordem e nomes seguem a home; `inv` marca a seção de fundo escuro ou laranja,
// onde o trilho inteiro precisa inverter para branco para não sumir.
// `corNome` sobrescreve só a cor do nome da seção, sem mexer no traço nem no
// número, para a seção que pede um destaque próprio.
const SECOES = [
  { id: 'inicio', nome: 'Início', inv: true },
  { id: 'institucional', nome: 'Empresa', inv: false },
  { id: 'diferenciais', nome: 'Diferenciais', inv: false, corNome: '#FF6900' },
  { id: 'plataformas', nome: 'Plataformas', inv: false },
  { id: 'cobertura', nome: 'Cobertura', inv: false },
  { id: 'depoimentos', nome: 'Depoimentos', inv: false },
  { id: 'cases', nome: 'Cases', inv: false },
  { id: 'processo', nome: 'Processo', inv: false },
  { id: 'nova-campanha', nome: 'Anunciar', inv: true },
  { id: 'blog', nome: 'Blog', inv: false },
  { id: 'faq', nome: 'Perguntas', inv: false },
]

const NUM = (i) => String(i + 1).padStart(2, '0')

export default function HomeTimeline() {
  const toposRef = useRef([])
  const docRef = useRef(1)
  const rafRef = useRef(0)
  const [itens, setItens] = useState([])
  const [ativo, setAtivo] = useState(0)
  const [fundo, setFundo] = useState(0)
  const [preenchido, setPreenchido] = useState(0)
  const [hover, setHover] = useState(-1)
  const [visivel, setVisivel] = useState(false)
  const [noRodape, setNoRodape] = useState(false)
  const rodapeRef = useRef(Infinity)

  const atualizar = useCallback(() => {
    const topos = toposRef.current
    const n = topos.length
    if (!n) return
    const vh = window.innerHeight
    const y = window.scrollY
    const sonda = y + vh * 0.34

    let i = 0
    for (let k = 0; k < n; k++) if (sonda >= topos[k] - 2) i = k
    const proximo = i < n - 1 ? topos[i + 1] : docRef.current
    const vao = proximo - topos[i]
    const t = vao > 0 ? Math.min(1, Math.max(0, (sonda - topos[i]) / vao)) : 0
    let fill = n > 1 ? ((i + t) / (n - 1)) * 100 : 100
    if (y + vh >= docRef.current - 6) fill = 100

    const meio = y + vh / 2
    let j = 0
    for (let k = 0; k < n; k++) if (meio >= topos[k] - 2) j = k

    setNoRodape(y + vh >= rodapeRef.current)
    setAtivo(i)
    setFundo(j)
    setPreenchido(Math.min(100, Math.max(0, fill)))
  }, [])

  useEffect(() => {
    const medir = () => {
      const encontradas = SECOES.filter((s) => document.getElementById(s.id))
      setItens(encontradas)
      toposRef.current = encontradas.map((s) =>
        Math.round(document.getElementById(s.id).getBoundingClientRect().top + window.scrollY)
      )
      docRef.current = document.documentElement.scrollHeight
      const rodape = document.querySelector('footer')
      rodapeRef.current = rodape
        ? Math.round(rodape.getBoundingClientRect().top + window.scrollY)
        : Infinity
      atualizar()
    }

    const aoRolar = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        atualizar()
      })
    }

    const mq = window.matchMedia('(min-width: 1080px)')
    const sincronizar = () => setVisivel(mq.matches)
    sincronizar()
    mq.addEventListener('change', sincronizar)

    medir()
    const t1 = setTimeout(medir, 400)
    const t2 = setTimeout(medir, 1400)
    if (document.fonts?.ready) document.fonts.ready.then(medir)

    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', medir)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(t1)
      clearTimeout(t2)
      mq.removeEventListener('change', sincronizar)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', medir)
    }
  }, [atualizar])

  if (!visivel || itens.length < 2) return null

  const inv = itens[fundo]?.inv
  const destaque = inv ? '#FFFFFF' : '#FF6900'
  const trilho = inv ? 'rgba(255,255,255,.26)' : 'rgba(22,17,13,.16)'
  const numApagado = inv ? 'rgba(255,255,255,.62)' : 'rgba(22,17,13,.5)'
  const numPassado = inv ? 'rgba(255,255,255,.82)' : 'rgba(22,17,13,.66)'
  const forte = inv ? '#FFFFFF' : '#16110D'
  const suave = '.35s cubic-bezier(.2,.7,.2,1)'

  const irPara = (i) => {
    const topo = i === 0 ? 0 : Math.max(0, toposRef.current[i] - 66)
    window.scrollTo({ top: topo, behavior: 'smooth' })
  }

  return (
    <nav
      aria-hidden={noRodape || undefined}
      aria-label="Seções desta página"
      className={`fixed left-4 top-1/2 z-[55] -translate-y-1/2 transition-opacity duration-300 ${
        noRodape ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex h-[min(600px,70vh)] flex-col justify-between">
        <span
          aria-hidden="true"
          className="absolute inset-y-[9px] left-0 w-px transition-colors duration-300"
          style={{ background: trilho }}
        >
          <span
            className="absolute inset-x-0 top-0 transition-[height,background] duration-150 ease-linear"
            style={{ height: `${preenchido}%`, background: destaque }}
          />
        </span>

        {itens.map((s, i) => {
          const on = i === ativo
          const passado = i < ativo
          const quente = i === hover
          const mostrarNome = on || quente
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => irPara(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
              aria-current={on ? 'true' : undefined}
              className="relative flex h-[18px] cursor-pointer items-center gap-[6px] border-0 bg-transparent p-0 text-left"
            >
              <span
                aria-hidden="true"
                className="flex-none"
                style={{
                  height: on ? 2 : 1,
                  width: on ? 18 : quente ? 14 : passado ? 12 : 10,
                  background: on
                    ? destaque
                    : passado
                      ? inv
                        ? 'rgba(255,255,255,.5)'
                        : 'rgba(22,17,13,.34)'
                      : trilho,
                  transition: suave,
                }}
              />
              <span
                className="w-[14px] flex-none text-[10.5px] tracking-[.04em]"
                style={{
                  fontWeight: on ? 700 : 600,
                  color: on ? destaque : passado ? numPassado : numApagado,
                  transition: suave,
                }}
              >
                {NUM(i)}
              </span>
              <span
                className="pointer-events-none absolute left-[44px] whitespace-nowrap text-[9.5px] font-bold uppercase tracking-[.14em]"
                style={{
                  color: s.corNome ?? (on ? forte : numPassado),
                  opacity: mostrarNome ? 1 : 0,
                  transform: mostrarNome ? 'none' : 'translateX(-6px)',
                  transition: suave,
                }}
              >
                {s.nome}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
