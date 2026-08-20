import { SITE_URL } from '@/lib/constants'

// Bloqueado para todo mundo: o painel e a API do CMS. O `noindex` das páginas
// de /admin continua valendo — os dois se somam, um impede o índice e o outro
// impede o rastreio.
const PRIVADO = ['/admin', '/admin/', '/api/']

// Rastreadores dos motores generativos, liberados de propósito e nominalmente.
// Vários deles ignoram herança de `User-agent: *` quando aparecem citados em
// outras regras, então cada um ganha o seu próprio bloco.
//
//  - GPTBot         → treino do ChatGPT
//  - OAI-SearchBot  → índice do ChatGPT Search
//  - ChatGPT-User   → busca ao vivo, disparada por um usuário no chat
//  - ClaudeBot      → treino do Claude
//  - Claude-SearchBot / Claude-User → busca do Claude
//  - PerplexityBot / Perplexity-User → índice e busca ao vivo da Perplexity
//  - Google-Extended → permite o site nas respostas do Gemini / AI Overviews
//    (é um controle de uso em IA, não de indexação — o Googlebot é à parte)
const IA = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
  'DuckAssistBot',
]

const BUSCA = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Applebot']

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVADO },
      { userAgent: BUSCA, allow: '/', disallow: PRIVADO },
      { userAgent: IA, allow: '/', disallow: PRIVADO },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
