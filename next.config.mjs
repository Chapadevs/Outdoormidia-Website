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
  // diagnóstico passou para dentro dela e dois itens foram renomeados (Mídia
  // Kit virou Melhores Práticas, Simulador OOH virou Sua marca no OOH). As
  // URLs antigas estão indexadas e no material impresso: seguem vivas aqui.
  //
  // Guia do Anunciante foi um nome intermediário do Mídia Kit, no ar entre a
  // renomeação da área e o checklist de 26/08. Como chegou a ser publicado,
  // ganha redirect próprio.
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
        destination: '/area-do-anunciante/melhores-praticas',
        permanent: true,
      },
      {
        source: '/area-do-anunciante/guia-do-anunciante',
        destination: '/area-do-anunciante/melhores-praticas',
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
