import { fileURLToPath } from 'node:url'

// Capas de blog e cases vêm do Firebase Storage. Em dev com emulador, as URLs
// apontam para o host local — ver lib/firebase/storage.js.
const remotePatterns = [{ protocol: 'https', hostname: 'firebasestorage.googleapis.com' }]

const emulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST
if (emulatorHost) {
  const [hostname, port] = emulatorHost.split(':')
  remotePatterns.push({ protocol: 'http', hostname, port })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
  },
  // Arquivos de /public/ saem com max-age=0 por padrão, o que impede o CDN do
  // App Hosting de guardá-los — o vídeo de 3,1 MB seria buscado no Cloud Run a
  // cada visitante novo. 7 dias em vez de `immutable` porque esses nomes não
  // têm hash: se o conteúdo mudar mantendo o nome, a versão velha some em uma
  // semana em vez de ficar presa por um ano.
  // Green e Projetos Icônicos saíram do catálogo e viraram projetos icônicos —
  // as URLs antigas já estão indexadas.
  // A área do anunciante mudou de /anunciante para /area-do-anunciante, o
  // diagnóstico passou para dentro dela e o Simulador OOH virou Sua marca no
  // OOH. As URLs antigas estão indexadas e no material impresso: seguem vivas
  // aqui.
  //
  // Mídia Kit (depois Guia do Anunciante, depois Melhores Práticas) saiu do
  // site. Os três nomes chegaram a ser publicados, então as três URLs caem no
  // hub da área do anunciante em vez de 404.
  async redirects() {
    return [
      {
        source: '/plataformas/green',
        destination: '/plataformas/projetos-iconicos/green',
        permanent: true,
      },
      {
        source: '/diagnostico',
        destination: '/area-do-anunciante/diagnostico-de-presenca',
        permanent: true,
      },
      {
        source: '/anunciante/midia-kit',
        destination: '/area-do-anunciante',
        permanent: true,
      },
      {
        source: '/area-do-anunciante/guia-do-anunciante',
        destination: '/area-do-anunciante',
        permanent: true,
      },
      {
        source: '/area-do-anunciante/melhores-praticas',
        destination: '/area-do-anunciante',
        permanent: true,
      },
      {
        source: '/anunciante/simulador',
        destination: '/area-do-anunciante/sua-marca-no-ooh',
        permanent: true,
      },
      {
        source: '/anunciante/faq',
        destination: '/area-do-anunciante/faq',
        permanent: true,
      },
      {
        source: '/anunciante',
        destination: '/area-do-anunciante',
        permanent: true,
      },
      {
        // O diferencial 02 passou a atender pelo nome oficial em 27/08/2026.
        source: '/solucoes/diferenciais/painel-hibrido',
        destination: '/solucoes/diferenciais/aeroporto-square',
        permanent: true,
      },
      {
        // O diferencial 03 passou a atender pelo nome que já usa na home e no
        // menu com o texto final de 02/09/2026.
        source: '/solucoes/diferenciais/audiencia-mensurada',
        destination: '/solucoes/diferenciais/inteligencia-e-audiencia',
        permanent: true,
      },
      {
        // Regiões passou a atender pelo slug do documento de copy de
        // 02/09/2026, o mesmo par que o menu e o breadcrumb já usavam.
        source: '/solucoes/regioes',
        destination: '/solucoes/regioes-cobertura',
        permanent: true,
      },
      {
        // Gentileza Urbana saiu do bloco de diferenciais em 02/09/2026, e a
        // carteira passou a viver inteira na Ambiental, com copy completa.
        source: '/solucoes/diferenciais/gentileza-urbana',
        destination: '/sobre/ambiental',
        permanent: true,
      },
      {
        // Operação e monitoramento saiu do bloco de diferenciais em 02/09/2026:
        // o que ele dizia já estava dito nos que ficaram.
        source: '/solucoes/diferenciais/operacao-propria',
        destination: '/solucoes/diferenciais',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }],
      },
    ]
  },
}

export default nextConfig
