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
- **`.ticks`** — só contexto de posicionamento (`position: relative`). As cantoneiras laranja que dava ao elemento foram removidas do site a pedido do cliente; a classe continua nos cards porque eles posicionam filhos absolutos a partir dela
- **`.reveal`** — elemento com animação de entrada (adiciona `.in` via IntersectionObserver global)
- **`.wrap`** — container centralizado com `max-width: 1280px` e `padding: 0 32px`
- **`.select-caret`** — seta de `<select>` estilizado
- **`.field-label` / `.field-input` / `.field-select` / `.field-error`** — campos de formulário. Valem para os formulários públicos e para os editores do admin; nunca redeclarar essas classes como constante local. `.field-select` é modificador, usado junto: `className="field-input field-select select-caret"`
- **`SectionHeading`** (`components/ui/SectionHeading.jsx`) — cabeçalho de seção (número laranja + h2 + linha)
- **`StatGrid`** (`components/ui/StatGrid.jsx`) — faixa de números da marca (`size="md"` em `Institutional`, Culture, diferenciais e ESG). Em `Institutional` ele monta os big numbers (9 plataformas integradas · 312 m² · +530M impactos/mês · DOOH), com a contagem de plataformas derivada de `PLATFORMS_LISTAGEM`. Como o bloco é o mesmo na home e em `/sobre`, o quadro não diverge entre as duas — era o segundo quadro de números de `/sobre` que saiu, não este
- **`PracaChips`** (`components/ui/PracaChips.jsx`) — lista de praças em cápsulas. Um componente para a seção Presença de `/sobre` e a Cobertura da home; as listas divergem (a home inclui Rodovias PR-SC), o desenho não
- **`Accordion`** (`components/ui/Accordion.jsx`) — acordeão controlado do FAQ; o pai guarda o `openIndex` porque precisa da pergunta aberta para montar o link de WhatsApp
- **`CoverMedia`** (`components/ui/CoverMedia.jsx`) — capa com fallback: renderiza a imagem se houver `src`, senão o painel bege com o rótulo. Proporções em mapa estático (classe interpolada não é vista pelo scanner do Tailwind)
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
  plataformas/            — índice + [slug] das 8 plataformas; projetos-iconicos/ (hub + [slug])
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
                            Reviews, BlogTeaser, Coverage, Faq, FaqCategorias,
                            Process (Gestão 360 OM: home e /sobre, com `title` próprio
                            em cada uma), Culture (só em /trabalhe-conosco),
                            NovaCampanha (bloco laranja: 4 portas + QualifierForm),
                            PlatformFaq
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
  platforms.js            — as 8 plataformas do catálogo (dados estáticos, não vem do Firestore)
  iconicos.js             — os 3 projetos icônicos (fora do catálogo): carrossel + página dedicada
  faq.js                  — perguntas com categoria
  sobre.js                — marcos da linha do tempo; midiakit.js — materiais para download
  diferenciais.js         — diferenciais: resumo dos cards + página dedicada. `publicado: false`
                            mantém a entrada escrita e fora do ar
  simulador.js            — parâmetros da estimativa de campanha (impactos, CPM)
  locations.js            — praças; mapShapes/mapProjection alimentam o CoverageMap
public/media/             — video-hero.mp4 (fundo do Hero), logo.png (wordmark branco,
                            recolorido por mask no primitivo .logo-mark)
scripts/                  — seed-admin, migrate-tags-scope, generate-map-paths
claude/                   — checklists de aplicação entregues pelo cliente, fonte da
                            copy oficial: checklist-home.md (home, 25/08/2026),
                            checklist-sobre-nos.md (25/08/2026) e
                            copy-diagnostico-presenca.md. Não é código; é o que manda
                            quando divergir deste documento
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
| Big numbers da home — 4 números no fim do bloco institucional (`StatGrid`): 9 plataformas, 312 m² do Aeroporto Square, +530M impactos/mês e a rede DOOH de 175 telas. Mesmo quadro em `/sobre`, porque é o mesmo componente | `components/sections/Institutional.jsx` |
| Copy oficial do cliente (COPY_SITE) aplicada em menu, hero, esteira, institucional, diferenciais, plataformas, cobertura, depoimentos, Gestão 360 OM, nova campanha, FAQ e rodapé | home, `lib/faq.js`, `lib/platforms.js`, `lib/diferenciais.js` |
| Nova campanha — bloco laranja com as 4 portas, na hierarquia do checklist da home: Diagnóstico como faixa fina, Formulário como card dominante branco e elevado, Mídia Programática (preto, exceção autorizada à paleta) e Atendimento como cards menores. A diferença de área é o que impede o Diagnóstico de roubar o clique do formulário. Substituiu o `LeadCta` em todas as páginas; `#formulario` segue valendo como âncora | `components/sections/NovaCampanha.jsx` |
| Qualificador — 6 etapas, resumo acumulado com `EDITAR`, barra `X de 6`, convite ao Diagnóstico só para quem marca "Ainda não sei" no objetivo, celular oculto quando a preferência é e-mail, e microcopy dizendo o que falta em vez de asterisco vermelho. Grava o lead antes do redirecionamento ao WhatsApp, com campanha de origem (querystring) e página de origem no payload | `components/forms/QualifierForm.jsx`, `lib/leads/origens.js` |
| WhatsApp flutuante | `components/widgets/WhatsAppButton.jsx` |
| WhatsApp com mensagem pré-preenchida por CTA (pré-qualificação) | `lib/whatsapp.js` |
| ProposalForm (briefing) | `app/proposta/` |
| Plataformas — índice + página das 7 | `app/plataformas/`, `lib/platforms.js` |
| Plataformas na home — carrossel de peek full-bleed das 8 entradas de `PLATFORMS_LISTAGEM` (as 7 do catálogo + Icônicos), com setas e dots. Substituiu o acordeão e o carrossel dos 3 icônicos; o acordeão `Platforms` segue vivo só em `/solucoes` | `components/sections/PlatformsCarousel.jsx`, `lib/platforms.js` |
| Icônicos na home — faixa laranja logo abaixo das Plataformas: número gigante de fundo, projeto em destaque (`.display`) e abas dos 3 projetos. Lê `lib/iconicos.js` | `components/sections/Iconicos.jsx` |
| Projetos Icônicos — hub + página dos 3 (ISR 300 + `generateStaticParams`). Elegancy traz Urbanity e Urbanity Light como seções ancoradas (`#urbanity`, `#urbanity-light`) | `app/plataformas/projetos-iconicos/`, `lib/iconicos.js` |
| Cases com filtro por tag | `app/cases/`, `lib/cases/` |
| Blog com CMS próprio | `app/blog/artigos/`, `app/admin/`, `lib/blog/` |
| Classificação obrigatória do post — Plataforma, Cobertura e Indústrias são grupos fixos do escopo `blog`: existem sempre (sem doc no Firestore), o admin não renomeia nem exclui, e nenhum post é publicado sem ao menos uma tag de cada. Rascunho pode ficar incompleto | `lib/tags/obrigatorios.js`, `lib/blog/validate.js`, `app/api/admin/posts/` |
| Rascunho local do post — botão "Salvar rascunho no navegador" grava em `localStorage` (uma chave por post) e oferece restaurar/descartar ao reabrir o editor; some ao salvar no painel | `components/forms/PostEditorForm.jsx` |
| Voltar ação no editor de post — histórico de edição do formulário inteiro (Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y + botões ↶ ↷ na barra). Digitação entra em rajada de 600ms; barra de formatação, tags e uploads abrem um passo cada. Substitui o desfazer nativo, que o textarea controlado perde | `lib/useUndoableState.js`, `components/forms/PostEditorForm.jsx` |
| Hub do Blog (portas Cases, Artigos e Podcast + destaque) | `app/blog/page.js` |
| Podcast — 3ª porta do Blog (estrutura pronta; episódios em `TODO(cliente)`) | `app/blog/podcast/`, `lib/podcast.js` |
| Menu colapsável com os hubs e o nível 2 | `components/layout/Header.jsx`, `lib/nav.js` |
| Hub Sobre nós — hero, Sobre a OM, Presença, bloco institucional com os big numbers, linha do tempo, Gestão 360 OM sob o título "Por que a Outdoormídia", Nosso compromisso e banco de talentos. Checklist do cliente aplicado (`claude/checklist-sobre-nos.md`, 25/08/2026) | `app/sobre/`, `lib/sobre.js` |
| Linha do tempo — quatro marcos (1959 · 1980s · 2000s · Hoje). Os antigos 2000s e 2010s contavam o mesmo movimento de expansão e viraram um só | `lib/sobre.js` |
| Gestão 360 OM compartilhado — o mesmo `Process` monta a seção na home e em `/sobre`; só `num` e `title` mudam. Editar num lugar reflete nos dois | `components/sections/Process.jsx` |
| Filhas de Sobre nós — Ambiental, Social, Governança (estrutura pronta; conteúdo em `TODO(cliente)`) | `app/sobre/{ambiental,social,governanca}/`, `lib/esg.js` |
| Hub Soluções + Diferenciais + Regiões | `app/solucoes/`, `lib/diferenciais.js` |
| Páginas dos diferenciais (SSG) — mesma estrutura, conteúdo por slug. `publicado: false` tira do ar sem apagar o texto; "A prova" e "Aplicação prática" somem quando o diferencial ainda não tem esses dados | `app/solucoes/diferenciais/[slug]/`, `lib/diferenciais.js` |
| Área do anunciante (hub + 4 ferramentas) | `app/anunciante/` |
| Simulador de campanha (estimativa de impactos e CPM) | `app/anunciante/simulador/`, `lib/simulador.js` |
| Mídia Kit / materiais de apoio | `app/anunciante/midia-kit/`, `lib/midiakit.js` |
| FAQ | `components/sections/Faq.jsx`, `FaqCategorias.jsx`, `PlatformFaq.jsx`, `lib/faq.js` |
| Avaliações de clientes — três cards 9:16 com capa, badge de duração, citação sobre o gradiente e modal de vídeo. O card 03 é título editorial, sem aspas: entre aspas viraria fala fabricada. Vídeos e capas em `TODO(cliente)`; sem eles o card cai no painel bege, sem botão de play | `components/sections/Reviews.jsx` |
| Banco de talentos | `app/trabalhe-conosco/`, `components/forms/TalentForm.jsx` |
| Diagnóstico de marca (quiz) | `app/diagnostico/`, `lib/diagnostico.js` |
| Mapa de praças (SVG, dados IBGE) | `components/ui/CoverageMap.jsx`, `lib/mapShapes.js` |
| Painel admin (leads, posts, cases, locations, tags) | `app/admin/`, `app/api/admin/` |
| Leads gravados no Firestore — `/proposta` e o qualificador do `NovaCampanha` gravam na coleção `leads`; o campo `origem` discrimina o fluxo. Única rota `POST` pública do site (honeypot + tetos de tamanho, sem `requireAdmin`) | `lib/leads/`, `app/api/leads/route.js` |
| Área de Leads no admin — listagem com filtro por origem/status, tela de detalhe com tudo o que o cliente enviou e acompanhamento comercial (novo / contatado / descartado) | `app/admin/(dashboard)/leads/`, `components/widgets/LeadStatusSelect.jsx` |
| Breadcrumb em todas as páginas | `components/ui/Breadcrumb.jsx` |
| Páginas de sistema — `/obrigado` (noindex), `/privacidade`, `/termos` e 404 | `app/obrigado/`, `app/privacidade/`, `app/termos/`, `app/not-found.js` |
| Textos legais data-driven (LGPD + Termos) num renderizador só | `lib/legal.js`, `components/ui/LegalDoc.jsx` |
| Formulários levam a `/obrigado` — URL de conversão, briefing pelo `sessionStorage` | `ProposalForm`, `TalentForm`, `components/widgets/ObrigadoCta.jsx` |
| Cache: ISR nas rotas de conteúdo + headers em `/media/` | `next.config.mjs`, `lib/revalidate.js` |
| `robots.txt` — libera busca e rastreadores de IA (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended); bloqueia `/admin` e `/api` | `app/robots.js` |
| `sitemap.xml` — estáticas de `lib/seo.js` + plataformas, icônicos, diferenciais e posts do Firestore | `app/sitemap.js`, `lib/seo.js` |
| `llms.txt` — índice do site em markdown para motores generativos, gerado das mesmas fontes do sitemap | `app/llms.txt/route.js` |
| JSON-LD de `LocalBusiness` + `WebSite` no `<head>`, com NAP, razão social, CNPJ (`taxID`), `areaServed` e `sameAs` | `components/widgets/JsonLd.jsx`, `lib/empresa.js` |
| JSON-LD de `FAQPage` nas perguntas frequentes — instalado só em `/area-do-anunciante/faq`, que traz o FAQ completo. A seção da home mostra um recorte das mesmas perguntas e não repete o schema | `components/widgets/FaqJsonLd.jsx`, `lib/faq.js` |
| Canonical, title e description em todas as rotas públicas (home e `/proposta` incluídas) | `app/**/page.js` |

### Pendente

| Feature | Observação |
|---|---|
| **Diagnóstico de presença — revisão completa** | Checklist fechado em 26/08/2026, com prioridade sobre o resto deste documento nesse escopo: de 7 para 10 perguntas, de 3 para 5 faixas de resultado, bloco educativo novo, CTA de fim de página, captura de e-mail opcional e mudança de rota para `/area-do-anunciante/diagnostico-de-presenca`. Ainda não implementado — a página de hoje continua em `app/diagnostico/`. Ver `## Checklist Pendente — Diagnóstico de Presença` logo abaixo desta tabela. Bloqueada por 2 itens até publicar |
| Horário de atendimento no JSON-LD | Razão social, CNPJ e endereço já estão preenchidos em `lib/empresa.js` (e saem no rodapé, na Política de Privacidade, no JSON-LD e no llms.txt). Falta só `horarios`, ainda vazio sob `TODO(cliente)`: campo vazio é omitido do schema, porque dado errado em structured data vira horário errado no Google |
| Encarregado de dados (LGPD) | `lib/empresa.js` ainda tem `encarregado` vazio sob `TODO(cliente)`. Enquanto não vier, a Política de Privacidade usa o e-mail geral como canal do titular |
| Revisão jurídica de `/privacidade` e `/termos` | Os textos de `lib/legal.js` são minuta redigida a partir do que o site de fato coleta, alinhada à Lei 13.709/2018. Precisam passar pelo jurídico do cliente antes de valerem como peça legal |
| Evento de conversão em `/obrigado` | A página existe e é o destino dos dois formulários, mas não há GA4/GTM no projeto. Instalar Analytics torna falsa a frase "sem rastreamento" do `CookieNotice` e exige decidir opt-in — os dois andam juntos |
| Imagem de Open Graph | Nenhuma rota declara `openGraph.images` fora do blog e não há asset de OG em `public/`. Link compartilhado sai sem card. `logo.png` e `om.png` são brancos (viram máscara CSS), não servem como `logo` de schema |
| Idiomas (PT / EN / ES / ZH) | Os botões de idioma (agora dentro do menu) só trocam `useState` — não há i18n |
| Envio de e-mail nos formulários | Falta integrar Resend. `ProposalForm` e o qualificador já gravam em `leads` — o comercial vê tudo em `/admin/leads` —, mas ninguém é **avisado**: só descobre entrando no painel. `TalentForm` continua descartando os dados no browser. A copy de `/obrigado?origem=proposta` foi escrita quando nada era guardado e ainda não promete guarda; pode ser revista |
| Leads do Diagnóstico e do Simulador | Os dois fluxos são anônimos hoje (o diagnóstico só tem 7 notas, o simulador só 4 selects) — gravar exige antes decidir um passo de contato. `lib/leads/origens.js` já nasceu preparado: basta uma entrada nova no mapa para a validação, a listagem e o detalhe passarem a aceitá-los |
| Página de case individual (`/cases/[slug]`) | Não existe; só a listagem. `isCaseSlugTaken` mantém o slug único de propósito, para a página poder ser criada depois sem colisão |
| Arquivos do Mídia Kit | As páginas existem; falta o cliente entregar PDFs e assets (`lib/midiakit.js`) |
| Números oficiais do simulador | `lib/simulador.js` usa ordem de grandeza estimada — falta CPM e alcance por plataforma |
| Conteúdo de Ambiental / Social / Governança | Páginas no ar, dados em `lib/esg.js` sob `TODO(cliente)`. Falta o lastro: números com prazo, certificações, projetos e PDFs. `/sobre/ambiental` está com `robots: noindex` até lá |
| Conteúdo do Podcast | Estrutura no ar em `/blog/podcast` com episódios de exemplo em `lib/podcast.js` sob `TODO(cliente)`. Falta gravar os episódios e preencher o campo `audio`; a página está com `robots: noindex` até lá |
| Retaxonomia das plataformas (22 produtos sob 9 formatos) | Catálogo em 8 na ordem final, com Rodovias e Digital Signage criados, Shoppings renomeado para Mídia Indoor e Gentileza Urbana removida do catálogo; Projetos Icônicos abrem a listagem como entrada única (9 no total). Falta desdobrar os 22 produtos sob os formatos. Rodovias e Digital Signage estão com o descritivo mínimo sob `TODO(cliente)` |
| CPM de rodovia divergente | O COPY_SITE traz CPM de R$ 2,06 em rodovias; `lib/simulador.js` trabalha com R$ 8 a 14. A cifra fica fora do FAQ até o cliente cravar qual vale — ver o `TODO(cliente)` em `lib/faq.js`. As demais divergências (telas e área do Aeroporto) foram fechadas pelo checklist da home |
| FAQ sem a pergunta de antecedência | A nº 2 do documento veio marcada AGUARDANDO DADO (prazo de lona e de subida em LED). Sem ela o FAQ da home mostra 7 perguntas em vez das 8 marcadas no documento — ver `FAQS_HOME` em `lib/faq.js` |
| Portas 03 e 04 da Nova campanha | Mídia Programática e Atendimento automatizado ainda caem no WhatsApp (MercadoOOH e comercial). Falta o cliente dizer se existe plataforma de espaços disponíveis e atendimento automatizado de verdade — ver `WA_PROGRAMATICA` e `WA_ATENDIMENTO_AGORA` |
| Diferenciais novos sem prova | Aeroporto Square e Mídia Regenerativa estão no ar sem os números de "A prova" e sem mini-case; as seções são omitidas até o dado chegar |
| Depoimentos — autorização | Os 3 depoimentos da home são reais e identificam pessoa e marca (Claro, Agência Verbal, Cia do Pastel). Confirmar autorização de uso antes de publicar |
| Conteúdo dos Projetos Icônicos | `lib/iconicos.js` está sob `TODO(cliente)`: falta o descritivo oficial de Elegancy/Urbanity/Urbanity Light, as medidas de cada estrutura (os cards de formato hoje descrevem sem cravar dimensão), as praças instaladas e a foto de cada card (`image`, 16/9, ≥1600px) — sem ela o card cai num painel escuro com o nome |
| Foto das plataformas no carrossel da home | `PLATFORMS_LISTAGEM` já carrega o campo `image` (16/9, ≥1600px), mas nenhuma das 9 entradas tem foto — todos os cards caem no painel bege com o nome. É o que falta para a seção ficar apresentável |
| Imagens de Sobre nós | `TODO(Imagine)` em três pontos: capa do topo (`CAPA` em `app/sobre/page.js`), uma imagem por marco da linha do tempo (`image`/`imageAlt` em `lib/sobre.js`) e uma por card de Nosso compromisso. Enquanto forem `null` nada é renderizado no lugar — painel bege vazio na primeira dobra é pior que capa nenhuma |
| Vídeos dos depoimentos | `components/sections/Reviews.jsx` tem a estrutura do card de vídeo pronta (capa, badge de duração, play laranja, modal com som ligado). Faltam os três arquivos 9:16 com legenda embutida e as capas estáticas. Sem eles o card mostra a citação sobre o painel bege, sem play |
| Telefone comercial de Santa Catarina | `lib/empresa.js` tem `telefoneSc` vazio sob `TODO(cliente)`. Quando o número chegar, o rodapé e o JSON-LD passam a mostrar os dois sozinhos |
| Blog na home — sistema de cor por tipo | O checklist da home pede Case preto, Podcast cinza e Artigo branco no teaser. Depende de duas decisões que ainda não vieram: quais cards entram no lançamento (o teaser hoje só lista artigos) e como o card preto convive com a regra de paleta, que só abre exceção para o de Mídia Programática |
| Conteúdo do blog para o lançamento | Um artigo só, com erro de título (`Porque` → `Por que`) e assinatura "Shunda" sem autor identificado. O checklist da home exige três artigos com autoria antes de publicar. É conteúdo no Firestore, corrigido pelo `/admin`, não pelo código |
| Automação de marketing | — |
| Testes automatizados | Nenhum. Regressão só aparece em conferência manual |

---

## Checklist Pendente — Diagnóstico de Presença

> **Este bloco tem prioridade sobre o resto do documento no escopo do Diagnóstico.**
> É um checklist de aplicação fechado em 26/08/2026, ainda **não implementado** — a
> página de hoje continua em `app/diagnostico/`, `lib/diagnostico.js`, com 7
> perguntas e 3 faixas de resultado. Onde este checklist divergir de outra parte do
> CLAUDE.md (nome de rota, contagem de perguntas etc.), vale o que está aqui até a
> implementação acontecer — e então este bloco deve ser reconciliado com o resto do
> documento (movido para as seções normais, ou arquivado).
>
> **Ao implementar: aplicar exatamente o texto da coluna ENTRA em cada item — não
> reescrever, não melhorar, não resumir.** Se algum texto parecer estranho, parar e
> perguntar antes de mudar.

**Página:** `/area-do-anunciante/diagnostico-de-presenca` (hoje `/diagnostico`) ·
**Página mãe:** `/area-do-anunciante` (hoje `/anunciante`) ·
**Idiomas:** PT · EN · ES · 中文 ·
**Copy completa:** `claude/copy-diagnostico-presenca.md` (arquivo ainda não existe no repo)

Sem alteração de layout-base: a página mantém hero, barra parcial fixa, lista de
perguntas agrupadas e bloco de resultado. O que muda é a quantidade de perguntas, o
número de faixas do resultado, e entram dois blocos novos.

### Ordem da página

| | HOJE | ENTRA |
|---|---|---|
| Topo | Hero | Hero, subtítulo novo |
| 01 | *(não existe)* | Bloco educativo, a Escada da Presença |
| 02 | 7 perguntas em 3 grupos | 10 perguntas em 5 grupos |
| 03 | Barra parcial fixa | Sem alteração de componente, textos novos |
| 04 | Resultado, 3 faixas | Resultado, 5 degraus |
| 05 | *(não existe)* | Linha de ponto frágil com CTA contextual |
| 06 | *(não existe)* | Escada no resultado, degrau aceso |
| 07 | *(não existe)* | CTA de fim de página |
| 08 | *(não existe)* | Captura de e-mail opcional |
| Fim | Rodapé | Sem alteração |

### Breadcrumb

**HOJE:** `HOME / DIAGNÓSTICO DE MARCA` → **ENTRA:** `HOME / ÁREA DO ANUNCIANTE /
DIAGNÓSTICO DE PRESENÇA`

Falta o nível da página mãe, e o nome usado no breadcrumb não é o mesmo do menu de
rodapé ("Diagnóstico de presença"). Um nome por página em todos os pontos do site.

### Hero

- **Kicker** — HOJE `DIAGNÓSTICO · 7 PERGUNTAS` → ENTRA `DIAGNÓSTICO · 10 PERGUNTAS`
- **Título** — sem alteração: `Diagnóstico de presença de marca.`
- **Subtítulo** — HOJE descreve a mecânica do formulário ("São 7 perguntas, nota de 0
  a 10 em cada uma, e um resultado na hora."). ENTRA descreve o que a pessoa leva:
  > Toda marca ocupa um espaço na cabeça do cliente. Responda em apenas um minuto, e
  > descubra em qual degrau a sua está hoje.
- **Linha de apoio** — sem alteração: `PRESENÇA GERA LEMBRANÇA. LEMBRANÇA GERA
  ESCOLHA. ESCOLHA GERA RESULTADOS.`

### Bloco educativo · novo

Entra entre o hero e a primeira pergunta. Cinco cards em linha no desktop, empilhados
no mobile. Estado neutro, nenhum aceso — o mesmo componente reaparece no resultado
com o degrau da pessoa aceso (um componente, dois estados).

**Título:** `Referência não é sorte. Ninguém chega ao topo de uma vez.`

**Texto de abertura:**
> No Brasil, a mídia exterior alcança 89% da população e é o segundo meio mais
> consumido do país. O espaço existe, e ele já está ocupado por alguém. A pergunta
> nunca foi se a sua marca pode ser vista, e sim quantas vezes ela já foi vista pela
> mesma pessoa, porque é a repetição que transforma quem viu em quem lembra.
>
> Toda empresa ocupa um degrau nessa escala, e cada degrau muda a forma como o
> cliente decide. Antes de responder, veja o caminho inteiro.

**Fonte** (corpo reduzido abaixo do bloco, obrigatória e sempre visível — o dado não
aparece em nenhum outro ponto da página): `Fonte: Kantar Ibope Media, Target Group
Index, 2024.`

**Os cinco cards:**

| Degrau | Nome | Linha |
|---|---|---|
| 1 | Existência | A empresa existe, e o mercado ainda não a enxerga. |
| 2 | Descoberta | As pessoas começam a conhecer, e esquecem rápido. |
| 3 | Reconhecimento | Já ouviram falar. Ainda não é a primeira escolha. |
| 4 | Preferência | Quando surge a necessidade, o seu nome vem antes. |
| 5 | Referência | A marca virou sinônimo da categoria. |

### As perguntas

Estrutura de grupos muda de 3 grupos/7 perguntas para 5 grupos/10 perguntas, duas em
cada. O rótulo lateral direito de cada grupo acompanha: `PERGUNTAS 01-02`, `PERGUNTAS
03-04` e assim por diante.

| Grupo | Perguntas |
|---|---|
| LEMBRANÇA | 01 a 02 |
| PERCEPÇÃO | 03 a 04 |
| PRESENÇA FÍSICA | 05 a 06 |
| FREQUÊNCIA | 07 a 08 |
| DISPUTA E MEMÓRIA | 09 a 10 |

#### Grupo 01 · Lembrança

**Pergunta 01**
HOJE: Sua empresa é facilmente lembrada? · Legenda: Quando alguém pensa no seu
segmento, seu nome aparece primeiro? · Âncoras: `NINGUÉM LEMBRA` · `LEMBRAM SEMPRE`
ENTRA: **Quando alguém pensa no seu segmento, a sua marca é lembrada?** · Legenda:
Antes de comparar preço, o cliente compara nomes que ele já conhece. · Âncoras:
`NUNCA LEMBRAM` · `LEMBRAM PRIMEIRO`

A pergunta de hoje e a legenda dizem a mesma coisa duas vezes. A nova sobe a legenda
para a pergunta e usa a legenda para dar contexto de decisão.

**Pergunta 02** — substituir
HOJE: Você é lembrado antes do concorrente? · Legenda: Na hora de decidir, seu nome
vem antes ou depois dos outros? · Âncoras: `SEMPRE DEPOIS` · `SEMPRE ANTES`
ENTRA: **A sua marca é conhecida além da sua base de clientes?** · Legenda: Fora de
quem já comprou, quantas pessoas sabem que a sua empresa existe? · Âncoras: `SÓ QUEM
JÁ COMPROU` · `MUITO ALÉM DA BASE`

A comparação com o concorrente não some, ela vai para a pergunta 09, onde tem
companhia. Aqui entra alcance, que hoje não é medido em lugar nenhum.

#### Grupo 02 · Percepção

**Pergunta 03** — substituir
HOJE: As pessoas encontram sua marca rapidamente? · Legenda: Site, mapa, redes, ponto
físico: quanto atrito existe até chegar em você? · Âncoras: `COM DIFICULDADE` · `NA
HORA`
ENTRA: **A sua marca parece do tamanho que ela realmente é?** · Legenda: Empresa
sólida que aparece pouco passa impressão de empresa pequena. · Âncoras: `PARECE
MENOR` · `PARECE DO TAMANHO`

A pergunta de hoje mede atrito de canal digital, que não é presença de marca e não é
o que a Outdoormídia resolve. Sai.

**Pergunta 04** — substituir
HOJE: Sua marca aparece com frequência? · Legenda: Frequência é o que transforma quem
viu uma vez em quem lembra. · Âncoras: `QUASE NUNCA` · `O ANO INTEIRO`
ENTRA: **O seu time comercial precisa explicar quem é a empresa antes de vender?** ·
Legenda: Quando a marca já chegou antes, a conversa começa na proposta e não na
apresentação. · Âncoras: `SEMPRE PRECISA EXPLICAR` · `JÁ CHEGAM SABENDO`

A pergunta de frequência não some, ela vira a 07 com as mesmas âncoras. Aqui entra a
leitura comercial, que é a dor mais concreta de quem responde.

#### Grupo 03 · Presença física

**Pergunta 05** — substituir
HOJE: Você acredita que sua empresa transmite autoridade? · Legenda: Onde e como você
aparece diz o tamanho que o mercado te atribui. · Âncoras: `NADA` · `MUITO`
ENTRA: **A sua marca está nos lugares onde o seu público circula?** · Legenda:
Avenidas, rodovias, shoppings, aeroporto. Onde a rotina dele acontece de verdade. ·
Âncoras: `NÃO ESTÁ` · `ESTÁ NO CAMINHO DELE`

"Transmite autoridade" é abstrato e a pessoa não sabe o que responder. A legenda de
hoje já apontava para lugar, então a pergunta passa a perguntar lugar.

**Pergunta 06** — substituir
HOJE: Sua comunicação é consistente? · Legenda: Mesma identidade, mesma mensagem, em
todos os pontos de contato. · Âncoras: `CADA HORA UMA` · `SEMPRE A MESMA`
ENTRA: **A sua marca é conhecida em toda a região onde você atende?** · Legenda:
Muita empresa é forte no bairro da sede e desconhecida a quinze minutos dali. ·
Âncoras: `SÓ ONDE FICA A SEDE` · `EM TODA A REGIÃO`

Consistência de identidade é trabalho de agência de branding, não de mídia exterior.
Diagnosticar o que a empresa não vende gera lead que a Outdoormídia não atende.

#### Grupo 04 · Frequência

**Pergunta 07** — substituir
HOJE: Você investe continuamente em posicionamento? · Legenda: Investimento contínuo
ou só em campanha pontual e sazonal. · Âncoras: `SÓ EM CAMPANHA` · `CONTINUAMENTE`
ENTRA: **A sua marca aparece o ano inteiro?** · Legenda: Ou aparece em campanha
pontual e some no resto do calendário. · Âncoras: `SÓ EM CAMPANHA` · `O ANO INTEIRO`

Mesma medida, sem a palavra "posicionamento", que o anunciante médio não usa e cada
um entende de um jeito.

**Pergunta 08** — nova
ENTRA: **Quem nunca ouviu falar de você esbarraria na sua marca esta semana?** ·
Legenda: Não em uma busca, porque quem busca já conhece. No trajeto de carro, na fila
do shopping, na estrada. Descoberta acontece sem intenção. · Âncoras: `PASSARIA
LONGE` · `VERIA VÁRIAS VEZES`

#### Grupo 05 · Disputa e memória

**Pergunta 09** — nova
ENTRA: **A sua marca tem tanta visibilidade quanto os seus principais
concorrentes?** · Legenda: Na mesma praça, quem aparece mais: você ou eles? ·
Âncoras: `ELES APARECEM MAIS` · `APAREÇO MAIS`

Recupera a comparação que hoje está na pergunta 02.

**Pergunta 10** — nova
ENTRA: **Se parasse de anunciar hoje, a sua marca continuaria lembrada nos próximos
meses?** · Legenda: Exposição some quando para. Memória fica. · Âncoras: `SUMIRIA
RÁPIDO` · `CONTINUARIA LEMBRADA`

É a pergunta mais forte do formulário e fica em último de propósito. Ela desconforta
no exato momento em que a pessoa clica para ver o resultado.

### Barra parcial

Componente fixo mantido, só os textos mudam.

- Contador do topo — HOJE `0 DE 7 RESPONDIDAS` → ENTRA `0 DE 10 RESPONDIDAS`
- Texto da barra preta — HOJE "Comece pela primeira pergunta; o resultado aparece
  quando as 7 estiverem respondidas." → ENTRA "Comece pela primeira pergunta. O seu
  degrau aparece quando as 10 estiverem respondidas." (sai o ponto e vírgula, entra
  ponto; "resultado" vira "degrau", que é o que a página passa a entregar)
- Botão — sem alteração: `Ver meu resultado`

**Bug a corrigir (bloqueia publicação):** hoje a barra preta fixa cobre o parágrafo
de introdução logo acima do primeiro grupo — o texto aparece cortado ao meio na
primeira dobra. A barra precisa respeitar o conteúdo abaixo dela, sem sobrepor texto
em nenhuma posição de rolagem. Com o bloco educativo novo entrando nessa mesma
região, isso precisa estar resolvido antes de publicar.

### Resultado

**Faixas** — de 3 para 5 degraus. Com 10 perguntas de 0 a 10, o resultado é a soma
crua, sem normalização e sem regra de três.

| Degrau | Faixa | Nome |
|---|---|---|
| 1 | 0 a 20 | Existência |
| 2 | 21 a 40 | Descoberta |
| 3 | 41 a 60 | Reconhecimento |
| 4 | 61 a 80 | Preferência |
| 5 | 81 a 100 | Referência |

(HOJE, para referência: 0–40 Empresa invisível · 41–70 Empresa conhecida · 71–100
Empresa presente.)

**Nomenclatura do resultado** — hoje o card traz só o nome do estado (`EMPRESA
CONHECIDA`). Entra título com o degrau, subtítulo com a frase dura. Exemplo, degrau
2:
> `Degrau 2 · Descoberta`
> **Sua marca aparece, e depois some.**

**Corpo do resultado** — os cinco blocos de degrau, três parágrafos cada, conforme
`claude/copy-diagnostico-presenca.md`, item 05 (arquivo ainda não entregue).
**Face Única aparece uma única vez em toda a página, no degrau 3** — não repetir nos
outros quatro.

**Cards de faixa abaixo do resultado** — de três cards (o do meio aceso) para cinco
(o do degrau da pessoa aceso, os outros quatro apagados). Mesmo componente do bloco
educativo, mesmas cinco linhas curtas.

### Linha de ponto frágil · manter e expandir

Hoje a página já traz `Seu ponto mais frágil hoje é "Sua empresa é facilmente
lembrada"` e encerra ali. Entra a mesma mecânica, agora com três linhas e um botão:

> Seu ponto mais frágil hoje é **"[pergunta]"**.
> [diagnóstico]
> [CTA contextual]
> Botão: `Falar com um especialista →`

O texto do diagnóstico e do CTA de cada uma das dez perguntas está em
`claude/copy-diagnostico-presenca.md`, item 06. O botão é o mesmo nas dez.

- **Regra de seleção:** a pergunta com a menor nota; em caso de empate, vale a de
  número menor.
- **Comportamento:** a frase aparece dentro do bloco de resultado, sem marcação
  visual no formulário.
- **Bloqueia publicação:** confirmar que as quatro páginas de destino dos CTAs
  contextuais existem — `Regiões e cobertura`, `Plataformas`, `Projetos Icônicos` e
  `Guia do Anunciante`.

### CTA de fim de página · novo

Hoje a página encerra direto no rodapé, sem bloco de saída. Entra:

**Título:** `Subir de degrau é decisão de mídia.`

**Corpo:**
> Presença não se constrói com uma campanha. Se constrói aparecendo onde o seu
> público passa todo dia, o ano inteiro. É isso que a Outdoormídia faz há 67 anos em
> Curitiba, Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário
> Camboriú.

- Botão primário: `Falar com um especialista →`
- Botão secundário: `Ver o Guia do Anunciante →` — destino
  `/area-do-anunciante/guia-do-anunciante`
- Linha de saída, abaixo dos botões: "Quer ver como a sua marca ficaria em um painel
  antes de conversar? Monte a simulação em **Sua marca no OOH**."

Este bloco substitui o `NovaCampanha` compartilhado nesta página específica — a
ferramenta fecha com o próximo passo dela, não com o CTA genérico do site.

### Captura de e-mail · novo

Entra depois do resultado aparecer, nunca antes.

> `Quer receber esse diagnóstico por e-mail?`
> Campo: `Seu melhor e-mail` · Botão: `Enviar`

Opcional, sem bloqueio do resultado, sem checkbox pré-marcado. **Nunca pedir e-mail
antes de mostrar o degrau** — formulário de um minuto com muro no fim perde o lead e
queima a ferramenta.

### Menu de rodapé · corrigir

Três itens da coluna `ÁREA DO ANUNCIANTE`:

| HOJE | ENTRA |
|---|---|
| Midia Kit | **Guia do Anunciante** |
| Simulador OOH | **Sua marca no OOH** |
| Diagnóstico de presença | sem alteração |

As duas renomeações valem para header, rodapé, breadcrumb e qualquer link interno —
implica renomear as rotas hoje em `app/anunciante/midia-kit/` e
`app/anunciante/simulador/` (e o próprio `app/anunciante/` → `app/area-do-anunciante/`,
com `app/diagnostico/` passando para dentro dela) quando esta implementação entrar.

### Sem alteração

Header · Botão WhatsApp · Rodapé (fora dos dois itens renomeados acima) · Título do
hero · Linha de apoio do hero · Componente de slider · Botão "Ver meu resultado".

### Números válidos nesta página

- **89% da população brasileira** alcançada pela mídia exterior, segundo meio mais
  consumido do país — uma única aparição, no bloco educativo, sempre com a fonte
  visível. Fonte: Kantar Ibope Media, Target Group Index, 2024
- **67 anos**, fundada em 1959
- Praça oficial completa, texto verbatim

Nenhum dado de audiência, alcance ou preço sobre a marca do lead — o diagnóstico
reflete a autoavaliação de quem responde, ele não mede nada.

### Pendências deste checklist

**Bloqueia a publicação:**
- Sobreposição da barra parcial fixa sobre o texto abaixo dela (ver Barra parcial)
- Existência das quatro páginas de destino dos CTAs contextuais (ver Linha de ponto
  frágil)

**Não bloqueia, mas precisa de decisão do Erik:**
- Slider com valor inicial nulo — começando em 0, ele conta como resposta e entrega
  degrau errado para quem pular pergunta
- Integração do e-mail capturado com o Agendor — tem API REST pública e aceita
  webhook, o lead pode entrar direto como pessoa ou negócio, sem planilha no meio;
  falta confirmar viabilidade e quem gera o token
- Corrigir no PDF do Método Presença: consta 8 plataformas, a base oficial registra 9

---

## Conteúdo — Empresa

### Dados Fundamentais

- **Fundação:** 1959
- **Mercado:** Out of Home (OOH) — mídia exterior
- **Cobertura:** PR + SC (Sul do Brasil)
- **Números:** +530 milhões de impactos/mês, 175 telas digitais com 20 milhões de impactos semanais, 9 plataformas, 312 m² no Aeroporto Square e 577,5 m² no Distrito de Mídia Duo Square
- **WhatsApp comercial:** `https://wa.me/5541998350210`

### Produtos

**Catálogo — 8 plataformas** (`lib/platforms.js`), na ordem em que aparecem na listagem:

1. **Outdoor Digital** — 175 telas LED, 20 milhões de impactos semanais, sem produção de lona
2. **Front Light** — outdoor 18m² (6×3m horizontal / 3,5×5m vertical), maior volume
3. **Mídia Indoor** (slug `shoppings`) — Mueller, São José, Park Shopping Boulevard (100% digital, totens e painéis)
4. **Aeroporto** — Distrito de Mídia Duo Square, 577,5 m², 5 telas de LED e 10 frontlights na única via de saída; abriga o Aeroporto Square, painel híbrido de 312 m² (maior do Sul)
5. **Mídia Móvel** — ativações em praias, parques, calçadões (onde OOH fixo não chega)
6. **MUB** — 77 locais, 6 circuitos segmentados, 13M impactos/mês
7. **Rodovias** — 100 ativos, 12×4m e passarelas 10×3m
8. **Digital Signage** — painel exclusivo do anunciante (fachada, posto, passagem), sob o Gestão 360 OM. `semEstimativa: true` o mantém fora do simulador: painel sob medida não tem CPM de tabela

O nome exibido e o slug divergem em **Mídia Indoor**: a rota segue
`/plataformas/shoppings` de propósito, para não quebrar links nem os cases já
gravados com esse slug. **Gentileza Urbana** saiu do catálogo de plataformas (segue
viva como diferencial) — a rota de plataforma 404 e a
menção em `lib/esg.js` passou a apontar para o MUB.

Na listagem (home e `/plataformas`) os **Icônicos** abrem a lista, na 1ª
posição, levando ao hub dos 3 projetos — são 9 entradas ao todo, o número que a
home anuncia nos big numbers. Quem monta
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

### Regras de Copy — site inteiro

Vieram dos checklists de aplicação do cliente em `claude/` (home e Sobre nós,
fechados em 25/08/2026, e o do Diagnóstico de Presença) e valem para qualquer
copy nova do site inteiro, não só das páginas de origem. Regra de texto **visível ao
usuário nas páginas** — não se aplica a este documento nem a comentários/código:

- Não usar o termo **malha**. Substituir por **rede** ou **operação**
- Nome da empresa sempre **Outdoormídia**, junto e com acento. Nunca "Outdoor Mídia"
- Preto não faz parte da paleta. Única exceção autorizada: o card de Mídia Programática
- Números que saíram de circulação, e não podem voltar a nenhuma página: 380 milhões
  de impactos/mês · 82 equipamentos · 138 telas · 159 telas · +22 milhões de impactos
  semanais · 77 locais e 13 milhões no MUB · 100 ativos em rodovias · 7 ou 8
  plataformas · 65 ou 66 anos. Os válidos estão em **Conteúdo — Empresa**
- **Não usar travessão** em nenhuma copy do site. Reescrever a frase ou usar vírgula,
  dois pontos ou ponto
- Nomenclatura sempre completa e oficial — nunca abreviar ou apelidar nome de projeto
- Grafia oficial do CEO: **Halisson Pontarola**, com H

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

- Mensagens fixas (constantes): flutuante, Cobertura e as portas 03 e 04 da Nova
  campanha (`WA_PROGRAMATICA`, `WA_ATENDIMENTO_AGORA`). Cobertura e programática
  trazem campos a preencher (praça, período) — são os CTAs de maior intenção. O
  CTA do Header deixou de ser WhatsApp: leva a `/#nova-campanha`.
- A "Mídia Programática" é o único CTA que **não** vai para o comercial da
  Outdoormídia: usa `waLinkMercadoOoh()`, que aponta para o número da MercadoOOH
  (`MERCADOOH_WHATSAPP_URL` em `lib/constants.js`).
- `waLinkPorPraca()` aceita uma praça ou a lista do qualificador, que é de
  seleção múltipla: só roteia para o comercial de SC quando tudo o que foi
  marcado é de Santa Catarina.
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