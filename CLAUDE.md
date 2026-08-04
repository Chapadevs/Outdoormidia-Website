# Outdoormídia — Website

## Visão do Projeto

Refatoração do site da Outdoormídia (líder em OOH no Sul do Brasil, 66 anos de mercado). Objetivo: transformar de site institucional para **plataforma comercial de mídia Out of Home**, posicionada no nível de referências internacionais como OUTFRONT e Ocean Outdoor.

O site deve ser **simples, porém 100% bem executado** — rápido, acessível e que transmita credibilidade tanto para o pequeno empresário quanto para gestores de marketing de grandes empresas e agências.

Site atual (a ser substituído): https://outdoormidia.com.br

---

## Stack Técnica

### Atual
- **Next.js 16** (App Router, Turbopack) + **React 19** — JavaScript puro (sem TypeScript)
- **Tailwind CSS v4** — tokens da marca no `@theme` de `app/globals.css`; estilos via classes utilitárias no JSX. Primitivos do design system (`.wrap`, `.display`, `.eyebrow`, `.btn*`, `.ticks`, `.reveal`, `.select-caret`) em `@layer components`
- **Fontes:** Anton + Archivo via `next/font/google` (vars `--font-anton` / `--font-archivo`, expostas como `font-display` / `font-sans`)
- **Firebase** — Firestore (conteúdo), Auth (sessão do admin), Storage (capas). Acesso server-side via `firebase-admin` em `lib/firebase/admin.js`
- **CMS próprio** — painel em `app/admin/`, protegido por cookie de sessão + claim `admin`. Não usamos CMS headless de terceiros
- **Deploy:** Firebase App Hosting (Cloud Run) — ver [`DEPLOY.md`](DEPLOY.md)
- **Dev:** `npm run dev` → porta 3000. Emuladores Firebase via `npm run emulators` (Docker)
- **Build:** `npm run build` → `.next`
- **Testes:** não há suíte de testes no repositório. Validação é manual — `npm run lint`, `npm run build` e conferência no browser

### Ainda não implementado
- **next-intl** — os botões PT/EN/ES/中文 do `Header` hoje só trocam um `useState`; não há tradução por trás
- **Resend** — envio de e-mails transacionais (formulários hoje só gravam/redirecionam)
- **Validação com schema** — a validação é manual, em `lib/*/validate.js`. Sem Zod/React Hook Form
- **Sitemap e robots.txt** — não existem no repositório

---

## Design System

### Paleta (tokens Tailwind no `@theme` de `app/globals.css`)

```css
--color-paper:    #F6F2EC   /* fundo principal — bege quente */
--color-bone:     #ECE5D9   /* fundo secundário */
--color-ink:      #16110D   /* texto principal */
--color-ink-soft: #4A3F35   /* texto secundário */
--color-orange:   #FF4D00   /* cor primária da marca */
--color-orange-2: #FF7A33   /* laranja claro */
--color-line:     rgba(22,17,13,.16)
--color-line-2:   rgba(22,17,13,.30)
```

Usar como utilitários: `bg-paper`, `text-ink`, `text-ink-soft`, `border-line`, `bg-orange`, etc.

**Proibido:** usar `#000` ou `black` — usar `--ink`. Cor preta não faz parte da identidade.

### Tipografia

| Classe/uso | Fonte | Peso | Observação |
|---|---|---|---|
| `.display` | Anton | 400 | Uppercase, branco, `line-height:.86` |
| `.eyebrow` | Archivo | 700 | 12px, uppercase, `letter-spacing:.22em` |
| Corpo | Archivo | 400–900 | 17px base |

### Primitivos do design system (`@layer components` em `app/globals.css`)

- **`.btn`** — botão outline em cápsula (`rounded-full`, borda branca, fundo transparente)
- **`.btn-fill`** — botão laranja sólido
- **`.btn-on-orange`** — botão branco sobre fundo laranja
- **`.ticks`** — cantoneiras laranja via `::before/::after`, com o canto interno curvo (motivo de identidade visual); cor sobrescrevível com `[--tick-color:#fff]`
- **`.reveal`** — elemento com animação de entrada (adiciona `.in` via IntersectionObserver global)
- **`.wrap`** — container centralizado com `max-width: 1280px` e `padding: 0 32px`
- **`.select-caret`** — seta de `<select>` estilizado
- **`SectionHeading`** (`components/ui/SectionHeading.jsx`) — cabeçalho de seção (número laranja + h2 + linha)

Padding de seção: `py-[110px] max-mob:py-[72px]` direto no JSX. Todo o restante do estilo é utilitário Tailwind no componente.

### Regras Visuais

- Bordas arredondadas em toda a interface — nada de cantos quadrados/pontudos:
  - `rounded-[16px]` em cards, painéis, imagens, vídeo e tabelas
  - `rounded-[10px]` em inputs, selects, textareas e elementos pequenos (código inline, pins do mapa)
  - `rounded-full` (cápsula/círculo) em botões (`.btn`), badges, tags e chips de filtro
- Fundo padrão: `--paper`, não branco puro
- Elementos icônicos: cantoneiras laranja (`.ticks`) nos cards e CTAs, com o canto interno também curvo

---

## Estrutura de Arquivos (atual)

Visão por área — 41 componentes, 34 rotas/handlers, 21 módulos em `lib/`. Não é uma
lista exaustiva; use `git ls-files` para o inventário completo.

```
app/
  layout.js               — fontes, metadata (metadataBase), WhatsAppButton + RevealObserver
  page.js                 — home (revalidate 3600)
  globals.css             — Tailwind (@theme com tokens + @layer components com primitivos)
  blog/                   — listagem (ISR 300) + [slug] do artigo
  cases/                  — listagem com filtro por tag (ISR 300)
  plataformas/            — índice + [slug] de cada uma das 8 plataformas
  diagnostico/            — quiz de diagnóstico de marca
  proposta/               — briefing
  trabalhe-conosco/       — banco de talentos
  admin/(dashboard)/      — CMS: posts, cases, locations, tags. Protegido por proxy.js
  api/admin/              — CRUD do CMS (guardado por lib/api/adminGuard.js)
  api/auth/session/       — cria/valida/apaga o cookie de sessão do admin
components/
  layout/                 — Header (nav sticky), Footer
  sections/               — Hero, Ticker, Platforms, Cases, Impact, Reviews,
                            Coverage, Faq, Culture, LeadCta, PlatformFaq
  blog/ cases/            — cards, explorers com filtro, markdown, share
  forms/                  — 10 formulários (públicos + editores do admin)
  ui/                     — Logo, SectionHeading, Breadcrumb, TagFilter,
                            FormatSpecCard, CoverageMap (SVG de PR+SC, dados IBGE)
  widgets/                — WhatsAppButton, RevealObserver, botões de deletar/logout
lib/
  constants.js            — WHATSAPP_URL, SITE_URL
  revalidate.js           — invalidação de ISR após mutação no admin
  firebase/               — admin (server), client, session, storage
  blog/ cases/ tags/      — leitura, escrita e validação de cada coleção
  platforms.js            — as 8 plataformas (dados estáticos, não vem do Firestore)
  locations.js            — praças; mapShapes/mapProjection alimentam o CoverageMap
public/media/             — hero-video-opt.mp4, hero-poster.webp, hero-billboard.webp,
                            outdoor-cutout.webp
scripts/                  — seed-admin, migrate-tags-scope, generate-map-paths
```

---

## Responsividade

| Breakpoint | Layout |
|---|---|
| `> 980px` | Desktop — grids cheios, nav completa |
| `≤ 980px` | Tablet — grids 2 colunas, nav com hamburger |
| `≤ 560px` | Mobile — grid 1 coluna, padding reduzido |
| `≤ 380px` | Mobile pequeno — impact grid 1 coluna |

Padrão: **desktop-first** — base para desktop, overrides com as variants Tailwind `max-tab:` (≤980px), `max-mob:` (≤560px) e `max-xs:` (≤380px), definidas como breakpoints no `@theme`.

---

## Features e Status

> Ao concluir uma feature, atualize esta tabela **na mesma alteração**. Ela é a
> primeira coisa que uma sessão de IA lê para saber o que já existe.

### Concluído

| Feature | Onde |
|---|---|
| Layout base / identidade visual / responsividade | `app/globals.css`, componentes |
| Hero com vídeo (carrega após o load, com poster) | `components/sections/Hero.jsx` |
| Seções da home | `components/sections/` |
| WhatsApp flutuante | `components/widgets/WhatsAppButton.jsx` |
| ProposalForm (briefing) | `app/proposta/` |
| Plataformas — índice + página das 8 | `app/plataformas/`, `lib/platforms.js` |
| Cases com filtro por tag | `app/cases/`, `lib/cases/` |
| Blog com CMS próprio | `app/blog/`, `app/admin/`, `lib/blog/` |
| FAQ | `components/sections/Faq.jsx`, `PlatformFaq.jsx` |
| Avaliações de clientes | `components/sections/Reviews.jsx` |
| Banco de talentos | `app/trabalhe-conosco/`, `components/forms/TalentForm.jsx` |
| Diagnóstico de marca (quiz) | `app/diagnostico/`, `lib/diagnostico.js` |
| Mapa de praças (SVG, dados IBGE) | `components/ui/CoverageMap.jsx`, `lib/mapShapes.js` |
| Painel admin (posts, cases, locations, tags) | `app/admin/`, `app/api/admin/` |
| Breadcrumb em todas as páginas | `components/ui/Breadcrumb.jsx` |
| Cache: ISR nas rotas de conteúdo + headers em `/media/` | `next.config.mjs`, `lib/revalidate.js` |

### Pendente

| Feature | Observação |
|---|---|
| `sitemap.xml` e `robots.txt` | Não existem. Metadata e `metadataBase` já estão prontos |
| WhatsApp com pré-perguntas qualificadoras | Hoje o botão vai direto para o `wa.me` |
| Idiomas (PT / EN / ES / ZH) | Os botões do `Header` só trocam `useState` — não há i18n |
| Envio de e-mail nos formulários | Falta integrar Resend |
| Simulador de campanha | — |
| Área de downloads | — |
| Automação de marketing | — |
| Testes automatizados | Nenhum. Regressão só aparece em conferência manual |

---

## Conteúdo — Empresa

### Dados Fundamentais

- **Fundação:** 1959
- **Mercado:** Out of Home (OOH) — mídia exterior
- **Cobertura:** PR + SC (Sul do Brasil)
- **Números:** 380 milhões de impactos/mês, 82 equipamentos digitais, 138 telas
- **WhatsApp comercial:** `https://wa.me/5541998350210`

### Produtos (8 plataformas)

1. **Frontlight** — outdoor 18m² (6×3m horizontal / 3,5×5m vertical), maior volume
2. **Rodovias** — 100 ativos, 12×4m e passarelas 10×3m
3. **Aeroporto** — operação privada (sem licitação), empena digital 6×18m (maior do Sul)
4. **Outdoor Digital / LED** — 82 equipamentos, sem produção de lona
5. **Icônico** — Superposters, Jardins verticais, Praças Pets, Híbridos, Batel Square 3D
6. **Malls** — Mueller, São José, Park Shopping Boulevard (100% digital, totens e painéis)
7. **MUB** — 77 locais, 6 circuitos segmentados, 13M impactos/mês
8. **Mídia Móvel** — ativações em praias, parques, calçadões (onde OOH fixo não chega)

### Praças

- Curitiba
- Região Metropolitana: Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande
- Litoral PR
- Rodovias PR / SC
- SC: Joinville, Itajaí, Balneário Camboriú

### Diferenciais para Copy

- **Face Única** — cada ponto exclusivo para um anunciante (sem compartilhar espaço com concorrentes)
- **Tecnologia 4yousee/Everywhere** — CPM, frequência, gênero, faixa etária, renda por campanha
- **Câmeras ao vivo 24×7** em todos os pontos digitais
- **Circuitos MUB** segmentados: Full, Saúde, Educação, Shoppings, Alto Padrão, Super & Hiper
- Maior roteiro de MUB digitalizado em uma única cidade no Brasil

---

## Personas (resumo para decisões de copy e UX)

| Persona | Quem é | O que quer | Tom de comunicação |
|---|---|---|---|
| **Marcelo** | Dono de MPE, sem marketing | Clareza, preço, orientação rápida | Simples, visual, sem jargão |
| **Mariana** | Gestora de marketing | Dados, ROI, justificativa de budget | Estratégico, baseado em dados |
| **Rafael** | Planejador de agência | Agilidade, ativos, cobertura | Objetivo, profissional |
| **Fernanda** | Guardiã da marca | Exclusividade, impacto visual, contexto | Aspiracional, sofisticado |
| **Lucas** | Profissional de digital | Métricas, tecnologia, mensuração | Provocativo, educativo |
| **Patrícia** | Gestora de marketing regional | Cobertura local, segmentação | Prático, estratégico |

**Hierarquia:** Marcelo é a persona primária de aquisição. Mariana e Rafael são primárias de autoridade.

---

## SEO

- Idioma principal: `pt-BR`
- Title padrão: `Outdoormídia — Out of Home no Sul do Brasil`
- Description: empresa líder em mídia exterior no Paraná e Santa Catarina
- Keywords-chave: outdoor Curitiba, painel LED OOH, mídia exterior PR, frontlight, MUB, aeroporto Afonso Pena
- Todo conteúdo textual deve estar no HTML estático (não gerado apenas via JS) — razão da migração para Next.js

---

## WhatsApp — Pré-qualificação de Leads

Antes de redirecionar ao WhatsApp, o usuário responde:
1. É sua primeira campanha em OOH ou já anunciou antes?
2. CNPJ da empresa (se possuir)
3. Cidade onde quer aparecer
4. E-mail de contato
5. WhatsApp para retorno

Implementar como modal ou página de mini-formulário antes do redirect.

---

## Git Workflow

- Branch principal de integração: `dev`
- Todo trabalho novo deve ser feito em **feature branches** criadas a partir de `dev` (ex: `feature/mapa-pracas`)
- Merge/PR sempre em direção a `dev` — nunca diretamente em `main`
- `main` recebe apenas merges de `dev` quando a versão está pronta para produção

---

## Deploy

Produção roda em **Firebase App Hosting** (Cloud Run), projeto `outdoormidia-ecf88` — nunca Vercel. Push na `main` dispara build + rollout automático do app Next.js; um GitHub Action publica as rules/indexes. Detalhes completos, setup e passos manuais de GCP em [`DEPLOY.md`](DEPLOY.md).

---

## Convenções de Código

- Componentes: `PascalCase.jsx`
- Estilo: utilitários Tailwind no JSX; classes custom só para primitivos do design system em `@layer components` (`kebab-case`)
- Constantes globais: `lib/constants.js` (exportações nomeadas)
- Sem TypeScript por ora — JavaScript puro
- Sem bibliotecas de UI externas (Tailwind CSS é a única camada de estilo)
- Sem comentários desnecessários — código deve ser autoexplicativo
- Texto de usuário sempre em PT-BR (suporte a i18n vem na Fase 3)
- Imagens em `/public/` — referenciadas por caminho absoluto (`/cases/case1.jpg`)

---

## Benchmarks de Referência

- https://www.outfront.com — referência principal (layout, cases, hero com vídeo)
- https://oceanoutdoor.com — referência de qualidade visual
- https://obm.com — referência de praças e cobertura regional
- https://clearchanneloutdoor.com — referência de dados e audiência
- https://eletromidia.com.br — referência nacional

## Navegação

- Toda a pagina deve conter o caminho seguido incluindo caminhos anteriores, exemplo: Home/Trabalhe-Conosco, Home/Blog. Isto deve ser incluido no topo das páginas