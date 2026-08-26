// Lista de praças em cápsulas. Nasceu na seção Presença de /sobre e passou a
// ser o mesmo componente da seção Cobertura da home — as duas listas divergem
// (a home inclui Rodovias PR-SC), o desenho não.
export default function PracaChips({ pracas, className = '' }) {
  return (
    <ul className={`m-0 flex flex-wrap gap-2 p-0 ${className}`}>
      {pracas.map((praca) => (
        <li
          className="rounded-full border border-line px-4 py-1.5 text-[13.5px] font-bold text-ink-soft"
          key={praca}
        >
          {praca}
        </li>
      ))}
    </ul>
  )
}
