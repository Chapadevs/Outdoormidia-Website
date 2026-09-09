import { defineRouting } from 'next-intl/routing'

// Os quatro idiomas são os mesmos que o seletor do Header sempre anunciou.
// `zh` é chinês simplificado (zh-Hans): é o mercado continental, e o glifo do
// botão (中文) não desambigua sozinho.
export const LOCALES = ['pt', 'en', 'es', 'zh']
export const DEFAULT_LOCALE = 'pt'

// Rótulo do seletor e atributo `lang` de cada idioma. `hreflang` e `lang` usam
// a mesma tag; o OpenGraph tem formato próprio.
export const IDIOMAS = [
  { code: 'pt', label: 'PT', tag: 'pt-BR', og: 'pt_BR' },
  { code: 'en', label: 'EN', tag: 'en', og: 'en_US' },
  { code: 'es', label: 'ES', tag: 'es', og: 'es_ES' },
  { code: 'zh', label: '中文', tag: 'zh-Hans', og: 'zh_CN' },
]

export const TAG_HTML = Object.fromEntries(IDIOMAS.map((i) => [i.code, i.tag]))
export const TAG_OG = Object.fromEntries(IDIOMAS.map((i) => [i.code, i.og]))

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,

  // PT continua sem prefixo: as 30 canonicals indexadas, os 12 redirects
  // permanentes e o material impresso seguem válidos sem tocar em nada.
  localePrefix: 'as-needed',

  // Desligado de propósito. Com detecção ligada, um visitante brasileiro com o
  // Chrome em en-US é mandado de / para /en, e o Googlebot (que às vezes envia
  // Accept-Language: en) indexaria a versão errada. Num site com SEO
  // consolidado em português isso é inaceitável: a troca de idioma acontece
  // só pelo seletor do Header.
  localeDetection: false,
})
