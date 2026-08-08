import Logo from '@/components/ui/Logo'

// Barra clara usada fora do site institucional — briefing, login e painel.
// Mesma altura e alinhamento do Header laranja; só o conteúdo à direita muda.
export default function HeaderShell({ children }) {
  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-paper/85 backdrop-blur-[10px]">
      <div className="wrap flex h-[74px] items-center gap-[30px] max-lap:gap-4 max-mob:h-16">
        <Logo className="bg-ink" />
        {children}
      </div>
    </header>
  )
}
