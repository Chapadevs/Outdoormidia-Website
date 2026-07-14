import SectionHeading from '@/components/ui/SectionHeading'

const FORMATS = [
  {
    aspect: '3/1',
    top: '12 m',
    side: '4 m',
    label: 'Front Light',
    title: 'Front Light',
    text: 'Grande formato iluminado nos principais corredores das cidades.',
  },
  {
    aspect: '10/3',
    top: '10 m',
    side: '3 m',
    label: 'Passarela',
    title: 'Rodovias',
    text: '100 ativos em vias estratégicas, com flexibilidade de rodízio.',
  },
  {
    aspect: '16/9',
    top: 'LED',
    side: 'HD',
    label: 'Digital',
    title: 'Outdoor Digital',
    text: 'Telas de LED com troca dinâmica de criativos em alta circulação.',
  },
  {
    aspect: '1/1.4',
    top: 'vert.',
    side: 'full',
    label: 'Icônico',
    title: 'Projetos Icônicos',
    text: 'Mídias monumentais que viram referência na paisagem urbana.',
  },
]

function DimTop({ children }) {
  return (
    <span className="absolute inset-x-0 -top-4 h-0.5 bg-ink-soft">
      <span className="absolute -top-1 left-0 h-2.5 w-0.5 bg-ink-soft"></span>
      <span className="absolute -top-1 right-0 h-2.5 w-0.5 bg-ink-soft"></span>
      <em className="absolute -top-[22px] left-1/2 -translate-x-1/2 bg-white px-1.5 text-[11px] font-bold not-italic text-ink-soft">
        {children}
      </em>
    </span>
  )
}

function DimSide({ children }) {
  return (
    <span className="absolute -right-4 inset-y-0 w-0.5 bg-ink-soft">
      <span className="absolute -left-1 top-0 h-0.5 w-2.5 bg-ink-soft"></span>
      <span className="absolute -left-1 bottom-0 h-0.5 w-2.5 bg-ink-soft"></span>
      <em className="absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 bg-white px-1.5 text-[11px] font-bold not-italic text-ink-soft">
        {children}
      </em>
    </span>
  )
}

export default function Formats() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="formatos">
      <div className="wrap">
        <SectionHeading num="01" title="Formatos padronizados" className="reveal mb-[34px]" />
        <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
          Padrões pensados para simplificar a produção, permitir o rodízio entre pontos e otimizar
          o aproveitamento da sua mídia.
        </p>
        <div className="grid grid-cols-4 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
          {FORMATS.map((f) => (
            <div
              className="reveal flex flex-col gap-[18px] border border-line bg-white p-6 max-mob:p-5"
              key={f.title}
            >
              <div
                className="relative mb-[26px] mr-3.5 mt-[18px] w-[78%] self-start border-[1.5px] border-ink bg-bone"
                style={{ aspectRatio: f.aspect }}
              >
                <DimTop>{f.top}</DimTop>
                <DimSide>{f.side}</DimSide>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                  {f.label}
                </span>
              </div>
              <h3 className="m-0 text-[19px] font-extrabold">{f.title}</h3>
              <p className="m-0 text-[13.5px] text-ink-soft">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
