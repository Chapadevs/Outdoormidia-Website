import Image from 'next/image'
import { posterDoVideo } from '@/lib/videoPoster'

// Capa com fallback. Com `video`, toca em loop mudo dentro do próprio card, em
// vez de vazar como fundo de seção inteira (era assim que Aeroporto e os
// Projetos Icônicos usavam o vídeo antes). Sem `video` nem `src`, cai no
// painel bege com o rótulo.
//
// As proporções são um mapa estático de propósito: classe montada por
// interpolação não é vista pelo scanner do Tailwind e o CSS não sai no bundle.
const RATIOS = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
  '16/7': 'aspect-[16/7]',
  '9/16': 'aspect-[9/16]',
  '3/4': 'aspect-[3/4]',
  // As fotos dos ativos icônicos vêm em 2:1 do acervo do cliente. Recortar para
  // 16/9 cortaria justamente o céu e a base da estrutura, que é o que mostra a
  // altura do painel na via.
  '2/1': 'aspect-[2/1]',
  // Folha A4 deitada (297×210): o certificado de doação do Instituto Kópher. Com
  // a proporção exata a peça sobe inteira, sem faixa bege nem corte.
  a4: 'aspect-[297/210]',
}

// `foco` desloca o `object-position` do corte: existe para retrato alto
// recortado em caixa larga, onde o centro puro (padrão do `object-cover`)
// corta o rosto fora da faixa visível. `centro` é o padrão em todo o resto do
// site.
const FOCOS = {
  centro: 'object-center',
  topo: 'object-top',
}

export default function CoverMedia({
  src,
  video,
  alt,
  label,
  ratio = '16/10',
  sizes,
  priority = false,
  className = '',
  videoDeferido = false,
  recorte = false,
  foco = 'centro',
}) {
  // `recorte` é a peça que já chega recortada, com fundo transparente e a
  // própria curva desenhada na imagem (as três de Digital Signage). Ela não entra
  // em moldura: borda e canto arredondado desenhariam um segundo contorno em
  // volta do primeiro, e `object-cover` cortaria justamente a curva. Fica
  // contida na caixa, sobre o fundo da seção.
  const base = `relative w-full overflow-hidden ${
    recorte ? '' : 'rounded-[16px] border border-line'
  } ${RATIOS[ratio]}`

  // Vídeo tem prioridade sobre imagem: as duas nunca são passadas juntas, mas
  // se fossem, o vídeo é o dado mais completo. É decorativo porque a mesma
  // informação já está no texto ao lado do card.
  if (video) {
    // `videoDeferido` entrega a fonte em `data-src` e sem `autoPlay`: dentro do
    // coverflow contínuo quem baixa e quem dá o play é o carrossel, e só no
    // card que está passando pelo centro. Fora dele o vídeo toca como sempre.
    //
    // O `poster` só entra no caso deferido, e é o quadro 0 do próprio arquivo:
    // é ele que segura a imagem do card enquanto a fonte não chegou (sem ele o
    // card sobe vazio), e sendo o quadro 0 a troca para o vídeo não tem salto.
    // Vídeo que toca desde a montagem já pinta o primeiro quadro sozinho e não
    // precisa de pôster — nem tem um gerado.
    return (
      <div className={`${base} ${className}`}>
        <video
          aria-hidden="true"
          autoPlay={!videoDeferido}
          className="absolute inset-0 size-full object-cover"
          data-src={videoDeferido ? video : undefined}
          loop
          muted
          playsInline
          poster={videoDeferido ? posterDoVideo(video) : undefined}
          preload={videoDeferido ? 'none' : undefined}
          src={videoDeferido ? undefined : video}
        />
      </div>
    )
  }

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
          className={recorte ? 'object-contain' : `object-cover ${FOCOS[foco]}`}
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
