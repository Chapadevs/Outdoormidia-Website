import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <Logo />
            <p style={{ marginTop: 18, maxWidth: '32ch' }}>
              Out of Home no Sul do Brasil há 66 anos. Sua marca onde as pessoas estão.
            </p>
          </div>
          <div className="foot-col">
            <h4>Plataformas</h4>
            <a href="#">Outdoor Digital</a>
            <a href="#">Front Light</a>
            <a href="#">Rodovias</a>
            <a href="#">Aeroporto</a>
            <a href="#">Malls</a>
          </div>
          <div className="foot-col">
            <h4>Empresa</h4>
            <a href="#">A Outdoormídia</a>
            <a href="#">Responsabilidade Social</a>
            <a href="#">Blog</a>
            <a href="#">Trabalhe Conosco</a>
          </div>
          <div className="foot-col">
            <h4>Contato</h4>
            <p>+55 41 3207.6400</p>
            <a href="mailto:contato@outdoormidia.com.br">contato@outdoormidia.com.br</a>
            <a href="https://www.instagram.com/outdoormidia/">Instagram</a>
            <a href="https://br.linkedin.com/company/outdoormidia">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Outdoormídia</span>
          <span>PT · EN · ES · 中文</span>
        </div>
      </div>
    </footer>
  )
}
