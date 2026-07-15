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

export default function FormatSpecCard({ formats }) {
  return (
    <div className="grid grid-cols-4 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-4">
      {formats.map((f) => (
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
  )
}
