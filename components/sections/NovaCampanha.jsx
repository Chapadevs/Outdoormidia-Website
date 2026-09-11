import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChevronRight, Target } from 'lucide-react'
import QualifierForm from '@/components/forms/QualifierForm'
import { WA_ATENDIMENTO_AGORA, waLink } from '@/lib/whatsapp'

// As portas do bloco "Nova campanha", na hierarquia fechada no checklist
// da home (claude/checklist-home.md, item 10).
//
// A ordem é de estratégia, o tamanho é de conversão: o Diagnóstico abre a seção
// como faixa fina justamente para não roubar o clique do formulário, que é o
// card dominante. O Atendimento rápido fecha a seção na mesma faixa fina, com a
// mesma anatomia.
//
// A porta de Mídia Programática, que apontava para o chat da MercadoOOH, saiu do
// bloco em 10/09/2026 a pedido do cliente. Com ela saiu a exceção de paleta que
// o checklist abria aqui: o preto não aparece mais nesta seção. A página
// continua com entrada pelo menu, pelo rodapé e pela faixa escura da Área do
// anunciante.
//
// Ícones no mapa da Imagine Concept (claude/icones-nova-campanha.md). O ícone
// do Diagnóstico herda o branco do texto em vez do laranja da regra, porque
// laranja sobre laranja some. O balão verde do WhatsApp é a exceção que o
// próprio checklist abre à monocromia laranja.
//
// Anatomia de cada porta, na ordem do checklist: ícone em quadrado claro
// arredondado, nome em destaque, linha de intenção abaixo e chevron
// circular à direita. O chevron é a seta da linha de intenção promovida a
// elemento — por isso ela não termina mais em "→", que ficaria duplicado.

const FAIXA =
  'group flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1.5 rounded-full border px-5 py-2.5 transition-colors duration-200 max-mob:rounded-[16px] max-mob:px-4'

// Quadrado claro do ícone e chevron: o mesmo desenho nas portas todas.
const ICONE_QUADRADO = 'grid shrink-0 place-items-center rounded-[10px] bg-white/15'

// O balão de WhatsApp é asset de marca, não glifo branco do lucide: o quadrado
// dele é branco sólido. Sem ele o verde apaga contra o laranja da seção.
const ICONE_QUADRADO_MARCA = 'grid shrink-0 place-items-center rounded-[10px] bg-white'

const CHEVRON = 'grid size-9 shrink-0 place-items-center rounded-full border border-white/35 transition-colors duration-200 group-hover:border-white'

// `contexto` identifica de onde o lead saiu quando o bloco está montado numa
// página de plataforma ou de linha icônica. Repassado ao qualificador, entra no
// lead junto com a página de origem.
export default async function NovaCampanha({ contexto = '' }) {
  const t = await getTranslations('NovaCampanha')

  return (
    <section className="relative scroll-mt-24 bg-orange text-white" id="nova-campanha">
      <div className="wrap py-[90px] max-tab:py-[60px] max-mob:py-[52px]">
        {/* O kicker dá identidade ao bloco: sem ele a caixa laranja abre direto
            no título e o visitante não sabe que aquilo é o formulário principal
            do site. É também o que permite referenciar a seção por âncora
            (`#nova-campanha`) a partir de qualquer página. */}
        <div className="reveal">
          <div className="eyebrow text-white/70">{t('kicker')}</div>
          <h2 className="m-0 mt-3.5 font-display text-[clamp(36px,6vw,76px)] font-normal uppercase leading-[0.9]">
            {t('tituloA')}
            <br />
            {t('tituloB')}
          </h2>
          <p className="mt-5 max-w-[46ch] text-white/[.92]">
            {t('lead')}
          </p>
        </div>

        <Link
          className={`reveal ${FAIXA} mt-11 border-white/35 bg-white/10 hover:border-white hover:bg-white/[.18]`}
          href="/area-do-anunciante/diagnostico-de-presenca"
        >
          <span className={`${ICONE_QUADRADO} size-9`}>
            <Target size={20} />
          </span>
          <span className="text-[17px] font-extrabold leading-tight">
            {t('diagnosticoNome')}
          </span>
          <span className="ml-auto text-[14.5px] text-white/[.92] max-mob:ml-0">
            {t('diagnosticoIntencao')}
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
          className={`reveal ${FAIXA} mt-5 border-white/35 bg-white/10 hover:border-white hover:bg-white/[.18]`}
          href={waLink(WA_ATENDIMENTO_AGORA)}
        >
          <span className={`${ICONE_QUADRADO_MARCA} size-9`}>
            <Image
              alt=""
              className="size-6"
              height={24}
              src="/media/icone-whatsapp-verde.png"
              width={24}
            />
          </span>
          <span className="text-[17px] font-extrabold leading-tight">
            {t('atendimentoNome')}
          </span>
          <span className="ml-auto text-[14.5px] text-white/[.92] max-mob:ml-0">
            {t('atendimentoIntencao')}
          </span>
          <span aria-hidden="true" className={CHEVRON}>
            <ChevronRight size={18} />
          </span>
        </a>
      </div>
    </section>
  )
}
