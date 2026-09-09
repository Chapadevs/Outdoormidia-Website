// Confere que os quatro arquivos de mensagem têm exatamente o mesmo conjunto
// de chaves. Sem isso, uma chave criada só no pt.json vira texto em português
// no meio de uma página em chinês, e ninguém percebe até o cliente ver.
//
// Rodar com: npm run check:i18n
import fs from 'node:fs'
import path from 'node:path'

const LOCALES = ['pt', 'en', 'es', 'zh']
const BASE = 'pt'
const dir = path.join(process.cwd(), 'messages')

function chavesDe(objeto, prefixo = '') {
  return Object.entries(objeto).flatMap(([k, v]) =>
    v !== null && typeof v === 'object'
      ? chavesDe(v, `${prefixo}${k}.`)
      : [`${prefixo}${k}`]
  )
}

function ler(locale) {
  return JSON.parse(fs.readFileSync(path.join(dir, `${locale}.json`), 'utf8'))
}

const base = chavesDe(ler(BASE)).sort()
let problemas = 0

for (const locale of LOCALES.filter((l) => l !== BASE)) {
  const atual = chavesDe(ler(locale)).sort()
  const faltando = base.filter((k) => !atual.includes(k))
  const sobrando = atual.filter((k) => !base.includes(k))

  if (faltando.length) {
    problemas += faltando.length
    console.error(`\n${locale}.json — ${faltando.length} chave(s) faltando:`)
    for (const k of faltando) console.error(`  - ${k}`)
  }
  if (sobrando.length) {
    problemas += sobrando.length
    console.error(`\n${locale}.json — ${sobrando.length} chave(s) que não existem no ${BASE}.json:`)
    for (const k of sobrando) console.error(`  + ${k}`)
  }
}

if (problemas > 0) {
  console.error(`\n${problemas} divergência(s). Rode de novo depois de corrigir.`)
  process.exit(1)
}

console.log(`${base.length} chaves, iguais nos ${LOCALES.length} idiomas.`)
