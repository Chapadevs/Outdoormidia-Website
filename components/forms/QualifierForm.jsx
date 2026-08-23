'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { waQualificador, waLinkPorPraca } from '@/lib/whatsapp'
import { enviarLead } from '@/lib/leads/enviarLead'

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

const SEGMENTOS = [
  'Serviços',
  'Agências de marketing',
  'Varejo',
  'Restaurantes',
  'Imobiliário / Construção Civil',
]

const CHIP =
  'cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition-colors duration-150 border-line text-ink-soft hover:border-orange hover:text-orange'

const CHAVES = ['intencao', 'objetivo', 'praca', 'periodo', 'segmento']
const TOTAL = CHAVES.length + 1

export default function QualifierForm() {
  const [respostas, setRespostas] = useState({
    intencao: '',
    objetivo: '',
    praca: '',
    periodo: '',
    segmento: '',
  })
  const [dados, setDados] = useState({ nome: '', empresa: '' })
  const [enviando, setEnviando] = useState(false)
  const passoRef = useRef(null)

  // Passo derivado do estado — impossível dessincronizar.
  const pendente = CHAVES.findIndex((c) => !respostas[c])
  const passo = pendente === -1 ? CHAVES.length : pendente

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

  // Grava o lead e segue para o WhatsApp. O link é montado antes do await:
  // navegar depois de um await só funciona na mesma aba — window.open seria
  // barrado como popup. Falha de rede não impede a conversa de abrir.
  async function enviar() {
    const destino = waLinkPorPraca(respostas.praca, waQualificador({ ...respostas, ...dados }))
    setEnviando(true)
    await enviarLead({
      origem: 'qualificador',
      nome: dados.nome,
      empresa: dados.empresa,
      dados: respostas,
    })
    window.location.href = destino
  }

  const respondidas = CHAVES.filter((c) => respostas[c]).length
  const resumo = [
    { rotulo: 'Momento', valor: respostas.intencao },
    { rotulo: 'Objetivo', valor: respostas.objetivo },
    { rotulo: 'Praça', valor: respostas.praca },
    { rotulo: 'Período', valor: respostas.periodo },
    { rotulo: 'Segmento', valor: respostas.segmento },
  ]

  return (
    <div className="ticks reveal mx-auto max-w-[820px] rounded-[16px] border border-line bg-white p-[38px] max-mob:p-7">
      {/* Atalho para quem ainda não sabe o objetivo. Some no último passo: ali o
          visitante já respondeu tudo e mandar para outro fluxo só atrapalha. */}
      {passo < CHAVES.length && (
        <p className="m-0 mb-6 text-[14px] text-ink-soft">
          Sem clareza do objetivo?{' '}
          <Link href="/diagnostico" className="font-bold text-orange hover:underline">
            Faça o Diagnóstico de Presença.
          </Link>
        </p>
      )}

      <div className="mb-8 flex items-center gap-5 max-mob:gap-3.5">
        <span className="eyebrow whitespace-nowrap">
          <b>{respondidas}</b> de {TOTAL}
        </span>
        <span className="h-1 flex-1 rounded-full bg-line">
          <span
            className="block h-full rounded-full bg-orange transition-[width] duration-300"
            style={{ width: `${(respondidas / TOTAL) * 100}%` }}
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
              Qual o objetivo da campanha?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {OBJETIVOS.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('objetivo', op)}>
                  {op}
                </button>
              ))}
            </div>
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
              Qual seu segmento de indústria?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {SEGMENTOS.map((op) => (
                <button key={op} type="button" className={CHIP} onClick={() => responder('segmento', op)}>
                  {op}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {passo === 5 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Com quem estamos falando?
            </legend>
            <div className="grid grid-cols-2 gap-4 max-mob:grid-cols-1">
              <label className="flex flex-col gap-2">
                <span className="field-label">Nome</span>
                <input
                  className="field-input"
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label">Empresa</span>
                <input
                  className="field-input"
                  value={dados.empresa}
                  onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
                />
              </label>
            </div>

            <button
              type="button"
              onClick={enviar}
              disabled={!dados.nome.trim() || enviando}
              className="btn btn-fill mt-6 disabled:opacity-50"
            >
              {enviando ? 'Enviando…' : 'Enviar pelo WhatsApp'}
            </button>
            <p className="mt-3 text-[13.5px] text-ink-soft">
              {dados.nome.trim()
                ? 'Suas respostas vão junto na mensagem. Nada de reescrever tudo lá.'
                : 'Só falta o seu nome. As respostas vão junto na mensagem.'}
            </p>
          </fieldset>
        )}
      </div>
    </div>
  )
}
