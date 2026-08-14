import Image from 'next/image'

// Capa com fallback. Sem `src`, cai no painel bege com o rótulo.
//
// `ticks={false}` para quando o card que envolve a capa já tem as cantoneiras —
// duas vezes o mesmo motivo na mesma peça polui em vez de marcar.
//
// As proporções são um mapa estático de propósito: classe montada por
// interpolação não é vista pelo scanner do Tailwind e o CSS não sai no bundle.
const RATIOS = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
  '16/7': 'aspect-[16/7]',
}

export default function CoverMedia({
  src,
  alt,
  label,
  ratio = '16/10',
  sizes,
  ticks = true,
  className = '',
}) {
  const base = `${ticks ? 'ticks ' : ''}relative w-full overflow-hidden rounded-[16px] border border-line ${RATIOS[ratio]}`

  if (src) {
    return (
      <div className={`${base} ${className}`}>
        <Image src={src} alt={alt || label || ''} fill sizes={sizes} className="object-cover" />
      </div>
    )
  }

  return (
    <div className={`${base} flex items-center justify-center bg-bone ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">{label}</span>
    </div>
  )
}
