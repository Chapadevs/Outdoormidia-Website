'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EscadaPresenca from '@/components/ui/EscadaPresenca'
import {
  ESCALA,
  NOTA_MAXIMA,
  PERGUNTAS,
  degrauDoScore,
  gruposDePerguntas,
  pontoMaisFragil,
  rotuloDaNota,
} from '@/lib/diagnostico'
import { enviarLead } from '@/lib/leads/enviarLead'
import { waDiagnostico, waDiagnosticoFragil, waLink } from '@/lib/whatsapp'

const GRUPOS = gruposDePerguntas()
const SEM_NOTAS = PERGUNTAS.map(() => null)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function DiagnosticoQuiz() {
  const [notas, setNotas] = useState(SEM_NOTAS)
  const [concluido, setConcluido] = useState(false)
  const [email, setEmail] = useState('')
  const [envio, setEnvio] = useState('parado')
  const barrasRef = useRef([])
  const cardsRef = useRef([])
  const botaoRef = useRef(null)
  const resultadoRef = useRef(null)
  const inedita = useRef(false)

  const respondidas = notas.filter((n) => n !== null).length
  const faltam = PERGUNTAS.length - respondidas
  const completo = faltam === 0
  // Soma crua: 10 perguntas de 0 a 10 fecham os 100 pontos das faixas, sem
  // normalização e sem regra de três.
  const score = notas.reduce((total, n) => total + (n ?? 0), 0)
  const degrau = degrauDoScore(score)
  const degrauLabel = `Degrau ${degrau.n} · ${degrau.nome}`
  const mostrarResultado = concluido && completo
  const maisFragil = pontoMaisFragil(notas)
  const fragil = maisFragil === -1 ? null : PERGUNTAS[maisFragil]

  useEffect(() => {
    if (mostrarResultado) {
      resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [mostrarResultado])

  function definirNota(i, nota) {
    setNotas((atual) => {
      if (atual[i] === nota) return atual
      const proximo = atual.slice()
      proximo[i] = nota
      return proximo
    })
  }

  function abrirPergunta(i, valor) {
    inedita.current = notas[i] === null
    definirNota(i, valor)
  }

  function fecharPergunta(i) {
    if (!inedita.current) return
    inedita.current = false
    avancar(i)
  }

  function proximaPendente(i) {
    const adiante = notas.findIndex((n, idx) => idx > i && n === null)
    if (adiante !== -1) return adiante
    return notas.findIndex((n, idx) => idx < i && n === null)
  }

  function irPara(indice) {
    const alvo = indice === -1 ? botaoRef.current : cardsRef.current[indice]
    const foco = indice === -1 ? botaoRef.current : barrasRef.current[indice]
    alvo?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    foco?.focus({ preventScroll: true })
  }

  function avancar(i) {
    const proxima = proximaPendente(i)
    window.setTimeout(() => irPara(proxima), 160)
  }

  function verResultado() {
    if (completo) {
      setConcluido(true)
      return
    }
    irPara(notas.indexOf(null))
  }

  function refazer() {
    setNotas(SEM_NOTAS)
    setConcluido(false)
    setEmail('')
    setEnvio('parado')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // A captura é opcional e só existe depois do degrau na tela. Grava o lead com
  // o resultado que a pessoa viu, para o comercial saber de onde ele veio.
  async function capturarEmail(e) {
    e.preventDefault()
    const limpo = email.trim()
    if (!EMAIL.test(limpo)) {
      setEnvio('invalido')
      return
    }
    setEnvio('enviando')
    const ok = await enviarLead({
      origem: 'diagnostico',
      email: limpo,
      website: new FormData(e.currentTarget).get('website') || '',
      dados: {
        degrau: degrauLabel,
        nota: `${score}/${NOTA_MAXIMA}`,
        pontoFragil: fragil?.pergunta || '',
      },
    })
    setEnvio(ok ? 'pronto' : 'erro')
  }

  return (
    <section className="pb-[110px] max-mob:pb-[168px]">
      <div className="wrap">
        <div className="flex items-center gap-5 border-t border-line py-4 max-mob:gap-3 max-mob:py-3.5">
          <span className="eyebrow whitespace-nowrap max-mob:text-[10px] max-mob:tracking-[0.16em]">
            <b>{respondidas}</b> de {PERGUNTAS.length} respondidas
          </span>
          <span className="h-1 flex-1 rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-orange transition-[width] duration-300"
              style={{ width: `${(respondidas / PERGUNTAS.length) * 100}%` }}
            />
          </span>
        </div>

        <div className="reveal mb-9 flex flex-wrap items-center gap-7 rounded-[16px] border border-line bg-white px-6 py-5 max-mob:mb-6 max-mob:flex-col max-mob:items-stretch max-mob:gap-4 max-mob:px-5 max-mob:py-4">
          <p className="min-w-[280px] flex-1 text-sm leading-relaxed text-ink-soft max-mob:min-w-0 max-mob:flex-none max-mob:text-[13.5px]">
            Arraste ou clique na barra e dê uma nota de <b className="text-ink">0 a 10</b> em cada
            pergunta. Leve menos de um minuto e responda com sinceridade: o resultado só serve se for
            honesto.
          </p>
          <ul className="flex gap-[22px] max-mob:justify-between max-mob:gap-3 max-mob:border-t max-mob:border-line max-mob:pt-4">
            {ESCALA.map(({ faixa: intervalo, rotulo }) => (
              <li key={intervalo} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                  {intervalo}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft/70 max-mob:text-[10px] max-mob:tracking-[0.08em]">
                  {rotulo}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* A barra parcial é `sticky`, então só aparece pinada enquanto este
            bloco está em tela. Ele começa aqui, depois do parágrafo de
            introdução, que antes ficava coberto pela barra na primeira dobra. */}
        <div>
          {GRUPOS.map((grupo) => (
            <div key={grupo.titulo} className="reveal mb-9 max-mob:mb-7">
              <div className="mb-3.5 flex items-baseline gap-3.5 max-mob:mb-3 max-mob:gap-3">
                <span className="eyebrow text-ink max-mob:text-[10px] max-mob:tracking-[0.16em]">
                  {grupo.titulo}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="eyebrow whitespace-nowrap max-mob:hidden">{grupo.meta}</span>
              </div>

              <div className="flex flex-col gap-3">
                {grupo.itens.map(({ i, pergunta, ajuda, minimo, maximo }) => {
                  const respondida = notas[i] !== null
                  const valor = respondida ? notas[i] : 0
                  return (
                    <div
                      key={pergunta}
                      ref={(el) => {
                        cardsRef.current[i] = el
                      }}
                      className="relative grid scroll-mt-[100px] grid-cols-[minmax(260px,1fr)_minmax(300px,400px)_74px] items-center gap-[26px] overflow-hidden rounded-[16px] border border-line bg-white py-5 pl-7 pr-6 max-tab:grid-cols-[1fr_minmax(220px,300px)_58px] max-tab:gap-5 max-mob:grid-cols-[1fr_46px] max-mob:gap-x-3 max-mob:gap-y-3 max-mob:py-4 max-mob:pl-4 max-mob:pr-4"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-1 transition-colors duration-200 ${
                          respondida ? 'bg-orange' : 'bg-line'
                        }`}
                      />

                      <div className="max-mob:col-span-2">
                        <label
                          htmlFor={`pergunta-${i}`}
                          className="flex items-baseline gap-3 text-[15px] font-extrabold leading-[1.35] text-ink max-mob:gap-2 max-mob:text-[14.5px]"
                        >
                          <span className="font-display text-sm font-normal tracking-[0.04em] text-orange">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {pergunta}
                        </label>
                        <p className="ml-[26px] mt-1.5 max-w-[44ch] text-[12.5px] leading-[1.5] text-ink-soft/70 max-mob:ml-0 max-mob:mt-1 max-mob:text-[12px]">
                          {ajuda}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex justify-between gap-3 text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-ink-soft/60 max-mob:mb-1.5 max-mob:gap-2 max-mob:tracking-[0.08em]">
                          <span>{minimo}</span>
                          <span className="text-right">{maximo}</span>
                        </div>
                        <input
                          id={`pergunta-${i}`}
                          ref={(el) => {
                            barrasRef.current[i] = el
                          }}
                          type="range"
                          min="0"
                          max="10"
                          step="1"
                          value={valor}
                          data-respondida={respondida}
                          style={{ '--fill': `${valor * 10}%` }}
                          onChange={(e) => definirNota(i, Number(e.target.value))}
                          onPointerDown={() => abrirPergunta(i, valor)}
                          onPointerUp={() => fecharPergunta(i)}
                          onPointerCancel={() => fecharPergunta(i)}
                          onKeyDown={() => abrirPergunta(i, valor)}
                          onKeyUp={(e) => {
                            if (e.key === 'Enter') fecharPergunta(i)
                          }}
                          onBlur={() => fecharPergunta(i)}
                          className="range-nota"
                        />
                        <div className="mt-2 flex min-h-4 justify-between gap-3 max-mob:mt-1.5 max-mob:gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-orange max-mob:tracking-[0.08em]">
                            {rotuloDaNota(notas[i])}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.14em] text-ink-soft/45 max-mob:hidden">
                            0 a 10
                          </span>
                        </div>
                      </div>

                      <div className="text-right max-mob:self-center">
                        <div
                          aria-hidden="true"
                          className={`font-display text-[34px] leading-none max-tab:text-[28px] max-mob:text-[26px] ${
                            respondida ? 'text-ink' : 'text-line-2'
                          }`}
                        >
                          {respondida ? valor : '?'}
                        </div>
                        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft/45">
                          /10
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* A barra parcial sai de cena quando o resultado aparece: ela
              repetia a nota que o card de resultado já mostra em corpo maior. */}
          {!mostrarResultado && (
            <div className="sticky bottom-[18px] z-30 flex flex-wrap items-center gap-6 rounded-[16px] bg-ink px-6 py-[18px] text-paper shadow-[0_14px_34px_rgba(22,17,13,.22)] max-mob:bottom-[84px] max-mob:gap-x-3 max-mob:gap-y-2 max-mob:px-4 max-mob:py-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-paper/55 max-mob:hidden">
                Parcial
              </span>
              <span className="flex items-baseline gap-1">
                <span className="font-display text-[34px] leading-none max-mob:text-[26px]">
                  {score}
                </span>
                <span className="font-display text-base text-paper/45 max-mob:text-sm">
                  /{NOTA_MAXIMA}
                </span>
              </span>
              <p
                aria-live="polite"
                className="min-w-[180px] flex-1 text-[13px] leading-[1.5] text-paper/70 max-mob:order-last max-mob:min-w-0 max-mob:basis-full max-mob:text-[11.5px] max-mob:leading-[1.45]"
              >
                {respondidas === 0
                  ? `Comece pela primeira pergunta. O seu degrau aparece quando as ${PERGUNTAS.length} estiverem respondidas.`
                  : !completo
                    ? `Faltam ${faltam} ${faltam === 1 ? 'resposta' : 'respostas'} para o seu degrau aparecer.`
                    : 'Tudo respondido: veja em qual degrau a sua marca está.'}
              </p>
              <button
                ref={botaoRef}
                type="button"
                onClick={verResultado}
                className={`cursor-pointer scroll-mt-[100px] rounded-full px-[22px] py-[13px] text-[13px] font-bold tracking-[0.06em] transition duration-[180ms] max-mob:ml-auto max-mob:px-4 max-mob:py-2.5 max-mob:text-xs ${
                  completo
                    ? 'bg-orange text-white hover:bg-white hover:text-ink'
                    : 'bg-white/10 text-paper/50 hover:bg-white/[.18]'
                }`}
              >
                Ver meu resultado
              </button>
            </div>
          )}
        </div>

        {mostrarResultado && (
          <div ref={resultadoRef} className="mt-9 scroll-mt-[110px] max-mob:mt-6">
            <div className={`rounded-[16px] border p-[38px] ${degrau.card} max-mob:p-6`}>
              <div className="grid grid-cols-[170px_1fr] items-start gap-8 max-mob:grid-cols-1 max-mob:gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] opacity-70 max-mob:text-[10px] max-mob:tracking-[0.16em]">
                    Resultado final
                  </div>
                  <div className="mt-2 font-display text-[clamp(56px,10vw,88px)] leading-[0.9]">
                    {score}
                    <span className="text-[0.4em] opacity-60">/{NOTA_MAXIMA}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] opacity-70">
                    {degrauLabel}
                  </div>
                  <h2 className="m-0 mt-3 text-balance text-[clamp(24px,3.4vw,34px)] font-extrabold leading-[1.1]">
                    {degrau.fraseDura}
                  </h2>
                  {fragil && (
                    <div className="mt-7 border-b border-current/20 pb-7">
                      <p className="m-0 text-[15px] font-bold leading-[1.5]">
                        Seu ponto mais frágil hoje é{' '}
                        <span className="font-extrabold">&ldquo;{fragil.pergunta}&rdquo;</span>
                      </p>
                      <p className={`mt-2.5 text-[14.5px] leading-[1.65] ${degrau.soft}`}>
                        {fragil.fragil.diagnostico}
                      </p>
                      <p className={`mt-2.5 text-[14.5px] leading-[1.65] ${degrau.soft}`}>
                        {fragil.fragil.cta}
                        {fragil.fragil.link && (
                          <>
                            {' '}
                            <Link
                              className="font-bold underline underline-offset-4 hover:no-underline"
                              href={fragil.fragil.link.href}
                            >
                              {fragil.fragil.link.label} →
                            </Link>
                          </>
                        )}
                      </p>
                      <a
                        className={`${degrau.btn} mt-5`}
                        href={waLink(waDiagnosticoFragil(degrauLabel, fragil.pergunta))}
                      >
                        Falar com um especialista →
                      </a>
                    </div>
                  )}

                  {degrau.paragrafos.map((paragrafo) => (
                    <p className={`mt-3 text-[14.5px] leading-[1.65] ${degrau.soft}`} key={paragrafo}>
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <EscadaPresenca ativo={degrau.n} className="mt-4" />

            <div className="mt-4 rounded-[16px] border border-orange bg-orange p-[38px] text-white max-mob:p-6">
              <h3 className="m-0 font-display text-[clamp(28px,4.6vw,48px)] font-normal uppercase leading-[0.9]">
                Subir de degrau é
                <br />
                decisão de mídia.
              </h3>
              <p className="mt-4 max-w-[62ch] text-white/[.92]">
                Presença não se constrói com uma campanha. Se constrói aparecendo onde o seu público
                passa todo dia, o ano inteiro. É isso que a Outdoormídia faz há 67 anos em Curitiba,
                Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário Camboriú.
              </p>
              <div className="mt-[30px] flex flex-wrap gap-3 max-mob:mt-6">
                <a
                  className="btn btn-on-orange"
                  href={waLink(waDiagnostico(score, NOTA_MAXIMA, degrauLabel))}
                >
                  Falar com um especialista →
                </a>
              </div>
              <p className="mt-6 max-w-[62ch] text-[14.5px] text-white/[.92]">
                Quer ver como a sua marca ficaria em um painel antes de conversar? Monte a simulação
                em{' '}
                <Link
                  className="font-bold underline underline-offset-4 hover:no-underline"
                  href="/area-do-anunciante/sua-marca-no-ooh"
                >
                  Sua marca no OOH
                </Link>
                .
              </p>
            </div>

            {/* TODO(cliente): o e-mail fica gravado em /admin/leads, mas ninguém
                dispara o diagnóstico ainda. O envio depende do Resend e a
                integração com o Agendor depende de decisão do Erik. */}
            <form
              className="mt-4 flex flex-wrap items-end gap-4 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
              noValidate
              onSubmit={capturarEmail}
            >
              <div className="min-w-[260px] flex-1">
                <label className="field-label" htmlFor="diagnostico-email">
                  Quer receber esse diagnóstico por e-mail?
                </label>
                <input
                  autoComplete="email"
                  className="field-input"
                  id="diagnostico-email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (envio !== 'parado') setEnvio('parado')
                  }}
                  placeholder="Seu melhor e-mail"
                  type="email"
                  value={email}
                />
                {envio === 'invalido' && <p className="field-error">Confira o e-mail digitado.</p>}
                {envio === 'erro' && (
                  <p className="field-error">Não foi possível registrar agora. Tente de novo.</p>
                )}
                {envio === 'pronto' && (
                  <p className="mt-1.5 text-[13px] font-bold text-orange">
                    Pronto, recebemos o seu e-mail.
                  </p>
                )}
              </div>

              {/* Honeypot: invisível para quem usa o site, irresistível para bot.
                  A rota descarta em silêncio o envio que vier com ele preenchido. */}
              <input
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                name="website"
                tabIndex={-1}
                type="text"
              />

              <button
                className="btn btn-ghost disabled:opacity-60"
                disabled={envio === 'enviando' || envio === 'pronto'}
                type="submit"
              >
                {envio === 'enviando' ? 'Enviando…' : 'Enviar'}
              </button>
            </form>

            <div className="mt-4 flex justify-center">
              <button className="btn btn-ghost" onClick={refazer} type="button">
                Refazer diagnóstico
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
