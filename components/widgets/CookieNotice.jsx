'use client'
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'om-aviso-cookies'

const listeners = new Set()

function subscribe(onChange) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

function lerDispensa() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// No SSR o aviso sai dispensado: ele entra depois da hidratação, quando dá para
// saber se o visitante já fechou. Renderizar no servidor faria o aviso piscar em
// quem já leu.
const dispensaNoServidor = () => '1'

export default function CookieNotice() {
  const dispensado = useSyncExternalStore(subscribe, lerDispensa, dispensaNoServidor)

  function fechar() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    listeners.forEach((onChange) => onChange())
  }

  if (dispensado) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-paper shadow-[0_-14px_40px_-18px_rgba(22,17,13,.35)]"
    >
      <div className="wrap flex items-center gap-8 py-6 pr-[88px] max-tab:flex-col max-tab:items-start max-tab:gap-4 max-mob:py-5 max-mob:pr-[76px]">
        <div className="flex-1">
          <p className="eyebrow text-orange">Cookies</p>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.5] text-ink-soft">
            Este site usa apenas cookies necessários para funcionar — sem
            rastreamento e sem publicidade. Ao continuar navegando, você concorda
            com o uso deles.
          </p>
        </div>
        <button type="button" onClick={fechar} className="btn btn-ghost shrink-0">
          Entendi
        </button>
      </div>
    </div>
  )
}
