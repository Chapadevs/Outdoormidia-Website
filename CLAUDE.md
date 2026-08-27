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
- **Ícones:** `lucide-react` — biblioteca de ícones escolhida pela Imagine Concept. Import direto do componente, sem SVG gerado à mão e sem sprite
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
- **`Accordion`** (`components/ui/Accordion.jsx`) — acordeão controlado do FAQ; o pai guarda o `openIndex` porque precisa da pergunta aberta para montar o link de WhatsApp. A resposta pode ser string ou lista de parágrafos, aceita `**negrito**` no meio do texto, e `fonte` sai em corpo reduzido abaixo dela
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
- Ícone (`lucide-react`): `size={20}` em chip e faixa, `size={24}` em card; stroke
  padrão da lib, sem `strokeWidth` customizado. Cor no laranja da marca sobre fundo
  claro; sobre laranja, sobre `--ink` ou em chip marcado ele herda o branco do texto,
  porque laranja sobre laranja some. Ícone decorativo não leva rótulo: o lucide já
  marca `aria-hidden` sozinho quando não recebe prop de acessibilidade

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
  area-do-anunciante/     — hub + melhores-praticas/, sua-marca-no-ooh/,
                            diagnostico-de-presenca/ e faq/
  blog/                   — hub (portas Cases e Artigos + destaque), artigos/ e [slug]
  cases/                  — listagem com filtro por tag (ISR 300)
  plataformas/            — índice + [slug] das 8 plataformas; projetos-iconicos/ (hub + [slug])
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
  forms/                  — 10 formulários (públicos + editores do admin)
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
  faq.js                  — as 19 perguntas com categoria e resposta em parágrafos;
                            PERGUNTAS_HOME é a seleção de 8 da home, em ordem própria
  sobre.js                — marcos da linha do tempo; midiakit.js — materiais para download
  diferenciais.js         — diferenciais: resumo dos cards + página dedicada. `publicado: false`
                            mantém a entrada escrita e fora do ar
  simulador.js            — parâmetros da estimativa de campanha (impactos, CPM)
  locations.js            — praças; mapShapes/mapProjection alimentam o CoverageMap
public/media/             — video-hero.mp4 (fundo do Hero), logo.png (wordmark branco,
                            recolorido por mask no primitivo .logo-mark)
scripts/                  — seed-admin, migrate-tags-scope, generate-map-paths
claude/                   — checklists de aplicação entregues pelo cliente, fonte da
                            copy oficial: checklist-home.md (home, 25/08/2026, revisado
                            em 26/08/2026),
                            checklist-sobre-nos.md (25/08/2026), checklist-faq.md
                            (26/08/2026), icones-nova-campanha.md (mapa de ícones
                            da Imagine) e copy-diagnostico-presenca.md. Não é
                            código; é o que manda quando divergir deste documento
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
| Big numbers da marca — 4 números (`StatGrid`): 9 plataformas, 312 m² do Aeroporto Square, +530M impactos/mês e a rede DOOH de 175 telas. A lista vive em `lib/numeros.js` e alimenta as três páginas que a exibem: a home e `/sobre` pelo `Institutional`, e `/trabalhe-conosco` pelo `Culture`. Fonte única de propósito — foi cópia por página que produziu os 380 milhões e os 82 equipamentos que saíram de circulação | `lib/numeros.js`, `components/sections/Institutional.jsx`, `components/sections/Culture.jsx` |
| Copy oficial do cliente (COPY_SITE) aplicada em menu, hero, esteira, institucional, diferenciais, plataformas, cobertura, depoimentos, Gestão 360 OM, nova campanha, FAQ e rodapé | home, `lib/faq.js`, `lib/platforms.js`, `lib/diferenciais.js` |
| Nova campanha — bloco laranja com as 4 portas, na hierarquia do checklist da home: Diagnóstico como faixa fina, Formulário como card dominante branco e elevado, Mídia Programática (preto, exceção autorizada à paleta) e Atendimento como cards menores. A diferença de área é o que impede o Diagnóstico de roubar o clique do formulário. Substituiu o `LeadCta` em todas as páginas; `#formulario` segue valendo como âncora | `components/sections/NovaCampanha.jsx` |
| Nova campanha — revisão de 26/08: kicker `NOVA CAMPANHA` acima do título (sem ele a caixa laranja abria direto no `h2` e o visitante não sabia que aquilo é o formulário principal do site) e o subtítulo volta a ser "Você entende do seu negócio…", que estava aberto em Plataformas. A frase não pode viver nos dois lugares | `components/sections/NovaCampanha.jsx`, `components/sections/PlatformsCarousel.jsx` |
| Anatomia das portas — ícone em quadrado claro arredondado, numeração, nome em destaque, linha de intenção e chevron circular à direita. O chevron é a seta da linha de intenção promovida a elemento, por isso ela não termina mais em "→" | `components/sections/NovaCampanha.jsx` |
| Plataformas — abertura própria ("Algumas campanhas precisam aparecer. Outras precisam ser impossíveis de ignorar."), que enquadra a amplitude do portfólio e justifica nove plataformas em vez de uma | `components/sections/PlatformsCarousel.jsx` |
| Qualificador — 6 etapas, resumo acumulado com `EDITAR`, barra `X de 6`, convite ao Diagnóstico só para quem marca "Ainda não sei" no objetivo, celular oculto quando a preferência é e-mail, e microcopy dizendo o que falta em vez de asterisco vermelho. Grava o lead antes do redirecionamento ao WhatsApp, com campanha de origem (querystring) e página de origem no payload | `components/forms/QualifierForm.jsx`, `lib/leads/origens.js` |
| Ícones da Nova campanha — mapa da Imagine Concept aplicado nos 3 cards (Diagnóstico, Mídia Programática, Atendimento) e nas 5 etapas de opção do qualificador, 35 ícones ao todo. A etapa de contato não leva ícone, por regra do documento. As opções deixaram de ser lista de string e viraram `{ label, Icone }`; `label` segue sendo o valor da resposta, então resumo, lead e mensagem de WhatsApp não mudaram | `claude/icones-nova-campanha.md`, `components/forms/QualifierForm.jsx`, `components/sections/NovaCampanha.jsx` |
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
| Filhas de Sobre nós — Ambiental, Social e Governança com a copy dos checklists de 25/08/2026. Ambiental: "O que já é realidade" (Praça de Carregamento Elétrico, Praça Pet Batel e Jardim Vertical, cada card abrindo pelo endereço), "O ciclo da lona" e "Como a operação reduz impacto". Social: Corajosamente Éticos, Loja OM do Bem com a Caminho do Renascer e a Mídia Regenerativa. Governança: "Quem responde" (retrato do CEO, texto institucional) e os 5 pilares. Saíram todos os cards de meta vazia, "em breve" e certificação não confirmada | `app/sobre/{ambiental,social,governanca}/`, `lib/esg.js` |
| Hub Soluções + Diferenciais + Regiões | `app/solucoes/`, `lib/diferenciais.js` |
| Páginas dos diferenciais (SSG) — mesma estrutura, conteúdo por slug. `publicado: false` tira do ar sem apagar o texto. Toda seção abaixo do "o que é" é opcional e some quando o campo não existe: "A prova", "Aplicação prática", a comparação e o mini-case. A numeração das seções é calculada em cima do que sobrou, para não abrir buraco. Também são opcionais `aside.footer`, os cards do "o que é" (com `cardsTitle` próprio), a capa do topo (`image`) e a da seção 01 (`oQueE.image`), e o `lead` aceita string ou lista de parágrafos. O CTA secundário do topo vem de `ctaSecundario` quando existe; sem ele, cai na âncora de "Aplicação prática" como antes | `app/solucoes/diferenciais/[slug]/`, `lib/diferenciais.js` |
| Diferencial 01 · Face Única — checklist de 27/08/2026. "O que é" com o texto oficial do PDF Conceito Face Única em dois parágrafos e os 3 benefícios como card; "A prova", "Aplicação prática" e o mini-case saíram; a comparação virou **Amador / Especialista** em foto, em seção própria (`#comparacao`), com a nota de rodapé que vale só para o lado Amador, que é mockup. O CTA "Ver na prática" do topo, órfão com a saída de "Aplicação prática", passou a apontar para a comparação | `lib/diferenciais.js` |
| Diferencial 02 · Aeroporto Square — versão curta de 27/08/2026: só argumento de diferenciação, nenhum número de rede e nenhuma localização, porque os dois também aparecem na plataforma Aeroporto e divergiriam ali. O CTA secundário leva a `/plataformas/aeroporto`. O slug virou `aeroporto-square`; `/solucoes/diferenciais/painel-hibrido` segue como redirect permanente | `lib/diferenciais.js`, `next.config.mjs` |
| Teaser de "Outros diferenciais" usa o texto canônico do hub — o card lê `text`, o mesmo campo que monta o card na home e na listagem, em vez do `resumo`. `resumo` continua sendo a linha do `llms.txt` | `app/solucoes/diferenciais/[slug]/page.js` |
| Área do anunciante (hub + 4 ferramentas) — checklist de 26/08/2026 aplicado: os 4 cards ganharam ícone `lucide-react` em laranja (medidor, painel, lâmpada e interrogação) e textos novos. Saíram o kicker `Downloads` e a promessa de impactos e faixa de investimento do card de Sua marca no OOH: a ferramenta aplica logo ou peça sobre a foto real do painel, e nada além disso. O kicker do FAQ conta as perguntas de `lib/faq.js` em vez de trazer o número na mão | `app/area-do-anunciante/page.js` |
| Simulador de campanha (estimativa de impactos e CPM) | `app/anunciante/simulador/`, `lib/simulador.js` |
| Melhores Práticas — nome final do antigo Mídia Kit, fechado no checklist da home de 26/08. Rota, rótulo, breadcrumb, metadata e todo link interno renomeados; `/anunciante/midia-kit` e `/area-do-anunciante/guia-do-anunciante` (nome intermediário que chegou a ir ao ar) seguem como redirect permanente | `app/area-do-anunciante/melhores-praticas/`, `lib/midiakit.js`, `next.config.mjs` |
| FAQ — checklist do cliente aplicado (26/08/2026): 19 perguntas nos mesmos 4 grupos, com as quatro do Marcelo (empresa pequena, mídia exterior vs redes sociais, ponto específico, o que está incluso no valor) e a home com uma seleção própria de 8, na ordem do documento. "Todos os painéis são iluminados?" saiu, absorvida pela pergunta de diferença entre formatos | `components/sections/Faq.jsx`, `FaqCategorias.jsx`, `PlatformFaq.jsx`, `lib/faq.js` |
| Resposta do FAQ em parágrafos — `a` é lista, `fonte` é a linha de atribuição em corpo reduzido abaixo dela, e o `Accordion` aceita `**negrito**` no meio do parágrafo. As FAQs das plataformas seguem passando `a` como string | `components/ui/Accordion.jsx`, `lib/faq.js` |
| Avaliações de clientes — três cards 9:16 com capa, badge de duração, citação sobre o gradiente e modal de vídeo. O card 03 é título editorial, sem aspas: entre aspas viraria fala fabricada. Vídeos e capas em `TODO(cliente)`; sem eles o card cai no painel bege, sem botão de play | `components/sections/Reviews.jsx` |
| Banco de talentos — sem formulário no site desde 25/08/2026: a seção traz o texto, o botão **Preencher cadastro** (Google Forms do cliente, nova aba) e o e-mail do RH como alternativa. As respostas caem direto no Drive do cliente, sem formulário, validação, armazenamento nem envio do nosso lado; as áreas de atuação vivem dentro do formulário, não na página. Nenhuma promessa de prazo de resposta ou de validade do cadastro, porque não há processo definido para isso | `components/sections/BancoDeTalentos.jsx`, `TALENTOS_FORM_URL` em `lib/constants.js` |
| Diagnóstico de marca (quiz) | `app/diagnostico/`, `lib/diagnostico.js` |
| Mapa de praças (SVG, dados IBGE) | `components/ui/CoverageMap.jsx`, `lib/mapShapes.js` |
| Painel admin (leads, posts, cases, locations, tags) | `app/admin/`, `app/api/admin/` |
| Leads gravados no Firestore — `/proposta` e o qualificador do `NovaCampanha` gravam na coleção `leads`; o campo `origem` discrimina o fluxo. Única rota `POST` pública do site (honeypot + tetos de tamanho, sem `requireAdmin`) | `lib/leads/`, `app/api/leads/route.js` |
| Área de Leads no admin — listagem com filtro por origem/status, tela de detalhe com tudo o que o cliente enviou e acompanhamento comercial (novo / contatado / descartado) | `app/admin/(dashboard)/leads/`, `components/widgets/LeadStatusSelect.jsx` |
| Breadcrumb em todas as páginas | `components/ui/Breadcrumb.jsx` |
| Páginas de sistema — `/obrigado` (noindex), `/privacidade`, `/termos` e 404 | `app/obrigado/`, `app/privacidade/`, `app/termos/`, `app/not-found.js` |
| Textos legais data-driven (LGPD + Termos) num renderizador só | `lib/legal.js`, `components/ui/LegalDoc.jsx` |
| Formulários levam a `/obrigado` — URL de conversão, briefing pelo `sessionStorage` | `ProposalForm`, `components/widgets/ObrigadoCta.jsx` |
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
| Envio de e-mail nos formulários | Falta integrar Resend. `ProposalForm` e o qualificador já gravam em `leads` — o comercial vê tudo em `/admin/leads` —, mas ninguém é **avisado**: só descobre entrando no painel. A copy de `/obrigado?origem=proposta` foi escrita quando nada era guardado e ainda não promete guarda; pode ser revista |
| Leads do Diagnóstico e do Simulador | Os dois fluxos são anônimos hoje (o diagnóstico só tem 7 notas, o simulador só 4 selects) — gravar exige antes decidir um passo de contato. `lib/leads/origens.js` já nasceu preparado: basta uma entrada nova no mapa para a validação, a listagem e o detalhe passarem a aceitá-los |
| Página de case individual (`/cases/[slug]`) | Não existe; só a listagem. `isCaseSlugTaken` mantém o slug único de propósito, para a página poder ser criada depois sem colisão |
| Arquivos do Mídia Kit | As páginas existem; falta o cliente entregar PDFs e assets (`lib/midiakit.js`) |
| Números oficiais do simulador | `lib/simulador.js` usa ordem de grandeza estimada — falta CPM e alcance por plataforma |
| Imagens de Ambiental / Social / Governança | Toda a copy dos três checklists está aplicada; falta a foto. Ambiental: os 3 cards de "O que já é realidade" (a Praça de Carregamento Elétrico é a única sem foto disponível, e é o **único item que bloqueia a publicação** — a página segue com `robots: noindex` até ela chegar; Praça Pet Batel e Jardim Vertical têm foto no SharePoint do cliente). Social: Loja OM do Bem, Caminho do Renascer (exige autorização de uso de imagem da ONG; criança só com autorização escrita dos responsáveis) e Mídia Regenerativa. Governança: retrato profissional do Halisson Pontarola, fundo neutro, meio corpo, olhar para a câmera — não serve recorte de foto de evento |
| Governança — declaração em primeira pessoa | O bloco "Quem responde" está no ar com o texto institucional, e a legenda da foto identifica o CEO **sem ser assinatura**. A versão em primeira pessoa (com "nunca mudou de dono") está no checklist e só entra com a aprovação do Halisson. Na troca, o texto institucional sai, o texto em primeira pessoa entra e a legenda vira assinatura; o layout não muda |
| Governança — validação jurídica em paralelo | Não bloqueia a publicação (decisão de 25/08/2026), mas 4 afirmações precisam de confirmação com a Alexandra e o jurídico: licença municipal para todas as faces e quem guarda, cláusula de exclusividade na minuta de contrato, existência de código de conduta escrito, e se a afirmação de métricas agregadas e anônimas se sustenta sob LGPD (a de maior exposição da página) |
| Governança — WhatsApp do CTA de documento | O CTA usa o número geral (41 99835-0210). A base do cliente traz 41 99275-1065 para Curitiba e Região e 47 99132-9771 para Santa Catarina. Falta confirmar qual atende documentação e cadastro antes de trocar |
| Conteúdo do Podcast | Estrutura no ar em `/blog/podcast` com episódios de exemplo em `lib/podcast.js` sob `TODO(cliente)`. Falta gravar os episódios e preencher o campo `audio`; a página está com `robots: noindex` até lá |
| Retaxonomia das plataformas (22 produtos sob 9 formatos) | Catálogo em 8 na ordem final, com Rodovias e Digital Signage criados, Shoppings renomeado para Mídia Indoor e Gentileza Urbana removida do catálogo; Projetos Icônicos abrem a listagem como entrada única (9 no total). Falta desdobrar os 22 produtos sob os formatos. Rodovias e Digital Signage estão com o descritivo mínimo sob `TODO(cliente)` |
| CPM de referência | Fechado no que sai: o R$ 2,06 em rodovias saiu de circulação em 26/08/2026, sem fonte identificada em nenhum material do projeto. Falta o comercial validar um CPM — quando validar, ele entra em `lib/simulador.js` (hoje R$ 8 a 14, ordem de grandeza estimada) e volta para a resposta de custo em `lib/faq.js` |
| FAQ sem a pergunta de antecedência | Única das 20 do checklist que não subiu: dois dos três parágrafos vieram marcados AGUARDANDO DADO (prazo para subir criativo em LED · prazo de produção e instalação de lona). Só o de rodovia sob demanda está fechado, em 15 meses. Quando o dado vier, ela entra em segundo lugar em Contratação e a página passa de 19 para 20 — a home não muda, porque ela já fica fora da seleção de 8 |
| FAQ da home — dois checklists divergem | O checklist da home (item 12) e o checklist do FAQ (item 06) mandam oito perguntas cada, e as seleções não têm nada em comum além de custo, duração e comprovação. Vale o do FAQ, que é o documento dedicado ao escopo e diz explicitamente "SUBSTITUIR SELEÇÃO"; o da home também fala em "todas as 18" perguntas, contagem que o do FAQ levou a 20. Confirmar com o cliente que a home fica com a seleção do checklist do FAQ |
| Conteúdo de Melhores Práticas | Falta a Alexandra liberar a copy. O nome mudou, o conteúdo não. A decisão de 26/08 diz que Mídia Kit saiu justamente porque **não haverá arquivo para download**, e que a página passa a trazer recomendações de como anunciar melhor. Hoje ela ainda é a lista de PDFs de `lib/midiakit.js`, com o eyebrow "Downloads", e o FAQ já promete ao visitante "conteúdos e recomendações sobre como escolher praça, formato e período". Falta o cliente entregar essa copy: nenhum checklist trouxe o texto da página |
| FAQ — o que está incluso no valor | A base não registra se produção da lona e instalação entram no valor da campanha. Se entrarem, vão para a lista do primeiro parágrafo; se não, para a exceção do segundo. São os dois itens que o anunciante mais teme receber como extra |
| FAQ — escopo de "donos dos pontos" | "Operamos estrutura própria, sem ativos de concessão" está dito de forma geral, mas MUB é mobiliário urbano e banca e relógio digital costumam existir por concessão municipal. Se for o caso, a frase precisa ficar restrita ao Aeroporto, que é o próprio exemplo que ela dá |
| FAQ — fluxo de ponto específico | A resposta de "Posso escolher um ponto específico?" é genérica de propósito: o fluxo real do comercial para quem chega com a foto de um painel no celular não está documentado. Confirmar se aceita foto e endereço, se oferece alternativa no mesmo trajeto e se existe fila de espera |
| Portas 03 e 04 da Nova campanha | Mídia Programática e Atendimento automatizado ainda caem no WhatsApp (MercadoOOH e comercial). Falta o cliente dizer se existe plataforma de espaços disponíveis e atendimento automatizado de verdade — ver `WA_PROGRAMATICA` e `WA_ATENDIMENTO_AGORA` |
| Mídia Regenerativa sem prova | Está no ar sem os números de "A prova" e sem mini-case; as seções são omitidas até o dado chegar. Aeroporto Square saiu desta linha: lá a ausência é decisão de 27/08/2026, não falta de dado |
| Fotos dos diferenciais 01 e 02 | **Bloqueia a publicação das duas páginas.** Face Única: 3 fotos (capa do topo e os dois lados da comparação, Amador e Especialista). As duas do PDF Conceito Face Única servem como referência de enquadramento; confirmar se entram como estão ou se precisam de captação nova. Aeroporto Square: 2 fotos (capa do topo e a da seção "O que é", ilustrando o conceito híbrido). Regra da base para todas: foto real, painel 100% limpo e visível, sem filtro ou IA que altere cor ou proporção, sem fio elétrico na frente, produto nunca cortado |
| Depoimentos — autorização | Os 3 depoimentos da home são reais e identificam pessoa e marca (Claro, Agência Verbal, Cia do Pastel). Confirmar autorização de uso antes de publicar |
| Conteúdo dos Projetos Icônicos | `lib/iconicos.js` está sob `TODO(cliente)`: falta o descritivo oficial de Elegancy/Urbanity/Urbanity Light, as medidas de cada estrutura (os cards de formato hoje descrevem sem cravar dimensão), as praças instaladas e a foto de cada card (`image`, 16/9, ≥1600px) — sem ela o card cai num painel escuro com o nome |
| Foto das plataformas no carrossel da home | `PLATFORMS_LISTAGEM` já carrega o campo `image` (16/9, ≥1600px), mas nenhuma das 9 entradas tem foto — todos os cards caem no painel bege com o nome. É o que falta para a seção ficar apresentável |
| Imagens de Sobre nós | `TODO(Imagine)` em três pontos: capa do topo (`CAPA` em `app/sobre/page.js`), uma imagem por marco da linha do tempo (`image`/`imageAlt` em `lib/sobre.js`) e uma por card de Nosso compromisso. Enquanto forem `null` nada é renderizado no lugar — painel bege vazio na primeira dobra é pior que capa nenhuma |
| Vídeos dos depoimentos | `components/sections/Reviews.jsx` tem a estrutura do card de vídeo pronta (capa, badge de duração, play laranja, modal com som ligado). Faltam os três arquivos 9:16 com legenda embutida e as capas estáticas. Sem eles o card mostra a citação sobre o painel bege, sem play |
| Telefone comercial de Santa Catarina | `lib/empresa.js` tem `telefoneSc` vazio sob `TODO(cliente)`. Quando o número chegar, o rodapé e o JSON-LD passam a mostrar os dois sozinhos |
| Blog na home — sistema de cor por tipo | O checklist da home pede Case preto, Podcast cinza e Artigo branco no teaser. Depende de duas decisões que ainda não vieram: quais cards entram no lançamento (o teaser hoje só lista artigos) e como o card preto convive com a regra de paleta, que só abre exceção para o de Mídia Programática |
| Conteúdo do blog para o lançamento | Um artigo só, com erro de título (`Porque` → `Por que`) e assinatura "Shunda" sem autor identificado. O checklist da home exige três artigos com autoria antes de publicar. É conteúdo no Firestore, corrigido pelo `/admin`, não pelo código |
| **Sua marca no OOH — a página não faz o que o card promete** | **Bloqueia a publicação da Área do anunciante.** O checklist de 26/08/2026 reescreveu o card para uma ferramenta de pré-visualização: escolher praça e formato, subir a logo ou a peça pronta e ver a marca aplicada na foto do painel real, com download da imagem. A página em `app/area-do-anunciante/sua-marca-no-ooh/` continua sendo o simulador de impactos e CPM (`SimuladorForm`, `lib/simulador.js`), que é justamente o que o checklist tirou de circulação por não ter lastro. Hoje o card promete pré-visualização e entrega calculadora, o espelho do problema que o checklist quis resolver. Ou a ferramenta é reescrita, ou o card volta ao texto antigo |
| Aviso de tratamento de dados no Google Forms | O cadastro do banco de talentos coleta nome, e-mail, WhatsApp e link de portfólio, e o formulário não traz aviso de tratamento de dados no cabeçalho. É alteração dentro do próprio Google Forms, não no código. Confirmar também que o `rh@outdoormidia.com.br` está ativo e monitorado |
| `/obrigado?origem=talentos` ficou órfã | Com a saída do formulário de talentos, nada mais leva a essa URL: a entrada em `lib/obrigado.js` e o ramo de `ObrigadoCta` seguem no ar sem produtor. Não quebra nada e o `MAILTO_RH` que ela oferece agora aponta para o RH, mas é código sem caminho de chegada |
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
  `Melhores Práticas`.

### CTA de fim de página · novo

Hoje a página encerra direto no rodapé, sem bloco de saída. Entra:

**Título:** `Subir de degrau é decisão de mídia.`

**Corpo:**
> Presença não se constrói com uma campanha. Se constrói aparecendo onde o seu
> público passa todo dia, o ano inteiro. É isso que a Outdoormídia faz há 67 anos em
> Curitiba, Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário
> Camboriú.

- Botão primário: `Falar com um especialista →`
- Botão secundário: `Ver as Melhores Práticas →` — destino
  `/area-do-anunciante/melhores-praticas`. O checklist do Diagnóstico ainda escreve
  "Guia do Anunciante", nome que a revisão da home de 26/08 aposentou; vale o nome novo,
  porque a renomeação foi explícita para "qualquer link interno"
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
| Midia Kit | **Melhores Práticas** |
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
viva como diferencial) — a rota de plataforma 404. Em `lib/esg.js` ela voltou pelo
nome oficial: **Gentileza Urbana** é a carteira que reúne a Praça de Carregamento
Elétrico, a Praça Pet Batel e o Jardim Vertical na seção 01 da Ambiental.

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
  plataformas · 65 ou 66 anos · R$ 2,06 de CPM em rodovias. Os válidos estão em
  **Conteúdo — Empresa**
- Não falar de concorrente com agressividade, e a regra vale também para outros
  meios: a resposta do FAQ sobre redes sociais soma, não substitui
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
- Sem bibliotecas de UI externas (Tailwind CSS é a única camada de estilo). `lucide-react`
  é a exceção, e é só ícone: não traz CSS, não traz componente de layout
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