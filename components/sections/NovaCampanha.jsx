import Link from 'next/link'
import { Bot, ChevronRight, Target, Zap } from 'lucide-react'
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
//
// Ícones no mapa da Imagine Concept (claude/icones-nova-campanha.md). Aqui eles
// herdam o branco do texto em vez do laranja da regra: as três portas ficam
// sobre laranja ou sobre o preto do card 03, e laranja sobre laranja some. O
// laranja da regra vale dentro do card branco do formulário.
//
// Anatomia de cada porta, na ordem do checklist: ícone em quadrado claro
// arredondado, numeração, nome em destaque, linha de intenção abaixo e chevron
// circular à direita. O chevron é a seta da linha de intenção promovida a
// elemento — por isso ela não termina mais em "→", que ficaria duplicado.

const CARD_MENOR =
  'group flex flex-col gap-3 rounded-[16px] border p-7 transition-colors duration-200 max-mob:p-6'

// Quadrado claro do ícone e chevron: o mesmo desenho nas três portas, só o tom
// muda entre o fundo laranja e o preto do card 03.
const ICONE_QUADRADO = 'grid shrink-0 place-items-center rounded-[10px] bg-white/15'
const CHEVRON = 'grid size-9 shrink-0 place-items-center rounded-full border border-white/35 transition-colors duration-200 group-hover:border-white'

// `contexto` identifica de onde o lead saiu quando o bloco está montado numa
// página de plataforma ou de linha icônica. Repassado ao qualificador, entra no
// lead junto com a página de origem.
export default function NovaCampanha({ contexto = '' }) {
  return (
    <section className="relative scroll-mt-24 bg-orange text-white" id="nova-campanha">
      <div className="wrap py-[90px] max-tab:py-[60px] max-mob:py-[52px]">
        {/* O kicker dá identidade ao bloco: sem ele a caixa laranja abre direto
            no título e o visitante não sabe que aquilo é o formulário principal
            do site. É também o que permite referenciar a seção por âncora
            (`#nova-campanha`) a partir de qualquer página. */}
        <div className="reveal">
          <div className="eyebrow text-white/70">Nova campanha</div>
          <h2 className="m-0 mt-3.5 font-display text-[clamp(36px,6vw,76px)] font-normal uppercase leading-[0.9]">
            Como você prefere
            <br />
            começar?
          </h2>
          <p className="mt-5 max-w-[46ch] text-white/[.92]">
            Você entende do seu negócio. A gente entende de colocar sua marca nos lugares certos.
          </p>
        </div>

        <Link
          className="reveal group mt-11 flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 transition-colors duration-200 hover:border-white hover:bg-white/[.18] max-mob:rounded-[16px] max-mob:px-4"
          href="/area-do-anunciante/diagnostico-de-presenca"
        >
          <span className={`${ICONE_QUADRADO} size-9`}>
            <Target size={20} />
          </span>
          <span className="eyebrow text-white/70">01</span>
          <span className="text-[17px] font-extrabold leading-tight">Diagnóstico de Presença</span>
          <span className="ml-auto text-[14.5px] text-white/[.92] max-mob:ml-0">
            Quero uma curadoria da presença da minha marca
          </span>
          <span aria-hidden="true" className={CHEVRON}>
            <ChevronRight size={18} />
          </span>
        </Link>

        {/* `formulario` era o id da seção inteira antes do bloco Nova campanha —
            fica no formulário para não quebrar os links já publicados. */}
        <div className="mt-5 scroll-mt-24" id="formulario">
          <QualifierForm contexto={contexto} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-[18px] max-mob:grid-cols-1">
          <a
            className={`${CARD_MENOR} border-ink bg-ink hover:border-ink/70 hover:bg-ink/85`}
            href={waLinkMercadoOoh(WA_PROGRAMATICA)}
          >
            <span className={`${ICONE_QUADRADO} size-10 bg-white/10`}>
              <Zap size={24} />
            </span>
            <span className="eyebrow text-white/55">03</span>
            <span className="text-[21px] font-extrabold leading-tight">Mídia Programática</span>
            <span className="mt-auto flex items-center justify-between gap-4 pt-4">
              <span className="text-[14.5px] text-white/[.85]">
                Quero ver os espaços disponíveis
              </span>
              <span aria-hidden="true" className={CHEVRON}>
                <ChevronRight size={18} />
              </span>
            </span>
          </a>
          <a
            className={`${CARD_MENOR} border-white/45 hover:border-white hover:bg-white/10`}
            href={waLink(WA_ATENDIMENTO_AGORA)}
          >
            <span className={`${ICONE_QUADRADO} size-10`}>
              <Bot size={24} />
            </span>
            <span className="eyebrow text-white/70">04</span>
            <span className="text-[21px] font-extrabold leading-tight">
              Atendimento automatizado
            </span>
            <span className="mt-auto flex items-center justify-between gap-4 pt-4">
              <span className="text-[14.5px] text-white/[.92]">Quero atendimento agora</span>
              <span aria-hidden="true" className={CHEVRON}>
                <ChevronRight size={18} />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
