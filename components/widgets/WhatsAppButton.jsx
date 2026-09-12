import Image from 'next/image'
import { WA_FLUTUANTE, waLink } from '@/lib/whatsapp'

// O <a> é maior que o desenho de propósito, para o alvo de toque não encolher
// junto com o ícone.
const ALVO =
  'flex h-14 w-14 items-center justify-center transition-transform duration-[180ms] hover:scale-[1.07] max-mob:h-13 max-mob:w-13'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2 max-mob:bottom-4 max-mob:right-4">
      <a aria-label="WhatsApp comercial da Outdoormídia" className={ALVO} href={waLink(WA_FLUTUANTE)}>
        <Image
          alt=""
          className="shrink-0 [filter:drop-shadow(0_14px_32px_rgba(22,17,13,.45))] size-9 max-mob:size-8"
          height={36}
          src="/media/icones/icone-whatsapp-verde.png"
          width={36}
        />
      </a>
    </div>
  )
}
