import SectionHeading from '@/components/ui/SectionHeading'
import { WHATSAPP_URL } from '@/lib/constants'

const PRACAS = [
  { title: 'Curitiba', desc: 'Capital e principais corredores' },
  {
    title: 'Região Metropolitana',
    desc: 'Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande',
  },
  { title: 'Litoral do PR', desc: 'Praias e acessos de alta temporada' },
  { title: 'Rodovias', desc: 'Principais vias do estado' },
  { title: 'Santa Catarina', desc: 'Itajaí, Joinville, Balneário Camboriú' },
]

export default function Coverage() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cobertura">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
          <div className="reveal">
            <SectionHeading num="05" title="Cobertura" rule={false} className="mb-[18px]" />
            <p className="mt-[18px] max-w-[38ch] text-lg text-ink-soft">
              Do centro de Curitiba ao litoral, das rodovias a Santa Catarina — uma malha de mídia
              que acompanha o fluxo de pessoas em toda a região Sul.
            </p>
            <a href={WHATSAPP_URL} className="btn mt-7">
              Consultar disponibilidade
            </a>
          </div>
          <div className="reveal border-t border-ink">
            {PRACAS.map((p) => (
              <div
                className="flex items-baseline justify-between gap-5 border-b border-line px-1 py-[22px]"
                key={p.title}
              >
                <span className="text-[clamp(20px,2.6vw,30px)] font-extrabold tracking-[-0.01em]">
                  {p.title}
                </span>
                <span className="max-w-[42%] text-right text-[13px] text-ink-soft max-mob:hidden">
                  {p.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
