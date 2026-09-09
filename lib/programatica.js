// Mídia Programática — conteúdo de /area-do-anunciante/programatica.
//
// Checklist de aplicação de 06/09/2026, revisado em 08/09 (ordem e acordeões) e
// em 09/09 (saída dos blocos de inventário e de mercado). A numeração dos
// blocos mantém os furos do documento (01, 03, 05, 06, 08) de propósito, para
// este arquivo e o checklist continuarem falando dos mesmos blocos.
//
// A página não cita quantidade de tela, distribuição por praça, impactos nem
// número de plataformas: o argumento aqui é conexão, não escala. Nenhum valor
// de investimento, CPM ou tabela de preço entra, em nenhuma versão.

// Linha de dado do hero. É a única página do site que cita este estudo, e a
// fonte anda junto com o número, sempre visível.
//
// PENDÊNCIA que bloqueia a publicação: link verificável do estudo. Enquanto ele
// não existir, `publicado: false` tira a linha do hero e o hero fica só com o
// subtítulo, como manda o checklist. A página funciona sem ela.
//
// Manutenção: a World Out of Home Organization publica o estudo em edição
// anual, em junho. Revisar todo mês de junho. Se a edição do ano corrente ainda
// não estiver disponível, manter o número e o ano da citação atual. Nunca
// atualizar o valor sem trocar a citação junto.
export const DADO_MERCADO = {
  publicado: true,
  texto:
    'Em 2025, US$ 1,4 bilhão foi investido globalmente em DOOH programático, o equivalente a 7% de tudo o que se investiu em mídia exterior digital no mundo.',
  fonte: 'Fonte: World Out of Home Organization, Global pDOOH Spend Study 2025.',
}

// Bloco 01. É a única informação da página que a concorrência regional não
// consegue dizer sem provar, e por isso abre a página.
//
// PENDÊNCIA: autorização de uso das logos. Sem ela o bloco vai ao ar em lista
// de texto, que é como está agora. O bloco não sai da página em hipótese alguma.
export const SSPS = [
  {
    titulo: 'Plugados direto',
    nomes: ['Admooh', 'Outcoon', 'Adsmovil', 'Hivestack', 'Bebot'],
  },
  {
    titulo: 'Plugados via Invian',
    nomes: ['Vistar Media', 'Digital View', 'entre outras SSPs'],
    nota: 'Conexão via plataforma Invian.',
  },
]

// Bloco 03.
export const MODELOS = [
  {
    sigla: 'PD',
    nome: 'Preferred Deal',
    texto:
      'Acesso prioritário a um inventário determinado, com condições comerciais negociadas antes da veiculação.',
  },
  {
    sigla: 'PG',
    nome: 'Guaranteed Deal',
    texto: 'Volume de impressões ou de investimento acordado previamente entre as partes.',
  },
  {
    sigla: 'NG',
    nome: 'Non-Guaranteed Deal',
    texto:
      'Sem compromisso prévio de volume ou investimento. A compra acontece em disputa aberta.',
  },
]

// Bloco 05. O passo 05 é adição nossa ao fluxo do material de origem, onde a
// Outdoormídia aparecia como bloco lateral: na página a operação precisa estar
// dentro da linha, não ao lado dela.
//
// `verbete` liga a etapa ao glossário do bloco 06. As siglas DSP e SSP aparecem
// aqui antes de qualquer explicação, e sem o link o leitor não técnico trava no
// passo 03 e abandona a página.
export const FLUXO = [
  {
    num: '01',
    etapa: 'Anunciante',
    texto: 'A marca define o objetivo da campanha e o público que precisa alcançar.',
  },
  {
    num: '02',
    etapa: 'Agência ou trading desk',
    texto:
      'Planeja a estratégia, gerencia a campanha e define os canais. A trading desk pode estar dentro da agência ou atuar de forma independente.',
  },
  {
    num: '03',
    etapa: 'DSP',
    texto: 'A demanda é configurada e os lances acontecem em tempo real.',
    verbete: 'dsp',
  },
  {
    num: '04',
    etapa: 'SSP',
    texto: 'Recebe as demandas das DSPs e conecta ao inventário disponível.',
    verbete: 'ssp',
  },
  {
    num: '05',
    etapa: 'Inventário Outdoormídia',
    texto: 'As telas da nossa operação entram na oferta pelas SSPs parceiras.',
  },
  {
    num: '06',
    etapa: 'Exibição',
    texto: 'O anúncio é exibido no local, impactando o público certo, na hora certa.',
  },
]

// Bloco 06. DSP e SSP abrem a lista porque são as duas siglas que o fluxo usa
// antes de qualquer explicação. CPM entra como definição, nunca com valor.
export const GLOSSARIO = [
  {
    id: 'dsp',
    sigla: 'DSP',
    nome: 'Demand Side Platform',
    texto: 'A plataforma onde o comprador configura a campanha e dá os lances.',
  },
  {
    id: 'ssp',
    sigla: 'SSP',
    nome: 'Supply Side Platform',
    texto: 'A plataforma onde o dono do inventário oferta as telas para as DSPs.',
  },
  {
    id: 'cpm',
    sigla: 'CPM',
    nome: 'Custo por mil',
    texto:
      'Valor pago a cada mil exibições. É a principal métrica de precificação no DOOH programático.',
  },
  {
    id: 'always-on',
    sigla: 'Always On',
    nome: 'Campanha contínua',
    texto:
      'Campanha sem data fixa de encerramento, para manter presença constante da marca.',
  },
  {
    id: 'jbp',
    sigla: 'JBP',
    nome: 'Joint Business Plan',
    texto:
      'Planejamento comercial conjunto entre parceiros, com objetivos, metas e estratégias de crescimento.',
  },
  {
    id: 'ad-network',
    sigla: 'Ad Network',
    nome: 'Rede de anúncios',
    texto:
      'Plataforma intermediária que conecta anunciantes e publishers, agrupando inventário de diferentes veículos.',
  },
  {
    id: 'full-stack',
    sigla: 'Full Stack',
    nome: 'Solução integrada',
    texto:
      'Plataforma que reúne compra, venda, entrega, mensuração e otimização em um único ecossistema.',
  },
]
