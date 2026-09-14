'use client'
import { useSyncExternalStore } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  ACEITO,
  RECUSADO,
  assinarConsentimento,
  gravarConsentimento,
  lerConsentimento,
} from '@/lib/consentimento'

// No SSR o aviso sai dispensado: ele entra depois da hidratação, quando dá para
// saber se o visitante já escolheu. Renderizar no servidor faria o aviso piscar
// em quem já respondeu.
const escolhidoNoServidor = () => RECUSADO

export default function CookieNotice() {
  const t = useTranslations('Widgets')
  const consentimento = useSyncExternalStore(
    assinarConsentimento,
    lerConsentimento,
    escolhidoNoServidor,
  )

  if (consentimento) return null

  return (
    <div
      role="region"
      aria-label={t('avisoCookies')}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-paper shadow-[0_-14px_40px_-18px_rgba(22,17,13,.35)]"
    >
      <div className="wrap flex items-center gap-8 py-6 pr-[88px] max-tab:flex-col max-tab:items-start max-tab:gap-4 max-mob:gap-2.5 max-mob:py-3.5 max-mob:pr-[72px]">
        <div className="flex-1">
          <p className="eyebrow text-orange max-mob:text-[10px] max-mob:tracking-[0.16em]">Cookies</p>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.5] text-ink-soft max-mob:mt-1 max-mob:text-[12.5px] max-mob:leading-[1.45]">
            {t('cookiesTexto')}{' '}
            <Link href="/privacidade" className="font-bold text-orange hover:underline">
              {t('cookiesLink')}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={() => gravarConsentimento(ACEITO)}
            className="btn btn-fill max-mob:px-4 max-mob:py-2 max-mob:text-[12px]"
          >
            {t('cookiesAceitar')}
          </button>
          <button
            type="button"
            onClick={() => gravarConsentimento(RECUSADO)}
            className="btn btn-ghost max-mob:px-4 max-mob:py-2 max-mob:text-[12px]"
          >
            {t('cookiesRecusar')}
          </button>
        </div>
      </div>
    </div>
  )
}
