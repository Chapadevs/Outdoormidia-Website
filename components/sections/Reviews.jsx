// PLACEHOLDER: depoimentos ilustrativos na voz das personas.
// Substituir por avaliações reais de clientes antes de publicar.
import SectionHeading from '@/components/ui/SectionHeading'

const REVIEWS = [
  {
    quote:
      'Nunca tinha anunciado fora das redes. Me explicaram tudo sem enrolação, escolheram o ponto certo pra minha região e ajustaram a arte. Em duas semanas o movimento na loja subiu.',
    name: 'Marcelo Antunes',
    role: 'Dono — Rede de Materiais de Construção',
    city: 'Campo Largo, PR',
  },
  {
    quote:
      'Precisava justificar o budget de OOH pra diretoria. Com os dados de CPM, frequência e perfil de público por painel, consegui mostrar o alcance real da campanha. Mídia mensurável muda a conversa.',
    name: 'Mariana Costa',
    role: 'Gerente de Marketing — Indústria de Alimentos',
    city: 'Curitiba, PR',
  },
  {
    quote:
      'Atendo várias contas e preciso de agilidade. A cobertura em PR e SC num só fornecedor, com rodízio entre pontos, resolveu o planejamento de duas praças ao mesmo tempo sem dor de cabeça.',
    name: 'Rafael Menezes',
    role: 'Planejamento de Mídia — Agência',
    city: 'Joinville, SC',
  },
  {
    quote:
      'Para a marca, exclusividade é inegociável. Saber que cada ponto é Face Única, sem dividir espaço com concorrente, e com impacto visual de verdade na cidade, foi o que fechou a decisão.',
    name: 'Fernanda Reis',
    role: 'Head de Marca — Varejo Premium',
    city: 'Balneário Camboriú, SC',
  },
]

export default function Reviews() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="depoimentos">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num="03" title="O que dizem" className="flex-1" />
          <span className="eyebrow self-end whitespace-nowrap max-mob:hidden">Arraste →</span>
        </div>
        <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
          De quem anuncia pela primeira vez a quem gerencia grandes marcas — a experiência de
          quem já colocou sua mensagem nas ruas do Sul do Brasil.
        </p>
      </div>
      <div className="wrap">
        <div className="-mx-8 flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-8 pb-6 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r) => (
            <figure
              className="ticks m-0 flex flex-[0_0_400px] snap-start flex-col gap-5 border border-line bg-white p-7 max-mob:flex-[0_0_82vw] max-mob:p-6"
              key={r.name}
            >
              <span className="display text-[52px] leading-[0.5] text-orange" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="m-0 text-[17px] leading-relaxed text-ink">{r.quote}</blockquote>
              <figcaption className="mt-auto border-t border-line pt-4">
                <div className="font-extrabold text-ink">{r.name}</div>
                <div className="text-[13.5px] text-ink-soft">{r.role}</div>
                <div className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-orange">
                  {r.city}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
