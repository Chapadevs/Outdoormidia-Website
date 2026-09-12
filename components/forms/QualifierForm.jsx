'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useFormatter, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
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
import { cnpjValido, formatarCnpj, normalizarCnpj } from '@/lib/cnpj'

// Perguntas, opções e rótulos na redação oficial do cliente (COPY_SITE); os
// ícones são o mapa entregue pela Imagine Concept (claude/icones-nova-campanha.md).
//
// `label` continua sendo o valor da resposta, e continua em português nos
// quatro idiomas: é ele que vai para o lead, para a mensagem de WhatsApp (que o
// comercial lê em português) e para o roteamento por praça de `waLinkPorPraca`,
// que compara com estes nomes. O que o visitante vê é a tradução de `chave` em
// `messages/*.json` (namespace QualifierForm), que em PT é idêntica ao `label`.
// O ícone é só apresentação.
const INTENCOES = [
  { chave: 'primeira', label: 'É minha primeira campanha', Icone: Flag },
  { chave: 'jaAnunciei', label: 'Já anunciei em OOH antes', Icone: Megaphone },
  { chave: 'agencia', label: 'Sou agência ou planejamento', Icone: Briefcase },
]

const OBJETIVOS = [
  { chave: 'loja', label: 'Levar gente até a loja', Icone: Store },
  { chave: 'lancamento', label: 'Lançar produto ou unidade', Icone: Package },
  { chave: 'marca', label: 'Construir marca na região', Icone: MapPin },
  { chave: 'evento', label: 'Divulgar uma data ou evento', Icone: Calendar },
  { chave: 'naoSei', label: 'Ainda não sei', Icone: CircleHelp },
]

const PRACAS = [
  { chave: 'curitiba', label: 'Curitiba e Região Metropolitana', Icone: Building2 },
  { chave: 'litoral', label: 'Litoral do Paraná', Icone: Umbrella },
  { chave: 'joinville', label: 'Joinville', Icone: Milestone },
  { chave: 'itajai', label: 'Itajaí e Balneário Camboriú', Icone: Landmark },
  { chave: 'rodovias', label: 'Rodovias', Icone: Route },
  { chave: 'todas', label: 'Todas as praças', Icone: MapPin },
  { chave: 'naoSei', label: 'Ainda não sei', Icone: CircleHelp },
]

// O checklist trazia "Bi-semana" e "Quinzenal" como opções separadas, mas a
// própria resposta do FAQ define bi-semana como o ciclo de 14 dias — são a
// mesma coisa. Ficou uma opção só, com o ciclo explicado no `title`
// (`tooltipBiSemana`) em vez de virar duas alternativas que dizem o mesmo.
const PERIODOS = [
  { chave: 'biSemana', label: 'Bi-semana', Icone: CalendarRange },
  { chave: 'umMes', label: '1 mês', Icone: CalendarCheck },
  { chave: 'tresMeses', label: '3 meses', Icone: Calendar },
  { chave: 'seisMeses', label: '6 meses ou mais', Icone: CalendarClock },
  { chave: 'naoSei', label: 'Ainda não sei', Icone: CircleHelp },
]

const SEGMENTOS = [
  { chave: 'varejo', label: 'Varejo', Icone: Store },
  { chave: 'servicos', label: 'Serviços', Icone: Wrench },
  { chave: 'alimentacao', label: 'Restaurantes e alimentação', Icone: UtensilsCrossed },
  { chave: 'imobiliario', label: 'Imobiliário e construção civil', Icone: Home },
  { chave: 'saude', label: 'Saúde', Icone: Cross },
  { chave: 'educacao', label: 'Educação', Icone: GraduationCap },
  { chave: 'industria', label: 'Indústria', Icone: Factory },
  { chave: 'supermercados', label: 'Supermercados', Icone: ShoppingCart },
  { chave: 'automotivo', label: 'Automotivo', Icone: Car },
  { chave: 'eventos', label: 'Eventos', Icone: CalendarDays },
  { chave: 'agencias', label: 'Agências de marketing e publicidade', Icone: Megaphone },
  { chave: 'outro', label: 'Outro', Icone: Plus },
]

// A etapa de contato não leva ícone (regra da Imagine): só campo de input puro e
// os chips de preferência e verba.
const CONTATOS = [
  { chave: 'whatsapp', label: 'WhatsApp' },
  { chave: 'ligacao', label: 'Ligação' },
  { chave: 'email', label: 'E-mail' },
]

const VERBAS = [
  { chave: 'nenhuma', label: 'Não há orçamento planejado' },
  { chave: 'ate5', label: 'Até R$ 5.000' },
  { chave: 'de5a10', label: 'De R$ 5.000 a R$ 10.000' },
  { chave: 'de10a50', label: 'De R$ 10.000 a R$ 50.000' },
  { chave: 'acima50', label: 'Acima de R$ 50.000' },
]

// O resumo e a mensagem de WhatsApp guardam o `label`; para mostrar a resposta
// traduzida no resumo é preciso voltar dele à `chave`.
function chaveDe(opcoes, label) {
  return opcoes.find((o) => o.label === label)?.chave
}

// Mesma anatomia da porta 03 do bloco Nova campanha: o ícone vive dentro
// de um quadrado claro arredondado à esquerda, e o rótulo fica ao lado dele, na
// mesma linha de base. Solto na cápsula o ícone de 20px ficava maior que o texto
// e desalinhado dele.
const CHIP_BASE =
  'inline-flex cursor-pointer items-center rounded-full border text-left text-[13.5px] font-bold leading-tight transition-colors duration-150'
// Com o quadrado do ícone a cápsula perde padding à esquerda, senão ele flutua
// dentro da borda; sem ícone o padding volta a ser simétrico.
const CHIP_COM_ICONE = 'gap-2.5 py-1.5 pl-1.5 pr-5'
const CHIP_SEM_ICONE = 'px-5 py-2.5'
const CHIP = 'border-line text-ink hover:border-orange hover:text-orange'
const CHIP_ATIVO = 'border-orange bg-orange text-white'

const CHIP_ICONE = 'grid size-9 shrink-0 place-items-center rounded-[10px]'

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
      className={`${CHIP_BASE} ${Icone ? CHIP_COM_ICONE : CHIP_SEM_ICONE} ${
        ativo ? CHIP_ATIVO : CHIP
      }`}
      onClick={onClick}
    >
      {Icone && (
        <span
          className={`${CHIP_ICONE} ${ativo ? 'bg-white/20 text-white' : 'bg-orange/10 text-orange'}`}
        >
          <Icone size={20} />
        </span>
      )}
      {label}
    </button>
  )
}

const CHAVES = ['intencao', 'objetivo', 'praca', 'periodo', 'segmento']
const TOTAL = CHAVES.length + 1

const RESPOSTAS_VAZIAS = {
  intencao: '',
  objetivo: '',
  praca: [],
  periodo: '',
  segmento: '',
}
const DADOS_VAZIOS = {
  nome: '',
  empresa: '',
  cnpj: '',
  email: '',
  celular: '',
  contato: '',
  verba: '',
}

// Rascunho no navegador: quem fecha a aba no meio das seis etapas volta e
// encontra as respostas no lugar. Fica só neste navegador, nada sobe antes do
// envio, e some ao enviar ou ao recomeçar. Um mês parado ele expira: a campanha
// que a pessoa tinha em mente já não é a mesma. O aceite dos termos não entra:
// consentimento se marca de novo a cada envio.
const CHAVE_RASCUNHO = 'om:qualificador:v1'
const VALIDADE_RASCUNHO = 30 * 24 * 60 * 60 * 1000

// Só as chaves que o formulário conhece, e só com o tipo que ele espera —
// o que estiver no storage pode ter vindo de uma versão antiga do formulário.
function mesclar(base, salvo) {
  const resultado = { ...base }
  for (const chave of Object.keys(base)) {
    const valor = salvo?.[chave]
    if (Array.isArray(base[chave])) {
      if (Array.isArray(valor)) resultado[chave] = valor.filter((v) => typeof v === 'string')
    } else if (typeof valor === 'string') {
      resultado[chave] = valor
    }
  }
  return resultado
}

function lerRascunho() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_RASCUNHO)
    if (!bruto) return null
    const rascunho = JSON.parse(bruto)
    if (!rascunho?.salvoEm || Date.now() - rascunho.salvoEm > VALIDADE_RASCUNHO) return null
    const respostas = mesclar(RESPOSTAS_VAZIAS, rascunho.respostas)
    const dados = mesclar(DADOS_VAZIOS, rascunho.dados)
    if (!temConteudo(respostas, dados)) return null
    return { respostas, dados, pracaConfirmada: rascunho.pracaConfirmada === true }
  } catch {
    return null
  }
}

function gravarRascunho(rascunho) {
  try {
    window.localStorage.setItem(
      CHAVE_RASCUNHO,
      JSON.stringify({ ...rascunho, salvoEm: Date.now() })
    )
  } catch {}
}

function apagarRascunho() {
  try {
    window.localStorage.removeItem(CHAVE_RASCUNHO)
  } catch {}
}

function temConteudo(respostas, dados) {
  return (
    Object.values(respostas).some((v) => !vazio(v)) || Object.values(dados).some((v) => v.trim())
  )
}

// Sem asterisco vermelho: o botão fica inativo e a microcopy diz o que falta.
// O nome de cada campo na microcopy vem de `obrigatorios.<campo>` nas mensagens.
const OBRIGATORIOS = ['nome', 'empresa', 'email', 'celular', 'contato']

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

const semInscricao = () => () => {}

// `contexto` é a plataforma ou a linha da página onde o bloco Nova campanha
// está montado. O handoff de Plataformas pedia isso como querystring
// (`/nova-campanha?plataforma=…`); como o formulário continua sendo a seção no
// fim de cada página, o dado chega por prop e vai junto no lead. A `pagina` já
// diria a plataforma nas rotas de /plataformas, mas não diz a linha de quem
// preenche pela aba Green dentro do hub de Icônicos.
//
// A retomada do rascunho acontece aqui fora, sem setState em effect: o rascunho
// é lido uma vez por montagem (no servidor não há storage, e vem vazio) e fica
// congelado; `hidratado` é falso só no render de hidratação, para o HTML bater
// com o do servidor, e vira verdadeiro em seguida. Quando há rascunho, a troca
// de `key` remonta o formulário já nascendo com as respostas no lugar. Depois
// disso nada aqui muda de valor, então o formulário nunca é remontado no meio
// do preenchimento.
export default function QualifierForm({ contexto = '' }) {
  const hidratado = useSyncExternalStore(
    semInscricao,
    () => true,
    () => false
  )
  const [rascunhoSalvo] = useState(() => (typeof window === 'undefined' ? null : lerRascunho()))
  const rascunho = hidratado ? rascunhoSalvo : null
  return (
    <Formulario
      key={rascunho ? 'retomado' : 'novo'}
      contexto={contexto}
      hidratado={hidratado}
      rascunho={rascunho}
    />
  )
}

function Formulario({ contexto, hidratado, rascunho }) {
  const t = useTranslations('QualifierForm')
  // `Intl.ListFormat` por baixo: "nome, empresa e celular" em PT, "and" em EN,
  // "y" em ES e "、…和" em ZH, sem uma conjunção por idioma nas mensagens.
  const formatar = useFormatter()
  const [respostas, setRespostas] = useState(rascunho?.respostas ?? RESPOSTAS_VAZIAS)
  const [dados, setDados] = useState(rascunho?.dados ?? DADOS_VAZIOS)
  // A praça é múltipla: sem uma confirmação explícita, o primeiro clique já
  // marcaria o passo como respondido e o painel sumiria antes da segunda praça.
  const [pracaConfirmada, setPracaConfirmada] = useState(rascunho?.pracaConfirmada ?? false)
  const [aceite, setAceite] = useState(false)
  const [cnpjTocado, setCnpjTocado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  // O aviso de que as respostas vieram do rascunho, com o botão de recomeçar.
  const [retomado, setRetomado] = useState(Boolean(rascunho))
  const passoRef = useRef(null)
  // A rolagem até o passo é para quem acabou de responder. Nascer com o rascunho
  // também posiciona o passo, e rolar a página inteira até o formulário na
  // chegada seria sequestrar a visita.
  const interagiu = useRef(false)

  // Toda mudança vai para o storage. Antes da hidratação não: o estado vazio
  // do render do servidor apagaria o rascunho que ainda está por ser lido.
  useEffect(() => {
    if (!hidratado) return
    if (temConteudo(respostas, dados)) gravarRascunho({ respostas, dados, pracaConfirmada })
    else apagarRascunho()
  }, [hidratado, respostas, dados, pracaConfirmada])

  // Passo derivado do estado — impossível dessincronizar.
  const respondida = (chave) =>
    chave === 'praca'
      ? pracaConfirmada && respostas.praca.length > 0
      : !vazio(respostas[chave])
  const pendente = CHAVES.findIndex((c) => !respondida(c))
  const passo = pendente === -1 ? CHAVES.length : pendente

  useEffect(() => {
    if (passo === 0 || !interagiu.current) return
    passoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [passo])

  function responder(chave, valor) {
    interagiu.current = true
    setRespostas((atual) => ({ ...atual, [chave]: valor }))
  }

  function confirmarPraca() {
    interagiu.current = true
    setPracaConfirmada(true)
  }

  function recomecar() {
    setRespostas(RESPOSTAS_VAZIAS)
    setDados(DADOS_VAZIOS)
    setPracaConfirmada(false)
    setAceite(false)
    setCnpjTocado(false)
    setRetomado(false)
    apagarRascunho()
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
    interagiu.current = true
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
    (campo) => (campo !== 'celular' || pedeCelular) && !dados[campo].trim()
  ).map((campo) => t(`obrigatorios.${campo}`))
  // CNPJ é opcional, mas preenchido tem que ser um CNPJ: meio número não serve
  // ao comercial e travaria a validação do servidor de qualquer forma.
  const cnpjInvalido = Boolean(normalizarCnpj(dados.cnpj)) && !cnpjValido(dados.cnpj)
  const completo = faltando.length === 0 && !cnpjInvalido && aceite

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
      cnpj: dados.cnpj,
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
        contexto,
      },
    })
    // O rascunho existe para retomar o que não foi enviado; enviado, some.
    apagarRascunho()
    window.location.href = destino
  }

  const respondidas = CHAVES.filter(respondida).length
  // `valor` é o que está guardado (português); `texto` é o que aparece.
  const traduzir = (grupo, opcoes, label) =>
    label ? t(`opcoes.${grupo}.${chaveDe(opcoes, label)}`) : ''
  const resumo = [
    {
      rotulo: t('resumo.momento'),
      valor: respostas.intencao,
      texto: traduzir('intencao', INTENCOES, respostas.intencao),
    },
    {
      rotulo: t('resumo.objetivo'),
      valor: respostas.objetivo,
      texto: traduzir('objetivo', OBJETIVOS, respostas.objetivo),
    },
    {
      rotulo: t('resumo.praca'),
      valor: respostas.praca.join(', '),
      texto: respostas.praca.map((p) => traduzir('praca', PRACAS, p)).join(', '),
    },
    {
      rotulo: t('resumo.periodo'),
      valor: respostas.periodo,
      texto: traduzir('periodo', PERIODOS, respostas.periodo),
    },
    {
      rotulo: t('resumo.segmento'),
      valor: respostas.segmento,
      texto: traduzir('segmento', SEGMENTOS, respostas.segmento),
    },
  ]

  return (
    <div className="ticks reveal w-full rounded-[16px] border border-line bg-white p-[38px] text-ink shadow-[0_28px_56px_-28px_rgba(22,17,13,.55)] max-mob:p-7">
      <div className="mb-6 flex items-center gap-3.5">
        <span className="eyebrow text-ink-soft">{t('formulario')}</span>
        <span className="h-px flex-1 bg-line"></span>
      </div>

      {/* Convite ao Diagnóstico: só para quem marcou "Ainda não sei" no objetivo.
          Oferecer o desvio a quem já sabe o que quer é tirar a pessoa do fluxo
          que ela escolheu. */}
      {respostas.objetivo === 'Ainda não sei' && (
        <p className="m-0 mb-6 text-[14px] text-ink-soft">
          {t('semClareza')}{' '}
          <Link
            href="/area-do-anunciante/diagnostico-de-presenca"
            className="font-bold text-orange hover:underline"
          >
            {t('fazerDiagnostico')}
          </Link>
        </p>
      )}

      {retomado && (
        <p className="m-0 mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink-soft">
          {t('retomado')}
          <button
            type="button"
            onClick={recomecar}
            className="cursor-pointer text-[12.5px] font-bold uppercase tracking-[0.1em] text-orange underline hover:text-ink"
          >
            {t('recomecar')}
          </button>
        </p>
      )}

      <div className="mb-8 flex items-center gap-5 max-mob:gap-3.5">
        <span className="eyebrow whitespace-nowrap">
          {t.rich('contador', {
            respondidas,
            total: TOTAL,
            b: (partes) => <b>{partes}</b>,
          })}
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
                  <b className="text-ink">{item.texto}</b>
                  <button
                    type="button"
                    onClick={() => editar(i)}
                    className="cursor-pointer text-[12.5px] font-bold uppercase tracking-[0.1em] text-orange underline hover:text-ink"
                  >
                    {t('editar')}
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
              {t('perguntas.intencao')}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {INTENCOES.map(({ chave, label, Icone }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.intencao.${chave}`)}
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
              {t('perguntas.objetivo')}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {OBJETIVOS.map(({ chave, label, Icone }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.objetivo.${chave}`)}
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
              {t('perguntas.praca')}
            </legend>
            <p className="mb-4 text-[13.5px] text-ink-soft">{t('perguntas.pracaAjuda')}</p>
            <div className="flex flex-wrap gap-2.5">
              {PRACAS.map(({ chave, label, Icone }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.praca.${chave}`)}
                  Icone={Icone}
                  ativo={respostas.praca.includes(label)}
                  onClick={() => alternarPraca(label)}
                />
              ))}
            </div>
            <button
              className="btn btn-ghost mt-6 disabled:opacity-50"
              disabled={respostas.praca.length === 0}
              onClick={confirmarPraca}
              type="button"
            >
              {t('perguntas.continuar')}
            </button>
          </fieldset>
        )}

        {passo === 3 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              {t('perguntas.periodo')}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {PERIODOS.map(({ chave, label, Icone }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.periodo.${chave}`)}
                  Icone={Icone}
                  onClick={() => responder('periodo', label)}
                  title={chave === 'biSemana' ? t('tooltipBiSemana') : undefined}
                />
              ))}
            </div>
          </fieldset>
        )}

        {passo === 4 && (
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-4 text-[17px] font-extrabold text-ink">
              {t('perguntas.segmento')}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {SEGMENTOS.map(({ chave, label, Icone }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.segmento.${chave}`)}
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
              {t('perguntas.contato')}
            </legend>
            <div className="grid grid-cols-2 gap-4 max-mob:grid-cols-1">
              <label className="flex flex-col gap-2">
                <span className="field-label">{t('campos.nome')}</span>
                <input
                  className="field-input"
                  value={dados.nome}
                  onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label">{t('campos.empresa')}</span>
                <input
                  className="field-input"
                  value={dados.empresa}
                  onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
                />
              </label>
              {/* Máscara aplicada na digitação: o estado guarda o valor já
                  pontuado, que é o que vai para o lead e para a mensagem. O erro
                  só aparece depois de sair do campo, para não acusar CNPJ
                  incompleto enquanto a pessoa ainda digita. */}
              <label className="flex flex-col gap-2">
                <span className="field-label">{t('campos.cnpj')}</span>
                <input
                  className="field-input"
                  autoComplete="off"
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                  value={dados.cnpj}
                  aria-invalid={cnpjTocado && cnpjInvalido ? 'true' : undefined}
                  onBlur={() => setCnpjTocado(true)}
                  onChange={(e) => setDados({ ...dados, cnpj: formatarCnpj(e.target.value) })}
                />
                {cnpjTocado && cnpjInvalido && (
                  <span className="field-error">{t('cnpjInvalido')}</span>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <span className="field-label">{t('campos.email')}</span>
                <input
                  className="field-input"
                  type="email"
                  value={dados.email}
                  onChange={(e) => setDados({ ...dados, email: e.target.value })}
                />
              </label>
              {pedeCelular && (
                <label className="flex flex-col gap-2">
                  <span className="field-label">{t('campos.celular')}</span>
                  <input
                    className="field-input"
                    type="tel"
                    value={dados.celular}
                    onChange={(e) => setDados({ ...dados, celular: e.target.value })}
                  />
                </label>
              )}
            </div>

            <p className="field-label mt-6">{t('campos.preferencia')}</p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {CONTATOS.map(({ chave, label }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.contato.${chave}`)}
                  ativo={dados.contato === label}
                  onClick={() => setDados({ ...dados, contato: label })}
                />
              ))}
            </div>

            <p className="field-label mt-6">{t('campos.verba')}</p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {VERBAS.map(({ chave, label }) => (
                <OpcaoChip
                  key={chave}
                  label={t(`opcoes.verba.${chave}`)}
                  ativo={dados.verba === label}
                  onClick={() =>
                    setDados({ ...dados, verba: dados.verba === label ? '' : label })
                  }
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
                {t.rich('aceite', {
                  link: (partes) => (
                    <Link href="/privacidade" className="font-bold text-orange hover:underline">
                      {partes}
                    </Link>
                  ),
                })}
              </span>
            </label>

            {/* CTA fechando a etapa: linha própria acima do botão, e a microcopy
                ao lado dele em vez de empilhada embaixo, para que o que falta
                preencher fique na altura do olho de quem tenta clicar. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3.5 border-t border-line pt-6">
              <button
                type="button"
                onClick={enviar}
                disabled={!completo || enviando}
                className="btn btn-fill shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enviando ? t('enviando') : t('enviar')}
              </button>
              <div className="min-w-[220px] flex-1 text-[13.5px] leading-snug">
                {!completo && (
                  <p className="m-0 mb-1 font-semibold text-ink">
                    {faltando.length > 0
                      ? t('faltaPreencher', { campos: formatar.list(faltando) })
                      : cnpjInvalido
                        ? t('cnpjInvalido')
                        : t('faltaAceite')}
                  </p>
                )}
                <p className="m-0 text-ink-soft">{t('retorno')}</p>
              </div>
            </div>
          </fieldset>
        )}
      </div>
    </div>
  )
}
