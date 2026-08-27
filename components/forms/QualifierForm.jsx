'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Building2,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  Car,
  CircleHelp,
  Cross,
  Factory,
  Flag,
  GraduationCap,
  Home,
  Landmark,
  MapPin,
  Megaphone,
  Milestone,
  Package,
  Plus,
  Route,
  ShoppingCart,
  Store,
  Umbrella,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import { waQualificador, waLinkPorPraca } from '@/lib/whatsapp'
import { enviarLead } from '@/lib/leads/enviarLead'

// Perguntas, opções e rótulos na redação oficial do cliente (COPY_SITE); os
// ícones são o mapa entregue pela Imagine Concept (claude/icones-nova-campanha.md).
//
// `label` continua sendo o valor da resposta — é ele que vai para o resumo, para
// o lead e para a mensagem de WhatsApp. O ícone é só apresentação.
const INTENCOES = [
  { label: 'É minha primeira campanha', Icone: Flag },
  { label: 'Já anunciei em OOH antes', Icone: Megaphone },
  { label: 'Sou agência ou planejamento', Icone: Briefcase },
]

const OBJETIVOS = [
  { label: 'Levar gente até a loja', Icone: Store },
  { label: 'Lançar produto ou unidade', Icone: Package },
  { label: 'Construir marca na região', Icone: MapPin },
  { label: 'Divulgar uma data ou evento', Icone: Calendar },
  { label: 'Ainda não sei', Icone: CircleHelp },
]

const PRACAS = [
  { label: 'Curitiba e Região Metropolitana', Icone: Building2 },
  { label: 'Litoral do Paraná', Icone: Umbrella },
  { label: 'Joinville', Icone: Milestone },
  { label: 'Itajaí e Balneário Camboriú', Icone: Landmark },
  { label: 'Rodovias', Icone: Route },
  { label: 'Todas as praças', Icone: MapPin },
  { label: 'Ainda não sei', Icone: CircleHelp },
]

// O checklist trazia "Bi-semana" e "Quinzenal" como opções separadas, mas a
// própria resposta do FAQ define bi-semana como o ciclo de 14 dias — são a
// mesma coisa. Ficou uma opção só, com o ciclo explicado no `title` em vez de
// virar duas alternativas que dizem o mesmo.
const TOOLTIP_BI_SEMANA = 'Período padrão de veiculação OOH, com troca a cada 14 dias'

const PERIODOS = [
  { label: 'Bi-semana', Icone: CalendarRange },
  { label: '1 mês', Icone: CalendarCheck },
  { label: '3 meses', Icone: Calendar },
  { label: '6 meses ou mais', Icone: CalendarClock },
  { label: 'Ainda não sei', Icone: CircleHelp },
]

const SEGMENTOS = [
  { label: 'Varejo', Icone: Store },
  { label: 'Serviços', Icone: Wrench },
  { label: 'Restaurantes e alimentação', Icone: UtensilsCrossed },
  { label: 'Imobiliário e construção civil', Icone: Home },
  { label: 'Saúde', Icone: Cross },
  { label: 'Educação', Icone: GraduationCap },
  { label: 'Indústria', Icone: Factory },
  { label: 'Supermercados', Icone: ShoppingCart },
  { label: 'Automotivo', Icone: Car },
  { label: 'Eventos', Icone: CalendarDays },
  { label: 'Agências de marketing e publicidade', Icone: Megaphone },
  { label: 'Outro', Icone: Plus },
]

// A etapa de contato não leva ícone (regra da Imagine): só campo de input puro e
// os chips de preferência e verba.
const CONTATOS = ['WhatsApp', 'Ligação', 'E-mail']

const VERBAS = [
  'Até R$ 5.000',
  'De R$ 5.000 a R$ 10.000',
  'De R$ 10.000 a R$ 50.000',
  'Acima de R$ 50.000',
  'Não há orçamento planejado',
]

const CHIP_BASE =
  'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors duration-150'
const CHIP = `${CHIP_BASE} border-line text-ink-soft hover:border-orange hover:text-orange`
const CHIP_ATIVO = `${CHIP_BASE} border-orange bg-orange text-white`

// O ícone fica no laranja da marca; no chip marcado ele herda o branco do texto,
// porque laranja sobre laranja some. `aria-hidden` quem põe é o próprio lucide,
// que já trata como decorativo o ícone sem rótulo acessível.
//
// `ativo` só é passado pelos chips que alternam (praça, contato, verba): nos
// demais o clique avança a etapa, e um aria-pressed="false" ali anunciaria como
// interruptor o que é ação.
function OpcaoChip({ label, Icone, ativo, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={ativo}
      className={ativo ? CHIP_ATIVO : CHIP}
      onClick={onClick}
    >
      {Icone && <Icone size={20} className={`shrink-0 ${ativo ? '' : 'text-orange'}`} />}
      {label}
    </button>
  )
}

const CHAVES = ['intencao', 'objetivo', 'praca', 'periodo', 'segmento']
const TOTAL = CHAVES.length + 1

// Sem asterisco vermelho: o botão fica inativo e a microcopy diz o que falta.
const OBRIGATORIOS = [
  ['nome', 'nome'],
  ['empresa', 'empresa'],
  ['email', 'e-mail'],
  ['celular', 'celular'],
  ['contato', 'preferência de contato'],
]

function listar(itens) {
  if (itens.length === 1) return itens[0]
  return `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`
}

// De onde o lead veio: a querystring da campanha que trouxe o visitante e a
// página onde ele preencheu. Lidos no clique, não na montagem, porque o
// formulário aparece em várias rotas.
function rastreio() {
  if (typeof window === 'undefined') return { campanha: '', pagina: '' }
  const query = new URLSearchParams(window.location.search)
  const campanha =
    query.get('origem') || query.get('utm_source') || query.get('utm_campaign') || ''
  return { campanha, pagina: window.location.pathname }
}

// Praça vale como respondida quando tem conteúdo — ela é a única de seleção
// múltipla, e um array vazio é truthy: sem isto o passo pularia sozinho.
function vazio(valor) {
  return Array.isArray(valor) ? valor.length === 0 : !valor
}

export default function QualifierForm() {
  const [respostas, setRespostas] = useState({
    intencao: '',
    objetivo: '',
    praca: [],
    periodo: '',
    segmento: '',
  })
  const [dados, setDados] = useState({
    nome: '',
    empresa: '',
    email: '',
    celular: '',
    contato: '',
    verba: '',
  })
  // A praça é múltipla: sem uma confirmação explícita, o primeiro clique já
  // marcaria o passo como respondido e o painel sumiria antes da segunda praça.
  const [pracaConfirmada, setPracaConfirmada] = useState(false)
  const [aceite, setAceite] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const passoRef = useRef(null)

  // Passo derivado do estado — impossível dessincronizar.
  const respondida = (chave) =>
    chave === 'praca'
      ? pracaConfirmada && respostas.praca.length > 0
      : !vazio(respostas[chave])
  const pendente = CHAVES.findIndex((c) => !respondida(c))
  const passo = pendente === -1 ? CHAVES.length : pendente

  useEffect(() => {
    if (passo === 0) return
    passoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [passo])

  function responder(chave, valor) {
    setRespostas((atual) => ({ ...atual, [chave]: valor }))
  }

  function alternarPraca(opcao) {
    setRespostas((atual) => ({
      ...atual,
      praca: atual.praca.includes(opcao)
        ? atual.praca.filter((p) => p !== opcao)
        : [...atual.praca, opcao],
    }))
  }

  // Editar limpa dali para frente — não há objetivo sem intenção.
  function editar(indice) {
    if (indice <= CHAVES.indexOf('praca')) setPracaConfirmada(false)
    setRespostas((atual) => {
      const proximo = { ...atual }
      CHAVES.slice(indice).forEach((c) => {
        proximo[c] = c === 'praca' ? [] : ''
      })
      return proximo
    })
  }

  // Quem prefere e-mail não vê o campo de celular, e por isso ele também sai da
  // lista de obrigatórios — cobrar um dado que não está na tela trava o envio.
  const pedeCelular = dados.contato !== 'E-mail'
  const faltando = OBRIGATORIOS.filter(
    ([campo]) => (campo !== 'celular' || pedeCelular) && !dados[campo].trim()
  ).map(([, rotulo]) => rotulo)
  const completo = faltando.length === 0 && aceite

  // Grava o lead e segue para o WhatsApp. O link é montado antes do await:
  // navegar depois de um await só funciona na mesma aba — window.open seria
  // barrado como popup. Falha de rede não impede a conversa de abrir.
  async function enviar() {
    // `dados` do lead aceita só texto: a praça múltipla vai serializada.
    const praca = respostas.praca.join(', ')
    const destino = waLinkPorPraca(respostas.praca, waQualificador({ ...respostas, ...dados, praca }))
    const { campanha, pagina } = rastreio()
    setEnviando(true)
    await enviarLead({
      origem: 'qualificador',
      nome: dados.nome,
      empresa: dados.empresa,
      email: dados.email,
      whatsapp: dados.celular,
      dados: {
        intencao: respostas.intencao,
        objetivo: respostas.objetivo,
        praca,
        periodo: respostas.periodo,
        segmento: respostas.segmento,
        contato: dados.contato,
        verba: dados.verba,
        campanha,
        pagina,
      },
    })
    window.location.href = destino
  }

  const respondidas = CHAVES.filter(respondida).length
  const resumo = [
    { rotulo: 'Momento', valor: respostas.intencao },
    { rotulo: 'Objetivo', valor: respostas.objetivo },
    { rotulo: 'Praça', valor: respostas.praca.join(', ') },
    { rotulo: 'Período', valor: respostas.periodo },
    { rotulo: 'Segmento', valor: respostas.segmento },
  ]

  return (
    <div className="ticks reveal w-full rounded-[16px] border border-line bg-white p-[38px] text-ink shadow-[0_28px_56px_-28px_rgba(22,17,13,.55)] max-mob:p-7">
      <div className="mb-6 flex items-center gap-3.5">
        <span className="eyebrow text-orange">02</span>
        <span className="eyebrow text-ink-soft">Formulário</span>
        <span className="h-px flex-1 bg-line"></span>
      </div>

      {/* Convite ao Diagnóstico: só para quem marcou "Ainda não sei" no objetivo.
          Oferecer o desvio a quem já sabe o que quer é tirar a pessoa do fluxo
          que ela escolheu. */}
      {respostas.objetivo === 'Ainda não sei' && (
        <p className="m-0 mb-6 text-[14px] text-ink-soft">
          Sem clareza do objetivo?{' '}
          <Link
            href="/area-do-anunciante/diagnostico-de-presenca"
            className="font-bold text-orange hover:underline"
          >
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
              {INTENCOES.map(({ label, Icone }) => (
                <OpcaoChip
                  key={label}
                  label={label}
                  Icone={Icone}
                  onClick={() => responder('intencao', label)}
                />
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
              {OBJETIVOS.map(({ label, Icone }) => (
                <OpcaoChip
                  key={label}
                  label={label}
                  Icone={Icone}
                  onClick={() => responder('objetivo', label)}
                />
              ))}
            </div>
          </fieldset>
        )}

        {passo === 2 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 text-[17px] font-extrabold text-ink">
              Onde sua marca precisa aparecer?
            </legend>
            <p className="mb-4 text-[13.5px] text-ink-soft">Pode marcar mais de uma praça.</p>
            <div className="flex flex-wrap gap-2.5">
              {PRACAS.map(({ label, Icone }) => (
                <OpcaoChip
                  key={label}
                  label={label}
                  Icone={Icone}
                  ativo={respostas.praca.includes(label)}
                  onClick={() => alternarPraca(label)}
                />
              ))}
            </div>
            <button
              className="btn btn-ghost mt-6 disabled:opacity-50"
              disabled={respostas.praca.length === 0}
              onClick={() => setPracaConfirmada(true)}
              type="button"
            >
              Continuar
            </button>
          </fieldset>
        )}

        {passo === 3 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Por quanto tempo a campanha fica no ar?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {PERIODOS.map(({ label, Icone }) => (
                <OpcaoChip
                  key={label}
                  label={label}
                  Icone={Icone}
                  onClick={() => responder('periodo', label)}
                  title={label === 'Bi-semana' ? TOOLTIP_BI_SEMANA : undefined}
                />
              ))}
            </div>
          </fieldset>
        )}

        {passo === 4 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              Qual o segmento do seu negócio?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {SEGMENTOS.map(({ label, Icone }) => (
                <OpcaoChip
                  key={label}
                  label={label}
                  Icone={Icone}
                  onClick={() => responder('segmento', label)}
                />
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
                <span className="field-label">Nome completo*</span>
                <input
                  className="field-input"
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label">Empresa*</span>
                <input
                  className="field-input"
                  value={dados.empresa}
                  onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label">E-mail corporativo*</span>
                <input
                  className="field-input"
                  type="email"
                  value={dados.email}
                  onChange={(e) => setDados({ ...dados, email: e.target.value })}
                />
              </label>
              {pedeCelular && (
                <label className="flex flex-col gap-2">
                  <span className="field-label">Celular*</span>
                  <input
                    className="field-input"
                    type="tel"
                    value={dados.celular}
                    onChange={(e) => setDados({ ...dados, celular: e.target.value })}
                  />
                </label>
              )}
            </div>

            <p className="field-label mt-6">Como prefere receber contato?*</p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {CONTATOS.map((op) => (
                <OpcaoChip
                  key={op}
                  label={op}
                  ativo={dados.contato === op}
                  onClick={() => setDados({ ...dados, contato: op })}
                />
              ))}
            </div>

            <p className="field-label mt-6">Quanto pretende investir? (opcional)</p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {VERBAS.map((op) => (
                <OpcaoChip
                  key={op}
                  label={op}
                  ativo={dados.verba === op}
                  onClick={() => setDados({ ...dados, verba: dados.verba === op ? '' : op })}
                />
              ))}
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[14.5px] text-ink-soft">
              <input
                checked={aceite}
                className="mt-1 size-4 flex-none accent-orange"
                onChange={(e) => setAceite(e.target.checked)}
                type="checkbox"
              />
              <span>
                Concordo com os{' '}
                <Link href="/privacidade" className="font-bold text-orange hover:underline">
                  Termos de Privacidade
                </Link>
                .
              </span>
            </label>

            <button
              type="button"
              onClick={enviar}
              disabled={!completo || enviando}
              className="btn btn-fill mt-6 disabled:opacity-50"
            >
              {enviando ? 'Enviando…' : 'Enviar pelo WhatsApp'}
            </button>
            {!completo && (
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                {faltando.length > 0
                  ? `Falta preencher: ${listar(faltando)}.`
                  : 'Falta aceitar os Termos de Privacidade.'}
              </p>
            )}
            <p className="mt-3 text-[13.5px] text-ink-soft">
              Suas respostas vão junto na mensagem. Retornamos em até 1 dia útil.
            </p>
          </fieldset>
        )}
      </div>
    </div>
  )
}
