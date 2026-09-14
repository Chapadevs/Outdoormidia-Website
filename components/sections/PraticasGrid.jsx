'use client'

import {
  BarChart3,
  CalendarClock,
  Check,
  Eye,
  Frame,
  Repeat,
  Route,
  Shapes,
  Target,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { getPraticas } from '@/lib/melhoresPraticas'

// Só o ícone vive aqui: título, corpo e linha de aplicação vêm de
// lib/melhoresPraticas.js, na ordem das oito práticas.
const ICONES = [Target, Route, Shapes, Repeat, Eye, Frame, BarChart3, CalendarClock]

// A página é só esta grade, então ela precisa se comportar como um percurso e não
// como uma lista: cada prática é uma fase, e a barra presa no topo conta quantas
// já foram lidas. O card é dado como lido quando o topo dele cruza a linha de
// leitura (os 65% de cima da tela), e é nesse instante que ele acende: entra do
// estado apagado para o cheio, com o selo de leitura pipocando no canto do
// número. Uma vez lido, fica lido — a barra nunca recua, como progresso de jogo.
//
// O `.in` não vem do RevealObserver global de propósito: o observer global só
// diz que o elemento entrou na tela, e a contagem precisa saber qual card foi.
const LINHA_DE_LEITURA = '0px 0px -35% 0px'

const num = (i) => String(i + 1).padStart(2, '0')

// A linha de aplicação da prática 04 carrega um link no meio da frase. O texto
// continua sendo um só campo em lib/, e é aqui que ele é partido: guardar JSX
// no arquivo de conteúdo obrigaria quem edita a copy a mexer em markup.
function LinhaDeAplicacao({ pratica, praticaLink }) {
  if (!praticaLink) return pratica

  const [antes, depois] = pratica.split(praticaLink.trecho)
  return (
    <>
      {antes}
      <Link href={praticaLink.href} className="font-bold text-orange hover:underline">
        {praticaLink.trecho}
      </Link>
      {depois}
    </>
  )
}

export default function PraticasGrid() {
  const locale = useLocale()
  const t = useTranslations('PraticasGrid')
  const PRATICAS = getPraticas(locale)
  const total = PRATICAS.length
  const listaRef = useRef(null)
  const [lidas, setLidas] = useState(() => new Set())

  useEffect(() => {
    const lista = listaRef.current
    if (!lista) return
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          const i = Number(e.target.dataset.indice)
          setLidas((atual) => (atual.has(i) ? atual : new Set(atual).add(i)))
          io.unobserve(e.target)
        })
      },
      { rootMargin: LINHA_DE_LEITURA, threshold: 0 }
    )
    lista.querySelectorAll('[data-indice]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const contagem = lidas.size
  const completo = contagem === total

  return (
    <>
      <div
        aria-live="polite"
        className="sticky top-[74px] z-30 mb-[26px] flex items-center gap-4 rounded-full border border-line bg-paper/90 px-5 py-3 shadow-[0_10px_30px_rgba(22,17,13,.08)] backdrop-blur-[10px] max-mob:top-16 max-mob:gap-3 max-mob:px-4"
      >
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
            completo ? 'bg-orange text-white' : 'bg-orange/10 text-orange'
          }`}
        >
          {completo ? <Check size={20} /> : <Zap size={20} />}
        </span>
        <span className="eyebrow whitespace-nowrap text-ink">
          <span className="tabular-nums">{contagem}</span> de {total} lidas
        </span>
        <ol className="m-0 flex flex-1 list-none gap-1.5 p-0" aria-hidden="true">
          {PRATICAS.map((p, i) => (
            <li
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                lidas.has(i) ? 'bg-orange' : 'bg-ink/10'
              }`}
              key={p.titulo}
            />
          ))}
        </ol>
        <span className="eyebrow whitespace-nowrap text-ink-soft max-mob:hidden">
          {completo ? 'Percurso completo' : 'Continue rolando'}
        </span>
      </div>

      <ol
        ref={listaRef}
        className="praticas m-0 grid list-none grid-cols-2 gap-[18px] p-0 max-tab:grid-cols-1"
      >
        {PRATICAS.map((p, i) => {
          const Icone = ICONES[i]
          const lida = lidas.has(i)
          return (
            <li
              className={`ticks group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 hover:-translate-y-1 hover:border-orange hover:shadow-[0_18px_44px_rgba(255,105,0,.16)] max-mob:p-6 ${lida ? 'in' : ''}`}
              data-indice={i}
              key={p.titulo}
            >
              <span
                aria-hidden="true"
                className="h-1 rounded-full bg-orange transition-[width] duration-700"
                style={{ width: lida ? `${((i + 1) / total) * 100}%` : '0%' }}
              />

              <div className="mt-1 flex items-center justify-between gap-4">
                <span className="relative inline-flex items-center gap-3">
                  <span className="text-[34px] font-extrabold leading-none text-orange">
                    {num(i)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`selo grid size-6 place-items-center rounded-full bg-orange text-white ${
                      lida ? 'in' : ''
                    }`}
                  >
                    <Check size={14} />
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-[10px] bg-orange/10 text-orange transition-[background-color,color,rotate] duration-300 group-hover:-rotate-6 group-hover:bg-orange group-hover:text-white">
                  <Icone size={24} />
                </span>
              </div>

              <h3 className="m-0 text-[25px] font-extrabold leading-tight text-ink">
                {p.titulo}
              </h3>
              <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.corpo}</p>

              {p.recomendacoes && (
                <div className="mt-2 rounded-[10px] border border-line bg-paper p-5">
                  <span className="eyebrow">{p.recomendacoes.titulo}</span>
                  <p className="m-0 mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                    {p.recomendacoes.texto}
                  </p>
                </div>
              )}

              {p.pratica && (
                <p className="m-0 mt-auto flex gap-3 rounded-[10px] bg-orange/8 p-4 text-[15.5px] leading-relaxed text-ink">
                  <Zap size={20} className="mt-0.5 shrink-0 text-orange" />
                  <span>
                    <strong className="font-extrabold">{t('naPratica')}</strong>{' '}
                    <LinhaDeAplicacao pratica={p.pratica} praticaLink={p.praticaLink} />
                  </span>
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </>
  )
}
