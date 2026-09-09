import Image from 'next/image'
import Link from 'next/link'

// Card do coverflow contínuo de plataformas: vídeo ou foto de fundo, véu
// laranja e texto sobre ele. Compartilhado entre a home (`PlatformsCarousel`)
// e o catálogo de `/plataformas` (`PlatformsCatalog`), para as duas leituras
// da mesma listagem usarem exatamente a mesma peça.
export default function PlatformShowcaseCard({ p }) {
  return (
    // `isolate` e as três camadas numeradas: mídia, scrim, texto. Sem
    // z-index declarado, o <video> (e a <Image>, que também vira camada
    // própria) sobe no compositor dentro do contexto 3D do carrossel e
    // pinta por cima do scrim — o card aparecia com a foto crua e sem o
    // véu laranja, com o texto branco ilegível em cima dela.
    // O glow é o que o scrim devolveu ao perder opacidade: duas sombras
    // laranja soltas embaixo do card, uma curta para dar assento e uma
    // larga para o halo. Elas ficam fora do `overflow-hidden` (que corta
    // filho, não a própria sombra) e giram junto com o card, então o
    // laranja parece luz saindo do painel em vez de moldura colada nele.
    <article
      className="ticks relative isolate aspect-[16/9] w-full overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_16px_38px_-20px_rgb(255_105_0_/_.5),0_42px_86px_-38px_rgb(255_105_0_/_.38)] max-mob:aspect-[4/5]"
      id={p.slug}
    >
      {p.video ? (
        // Sem `src` e sem `autoPlay`: quem anexa a fonte e dá o play é o
        // carrossel, e só no card que está passando pelo centro.
        <video
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
          data-src={p.video}
          loop
          muted
          playsInline
          preload="none"
        />
      ) : p.image ? (
        <Image
          alt={p.imageAlt || `${p.name}: ${p.short}`}
          className="z-0 object-cover"
          draggable={false}
          fill
          sizes="(max-width: 560px) 74vw, 820px"
          src={p.image}
        />
      ) : (
        <div className="absolute inset-0 z-0 grid place-items-center bg-ink/[.06] pb-[42%] text-[11px] font-bold uppercase tracking-[0.16em] text-ink/30">
          {p.name}
        </div>
      )}
      {/* Scrim laranja: o véu que segura o texto branco sobre a foto. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(255,105,0,.84)_0%,rgba(255,105,0,.58)_42%,rgba(255,105,0,0)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-7 p-[38px] max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-6">
        <div>
          {p.marcador && (
            <span className="mb-3 inline-flex rounded-full border border-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white">
              {p.marcador}
            </span>
          )}
          <div className="eyebrow text-white">{p.desc}</div>
          <h3 className="m-0 mt-3 text-[clamp(26px,2.6vw,42px)] font-extrabold leading-none tracking-[-0.02em] text-white">
            {p.name}
          </h3>
          {/* O card de mobile é um tile 4/5 de altura fixa: o texto do documento
              não cabe inteiro nele. Corta em 3 linhas aqui e vai completo
              na página da plataforma. */}
          <p className="m-0 mt-3.5 max-w-[40ch] text-[15.5px] font-semibold leading-normal text-white/95 max-mob:line-clamp-3">
            {p.short}
          </p>
        </div>
        <Link className="btn btn-on-orange shrink-0" draggable={false} href={p.href}>
          {p.cta} →
        </Link>
      </div>
    </article>
  )
}
