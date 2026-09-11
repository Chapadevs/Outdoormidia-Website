// Tradução de lib/locations.js — só a lista padrão, que é o que o site mostra
// enquanto a coleção `locations` do Firestore estiver vazia. `id`, `lat` e
// `lng` continuam vindo do arquivo em português.

export const DEFAULT_LOCATIONS = [
  {
    name: '库里蒂巴',
    desc: '首府及主要交通走廊',
    formats: ['数字大牌', '灯箱大牌', '标志性项目', 'Malls', 'MUB'],
  },
  {
    name: '大都会区',
    desc: 'Campo Largo、São José dos Pinhais、Pinhais、Fazenda Rio Grande',
    formats: ['灯箱大牌', '数字大牌', '机场'],
  },
  {
    name: '巴拉那海岸',
    desc: '海滩与旺季通行道路',
    formats: ['灯箱大牌', '移动媒体'],
  },
  {
    name: '高速公路',
    desc: 'BR 101、116、277 与 376，覆盖两州',
    formats: ['高速公路', '灯箱大牌', '数字大牌'],
  },
  {
    name: '圣卡塔琳娜州',
    desc: 'Itajaí、Joinville、Balneário Camboriú',
    formats: ['数字大牌', '灯箱大牌', '高速公路'],
  },
]
