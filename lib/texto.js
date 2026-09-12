// `**negrito**` é o único realce que a copy do site usa em corpo de texto — o
// resto é texto corrido, e uma dependência de markdown aqui custaria mais que
// estas três linhas.
export function comDestaque(texto) {
  return texto
    .split(/\*\*(.+?)\*\*/g)
    .map((parte, i) => (i % 2 ? <strong className="font-bold text-ink" key={i}>{parte}</strong> : parte))
}
