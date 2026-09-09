import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const pedido = await requestLocale
  const locale = hasLocale(routing.locales, pedido) ? pedido : routing.defaultLocale

  const messages = (await import(`../messages/${locale}.json`)).default
  const fallback = (await import(`../messages/${routing.defaultLocale}.json`)).default

  return {
    locale,
    messages,

    // Chave sem tradução cai no português, nunca na chave crua: o visitante vê
    // "Falar com o comercial" em vez de "Header.falarComercial" na tela.
    getMessageFallback({ namespace, key }) {
      const caminho = [namespace, key].filter(Boolean).join('.')
      const traduzido = caminho.split('.').reduce((no, parte) => no?.[parte], fallback)
      return typeof traduzido === 'string' ? traduzido : key
    },
  }
})
