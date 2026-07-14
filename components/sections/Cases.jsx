import SectionHeading from '@/components/ui/SectionHeading'

const CASES = [
  {
    tag: 'Varejo',
    title: 'O lançamento que dominou Curitiba',
    meta: 'Front Light + Digital · 4 semanas',
    img: '/cases/case1.jpg',
  },
  {
    tag: 'Entretenimento',
    title: 'Alta frequência em outdoor digital',
    meta: 'Outdoor Digital · 30 telas',
    img: '/cases/case2.jpg',
  },
  {
    tag: 'Indústria',
    title: 'Cobertura completa nas rodovias',
    meta: 'Rodovias · PR + SC',
    img: '/cases/case3.jpg',
  },
  {
    tag: 'Lançamento',
    title: 'Projeto icônico no coração da cidade',
    meta: 'Icônico · Monumental',
    img: '/cases/case4.jpg',
  },
]

export default function Cases() {
  return (
    <section className="pb-[110px] max-mob:pb-[72px]" id="cases">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num="03" title="Cases" className="flex-1" />
          <span className="eyebrow self-end whitespace-nowrap max-mob:hidden">Arraste →</span>
        </div>
      </div>
      <div className="wrap">
        <div className="-mx-8 flex snap-x snap-mandatory gap-[18px] overflow-x-auto px-8 pb-6 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CASES.map((c) => (
            <div
              className="relative flex aspect-[3/4] flex-[0_0_360px] snap-start flex-col justify-between overflow-hidden bg-cover bg-center p-6 text-white after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(22,17,13,.42),transparent_60%)] after:content-[''] max-mob:flex-[0_0_78vw]"
              key={c.title}
              style={{ backgroundImage: `url(${c.img})` }}
            >
              <span className="relative z-[2] self-start rounded-[2px] bg-white/18 px-[11px] py-[7px] text-[11px] font-bold uppercase tracking-[0.16em]">
                {c.tag}
              </span>
              <div className="relative z-[2]">
                <h3 className="m-0 text-[25px] font-extrabold leading-[1.05]">{c.title}</h3>
                <div className="mt-2 text-xs font-semibold tracking-[0.05em] opacity-80">
                  {c.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
