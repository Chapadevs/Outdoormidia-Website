'use client'
import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { CHAVE_BRIEFING, MAILTO_RH } from '@/lib/constants'
import { WA_OBRIGADO, waBriefing, waLink } from '@/lib/whatsapp'

// CTA da tela de confirmação. O ProposalForm guarda o briefing no
// sessionStorage (ver CHAVE_BRIEFING em lib/constants.js) e este widget o lê
// para montar a mensagem de WhatsApp já preenchida.
//
// Sem nada guardado — abriu a URL direto, ou já saiu e voltou — cai na mensagem
// genérica em vez de quebrar.
//
// A leitura usa useSyncExternalStore pelo mesmo motivo do CookieNotice: no SSR
// o snapshot é nulo e o valor real entra depois da hidratação, sem descompasso.

// O briefing não muda enquanto a tela está montada: assinar é um no-op.
const subscribe = () => () => {}

function lerBriefing() {
  try {
    return sessionStorage.getItem(CHAVE_BRIEFING)
  } catch {
    return null
  }
}

const briefingNoServidor = () => null

export default function ObrigadoCta({ origem }) {
  const guardado = useSyncExternalStore(subscribe, lerBriefing, briefingNoServidor)

  // Ao sair da tela o briefing é descartado — dado pessoal não precisa
  // sobreviver à visita que o gerou.
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem(CHAVE_BRIEFING)
      } catch {}
    }
  }, [])

  function whatsapp() {
    if (origem !== 'proposta' || !guardado) return waLink(WA_OBRIGADO)
    try {
      return waLink(waBriefing(JSON.parse(guardado)))
    } catch {
      return waLink(WA_OBRIGADO)
    }
  }

  const principal =
    origem === 'talentos'
      ? { href: MAILTO_RH, label: 'Enviar currículo por e-mail' }
      : {
          href: whatsapp(),
          label: origem === 'proposta' ? 'Adiantar pelo WhatsApp' : 'Falar pelo WhatsApp',
        }

  return (
    <div className="flex flex-wrap gap-3">
      <a className="btn btn-fill" href={principal.href}>
        {principal.label}
      </a>
      <Link className="btn btn-ghost" href="/">
        Voltar ao início
      </Link>
    </div>
  )
}
