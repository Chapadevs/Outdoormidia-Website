import Link from 'next/link'
import CoverMedia from '@/components/ui/CoverMedia'

// Card do diferencial: capa, título, tagline e a linha do card. É a
// mesma peça na listagem de `/solucoes/diferenciais` e no coverflow da home
// (`Diferenciais`), pelo mesmo motivo do `PlatformShowcaseCard`: as duas
// leituras da mesma lista não podem divergir de desenho.
export default function DiferencialCard({ d, sizes, videoDeferido = false }) {
  return (
    <Link
      className="ticks flex h-full flex-col gap-4 rounded-[16px] border border-line bg-white p-7 text-ink transition-colors duration-200 hover:border-orange max-mob:p-6"
      draggable={false}
      href={d.href}
    >
      {(d.image || d.cardVideo) && (
        <CoverMedia
          alt={d.imageAlt}
          label={d.title}
          ratio="16/9"
          sizes={sizes}
          src={d.image}
          video={d.cardVideo}
          videoDeferido={videoDeferido}
        />
      )}
      <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">{d.title}</h3>
      {d.tagline && <span className="eyebrow -mt-2 text-orange">{d.tagline}</span>}
      <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{d.text}</p>
      <span className="mt-auto pt-5 text-sm font-bold text-orange">
        {d.cardCta ?? 'Ver diferencial'} →
      </span>
    </Link>
  )
}
