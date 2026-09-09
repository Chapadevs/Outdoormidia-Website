import { Link } from '@/i18n/navigation'
import CarrosselContinuo from '@/components/ui/CarrosselContinuo'
import DiferencialCard from '@/components/ui/DiferencialCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { DIFERENCIAIS } from '@/lib/diferenciais'

// A altura é declarada aqui e não no card porque quem conhece a caixa é a
// seção: o coverflow posiciona os cards em absoluto, então a pista precisa da
// mesma medida que eles. Os seis sobem com a mesma altura de propósito, senão
// o card do meio muda de tamanho a cada giro.
const ALTURA = 'h-[520px] max-mob:h-[500px]'

export default function Diferenciais({ moreHref }) {
  return (
    // `overflow-clip` pela mesma razão do carrossel de plataformas: `hidden`
    // faria da seção uma caixa rolável, e o navegador a arrastaria na
    // horizontal para trazer à vista o card que o Tab focou do outro lado do
    // círculo.
    <section className="overflow-clip py-[110px] max-mob:py-[72px]" id="diferenciais">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-start justify-between gap-10 max-tab:flex-col max-tab:gap-4">
          <SectionHeading title="Diferenciais" className="flex-1 max-tab:w-full" />
          <div className="flex w-[34ch] flex-col gap-2 max-tab:w-full">
            <p className="m-0 text-pretty text-lg leading-snug text-ink-soft">
              O que separa uma campanha que a cidade vê de uma que passa despercebida.
            </p>
            {moreHref && (
              <Link
                className="eyebrow whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href={moreHref}
              >
                Ver todos →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mesma fita das plataformas: gira sozinha, para com o ponteiro em cima
          e não tem ponta em nenhum dos lados. Os seis diferenciais não têm
          ordem de leitura, então não há começo que a fileira de bolinhas
          pudesse anunciar. */}
      <div className="reveal">
        <CarrosselContinuo
          alturaClasse={ALTURA}
          gap={22}
          label="Diferenciais Outdoormídia"
          velocidade={0.055}
          width="min(360px,78vw)"
        >
          {DIFERENCIAIS.map((d) => (
            <div className={ALTURA} key={d.slug}>
              <DiferencialCard
                d={d}
                sizes="(max-width: 560px) 78vw, 360px"
                videoDeferido
              />
            </div>
          ))}
        </CarrosselContinuo>
      </div>
    </section>
  )
}
