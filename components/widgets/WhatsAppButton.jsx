import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { MERCADOOH_URL } from '@/lib/constants'
import { WA_FLUTUANTE, waLink } from '@/lib/whatsapp'

// Os dois atendimentos do site, empilhados no canto: o balão com o raio leva ao
// atendimento da MercadoOOH (mídia programática) e o balão verde leva ao
// comercial da Outdoormídia. O verde fica embaixo por ser o destino primário:
// é o que cai mais perto do polegar e o último que a mão alcança.
//
// Quem distingue os dois é o ícone, não rótulo nenhum: botão flutuante não
// carrega texto. Os PNG já trazem o balão inteiro, então nenhum dos dois leva
// fundo próprio; a sombra vai de drop-shadow, e não de box-shadow, porque o
// recorte é o do balão.
const ICONE = 'shrink-0 [filter:drop-shadow(0_14px_32px_rgba(22,17,13,.45))]'

// O <a> é maior que o desenho de propósito, para o alvo de toque não encolher
// junto com o ícone.
const ALVO =
  'flex h-20 w-20 items-center justify-center transition-transform duration-[180ms] hover:scale-[1.07] max-mob:h-16 max-mob:w-16'

export default function WhatsAppButton() {
  const t = useTranslations('Widgets')
  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-center gap-2 max-mob:bottom-4 max-mob:right-4">
      <a
        aria-label={t('atendimentoMercadoOoh')}
        className={ALVO}
        href={MERCADOOH_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt=""
          className={`${ICONE} size-[72px] max-mob:size-14`}
          height={72}
          src="/media/icones/Mercadooh-icone.png"
          width={72}
        />
      </a>

      {/* O verde não tem margem interna no arquivo; o do raio tem. Renderizados
          na mesma medida, o verde sairia maior: os 60px o igualam ao desenho do
          balão com o raio, que ocupa ~80% do quadro. */}
      <a aria-label={t('whatsappComercial')} className={ALVO} href={waLink(WA_FLUTUANTE)}>
        <Image
          alt=""
          className={`${ICONE} size-[60px] max-mob:size-12`}
          height={60}
          src="/media/icones/icone-whatsapp-verde.png"
          width={60}
        />
      </a>
    </div>
  )
}
