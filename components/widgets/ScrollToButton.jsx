'use client'

/* âncora que continua funcionando no 2º clique — com href puro, depois que a
   URL já está em #alvo o browser não dispara navegação nenhuma e a página fica
   parada. Por isso o scroll é feito na mão e o hash não entra no histórico. */
export default function ScrollToButton({ targetId, className, children }) {
  function scrollToTarget(event) {
    const alvo = document.getElementById(targetId)
    if (!alvo) return
    event.preventDefault()
    alvo.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a className={className} href={`#${targetId}`} onClick={scrollToTarget}>
      {children}
    </a>
  )
}
