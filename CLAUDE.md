# Outdoormídia — Website

## Visão do Projeto

Refatoração do site da Outdoormídia (líder em OOH no Sul do Brasil, 67 anos de mercado). Objetivo: transformar de site institucional para **plataforma comercial de mídia Out of Home**, posicionada no nível de referências internacionais como OUTFRONT e Ocean Outdoor.

O site deve ser **simples, porém 100% bem executado** — rápido, acessível e que transmita credibilidade tanto para o pequeno empresário quanto para gestores de marketing de grandes empresas e agências.

Site atual (a ser substituído): https://outdoormidia.com.br

---

## Stack Técnica

### Atual
- **Next.js 16** (App Router, Turbopack) + **React 19** — JavaScript puro (sem TypeScript)
- **Tailwind CSS v4** — tokens da marca no `@theme` de `app/globals.css`; estilos via classes utilitárias no JSX. Primitivos do design system (`.wrap`, `.display`, `.eyebrow`, `.btn*`, `.ticks`, `.reveal`, `.select-caret`) em `@layer components`
- **Fontes:** Poppins via `next/font/google` (pesos 400–900, var `--font-poppins`, exposta em `font-sans` e `font-display`)
- **Firebase** — Firestore (conteúdo), Auth (sessão do admin), Storage (capas). Acesso server-side via `firebase-admin` em `lib/firebase/admin.js`
- **CMS próprio** — painel em `app/admin/`, protegido por cookie de sessão + claim `admin`. Não usamos CMS headless de terceiros
- **Deploy:** Firebase App Hosting (Cloud Run) — ver [`DEPLOY.md`](DEPLOY.md)
- **Dev:** `npm run dev` → porta 3000. Emuladores Firebase via `npm run emulators` (Docker)
- **Build:** `npm run build` → `.next`
- **Testes:** não há suíte de testes no repositório. Validação é manual — `npm run lint`, `npm run build` e conferência no browser

> **Quem roda o servidor é o usuário.** Nunca executar `npm run dev`, `npm run build`
> nem abrir preview por conta própria — já existe um dev server ativo na pasta e
> subir outro quebra a porta e o `.next`. A IA edita, roda no máximo `npm run lint`
> e avisa que está pronto para o usuário testar.

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
--color-orange:   #FF6900   /* cor primária da marca */
--color-orange-2: #FF6900   /* laranja claro — mesma cor, sem variação até novo tom vir do cliente */
--color-line:     rgba(22,17,13,.16)
--color-line-2:   rgba(22,17,13,.30)
```

Usar como utilitários: `bg-paper`, `text-ink`, `text-ink-soft`, `border-line`, `bg-orange`, etc.

**Proibido:** usar `#000` ou `black` — usar `--ink`. Cor preta não faz parte da identidade.

### Tipografia

| Classe/uso | Fonte | Peso | Observação |
|---|---|---|---|
| `.display` | Poppins | 400 | Uppercase, branco, `line-height:.86` |
| `.eyebrow` | Poppins | 700 | 12px, uppercase, `letter-spacing:.22em` |
| Corpo | Poppins | 400–900 | 17px base |

### Primitivos do design system (`@layer components` em `app/globals.css`)

- **`.btn`** — botão outline em cápsula (`rounded-full`, borda branca, fundo transparente). **Só sobre fundo escuro ou laranja** — sobre `--paper`/branco ele fica invisível; nesse caso use `.btn-ghost`
- **`.btn-fill`** — botão laranja sólido
- **`.btn-on-orange`** — botão branco sobre fundo laranja
- **`.btn-ghost`** — contraparte do `.btn` para fundos claros (borda e texto `--ink`, preenche de `--ink` no hover)
- **`.rail`** — carrossel horizontal com snap que sangra até a borda do `.wrap`. Já traz o `scroll-padding` que impede o snap de encostar o primeiro card na borda da tela. Usar em vez de repetir `-mx-8 … px-8`
- **`.ticks`** — cantoneiras laranja via `::before/::after`, com o canto interno curvo (motivo de identidade visual); cor sobrescrevível com `[--tick-color:#fff]`
- **`.reveal`** — elemento com animação de entrada (adiciona `.in` via IntersectionObserver global)
- **`.wrap`** — container centralizado com `max-width: 1280px` e `padding: 0 32px`
- **`.select-caret`** — seta de `<select>` estilizado
- **`.field-label` / `.field-input` / `.field-select` / `.field-error`** — campos de formulário. Valem para os formulários públicos e para os editores do admin; nunca redeclarar essas classes como constante local. `.field-select` é modificador, usado junto: `className="field-input field-select select-caret"`
- **`SectionHeading`** (`components/ui/SectionHeading.jsx`) — cabeçalho de seção (número laranja + h2 + linha)
- **`StatGrid`** (`components/ui/StatGrid.jsx`) — faixa de números da marca (`size="lg"` em `Impact`, `"md"` em Culture, diferenciais e ESG). Não é usado na home: os números institucionais saíram de lá
- **`Accordion`** (`components/ui/Accordion.jsx`) — acordeão controlado do FAQ; o pai guarda o `openIndex` porque precisa da pergunta aberta para montar o link de WhatsApp
- **`CoverMedia`** (`components/ui/CoverMedia.jsx`) — capa com fallback: renderiza a imagem se houver `src`, senão o painel bege com o rótulo. `ticks={false}` quando o card que envolve a capa já traz as cantoneiras. Proporções em mapa estático (classe interpolada não é vista pelo scanner do Tailwind)
- **`DeleteButton`** (`components/widgets/DeleteButton.jsx`) — exclusão no admin, parametrizada por `resource` (segmento de `/api/admin/…`) e `label`
- **`HeaderShell`** (`components/layout/HeaderShell.jsx`) — barra clara de proposta/login/painel (o `Header` laranja é só do site institucional)

Padding de seção: `py-[110px] max-mob:py-[72px]` direto no JSX. Todo o restante do estilo é utilitário Tailwind no componente.

### `ui/` vs `widgets/` — qual pasta

O critério não é client vs server (`CoverageMap` é client e está em `ui/`; `WhatsAppButton` é
server e está em `widgets/`):

- **`ui/`** — peças de composição. Recebem props e devolvem markup; quem monta o layout é a
  página ou a seção. Mesmo as interativas são controladas pelo pai (`Accordion`).
- **`widgets/`** — unidades autônomas. Disparam ação com efeito colateral (`DeleteButton`,
  `LogoutButton`), falam com API, ou se auto-instalam uma vez no `app/layout.js`
  (`RevealObserver`, `WhatsAppButton`).

Na dúvida: recebe props e não sabe o que acontece depois → `ui/`. Age sozinho → `widgets/`.

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
  sobre/                  — hub Sobre nós (linha do tempo, cultura, trabalhe conosco)
  solucoes/               — hub + diferenciais/ e regioes/ (mapa + lista por praça)
  anunciante/             — hub + midia-kit/, simulador/ e faq/
  blog/                   — hub (portas Cases e Artigos + destaque), artigos/ e [slug]
  cases/                  — listagem com filtro por tag (ISR 300)
  plataformas/            — índice + [slug] das 7 plataformas; projetos-iconicos/ (hub + [slug])
  diagnostico/            — quiz de diagnóstico de marca
  proposta/               — briefing
  trabalhe-conosco/       — banco de talentos
  admin/(dashboard)/      — CMS: posts, cases, locations, tags. Protegido por proxy.js
  api/admin/              — CRUD do CMS (guardado por lib/api/adminGuard.js)
  api/auth/session/       — cria/valida/apaga o cookie de sessão do admin
components/
  layout/                 — Header (sticky, menu colapsável sobre lib/nav.js), Footer
  sections/               — Hero, Ticker, Institutional, Diferenciais, Platforms (acordeão,
                            só em /solucoes), PlatformsCarousel (carrossel da home), Cases,
                            Impact (só em /sobre), Reviews, BlogTeaser, Coverage, Faq, FaqCategorias,
                            Culture, LeadCta (bloco laranja + QualifierForm), PlatformFaq
  blog/ cases/            — cards, explorers com filtro, markdown, share
  forms/                  — 11 formulários (públicos + editores do admin)
  ui/                     — Logo, SectionHeading, Breadcrumb, TagFilter, CoverMedia,
                            FormatSpecCard, CoverageMap (SVG de PR+SC, dados IBGE)
  widgets/                — WhatsAppButton, RevealObserver, DeleteButton, LogoutButton
lib/
  constants.js            — WHATSAPP_URL, SITE_URL
  format.js               — DATA_LONGA (público) e DATA_CURTA (admin)
  nav.js                  — árvore de navegação (hubs + nível 2); Header e Footer leem daqui
  whatsapp.js             — waLink() + a mensagem pré-preenchida de cada CTA
  revalidate.js           — invalidação de ISR após mutação no admin
  firebase/               — admin (server), client, session, storage, serialize (toIso)
  blog/ cases/ tags/      — leitura, escrita e validação de cada coleção
  platforms.js            — as 7 plataformas do catálogo (dados estáticos, não vem do Firestore)
  iconicos.js             — os 3 projetos icônicos (fora do catálogo): carrossel + página dedicada
  faq.js                  — perguntas com categoria
  sobre.js                — marcos da linha do tempo; midiakit.js — materiais para download
  diferenciais.js         — os 6 diferenciais: resumo dos cards + conteúdo da página dedicada
  simulador.js            — parâmetros da estimativa de campanha (impactos, CPM)
  locations.js            — praças; mapShapes/mapProjection alimentam o CoverageMap
public/media/             — video-hero.mp4 (fundo do Hero), logo.png (wordmark branco,
                            recolorido por mask no primitivo .logo-mark)
scripts/                  — seed-admin, migrate-tags-scope, generate-map-paths
```

---

## Responsividade

| Breakpoint | Layout |
|---|---|
| `> 1080px` | Desktop — grids cheios, nav com espaçamento pleno |
| `≤ 1080px` | Laptop — nav do header com gaps reduzidos (ainda completa) |
| `≤ 980px` | Tablet — grids 2 colunas, nav com hamburger |
| `≤ 560px` | Mobile — grid 1 coluna, padding reduzido |
| `≤ 380px` | Mobile pequeno — StatGrid em 1 coluna |

Padrão: **desktop-first** — base para desktop, overrides com as variants Tailwind `max-lap:` (≤1080px), `max-tab:` (≤980px), `max-mob:` (≤560px) e `max-xs:` (≤380px), definidas como breakpoints no `@theme`.

O padding lateral do `.wrap` muda no `max-mob` (32px → 20px). Qualquer elemento que
sangre para fora do `.wrap` com margem negativa precisa acompanhar as duas medidas —
é o que o `.rail` faz.

---

## Features e Status

> Ao concluir uma feature, atualize esta tabela **na mesma alteração**. Ela é a
> primeira coisa que uma sessão de IA lê para saber o que já existe.

### Concluído

| Feature | Onde |
|---|---|
| Layout base / identidade visual / responsividade | `app/globals.css`, componentes |
| Hero com vídeo de fundo (carrega após o load da página) | `components/sections/Hero.jsx` |
| Seções da home | `components/sections/` |
| Bloco institucional (texto + foto) entre o ticker e as plataformas | `components/sections/Institutional.jsx` |
| WhatsApp flutuante | `components/widgets/WhatsAppButton.jsx` |
| WhatsApp com mensagem pré-preenchida por CTA (pré-qualificação) | `lib/whatsapp.js` |
| ProposalForm (briefing) | `app/proposta/` |
| Plataformas — índice + página das 7 | `app/plataformas/`, `lib/platforms.js` |
| Plataformas na home — carrossel de peek full-bleed das 8 entradas de `PLATFORMS_LISTAGEM` (as 7 do catálogo + Icônicos), com setas e dots. Substituiu o acordeão e o carrossel dos 3 icônicos; o acordeão `Platforms` segue vivo só em `/solucoes` | `components/sections/PlatformsCarousel.jsx`, `lib/platforms.js` |
| Projetos Icônicos — hub + página dos 3 (ISR 300 + `generateStaticParams`). Elegancy traz Urbanity e Urbanity Light como seções ancoradas (`#urbanity`, `#urbanity-light`) | `app/plataformas/projetos-iconicos/`, `lib/iconicos.js` |
| Cases com filtro por tag | `app/cases/`, `lib/cases/` |
| Blog com CMS próprio | `app/blog/artigos/`, `app/admin/`, `lib/blog/` |
| Hub do Blog (portas Cases, Artigos e Podcast + destaque) | `app/blog/page.js` |
| Podcast — 3ª porta do Blog (estrutura pronta; episódios em `TODO(cliente)`) | `app/blog/podcast/`, `lib/podcast.js` |
| Menu colapsável com os hubs e o nível 2 | `components/layout/Header.jsx`, `lib/nav.js` |
| Hub Sobre nós (linha do tempo + cultura) | `app/sobre/`, `lib/sobre.js` |
| Filhas de Sobre nós — Ambiental, Social, Governança (estrutura pronta; conteúdo em `TODO(cliente)`) | `app/sobre/{ambiental,social,governanca}/`, `lib/esg.js` |
| Hub Soluções + Diferenciais + Regiões | `app/solucoes/`, `lib/diferenciais.js` |
| Páginas dos 6 diferenciais (SSG) — mesma estrutura, conteúdo por slug | `app/solucoes/diferenciais/[slug]/`, `lib/diferenciais.js` |
| Área do anunciante (hub + 4 ferramentas) | `app/anunciante/` |
| Simulador de campanha (estimativa de impactos e CPM) | `app/anunciante/simulador/`, `lib/simulador.js` |
| Mídia Kit / materiais de apoio | `app/anunciante/midia-kit/`, `lib/midiakit.js` |
| FAQ | `components/sections/Faq.jsx`, `FaqCategorias.jsx`, `PlatformFaq.jsx`, `lib/faq.js` |
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
| Idiomas (PT / EN / ES / ZH) | Os botões de idioma (agora dentro do menu) só trocam `useState` — não há i18n |
| Envio de e-mail nos formulários | Falta integrar Resend. O `TalentForm` é o caso mais grave: não envia nada e mesmo assim diz "Guardamos seu perfil" — a copy precisa mudar junto com a integração |
| Página de case individual (`/cases/[slug]`) | Não existe; só a listagem. `isCaseSlugTaken` mantém o slug único de propósito, para a página poder ser criada depois sem colisão |
| Arquivos do Mídia Kit | As páginas existem; falta o cliente entregar PDFs e assets (`lib/midiakit.js`) |
| Números oficiais do simulador | `lib/simulador.js` usa ordem de grandeza estimada — falta CPM e alcance por plataforma |
| Conteúdo de Ambiental / Social / Governança | Páginas no ar, dados em `lib/esg.js` sob `TODO(cliente)`. Falta o lastro: números com prazo, certificações, projetos e PDFs. `/sobre/ambiental` está com `robots: noindex` até lá |
| Conteúdo do Podcast | Estrutura no ar em `/blog/podcast` com episódios de exemplo em `lib/podcast.js` sob `TODO(cliente)`. Falta gravar os episódios e preencher o campo `audio`; a página está com `robots: noindex` até lá |
| Retaxonomia das plataformas (22 produtos sob 9 formatos) | Catálogo em 7 na ordem final, com Rodovias criado, Shoppings renomeado para Mídia Indoor e Gentileza Urbana removido; Icônicos entram na listagem como entrada única. Falta acrescentar Digital Signage e desdobrar os 22 produtos sob os formatos. Rodovias está com o descritivo mínimo sob `TODO(cliente)` |
| Conteúdo dos Projetos Icônicos | `lib/iconicos.js` está sob `TODO(cliente)`: falta o descritivo oficial de Elegancy/Urbanity/Urbanity Light, as medidas de cada estrutura (os cards de formato hoje descrevem sem cravar dimensão), as praças instaladas e a foto de cada card (`image`, 16/9, ≥1600px) — sem ela o card cai num painel escuro com o nome |
| Foto das plataformas no carrossel da home | `PLATFORMS_LISTAGEM` já carrega o campo `image` (16/9, ≥1600px), mas nenhuma das 8 entradas tem foto — todos os cards caem no painel bege com o nome. É o que falta para a seção ficar apresentável |
| Páginas de sistema (`/obrigado`, `/privacidade`, `/termos`, 404) | Ramo 06 do fluxo |
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

### Produtos

**Catálogo — 7 plataformas** (`lib/platforms.js`), na ordem em que aparecem na listagem:

1. **Outdoors Digitais** — 82 equipamentos, 138 telas LED, sem produção de lona
2. **Front Lights** — outdoor 18m² (6×3m horizontal / 3,5×5m vertical), maior volume
3. **Mídia Indoor** (slug `shoppings`) — Mueller, São José, Park Shopping Boulevard (100% digital, totens e painéis)
4. **Aeroporto** — operação privada (sem licitação), empena digital 6×18m (maior do Sul)
5. **Mídia Móvel** — ativações em praias, parques, calçadões (onde OOH fixo não chega)
6. **MUB** — 77 locais, 6 circuitos segmentados, 13M impactos/mês
7. **Rodovias** — 100 ativos, 12×4m e passarelas 10×3m

O nome exibido e o slug divergem em **Mídia Indoor**: a rota segue
`/plataformas/shoppings` de propósito, para não quebrar links nem os cases já
gravados com esse slug. **Gentileza Urbana** saiu do catálogo — a rota 404 e a
menção em `lib/esg.js` passou a apontar para o MUB.

Na listagem (home e `/plataformas`) os **Icônicos** entram como uma 8ª entrada,
entre Front Lights e Mídia Indoor, levando ao hub dos 3 projetos. Quem monta
essa lista é `PLATFORMS_LISTAGEM` em `lib/platforms.js`; `PLATFORMS` continua
sendo só o catálogo, porque é dele que o simulador, o `lib/cases/validate.js` e
o admin dependem.

**Fora do catálogo — 3 projetos icônicos** (`lib/iconicos.js`)

Projetos de assinatura, sob medida, com fluxo comercial próprio (briefing →
viabilidade → estrutura). Não entram no simulador — não têm CPM de tabela.

1. **Elegancy** — mobiliário de assinatura; linhas **Urbanity** (plena) e **Urbanity Light** (reduzida)
2. **Green** — jardins verticais e estruturas vegetadas, manutenção por nossa conta
3. **Regenerativo** — requalificação de praças e canteiros como contrapartida da veiculação

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

A pré-qualificação acontece **na própria mensagem**, não em um modal antes do
redirect. Cada CTA de WhatsApp do site abre a conversa com um `?text=` próprio,
escrito na voz do visitante e adaptado ao momento do clique. Tudo vive em
[`lib/whatsapp.js`](lib/whatsapp.js) — nunca montar a URL na mão.

```js
import { waLink, WA_HEADER } from '@/lib/whatsapp'
<a href={waLink(WA_HEADER)}>Falar agora</a>
```

- Mensagens fixas (constantes): flutuante, Header, Cobertura e o "Anunciar já" do
  LeadCta. As duas últimas trazem campos a preencher (praça, período, empresa) —
  são os CTAs de maior intenção.
- O "Anunciar já" é o único CTA que **não** vai para o comercial da Outdoormídia:
  usa `waLinkMercadoOoh()`, que aponta para o número da MercadoOOH
  (`MERCADOOH_WHATSAPP_URL` em `lib/constants.js`).
- Mensagens dinâmicas (funções): FAQ da home e da plataforma levam a pergunta
  aberta; o diagnóstico leva a nota e a faixa; os dois formulários de proposta
  levam o briefing recém-enviado.

Ao criar um CTA novo, adicionar a mensagem em `lib/whatsapp.js` em vez de
reaproveitar uma existente — o texto é o que diz ao comercial de onde o lead
veio.

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