import Image from 'next/image'

// Capa com fallback. Sem `src`, cai no painel bege com o rótulo.
//
// As proporções são um mapa estático de propósito: classe montada por
// interpolação não é vista pelo scanner do Tailwind e o CSS não sai no bundle.
const RATIOS = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
  '16/7': 'aspect-[16/7]',
  '9/16': 'aspect-[9/16]',
  // As fotos dos ativos icônicos vêm em 2:1 do acervo do cliente. Recortar para
  // 16/9 cortaria justamente o céu e a base da estrutura, que é o que mostra a
  // altura do painel na via.
  '2/1': 'aspect-[2/1]',
}

export default function CoverMedia({
  src,
  alt,
  label,
  ratio = '16/10',
  sizes,
  priority = false,
  className = '',
}) {
  const base = `relative w-full overflow-hidden rounded-[16px] border border-line ${RATIOS[ratio]}`

  // Havendo imagem, o alt é obrigatório: cai no rótulo do card e, na falta dele,
  // na marca. Nunca em string vazia — isso marcaria a capa como decorativa e a
  // tiraria da leitura de quem usa leitor de tela e dos rastreadores.
  if (src) {
    const textoAlt = alt || label || 'Outdoormídia, mídia Out of Home'
    return (
      <div className={`${base} ${className}`}>
        <Image
          src={src}
          alt={textoAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={`${base} flex items-center justify-center bg-bone ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">{label}</span>
    </div>
  )
}
