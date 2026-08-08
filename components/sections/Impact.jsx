import StatGrid from '@/components/ui/StatGrid'
import { PLATFORMS } from '@/lib/platforms'

const STATS = [
  { n: '66', label: 'Anos de história' },
  { n: String(PLATFORMS.length), label: 'Plataformas de mídia' },
  { n: '100+', label: 'Pontos em rodovias' },
  { n: '2', label: 'Estados · PR + SC' },
]

export default function Impact() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1280px]">
        <StatGrid stats={STATS} cellClassName="reveal" />
      </div>
    </section>
  )
}
