import Image from 'next/image'
import { WA_FLUTUANTE, waLink } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center transition-transform duration-[180ms] hover:scale-[1.07] max-mob:bottom-4 max-mob:right-4 max-mob:h-13 max-mob:w-13"
      href={waLink(WA_FLUTUANTE)}
      aria-label="WhatsApp"
    >
      {/* O PNG já traz o balão inteiro, então o botão não leva fundo próprio.
          A sombra vai de drop-shadow, e não de box-shadow, porque o recorte é
          o do balão: box-shadow desenharia a sombra do quadrado do <a>. */}
      <Image
        alt=""
        className="size-12 shrink-0 [filter:drop-shadow(0_14px_32px_rgba(22,17,13,.45))] max-mob:size-11"
        height={48}
        src="/media/icone-whatsapp.png"
        width={48}
      />
    </a>
  )
}
