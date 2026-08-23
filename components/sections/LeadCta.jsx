import Link from 'next/link'
import QualifierForm from '@/components/forms/QualifierForm'
import { WA_ANUNCIAR_JA, waLinkMercadoOoh } from '@/lib/whatsapp'

export default function LeadCta() {
  return (
    <section className="relative scroll-mt-24 bg-orange text-white" id="formulario">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.05fr] items-center gap-12 py-[90px] max-tab:grid-cols-1 max-tab:gap-[34px] max-tab:py-[60px] max-mob:py-[52px]">
          <div className="reveal">
            <h2 className="m-0 font-display text-[clamp(36px,6vw,76px)] font-normal uppercase leading-[0.9]">
              Sua campanha
              <br />
              em poucos passos.
            </h2>
            <p className="mt-5 max-w-[40ch] text-white/[.92]">
              Você entende do seu negócio. A gente entende de colocar sua marca nos lugares certos.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <a href={waLinkMercadoOoh(WA_ANUNCIAR_JA)} className="btn btn-on-orange">
                Anunciar já
              </a>
              <Link href="/diagnostico" className="btn">
                Diagnóstico de Presença
              </Link>
            </div>
          </div>
          <QualifierForm />
        </div>
      </div>
    </section>
  )
}
