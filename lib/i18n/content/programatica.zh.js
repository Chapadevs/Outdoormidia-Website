// Tradução de lib/programatica.js. `publicado`, `sigla`, `num`, `id` e
// `verbete` continuam vindo do arquivo em português.
//
// As siglas e os nomes de mercado (Preferred Deal, DSP, SSP, JBP) não são
// traduzidos em idioma nenhum: o vocabulário programático é inglês, e trocar o
// termo aqui quebra o reconhecimento de quem compra por trading desk.

export const DADO_MERCADO = {
  texto:
    '2025 年，全球程序化数字户外广告投入达 14 亿美元，相当于全球数字户外媒体总投入的 7%。',
  fonte: '来源：World Out of Home Organization，Global pDOOH Spend Study 2025。',
}

export const MODELOS = [
  {
    texto: '优先获取指定媒体资源，商务条件在投放前完成协商。',
  },
  {
    texto: '双方事先约定曝光量或投放金额。',
  },
  {
    texto: '不预先承诺曝光量或投放金额，通过公开竞价完成采买。',
  },
]

export const FLUXO = [
  {
    etapa: '广告主',
    texto: '品牌确定战役目标以及需要触达的人群。',
  },
  {
    etapa: '代理公司或交易平台',
    texto:
      '负责策略规划、战役管理与渠道选择。交易平台可以隶属于代理公司，也可以独立运作。',
  },
  {
    texto: '配置需求方参数，实时进行竞价。',
  },
  {
    texto: '接收来自 DSP 的需求，并对接可用的媒体资源。',
  },
  {
    etapa: 'Outdoormídia 媒体资源',
    texto: '我们运营的屏幕通过合作 SSP 进入供给端。',
  },
  {
    etapa: '广告展示',
    texto: '广告在点位上播出，在正确的时间触达正确的人群。',
  },
]

export const GLOSSARIO = [
  {
    texto: '买方配置广告战役并进行出价的平台。',
  },
  {
    texto: '媒体资源方向 DSP 提供屏幕资源的平台。',
  },
  {
    nome: '千次展示成本',
    texto: '每一千次展示所支付的费用，是程序化数字户外广告的核心计价指标。',
  },
  {
    nome: '持续性投放',
    texto: '没有固定结束日期的广告战役，用于维持品牌的持续曝光。',
  },
  {
    texto: '合作伙伴之间的联合商务规划，包含共同的目标、指标与增长策略。',
  },
  {
    nome: '广告联盟',
    texto: '连接广告主与媒体方的中介平台，汇集来自不同媒体主的资源。',
  },
  {
    nome: '一体化解决方案',
    texto: '将采买、销售、投放、监测与优化整合在同一生态中的平台。',
  },
]
