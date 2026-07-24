export default function Hero() {
  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      style={{ '--hero-h': '100svh' }}
    >
      {/* Palco: plano da imagem em tamanho "cover", ancorado no topo (mais céu p/ o título) */}
      <div
        className="absolute left-1/2 top-0 aspect-[2400/1351] -translate-x-1/2"
        style={{ width: 'max(100vw, calc(var(--hero-h) * 1.7768))' }}
      >
        <img
          src="/media/hero-billboard.webp"
          alt="Outdoor da Outdoormídia com a mensagem Toda hora, em todo lugar"
          className="pointer-events-none block h-full w-full select-none"
        />

        {/* Painel laranja → tela de vídeo (percentuais medidos sobre a imagem) */}
        <div className="absolute left-[10.9%] right-[10.7%] top-[26.6%] bottom-[29.1%] overflow-hidden rounded-[2px]">
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            src="/media/hero-video-opt.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Título — dentro da imagem, no céu acima do outdoor */}
      <div className="wrap absolute inset-x-0 top-0 z-10 pt-[48px] max-mob:pt-[36px]">
        <h1
          className="display text-[clamp(30px,5vw,78px)]"
          style={{ textShadow: '0 2px 18px rgba(22,17,13,0.45)' }}
        >
          Toda <span className="text-orange">Hora</span> em Todo{' '}
          <span className="text-orange">Lugar.</span>
        </h1>
      </div>
    </section>
  )
}
