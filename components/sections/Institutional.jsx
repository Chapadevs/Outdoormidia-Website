import ImageFlip from '@/components/ui/ImageFlip'
import StatGrid from '@/components/ui/StatGrid'
import { PLATFORMS_LISTAGEM } from '@/lib/platforms'

const IMAGE_SIZES = '(max-width: 980px) 100vw, 620px'

const FOTOS = [
  {
    src: '/media/OM-Foto.jpeg',
    alt: 'Painel digital vertical da Outdoormídia em avenida no fim de tarde, exibindo campanha da Budweiser para a Copa do Mundo FIFA 2026',
  },
  {
    src: '/media/hero-billboard.webp',
    alt: 'Outdoor da Outdoormídia ao entardecer com a mensagem "Toda hora, em todo lugar"',
  },
]

// Números da marca, no quadro fechado no checklist da home (claude/checklist-home.md,
// item 04). O mesmo componente monta a faixa da home e a de /sobre — é o que
// impede as duas de divergirem.
//
// A contagem de plataformas sai da própria listagem para não desencontrar do
// carrossel logo abaixo quando o catálogo mudar; hoje ela dá os 9 do checklist.
//
// Os 312 m² são a área do Aeroporto Square. O Distrito de Mídia Duo Square, que
// o abriga, tem 577,5 m² e aparece no card da plataforma — são dois ativos, não
// duas medidas do mesmo.
const NUMEROS = [
  { n: String(PLATFORMS_LISTAGEM.length), label: 'Plataformas integradas' },
  { n: '312 m²', label: 'Maior painel híbrido do Sul do Brasil em área visual' },
  { n: '+530M', label: 'Impactos por mês' },
  {
    n: 'DOOH',
    label: 'Maior network regional no Sul do Brasil: 175 telas com 20 milhões de impactos semanais',
  },
]

export default function Institutional() {
  return (
    <section className="bg-bone py-[110px] max-mob:py-[72px]" id="institucional">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.15fr] items-center gap-[64px] max-tab:grid-cols-1 max-tab:gap-9">
          <div>
            <p className="eyebrow reveal mb-5 text-sm">Desde 1959 · PR + SC</p>
            <h2 className="reveal m-0 text-[clamp(30px,4.4vw,54px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink">
              Referência ontem. <span className="text-orange">Inovação hoje.</span>
            </h2>
            <p className="reveal mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft max-mob:text-base">
              São <strong className="font-bold text-orange">67 anos</strong> colocando marcas onde a
              cidade passa: de Curitiba ao Litoral, das rodovias a Santa Catarina. Enquanto o mercado
              descobre <strong className="font-bold">Mídia Out Of Home</strong>, a Outdoormídia
              ajudou a construí-la.
            </p>
            <p className="reveal mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-soft max-mob:text-base">
              Cada ponto da nossa cobertura é escolhido estrategicamente antes de virar impacto, e é
              essa leitura de cidade, construída década após década, que transforma mídia OOH em
              resultado de campanha.
            </p>
          </div>

          <ImageFlip images={FOTOS} ratio="16/9" sizes={IMAGE_SIZES} className="reveal" />
        </div>

        <StatGrid className="reveal mt-[72px] max-mob:mt-12" size="md" stats={NUMEROS} />
      </div>
    </section>
  )
}
