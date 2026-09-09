import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ChevronRight, Target, Zap } from 'lucide-react'
import QualifierForm from '@/components/forms/QualifierForm'
import { WA_ATENDIMENTO_AGORA, waLink } from '@/lib/whatsapp'

// As três portas do bloco "Nova campanha", na hierarquia fechada no checklist
// da home (claude/checklist-home.md, item 10) — a porta de Mídia Programática
// saiu de circulação (decisão de 05/09/2026).
//
// A ordem é de estratégia, o tamanho é de conversão: o Diagnóstico abre a seção
// como faixa fina justamente para não roubar o clique do formulário, que é o
// card dominante. A porta de baixo fecha a seção na mesma faixa fina: sozinha
// desde a saída da Mídia Programática, ela era meio card preto ocupando meia
// largura, com o nome longe da linha de intenção e um vão morto no meio. Como
// faixa ela emoldura o formulário em vez de disputar com ele, e as duas portas
// passam a ter a mesma anatomia, uma acima e uma abaixo do card branco.
//
// O preto do card de Atendimento rápido é a única exceção autorizada à paleta.
//
// Ícones no mapa da Imagine Concept (claude/icones-nova-campanha.md). Aqui eles
// herdam o branco do texto em vez do laranja da regra: as portas ficam sobre
// laranja ou sobre o preto do card de atendimento, e laranja sobre laranja
// some. O laranja da regra vale dentro do card branco do formulário.
//
// Anatomia de cada porta, na ordem do checklist: ícone em quadrado claro
// arredondado, nome em destaque, linha de intenção abaixo e chevron
// circular à direita. O chevron é a seta da linha de intenção promovida a
// elemento — por isso ela não termina mais em "→", que ficaria duplicado.

const FAIXA =
  'group flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-full border px-5 py-2.5 transition-colors duration-200 max-mob:rounded-[16px] max-mob:px-4'

// Quadrado claro do ícone e chevron: o mesmo desenho nas duas portas, só o tom
// muda entre o fundo laranja e o preto da faixa de atendimento.
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
          className={`reveal ${FAIXA} mt-11 border-white/35 bg-white/10 hover:border-white hover:bg-white/[.18]`}
          href="/area-do-anunciante/diagnostico-de-presenca"
        >
          <span className={`${ICONE_QUADRADO} size-9`}>
            <Target size={20} />
          </span>
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

        <a
          className={`reveal ${FAIXA} mt-5 border-ink bg-ink hover:border-ink/70 hover:bg-ink/85`}
          href={waLink(WA_ATENDIMENTO_AGORA)}
        >
          <span className={`${ICONE_QUADRADO} relative size-9 bg-white/10`}>
            <Image alt="" className="size-5" height={20} src="/media/icone-whatsapp.png" width={20} />
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-orange"
            >
              <Zap className="fill-white text-white" size={10} />
            </span>
          </span>
          <span className="text-[17px] font-extrabold leading-tight">Atendimento rápido</span>
          <span className="ml-auto text-[14.5px] text-white/[.92] max-mob:ml-0">
            Quero atendimento agora
          </span>
          <span aria-hidden="true" className={CHEVRON}>
            <ChevronRight size={18} />
          </span>
        </a>
      </div>
    </section>
  )
}
