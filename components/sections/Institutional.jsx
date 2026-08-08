import Image from 'next/image'

const IMAGE_SIZES = '(max-width: 980px) 100vw, 620px'

export default function Institutional() {
  return (
    <section className="bg-bone py-[110px] max-mob:py-[72px]" id="institucional">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.15fr] items-center gap-[64px] max-tab:grid-cols-1 max-tab:gap-9">
          <div>
            <p className="eyebrow reveal mb-5">Desde 1959 · PR + SC</p>
            <h2 className="reveal m-0 text-[clamp(30px,4.4vw,54px)] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink">
              Referência ontem. <span className="text-orange">Inovação hoje.</span>
            </h2>
            <p className="reveal mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft max-mob:text-base">
              São 66 anos colocando marcas onde a cidade passa, seja Curitiba ao Litoral, das
              rodovias a Santa Catarina. Enquanto o mercado descobre a mídia OOH, a Outdoormídia
              já é parte do out of home e DOOH há mais de seis décadas. Da capital à estrada:
              onde sua marca merece estar.
            </p>
          </div>

          <div className="ticks reveal relative aspect-[16/9] w-full overflow-hidden rounded-[16px] border border-line">
            <Image
              src="/media/OM-Foto.jpeg"
              alt="Painel digital vertical da Outdoormídia em avenida no fim de tarde, exibindo campanha da Budweiser para a Copa do Mundo FIFA 2026"
              fill
              sizes={IMAGE_SIZES}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
