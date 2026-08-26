import Link from 'next/link'
import QualifierForm from '@/components/forms/QualifierForm'
import { WA_ATENDIMENTO_AGORA, WA_PROGRAMATICA, waLink, waLinkMercadoOoh } from '@/lib/whatsapp'

// As quatro portas do bloco "Nova campanha", na hierarquia fechada no checklist
// da home (claude/checklist-home.md, item 10).
//
// A ordem é de estratégia, o tamanho é de conversão: o Diagnóstico abre a seção
// como faixa fina justamente para não roubar o clique do formulário, que é o
// card dominante. As duas portas de baixo são cards menores.
//
// O preto do card de Mídia Programática é a única exceção autorizada à paleta.

const CARD_MENOR =
  'group flex flex-col gap-3 rounded-[16px] border p-7 transition-colors duration-200 max-mob:p-6'

export default function NovaCampanha() {
  return (
    <section className="relative scroll-mt-24 bg-orange text-white" id="nova-campanha">
      <div className="wrap py-[90px] max-tab:py-[60px] max-mob:py-[52px]">
        <div className="reveal">
          <h2 className="m-0 font-display text-[clamp(36px,6vw,76px)] font-normal uppercase leading-[0.9]">
            Como você prefere
            <br />
            começar?
          </h2>
          <p className="mt-5 max-w-[46ch] text-white/[.92]">
            Escolha o caminho que combina com o momento da sua marca.
          </p>
        </div>

        <Link
          className="reveal mt-11 flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-full border border-white/35 bg-white/10 px-7 py-3 transition-colors duration-200 hover:border-white hover:bg-white/[.18] max-mob:rounded-[16px] max-mob:px-6"
          href="/area-do-anunciante/diagnostico-de-presenca"
        >
          <span className="eyebrow text-white/70">01</span>
          <span className="text-[17px] font-extrabold leading-tight">Diagnóstico de Presença</span>
          <span className="ml-auto text-[14.5px] text-white/[.92] max-mob:ml-0">
            Quero uma curadoria da presença da minha marca →
          </span>
        </Link>

        {/* `formulario` era o id da seção inteira antes do bloco Nova campanha —
            fica no formulário para não quebrar os links já publicados. */}
        <div className="mt-5 scroll-mt-24" id="formulario">
          <QualifierForm />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
          <a
            className={`${CARD_MENOR} border-ink bg-ink hover:border-ink/70 hover:bg-ink/85`}
            href={waLinkMercadoOoh(WA_PROGRAMATICA)}
          >
            <span className="eyebrow text-white/55">03</span>
            <span className="text-[21px] font-extrabold leading-tight">Mídia Programática</span>
            <span className="mt-auto pt-4 text-[14.5px] text-white/[.85]">
              Quero ver os espaços disponíveis →
            </span>
          </a>
          <a
            className={`${CARD_MENOR} border-white/45 hover:border-white hover:bg-white/10`}
            href={waLink(WA_ATENDIMENTO_AGORA)}
          >
            <span className="eyebrow text-white/70">04</span>
            <span className="text-[21px] font-extrabold leading-tight">
              Atendimento automatizado
            </span>
            <span className="mt-auto pt-4 text-[14.5px] text-white/[.92]">
              Quero atendimento agora →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
