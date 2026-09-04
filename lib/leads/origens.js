// Fonte única das origens de lead. Quem valida o body e quem renderiza o lead
// no admin leem daqui — os rótulos existem uma vez só.
//
// Para acrescentar um fluxo (diagnóstico, simulador, talentos), basta uma
// entrada nova aqui: a validação, a listagem e a tela de detalhe passam a
// aceitá-lo sem outra alteração.
export const ORIGENS = {
  proposta: {
    label: 'Proposta',
    desc: 'Briefing completo enviado em /proposta.',
    campos: [
      { key: 'cidade', label: 'Onde quer aparecer' },
      { key: 'formato', label: 'Formato de interesse' },
      { key: 'periodo', label: 'Período da campanha' },
      { key: 'objetivo', label: 'Objetivo da campanha', longo: true },
    ],
  },
  qualificador: {
    label: 'Qualificador',
    desc: 'Pré-qualificação da seção “Nova campanha”.',
    campos: [
      { key: 'intencao', label: 'Momento' },
      { key: 'objetivo', label: 'Objetivo' },
      { key: 'praca', label: 'Praça' },
      { key: 'periodo', label: 'Período' },
      { key: 'segmento', label: 'Segmento' },
      { key: 'contato', label: 'Prefere contato por' },
      { key: 'verba', label: 'Investimento previsto' },
      // Rastreio: de onde o visitante veio e onde preencheu. O formulário aparece
      // em várias rotas, então a página de origem é o que diz qual delas converte.
      { key: 'campanha', label: 'Campanha de origem' },
      { key: 'pagina', label: 'Página de origem' },
      // A plataforma ou linha da página onde o bloco Nova campanha estava
      // montado. Vazio quando o lead veio da home ou de uma página sem contexto.
      { key: 'contexto', label: 'Plataforma de interesse' },
    ],
  },
  // A captura do diagnóstico é opcional e pede só o e-mail, depois do degrau
  // já estar na tela — por isso `semNome`. O que dá contexto ao comercial é o
  // resultado que a pessoa viu, não um cadastro que ela não preencheu.
  //
  // TODO(cliente): a copy promete o diagnóstico por e-mail e ninguém envia nada
  // ainda. O lead fica em /admin/leads; o disparo depende do Resend, e a
  // integração com o Agendor depende de decisão do Erik (ver as pendências em
  // claude/copy-diagnostico-presenca.md).
  diagnostico: {
    label: 'Diagnóstico',
    desc: 'E-mail deixado no fim do Diagnóstico de Presença.',
    semNome: true,
    campos: [
      { key: 'degrau', label: 'Degrau' },
      { key: 'nota', label: 'Nota' },
      { key: 'pontoFragil', label: 'Ponto mais frágil', longo: true },
    ],
  },
}

export const STATUS_LEAD = [
  { id: 'novo', label: 'Novo' },
  { id: 'contatado', label: 'Contatado' },
  { id: 'descartado', label: 'Descartado' },
]

export function isOrigem(valor) {
  return Object.hasOwn(ORIGENS, valor)
}

export function isStatusLead(valor) {
  return STATUS_LEAD.some((s) => s.id === valor)
}

export function rotuloOrigem(origem) {
  return ORIGENS[origem]?.label || origem
}

export function rotuloStatus(status) {
  return STATUS_LEAD.find((s) => s.id === status)?.label || status
}

// Os campos da origem preenchidos, prontos para render. Campo vazio some — o
// visitante não respondeu e uma linha "—" só polui a leitura do comercial.
export function camposPreenchidos(lead) {
  const campos = ORIGENS[lead.origem]?.campos || []
  return campos
    .map((campo) => ({ ...campo, valor: lead.dados?.[campo.key] || '' }))
    .filter((campo) => campo.valor)
}
