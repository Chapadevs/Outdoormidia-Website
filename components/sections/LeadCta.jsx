import { WHATSAPP_URL } from '@/lib/constants'

const PERGUNTAS = [
  'Primeira campanha ou já anunciou antes?',
  'Em qual cidade você quer aparecer?',
  'CNPJ, e-mail e WhatsApp para contato.',
]

export default function LeadCta() {
  return (
    <section className="relative bg-orange text-white">
      <div className="wrap">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-12 py-[90px] max-tab:grid-cols-1 max-tab:gap-[34px] max-tab:py-[60px] max-mob:py-[52px]">
          <div className="reveal">
            <h2 className="m-0 font-display text-[clamp(36px,6vw,76px)] font-normal uppercase leading-[0.9]">
              Conte sua
              <br />
              campanha.
            </h2>
            <p className="mt-5 max-w-[40ch] text-white/[.92]">
              Responda 3 perguntas rápidas e nosso time comercial volta com uma sugestão de ativos
              sob medida.
            </p>
            <a href={WHATSAPP_URL} className="btn btn-on-orange mt-[30px]">
              Iniciar pelo WhatsApp
            </a>
          </div>
          <div className="ticks reveal border border-white/30 bg-white/[.12] p-[30px] [--tick-color:#fff] max-mob:p-6">
            <ol className="m-0 mb-6 flex list-none flex-col gap-4 p-0">
              {PERGUNTAS.map((q, i) => (
                <li key={q} className="flex items-start gap-3.5 text-[15px] font-semibold">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] border-white font-display text-[15px]">
                    {i + 1}
                  </span>
                  {q}
                </li>
              ))}
            </ol>
            <a href="/proposta" className="btn btn-on-orange w-full justify-center">
              Quero uma proposta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
