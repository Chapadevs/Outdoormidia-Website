'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FAIXAS, NOTA_MAXIMA, PERGUNTAS, faixaDoScore } from '@/lib/diagnostico'
import { waDiagnostico, waLink } from '@/lib/whatsapp'

export default function DiagnosticoQuiz() {
  const [notas, setNotas] = useState({})
  const resultadoRef = useRef(null)

  const respondidas = Object.keys(notas).length
  const completo = respondidas === PERGUNTAS.length
  const score = Object.values(notas).reduce((total, n) => total + n, 0)
  const faixa = faixaDoScore(score)

  useEffect(() => {
    if (completo) resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [completo])

  function definirNota(i, nota) {
    setNotas((atual) => (atual[i] === nota ? atual : { ...atual, [i]: nota }))
  }

  function refazer() {
    setNotas({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="sticky top-[74px] z-40 border-y border-line bg-paper/85 backdrop-blur-[10px] max-mob:top-16">
        <div className="wrap flex items-center gap-5 py-3.5 max-mob:gap-3.5">
          <span className="eyebrow whitespace-nowrap">
            <b>{respondidas}</b> de {PERGUNTAS.length} respondidas
          </span>
          <span className="h-1 flex-1 rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-orange transition-[width] duration-300"
              style={{ width: `${(respondidas / PERGUNTAS.length) * 100}%` }}
            />
          </span>
        </div>
      </div>

      <section className="pb-[110px] pt-[46px] max-mob:pb-[72px] max-mob:pt-8">
        <div className="wrap">
          <p className="reveal mb-7 text-[15px] text-ink-soft">
            Arraste a barra e dê uma nota de <b className="text-ink">0 a 10</b>{' '}
            para cada pergunta — 0 é &ldquo;nunca&rdquo;, 10 é &ldquo;sempre&rdquo;. Leve menos de um
            minuto e responda com sinceridade: o resultado só serve se for honesto.
          </p>

          <div className="flex flex-col gap-2.5">
            {PERGUNTAS.map((pergunta, i) => {
              const respondida = notas[i] !== undefined
              const valor = respondida ? notas[i] : 0
              return (
                <div
                  key={pergunta}
                  className="ticks reveal flex items-center gap-8 rounded-[16px] border border-line bg-white px-6 py-4 max-tab:gap-5 max-mob:flex-col max-mob:items-stretch max-mob:gap-2.5 max-mob:px-4 max-mob:py-3.5"
                >
                  <label
                    htmlFor={`pergunta-${i}`}
                    className="flex-1 text-[15.5px] font-extrabold text-ink max-mob:text-[14.5px]"
                  >
                    <span className="mr-2.5 font-display text-[13px] font-normal text-orange">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {pergunta}
                  </label>
                  <div className="flex w-[300px] flex-none items-center gap-4 max-tab:w-[210px] max-mob:w-full">
                    <input
                      id={`pergunta-${i}`}
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={valor}
                      data-respondida={respondida}
                      style={{ '--fill': `${valor * 10}%` }}
                      onChange={(e) => definirNota(i, Number(e.target.value))}
                      onPointerDown={() => definirNota(i, valor)}
                      onKeyDown={() => definirNota(i, valor)}
                      className="range-nota flex-1"
                    />
                    <span
                      aria-hidden="true"
                      className={`w-8 flex-none text-right font-display text-[26px] leading-none ${
                        respondida ? 'text-orange' : 'text-line-2'
                      }`}
                    >
                      {respondida ? valor : '—'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {!completo && (
            <p className="mt-7 text-[15px] text-ink-soft">
              Faltam <b className="text-orange">{PERGUNTAS.length - respondidas}</b> respostas para o
              seu diagnóstico aparecer.
            </p>
          )}

          {completo && (
            <div ref={resultadoRef} className="mt-14 scroll-mt-[110px] max-mob:mt-10">
              <div className={`ticks rounded-[16px] border p-[38px] ${faixa.card} ${faixa.tick} max-mob:p-7`}>
                <div className="grid grid-cols-[auto_1fr] items-start gap-9 max-mob:grid-cols-1 max-mob:gap-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] opacity-70">
                      Resultado final
                    </div>
                    <div className="mt-2.5 font-display text-[clamp(56px,10vw,104px)] leading-none">
                      {score}
                      <span className="text-[0.42em] opacity-60">/{NOTA_MAXIMA}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="m-0 text-[clamp(26px,4vw,44px)] font-extrabold leading-none tracking-[-0.02em]">
                      {faixa.titulo}
                    </h2>
                    <p className="mt-3.5 text-lg font-semibold">{faixa.resumo}</p>
                    <p className={`mt-4 text-[15.5px] leading-relaxed ${faixa.soft}`}>
                      {faixa.diagnostico}
                    </p>
                    <p className={`mt-3.5 text-[15.5px] leading-relaxed ${faixa.soft}`}>
                      {faixa.recomendacao}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 max-mob:grid-cols-1">
                {FAIXAS.map((f) => {
                  const ativa = f.key === faixa.key
                  return (
                    <div
                      key={f.key}
                      className={`rounded-[16px] border p-5 ${
                        ativa
                          ? `ticks ${f.card} ${f.tick}`
                          : 'border-line bg-paper text-ink-soft opacity-55'
                      }`}
                    >
                      <div className="font-display text-[26px] leading-none">{f.range}</div>
                      <div className="mt-2 text-[15px] font-extrabold">{f.titulo}</div>
                      <p className={`mt-1.5 text-[13.5px] ${ativa ? f.soft : ''}`}>{f.resumo}</p>
                    </div>
                  )
                })}
              </div>

              <div className="ticks mt-4 rounded-[16px] border border-orange bg-orange p-[38px] text-white [--tick-color:#fff] max-mob:p-7">
                <h3 className="m-0 font-display text-[clamp(28px,4.6vw,48px)] font-normal uppercase leading-[0.9]">
                  A sua marca está
                  <br />
                  onde precisa estar?
                </h3>
                <p className="mt-4 max-w-[52ch] text-white/[.92]">
                  Presença gera lembrança. Lembrança gera escolha. Escolha gera resultados. Nosso
                  time comercial monta um plano de mídia exterior a partir da sua nota — praças,
                  formatos e frequência sob medida.
                </p>
                <div className="mt-[30px] flex flex-wrap gap-3">
                  <a
                    href={waLink(waDiagnostico(score, NOTA_MAXIMA, faixa.titulo))}
                    className="btn btn-on-orange"
                  >
                    Falar com o time
                  </a>
                  <Link href="/proposta" className="btn">
                    Quero uma proposta
                  </Link>
                </div>
              </div>

              <button type="button" onClick={refazer} className="btn mt-4 border-line text-ink">
                Refazer diagnóstico
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
