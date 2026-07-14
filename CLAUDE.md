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
- **Dev:** `npm run dev` → porta 3000
- **Build:** `npm run build` → `.next`

### Planejada (ver roadmap de migração)
- **Sanity** — CMS headless para Blog, Cases, Produtos, Avaliações
- **next-intl** — internacionalização (PT / EN / ES / ZH)
- **React Hook Form + Zod** — formulários com validação
- **Resend** — envio de e-mails transacionais
- **MapLibre GL JS** — mapa interativo de praças (tiles via Google Cloud Maps Platform)
- **Vercel** — deploy e infraestrutura

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

- **`.btn`** — botão outline (borda branca, fundo transparente)
- **`.btn-fill`** — botão laranja sólido
- **`.btn-on-orange`** — botão branco sobre fundo laranja
- **`.ticks`** — cantoneiras laranja via `::before/::after` (motivo de identidade visual); cor sobrescrevível com `[--tick-color:#fff]`
- **`.reveal`** — elemento com animação de entrada (adiciona `.in` via IntersectionObserver global)
- **`.wrap`** — container centralizado com `max-width: 1280px` e `padding: 0 32px`
- **`.select-caret`** — seta de `<select>` estilizado
- **`SectionHeading`** (`components/ui/SectionHeading.jsx`) — cabeçalho de seção (número laranja + h2 + linha)

Padding de seção: `py-[110px] max-mob:py-[72px]` direto no JSX. Todo o restante do estilo é utilitário Tailwind no componente.

### Regras Visuais

- Bordas: `border-radius: 2px` em cards e formulários (quase quadrado é intencional)
- Elementos arredondados apenas em: logo (círculo) e botão WhatsApp
- Fundo padrão: `--paper`, não branco puro
- Elementos icônicos: cantoneiras laranja (`.ticks`) nos cards e CTAs

---

## Estrutura de Arquivos (atual)

```
app/
  layout.js            — fontes (next/font), metadata, WhatsAppButton + RevealObserver globais
  page.js              — home (composição das seções)
  globals.css          — Tailwind (@theme com tokens + @layer components com primitivos)
  proposta/page.js     — página de briefing (rota /proposta)
components/
  layout/
    Header.jsx         — nav sticky com hamburger mobile
    Footer.jsx
  sections/
    Hero.jsx           — vídeo de fundo + headline principal
    Ticker.jsx         — faixa animada de diferenciais
    Formats.jsx        — cards de formatos OOH
    Platforms.jsx      — lista de plataformas com hover laranja
    Cases.jsx          — carrossel horizontal de cases
    Impact.jsx         — números de impacto (estatísticas)
    Coverage.jsx       — cobertura por praças (PR + SC)
    LeadCta.jsx        — seção laranja com CTA
  ui/
    Logo.jsx
    SectionHeading.jsx — cabeçalho de seção (número + título + linha)
  widgets/
    WhatsAppButton.jsx — botão flutuante fixo (z-[70])
    RevealObserver.jsx — IntersectionObserver global (.reveal → .in)
  forms/
    ProposalForm.jsx   — formulário de briefing
lib/
  constants.js         — constantes globais (WHATSAPP_URL)
public/
  cases/               — imagens de cases (case1.jpg–case4.jpg)
  media/               — hero-video.mp4
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

### Fase 1 — Urgente

| Feature | Status |
|---|---|
| Layout base / identidade visual | ✅ Concluído |
| Hero com vídeo de fundo | ✅ Concluído |
| Seções: Ticker, Formats, Platforms, Cases, Impact, Coverage | ✅ Concluído |
| Footer | ✅ Concluído |
| WhatsApp flutuante | ✅ Concluído |
| ProposalForm (briefing) | ✅ Concluído |
| Responsividade | ✅ Concluído |
| SEO técnico (meta tags, OG, sitemap, robots.txt) | ⬜ Pendente |
| Produtos — página completa com os 8 produtos | ⬜ Pendente |
| Praças — seção expandida com todas as cidades | ⬜ Pendente |
| WhatsApp com pré-perguntas qualificadoras | ⬜ Pendente |

### Fase 2

| Feature | Status |
|---|---|
| Cases — grandes marcas com resultados | ⬜ Pendente |
| Blog (CMS, SEO/GEO, 1 artigo/semana) | ⬜ Pendente |
| FAQ | ⬜ Pendente |
| Avaliações de clientes | ⬜ Pendente |
| Banco de talentos (formulário de candidatura) | ⬜ Pendente |

### Fase 3

| Feature | Status |
|---|---|
| Idiomas (PT / EN / ES / ZH) | ⬜ Pendente |
| Simulador de campanha (lead qualificado) | ⬜ Pendente |
| Área de downloads | ⬜ Pendente |
| Automação de marketing | ⬜ Pendente |
| Mapa interativo básico de praças | ⬜ Pendente |

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