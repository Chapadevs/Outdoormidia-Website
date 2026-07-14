import { WHATSAPP_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col overflow-hidden pt-[70px] max-mob:min-h-0 max-mob:pt-12">
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        src="/media/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute left-2.5 top-[46%] z-[2] origin-left -rotate-90 text-[11px] font-bold uppercase tracking-[0.28em] text-ink-soft max-tab:hidden">
        Nº1 em Out of Home na Região Sul
      </div>
      <div className="wrap relative z-[2] flex flex-1 flex-col">
        <h1 className="display mt-6 text-[clamp(52px,11.5vw,158px)] max-mob:mt-[18px]">
          Toda <span className="text-orange">Hora</span>
          <br />
          em Todo
          <br />
          <span className="text-orange">Lugar.</span>
        </h1>
        <div className="mt-[54px] grid grid-cols-[1fr_auto] items-end gap-[30px] border-t border-line pb-[30px] pt-[46px] max-tab:grid-cols-1 max-tab:gap-6 max-mob:mt-8 max-mob:pb-6 max-mob:pt-[30px]">
          <p className="m-0 max-w-[46ch] text-lg text-white max-mob:text-base">
            66 anos colocando marcas onde o Sul passa todos os dias — do outdoor digital às
            rodovias, do aeroporto aos shoppings.
          </p>
          <div className="flex flex-wrap gap-3 max-mob:w-full">
            <a href="#plataformas" className="btn max-mob:flex-[1_1_100%] max-mob:justify-center">
              Ver plataformas
            </a>
            <a
              href={WHATSAPP_URL}
              className="btn btn-fill max-mob:flex-[1_1_100%] max-mob:justify-center"
            >
              Montar campanha
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
