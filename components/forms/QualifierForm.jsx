'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { waQualificador, waLink } from '@/lib/whatsapp'

const INTENCOES = ['É minha primeira campanha', 'Já anunciei em OOH antes', 'Sou agência ou planejamento']

const OBJETIVOS = [
  'Levar gente até a loja',
  'Lançar produto ou unidade',
  'Construir marca na região',
  'Divulgar uma data ou evento',
  'Ainda não sei',
]

const PRACAS = [
  'Curitiba e região',
  'Litoral do PR',
  'Rodovias PR / SC',
  'Santa Catarina',
  'Toda a malha PR + SC',
  'Ainda não sei',
]

const PERIODOS = ['Quinzenal', '1 mês', '3 meses', '6 meses ou mais', 'Ainda não sei']

const LABEL = 'text-xs font-bold uppercase tracking-[0.1em] text-ink-soft'
const INPUT =
  'w-full rounded-[10px] border-[1.5px] border-line bg-paper px-3.5 py-[13px] text-base text-ink transition duration-150 placeholder:text-line-2 focus:border-orange focus:bg-white focus:outline-none'
const CHIP =
  'cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition-colors duration-150 border-line text-ink-soft hover:border-orange hover:text-orange'

const CHAVES = ['intencao', 'objetivo', 'praca', 'periodo']

export default function QualifierForm() {
  const [respostas, setRespostas] = useState({
    intencao: '',
    objetivo: '',
    praca: '',
    periodo: '',
  })
  const [dados, setDados] = useState({ nome: '', empresa: '' })
  const passoRef = useRef(null)

  // Passo derivado do estado — impossível dessincronizar.
  const passo = !respostas.intencao
    ? 0
    : !respostas.objetivo
      ? 1
      : !respostas.praca
        ? 2
        : !respostas.periodo
          ? 3
          : 4

  useEffect(() => {
    if (passo === 0) return
    passoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [passo])

  function responder(chave, valor) {
    setRespostas((atual) => ({ ...atual, [chave]: valor }))
  }

  // Editar limpa dali para frente — não há objetivo sem intenção.
  function editar(indice) {
    setRespostas((atual) => {
      const proximo = { ...atual }
      CHAVES.slice(indice).forEach((c) => {
        proximo[c] = ''
      })
      return proximo
    })
  }

  const respondidas = CHAVES.filter((c) => respostas[c]).length
  const resumo = [
    { rotulo: 'Momento', valor: respostas.intencao },
    { rotulo: 'Objetivo', valor: respostas.objetivo },
    { rotulo: 'Praça', valor: respostas.praca },
    { rotulo: 'Período', valor: respostas.periodo },
  ]

  return (
    <div className="ticks reveal mx-auto max-w-[820px] rounded-[16px] border border-line bg-white p-[38px] max-mob:p-7">
      <div className="mb-8 flex items-center gap-5 max-mob:gap-3.5">
        <span className="eyebrow whitespace-nowrap">
          <b>{respondidas}</b> de 5
        </span>
        <span className="h-1 flex-1 rounded-full bg-line">
          <span
            className="block h-full rounded-full bg-orange transition-[width] duration-300"
            style={{ width: `${(respondidas / 5) * 100}%` }}
          />
        </span>
      </div>

      {respondidas > 0 && (
        <ul className="m-0 mb-7 flex list-none flex-col gap-2 border-b border-line p-0 pb-6">
          {resumo.map(
            (item, i) =>
              item.valor && (
                <li
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14.5px]"
                  key={item.rotulo}
                >
                  <span className="text-ink-soft">{item.rotulo}:</span>
                  <b className="text-ink">{item.valor}</b>
                  <button
                    type="button"
                    onClick={() => editar(i)}
                    className="cursor-pointer text-[12.5px] font-bold uppercase tracking-[0.1em] text-orange underline hover:text-ink"
                  >
                    editar
                  </button>
                </li>
              )
          )}
        </ul>
      )}

      <div ref={passoRef} className="scroll-mt-[110px]">
        {passo === 0 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Onde você está hoje?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {INTENCOES.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('intencao', op)}>
                  {op}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {passo === 1 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              O que a campanha precisa resolver?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {OBJETIVOS.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('objetivo', op)}>
                  {op}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[14px] text-ink-soft">
              Sem clareza do objetivo?{' '}
              <Link href="/diagnostico" className="font-bold text-orange hover:underline">
                Faça o Diagnóstico de Presença.
              </Link>
            </p>
          </fieldset>
        )}

        {passo === 2 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Onde sua marca precisa aparecer?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {PRACAS.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('praca', op)}>
                  {op}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {passo === 3 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Por quanto tempo a campanha fica no ar?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {PERIODOS.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('periodo', op)}>
                  {op}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {passo === 4 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Por último: quem é você?
            </legend>
            <div className="grid grid-cols-2 gap-4 max-mob:grid-cols-1">
              <label className="flex flex-col gap-2">
                <span className={LABEL}>Nome</span>
                <input
                  className={INPUT}
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className={LABEL}>Empresa</span>
                <input
                  className={INPUT}
                  value={dados.empresa}
                  onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
                />
              </label>
            </div>

            <a
              href={waLink(waQualificador({ ...respostas, ...dados }))}
              className="btn btn-fill mt-6"
            >
              Enviar pelo WhatsApp
            </a>
            <p className="mt-3 text-[13.5px] text-ink-soft">
              Suas respostas vão junto na mensagem. Nada de reescrever tudo lá.
            </p>
          </fieldset>
        )}
      </div>
    </div>
  )
}
