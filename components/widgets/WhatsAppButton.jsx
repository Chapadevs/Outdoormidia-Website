import Image from 'next/image'
import { WA_FLUTUANTE, WA_PROGRAMATICA, waLink, waLinkMercadoOoh } from '@/lib/whatsapp'

// Os dois WhatsApp do site, empilhados no canto: o balão com o raio leva ao
// chat da MercadoOOH, onde a compra programática acontece, e o balão verde leva
// ao comercial da Outdoormídia. O verde fica embaixo por ser o destino
// primário: é o que cai mais perto do polegar e o último que a mão alcança.
//
// Quem distingue os dois é o ícone, não rótulo nenhum: botão flutuante não
// carrega texto, e é por isso que o raio deixou de ser um selo sobreposto ao
// balão verde e virou o ícone inteiro da porta da MercadoOOH.
//
// O PNG já traz o balão inteiro, então nenhum dos dois leva fundo próprio. A
// sombra vai de drop-shadow, e não de box-shadow, porque o recorte é o do
// balão: box-shadow desenharia a sombra do quadrado do <a>.
const ICONE = 'shrink-0 [filter:drop-shadow(0_14px_32px_rgba(22,17,13,.45))]'

// O <a> é maior que o desenho de propósito, para o alvo de toque não encolher
// junto com o ícone.
const ALVO =
  'flex h-14 w-14 items-center justify-center transition-transform duration-[180ms] hover:scale-[1.07] max-mob:h-13 max-mob:w-13'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-center gap-2 max-mob:bottom-4 max-mob:right-4">
      <a
        aria-label="WhatsApp da MercadoOOH, mídia programática"
        className={ALVO}
        href={waLinkMercadoOoh(WA_PROGRAMATICA)}
      >
        <Image
          alt=""
          className={`${ICONE} size-12 max-mob:size-11`}
          height={48}
          src="/media/whatsapp-mercadooh.png"
          width={48}
        />
      </a>

      {/* O verde é o único dos dois sem margem interna no arquivo: renderizado
          na mesma medida do outro, o balão sairia um terço maior. Os 36px o
          igualam ao desenho do balão com o raio, que ocupa 74% do quadro. */}
      <a aria-label="WhatsApp comercial da Outdoormídia" className={ALVO} href={waLink(WA_FLUTUANTE)}>
        <Image
          alt=""
          className={`${ICONE} size-9 max-mob:size-8`}
          height={36}
          src="/media/icone-whatsapp-verde.png"
          width={36}
        />
      </a>
    </div>
  )
}
