import SectionHeading from '@/components/ui/SectionHeading'
import QualifierForm from '@/components/forms/QualifierForm'

export default function Qualifier() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="formulario">
      <div className="wrap">
        <SectionHeading num="07" title="Sua campanha" className="reveal mb-[34px]" />
        <p className="reveal mx-auto mb-10 max-w-[820px] text-lg text-ink-soft">
          Quatro perguntas. As três primeiras são sobre a campanha — seus dados ficam para o
          final.
        </p>
        <QualifierForm />
      </div>
    </section>
  )
}
