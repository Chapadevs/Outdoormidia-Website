import { WHATSAPP_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        src="/media/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero-side">Nº1 em Out of Home na Região Sul</div>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h1 className="display">
          Toda <span className="o">Hora</span><br />em Todo<br /><span className="o">Lugar.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            66 anos colocando marcas onde o Sul passa todos os dias — do outdoor digital às
            rodovias, do aeroporto aos shoppings.
          </p>
          <div className="hero-cta">
            <a href="#plataformas" className="btn">Ver plataformas</a>
            <a href={WHATSAPP_URL} className="btn btn-fill">Montar campanha</a>
          </div>
        </div>
      </div>
    </section>
  )
}
