import { fileURLToPath } from 'node:url'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.js')

// Capas de blog e cases vêm do Firebase Storage. Em dev com emulador, as URLs
// apontam para o host local — ver lib/firebase/storage.js.
const remotePatterns = [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }]

const emulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST
if (emulatorHost) {
  const [hostname, port] = emulatorHost.split(':')
  remotePatterns.push({ protocol: 'http', hostname, port })
}

// Rotas que mudaram de endereço e cujas URLs antigas seguem indexadas ou em
// material impresso.
//
// Cada entrada gera dois redirects: o da URL sem prefixo (português, que é o
// que está indexado) e o da versão com prefixo de idioma. Os redirects rodam
// antes do proxy, sobre a URL crua, então sem o segundo par `/en/diagnostico`
// cairia em 404 em vez de seguir para a página nova.
const LEGADO = [
  // Green e Projetos Icônicos saíram do catálogo e viraram projetos icônicos —
  // as URLs antigas já estão indexadas.
  { de: '/plataformas/green', para: '/plataformas/projetos-iconicos/green' },

  // A área do anunciante mudou de /anunciante para /area-do-anunciante, o
  // diagnóstico passou para dentro dela e o Simulador OOH virou Sua marca no
  // OOH. As URLs antigas estão indexadas e no material impresso: seguem vivas
  // aqui.
  { de: '/diagnostico', para: '/area-do-anunciante/diagnostico-de-presenca' },
  { de: '/anunciante/simulador', para: '/area-do-anunciante/sua-marca-no-ooh' },
  { de: '/anunciante/faq', para: '/area-do-anunciante/faq' },
  { de: '/anunciante', para: '/area-do-anunciante' },

  // Mídia Kit e Guia do Anunciante foram os dois nomes anteriores da página de
  // Melhores Práticas, e os dois chegaram a ser publicados: as URLs antigas
  // caem na página atual. O nome Mídia Kit não aparece em lugar nenhum do
  // site, e o material segue sob demanda do comercial, nunca como download.
  { de: '/anunciante/midia-kit', para: '/area-do-anunciante/melhores-praticas' },
  { de: '/area-do-anunciante/guia-do-anunciante', para: '/area-do-anunciante/melhores-praticas' },

  // O diferencial 02 passou a atender pelo nome oficial em 27/08/2026.
  { de: '/solucoes/diferenciais/painel-hibrido', para: '/solucoes/diferenciais/aeroporto-square' },

  // O diferencial 03 passou a atender pelo nome que já usa na home e no menu
  // com o texto final de 02/09/2026.
  {
    de: '/solucoes/diferenciais/audiencia-mensurada',
    para: '/solucoes/diferenciais/inteligencia-e-audiencia',
  },

  // Regiões passou a atender pelo slug do documento de copy de 02/09/2026, o
  // mesmo par que o menu e o breadcrumb já usavam.
  { de: '/solucoes/regioes', para: '/solucoes/regioes-cobertura' },

  // Gentileza Urbana saiu do bloco de diferenciais em 02/09/2026, e a carteira
  // passou a viver inteira na Ambiental, com copy completa.
  { de: '/solucoes/diferenciais/gentileza-urbana', para: '/sobre/ambiental' },

  // Operação e monitoramento saiu do bloco de diferenciais em 02/09/2026:
  // o que ele dizia já estava dito nos que ficaram.
  { de: '/solucoes/diferenciais/operacao-propria', para: '/solucoes/diferenciais' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return LEGADO.flatMap(({ de, para }) => [
      { source: de, destination: para, permanent: true },
      { source: `/:locale(en|es|zh)${de}`, destination: `/:locale${para}`, permanent: true },
    ])
  },
  // Arquivos de /public/ saem com max-age=0 por padrão, o que impede o CDN do
  // App Hosting de guardá-los — o vídeo de 3,1 MB seria buscado no Cloud Run a
  // cada visitante novo. 7 dias em vez de `immutable` porque esses nomes não
  // têm hash: se o conteúdo mudar mantendo o nome, a versão velha some em uma
  // semana em vez de ficar presa por um ano.
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
