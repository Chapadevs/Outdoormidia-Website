export default function SectionHeading({ num, title, rule = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <span className="font-display text-[15px] text-orange">{num}</span>
      <h2 className="m-0 text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em]">
        {title}
      </h2>
      {rule && <span className="h-px flex-1 bg-line"></span>}
    </div>
  )
}
