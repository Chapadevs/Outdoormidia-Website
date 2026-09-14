'use client'
import { useEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { ACEITO, assinarConsentimento, lerConsentimento } from '@/lib/consentimento'
import { EVENTO_WHATSAPP, GA_ID, registrarEvento } from '@/lib/analytics'

// Google Analytics 4, instalado uma vez no layout do site. Só carrega com o
// GA_ID definido e depois do "Aceitar" no aviso de cookies: quem recusou, ou
// ainda não escolheu, navega sem nenhum script de medição na página.
//
// O gtag é definido aqui, antes de o script chegar, para os eventos disparados
// nesse intervalo ficarem na fila do dataLayer em vez de se perderem. O
// page_view é manual (send_page_view: false) porque o App Router troca de
// página sem recarregar, e o gtag só conta a primeira.

const semConsentimentoNoServidor = () => null

let instalado = false

function instalarGtag() {
  if (instalado || typeof window === 'undefined') return
  instalado = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

function linkDeWhatsApp(alvo) {
  const link = alvo instanceof Element ? alvo.closest('a[href]') : null
  if (!link) return null
  return link.href.startsWith('https://wa.me/') ? link : null
}

export default function Analytics() {
  const pathname = usePathname()
  const consentimento = useSyncExternalStore(
    assinarConsentimento,
    lerConsentimento,
    semConsentimentoNoServidor,
  )
  const ativo = Boolean(GA_ID) && consentimento === ACEITO

  useEffect(() => {
    if (ativo) instalarGtag()
  }, [ativo])

  useEffect(() => {
    if (!ativo) return
    registrarEvento('page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [ativo, pathname])

  // Todo CTA de WhatsApp do site é um <a href="https://wa.me/…"> montado por
  // lib/whatsapp.js; ouvir o documento cobre todos sem tocar em call site.
  useEffect(() => {
    if (!ativo) return
    function aoClicar(evento) {
      const link = linkDeWhatsApp(evento.target)
      if (!link) return
      registrarEvento(EVENTO_WHATSAPP, {
        origem: pathname,
        rotulo: (link.getAttribute('aria-label') || link.textContent || '').trim().slice(0, 80),
      })
    }
    document.addEventListener('click', aoClicar, true)
    return () => document.removeEventListener('click', aoClicar, true)
  }, [ativo, pathname])

  return null
}
