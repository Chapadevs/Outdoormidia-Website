// Cápsula de seleção, com Radial Reveal e estado marcado. Nasceu como o chip de
// região do MapaCobertura e passou a ser o seletor de plataforma de Sua marca no
// OOH: os dois leem a mesma lista de plataformas do site em lugares diferentes, e
// o desenho não pode divergir.
//
// `escura` inverte o par de cores do estado ativo (fundo `--ink`, círculo
// laranja) para os chips que ficam sobre a faixa laranja do mapa.
export default function Chip({ ativo, children, escura = false, onClick }) {
  return (
    <button
      aria-pressed={ativo}
      className={`radial-reveal rounded-full border px-[17px] py-[9px] text-[13px] font-semibold whitespace-nowrap transition-colors ${
        ativo
          ? escura
            ? 'border-ink bg-ink text-white [--rr-fill:var(--color-orange)]'
            : 'border-orange bg-orange text-white [--rr-fill:var(--color-ink)]'
          : 'border-line text-ink [--rr-fill:var(--color-orange)] hover:text-white'
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
