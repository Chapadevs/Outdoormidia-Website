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
| `.display` | Poppins | 400 | Uppercase, branco, `line-height:.86`. Como `h1` vai a **700** (título de página em bold) |
| `.eyebrow` | Poppins | 700 | 12px, uppercase, `letter-spacing:.22em` |
| Corpo | Poppins | 400–900 | 17px base |

### Primitivos do design system (`@layer components` em `app/globals.css`)

- **`.btn`** — botão outline em cápsula (`rounded-full`, borda branca, fundo transparente). **Só sobre fundo escuro ou laranja** — sobre `--paper`/branco ele fica invisível; nesse caso use `.btn-ghost`
- **`.btn-fill`** — botão laranja sólido
- **`.btn-on-orange`** — botão branco sobre fundo laranja
- **`.btn-ghost`** — contraparte do `.btn` para fundos claros (borda e texto `--ink`, preenche de `--ink` no hover)
- **`.radial-reveal`** — o Radial Reveal, aplicado de fábrica em toda a família `.btn`. O preenchimento de hover entra como um círculo que cresce do ponto onde o ponteiro tocou o botão, em vez de trocar a cor de uma vez. Quem pinta é uma camada `::after` (`inset: -1.5px`, para cobrir também a borda) em `z-index: -1` dentro do `isolate` do botão: acima do fundo e da borda, abaixo do texto. O raio é `--rr-r`, propriedade registrada no `@property` — só ele anima, então a origem (`--rr-x`/`--rr-y`) salta para o ponto novo no mesmo frame sem arrastar o círculo. Quem mede origem e raio de cobertura é o widget `RadialReveal`; sem JS o efeito continua, a partir do centro. **É por isso que nenhuma variante declara `hover:bg-*` nem `hover:border-*`** — o estado de repouso precisa ficar visível fora do círculo. A cor de hover mora em `--rr-fill`. Usar a classe em qualquer botão fora da família `.btn`, sempre com um `--rr-fill` próprio
- **`.rail`** — carrossel horizontal com snap que sangra até a borda do `.wrap`. Já traz o `scroll-padding` que impede o snap de encostar o primeiro card na borda da tela. Usar em vez de repetir `-mx-8 … px-8`
- **`.ticks`** — só contexto de posicionamento (`position: relative`). As cantoneiras laranja que dava ao elemento foram removidas do site a pedido do cliente; a classe continua nos cards porque eles posicionam filhos absolutos a partir dela
- **`.reveal`** — elemento com animação de entrada (adiciona `.in` via IntersectionObserver global)
- **`.wrap`** — container centralizado com `max-width: 1280px` e `padding: 0 32px`
- **`.select-caret`** — seta de `<select>` estilizado
- **`.field-label` / `.field-input` / `.field-select` / `.field-error`** — campos de formulário. Valem para os formulários públicos e para os editores do admin; nunca redeclarar essas classes como constante local. `.field-select` é modificador, usado junto: `className="field-input field-select select-caret"`
- **`SectionHeading`** (`components/ui/SectionHeading.jsx`) — cabeçalho de seção (h2 +
  linha). Não recebe mais `num`: a numeração das seções saiu do site inteiro em
  09/09/2026. A linha tem piso de largura (`min-w-[52px]`, 28px no `max-mob`):
  sem ele, título de frase inteira (as quatro seções de Inteligência e audiência) comia a
  régua até ela sumir e encostava na borda do `.wrap`. Com o piso, o título quebra antes.
  O `text-balance` do h2 é inerte em título de uma linha
- **`StatGrid`** (`components/ui/StatGrid.jsx`) — faixa de números da marca (`size="md"` em `Institutional`, Culture, diferenciais e ESG). Em `Institutional` ele monta os big numbers (9 plataformas integradas · 312 m² · +530M impactos/mês · DOOH), com a contagem de plataformas derivada de `PLATFORMS_LISTAGEM`. Como o bloco é o mesmo na home e em `/sobre`, o quadro não diverge entre as duas — era o segundo quadro de números de `/sobre` que saiu, não este
- **`PracaChips`** (`components/ui/PracaChips.jsx`) — lista de praças em cápsulas. Um componente para a seção Presença de `/sobre` e a Cobertura da home; as listas divergem (a home inclui Rodovias PR-SC), o desenho não
- **`Accordion`** (`components/ui/Accordion.jsx`) — acordeão controlado do FAQ; o pai guarda o `openIndex` porque precisa da pergunta aberta para montar o link de WhatsApp. A resposta pode ser string ou lista de parágrafos, aceita `**negrito**` no meio do texto, e `fonte` sai em corpo reduzido abaixo dela
- **`CoverMedia`** (`components/ui/CoverMedia.jsx`) — capa com fallback: renderiza a imagem se houver `src`, senão o painel bege com o rótulo. Proporções em mapa estático (classe interpolada não é vista pelo scanner do Tailwind)
- **`DeleteButton`** (`components/widgets/DeleteButton.jsx`) — exclusão no admin, parametrizada por `resource` (segmento de `/api/admin/…`) e `label`
- **`HeaderShell`** (`components/layout/HeaderShell.jsx`) — barra clara de proposta/login/painel (o `Header` laranja é só do site institucional)

Padding de seção: `py-[110px] max-mob:py-[72px]` direto no JSX. O template de
diferencial (`app/solucoes/diferenciais/[slug]/page.js`) é a única exceção e traz um
degrau de tablet no meio (`max-tab:py-[92px]`), porque ali o salto de 110px para 72px
caía justamente na faixa em que os grids já tinham desmontado para uma ou duas colunas.
Todo o restante do estilo é utilitário Tailwind no componente.

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
- **Todo botão tem Radial Reveal no hover.** A família `.btn` já vem com ele; qualquer
  outro elemento que se comporte como botão (chip, aba, seta de carrossel) recebe
  `.radial-reveal` mais o seu `--rr-fill`. Botão com hover próprio no call site declara a
  cor do círculo junto, com a utilitária `[--rr-fill:…]`, senão o círculo pinta a cor
  errada. Nunca voltar a resolver hover de botão com `hover:bg-*`
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
  solucoes/               — hub + diferenciais/ e regioes-cobertura/ (mapa + lista
                            por região)
  area-do-anunciante/     — hub + sua-marca-no-ooh/, melhores-praticas/,
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
  forms/                  — 10 formulários (públicos + editores do admin) e
                            SuaMarcaNoOoh (a ferramenta de pré-visualização da
                            logo no painel real, canvas + upload)
  ui/                     — Logo, SectionHeading, Breadcrumb, TagFilter, CoverMedia,
                            FormatSpecCard, MapaCobertura (o mapa de cobertura do
                            site), CoverageMap (SVG de PR+SC, dados IBGE, hoje só no
                            admin),
                            BigNumbers (C1), AtivoCard, ProdutoCard (C7+C4),
                            IconicosFx (as animações da foto dos Icônicos)
  widgets/                — WhatsAppButton, RevealObserver, RadialReveal, DeleteButton,
                            LogoutButton
lib/
  constants.js            — WHATSAPP_URL, SITE_URL
  format.js               — DATA_LONGA (público) e DATA_CURTA (admin)
  nav.js                  — árvore de navegação (hubs + nível 2); Header e Footer leem daqui
  whatsapp.js             — waLink() + a mensagem pré-preenchida de cada CTA
  revalidate.js           — invalidação de ISR após mutação no admin
  firebase/               — admin (server), client, session, storage, serialize (toIso)
  blog/ cases/ tags/      — leitura, escrita e validação de cada coleção
  platforms.js            — as 8 plataformas do catálogo (dados estáticos, não vem do
                            Firestore). Campos opcionais do handoff: `quando`,
                            `bignumbers`, `blocos`, `ativos`, `passos`,
                            `tecnologiaPadrao`
  produtos.js             — os produtos de catálogo. `plataformas` diz em quais rotas o
                            card aparece; `tecnologias` marca o de dupla tecnologia
  iconicos.js             — ICONICOS_ASSINATURA (os 4 ícones de assinatura,
                            hoje dentro de Elegancy) + ICONICOS
                            (as 3 linhas com seus ativos). `getAtivoBySlug` é o que
                            permite espelhar um ativo em outra rota sem copiar texto
  faq.js                  — as 19 perguntas com categoria e resposta em parágrafos;
                            PERGUNTAS_HOME é a seleção de 8 da home, em ordem própria
  sobre.js                — marcos da linha do tempo
  diferenciais.js         — os 6 diferenciais: resumo dos cards + página dedicada.
                            `publicado: false` mantém a entrada escrita e fora do ar;
                            `href` fora de /solucoes/diferenciais/ marca o card que é
                            só âncora, sem página (DIFERENCIAIS_COM_PAGINA)
  simulador.js            — parâmetros da estimativa de campanha (impactos, CPM).
                            Sem call site desde 11/09/2026: o simulador saiu do
                            site com a chegada de Sua marca no OOH
  suaMarca.js             — os 12 painéis de Sua marca no OOH: nome oficial, em
                            que plataformas aparecem, proporção real (`arte`) e
                            brilho (`luz`) de cada face, mais a paleta de cores
                            do painel. `getMockups()` mescla a geometria gerada
  suaMarcaGeometria.js    — gerado por scripts/generate-sua-marca.mjs: os 4
                            cantos de cada face em px do WebP servido
  suaMarcaMotor.js        — homografia, máscara da área útil e composição, tudo
                            puro sobre typed arrays, sem DOM
  locations.js            — praças; alimentam a lista de regiões de /solucoes e
                            /solucoes/regioes-cobertura, e o CoverageMap do admin
                            (via mapShapes/mapProjection). O mapa do site não lê daqui
  mapaCobertura.js        — geometria do mapa de cobertura, transcrita do protótipo
                            aprovado: 26 municípios, 6 corredores e os contornos de
                            PR e SC, já projetados
public/media/             — video-hero.mp4 (fundo do Hero), logo.png (wordmark branco,
                            recolorido por mask no primitivo .logo-mark)
scripts/                  — seed-admin, migrate-tags-scope, generate-map-paths,
                            generate-sua-marca (WebP + geometria dos painéis)
claude/                   — checklists de aplicação entregues pelo cliente, fonte da
                            copy oficial: checklist-home.md (home, 25/08/2026, revisado
                            em 26/08/2026),
                            checklist-sobre-nos.md (25/08/2026), checklist-faq.md
                            (26/08/2026), icones-nova-campanha.md (mapa de ícones
                            da Imagine), copy-diagnostico-presenca.md,
                            copy-inteligencia-e-audiencia.md, copy-regioes.md e
                            diferenciais-home-v2.md (as três de 02/09/2026; a
                            última substitui a seção 05 do checklist-home.md) e
                            handoff-plataformas.md (03/09/2026, plataformas e produtos;
                            substitui os rascunhos copy-produtos e copy-plataformas) e
                            checklist-programatica.md (06/09/2026, revisado em 08/09 e
                            09/09).
                            Não é código; é o que manda quando divergir deste
                            documento
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
| Sua marca no OOH (11/09/2026) — a página `/area-do-anunciante/sua-marca-no-ooh` deixou de ser o simulador de impactos e CPM e virou a ferramenta que o card do hub prometia desde 26/08: o visitante escolhe a **plataforma** (chips, só as cinco que têm foto de painel: Icônicos, Outdoor Digital, Front Light, Mídia Indoor e MUB), depois o **painel** (miniaturas, 12 fotos reais do protótipo da Imagine Concept), sobe a **logo em PNG** (só PNG, validado pelos 8 bytes de assinatura, teto de 8 MB), escolhe a **cor de fundo** do painel (9 cores mais uma personalizada) e o **tamanho** da logo, e vê a marca aplicada na foto em perspectiva; baixa o PNG com o wordmark da Outdoormídia no canto (só na cópia exportada) e segue para o WhatsApp com plataforma e painel na mensagem (`waSuaMarca`). Nada sobe para servidor. **O encaixe é feito por dois mecanismos:** a homografia por face (a matriz 3×3 que leva o retângulo plano da arte aos 4 cantos do painel na foto, com amostragem inversa bilinear) decide **onde** a logo cai, e a máscara de cor lida da própria foto decide **quais pixels** são do painel: a área útil vem pintada de laranja sólido sobre foto em preto e branco, então o laranja é o único pixel saturado da imagem, e a cobertura por pixel sai da saturação, com rampa na franja de compressão. É o que dá cobertura exata sem franja laranja e sem o overshoot manual dos cantos que o protótipo precisava para a borda curva do Champagnat. Os cantos são detectados pelo mesmo laranja em `scripts/generate-sua-marca.mjs` (extremos da máscara por face; nos dois painéis de duas faces, Batel e Champagnat, a máscara é dividida na coluna `dobra`), conferidos a 2–4 px dos calibrados à mão pela Imagine, e commitados em `lib/suaMarcaGeometria.js`; o script também gera os WebP e imprime a proporção medida na foto ao lado da declarada em `arte`, que foi auditada contra o catálogo (Mega Banner 640×1024, Totem 1080×1920, Relógio Digital 9:16). Máscara e mapa pixel → face são calculados uma vez por painel; trocar cor, logo ou tamanho só recompõe a caixa envolvente, num `requestAnimationFrame`. Os originais JPG ficam em `public/media/images/sua-marca/`, fora do versionamento. `SimuladorForm`, `lib/simulador.js`, `lib/i18n/content/simulador.*.js` e `waSimulador` ficaram sem call site, como `Coverflow` | `components/forms/SuaMarcaNoOoh.jsx`, `lib/suaMarca.js`, `lib/suaMarcaMotor.js`, `lib/suaMarcaGeometria.js`, `scripts/generate-sua-marca.mjs`, `public/media/sua-marca/` |
| Título de página em bold (10/09/2026) — o `h1` de toda página sobe em 700, a pedido do cliente. O peso entra por `h1.display` em `@layer components`, não dentro do primitivo `.display`: ele também veste número grande, resultado do simulador e título de card, que seguem em 400. Os 42 `h1` do site (público e admin) usam `.display`, então este é o ponto único de troca e um hero novo já nasce em bold. Título de seção (`SectionHeading`, `h2`) não muda | `app/globals.css` |
| Sem numeração de seção no site (09/09/2026) — o motivo `01 · 02 · 03` que rotulava título saiu de todo o site, a pedido do cliente. Saíram o número do `SectionHeading` (e o prop, junto com a contagem que os templates de plataforma, diferencial e icônico faziam em cima das seções que sobravam), o da faixa laranja de Icônicos (cabeçalho, abas e o número gigante de fundo), o do acordeão de `/solucoes`, o dos cards de diferencial, plataforma e "outros", o do hero das páginas de diferencial e icônico, o eyebrow de Cobertura e as duas portas numeradas da Nova campanha. Os campos `num` que só alimentavam isso saíram de `lib/platforms.js`, `lib/iconicos.js` e do derivado de `lib/diferenciais.js`. **Ficou o que é sequência, não rótulo:** os passos da Gestão 360 OM, os de "Aplicação prática", os "Próximos passos" de `/obrigado`, o número do episódio no Podcast, a numeração das perguntas e o rótulo `Perguntas 01-02` do Diagnóstico, e a numeração de cláusula de `/privacidade` e `/termos` | `components/ui/SectionHeading.jsx` e os call sites |
| Radial Reveal em todo botão — o preenchimento de hover cresce em círculo a partir do ponto onde o ponteiro entrou, e recua em direção ao ponto de saída. Mesmas cores e mesmo formato de antes: o que mudou é o caminho até o estado de hover. Vale para a família `.btn` inteira sem tocar em call site, e para qualquer outro botão com `.radial-reveal` | `app/globals.css`, `components/widgets/RadialReveal.jsx` |
| Hero com vídeo de fundo (carrega após o load da página) | `components/sections/Hero.jsx` |
| Seções da home | `components/sections/` |
| Bloco institucional (texto + foto) entre o ticker e as plataformas | `components/sections/Institutional.jsx` |
| Big numbers da marca — 4 números (`StatGrid`): 9 plataformas, 312 m² do Aeroporto Square, +530M impactos/mês e a rede DOOH de 175 telas. A lista vive em `lib/numeros.js` e alimenta as três páginas que a exibem: a home e `/sobre` pelo `Institutional`, e `/trabalhe-conosco` pelo `Culture`. Fonte única de propósito — foi cópia por página que produziu os 380 milhões e os 82 equipamentos que saíram de circulação | `lib/numeros.js`, `components/sections/Institutional.jsx`, `components/sections/Culture.jsx` |
| Copy oficial do cliente (COPY_SITE) aplicada em menu, hero, esteira, institucional, diferenciais, plataformas, cobertura, depoimentos, Gestão 360 OM, nova campanha, FAQ e rodapé | home, `lib/faq.js`, `lib/platforms.js`, `lib/diferenciais.js` |
| Nova campanha — bloco laranja com as 4 portas, na hierarquia do checklist da home: Diagnóstico como faixa fina, Formulário como card dominante branco e elevado, Mídia Programática (preto, exceção autorizada à paleta) e Atendimento como cards menores. A diferença de área é o que impede o Diagnóstico de roubar o clique do formulário. Substituiu o `LeadCta` em todas as páginas; `#formulario` segue valendo como âncora | `components/sections/NovaCampanha.jsx` |
| Nova campanha — revisão de 26/08: kicker `NOVA CAMPANHA` acima do título (sem ele a caixa laranja abria direto no `h2` e o visitante não sabia que aquilo é o formulário principal do site) e o subtítulo volta a ser "Você entende do seu negócio…", que estava aberto em Plataformas. A frase não pode viver nos dois lugares | `components/sections/NovaCampanha.jsx`, `components/sections/PlatformsCarousel.jsx` |
| Anatomia das portas — ícone em quadrado claro arredondado, nome em destaque, linha de intenção e chevron circular à direita. O chevron é a seta da linha de intenção promovida a elemento, por isso ela não termina mais em "→" | `components/sections/NovaCampanha.jsx` |
| Nova campanha sem a porta de Mídia Programática (10/09/2026) — a porta preta que apontava para o chat da MercadoOOH saiu do bloco a pedido do cliente, e com ela saiu a única exceção de paleta que o checklist da home autorizava aqui: o preto não aparece mais na seção. O bloco fica com Diagnóstico (faixa fina), o formulário (card dominante) e **Atendimento rápido**, que segue no comercial (`WA_ATENDIMENTO_AGORA`) na mesma faixa clara translúcida do Diagnóstico. O balão **verde** (`icone-whatsapp-verde.png`) é asset de marca, então o quadrado do ícone continua branco sólido, e não o `bg-white/15` do lucide: o verde apagaria contra o laranja da seção. É a exceção que o próprio checklist da home abre à monocromia laranja dos ícones ("Única exceção: o verde do WhatsApp"). As chaves `programaticaNome` e `programaticaIntencao` saíram dos quatro `messages/*.json`. Nesse momento a página `/area-do-anunciante/programatica` seguiu no ar por outras entradas (menu, rodapé, faixa escura da Área do anunciante) e o balão com o raio seguiu no botão flutuante; a página e o balão saíram do site por completo em 12/09/2026, ver a entrada logo abaixo | `components/sections/NovaCampanha.jsx` |
| Mídia Programática removida do site (12/09/2026) — a pedido do cliente, a página inteira saiu do ar: rota `/area-do-anunciante/programatica`, o componente `ProgramaticaBlocos`, `lib/programatica.js` (SSPs, modelos de negociação, glossário) e as três traduções em `lib/i18n/content/programatica.*.js` foram apagados; saíram junto a entrada do menu (`lib/nav.js`), a faixa escura no hub da Área do anunciante, a entrada de sitemap/llms (`lib/seo.js`) e os namespaces `Nav.programatica`/`Meta.programatica`/`Programatica` dos quatro `messages/*.json`. Do lado do WhatsApp, saíram `WA_PROGRAMATICA`, `WA_PROGRAMATICA_AGENCIA` e `waLinkOrigem()` (que só existia para marcar a origem `programatica`) de `lib/whatsapp.js`, e `MERCADOOH_WHATSAPP_URL`/`waLinkMercadoOoh()`, que não tinham mais nenhum outro call site. **O botão flutuante perdeu o balão do raio** (MercadoOOH) e ficou só com o verde, que é o comercial da Outdoormídia — ver a entrada "WhatsApp flutuante" logo abaixo, atualizada para refletir isso. A rota antiga não tem redirect: cai em 404. `claude/checklist-programatica.md` segue no repo como registro histórico do handoff, sem mais nenhum código lendo dele | `lib/nav.js`, `lib/seo.js`, `lib/whatsapp.js`, `lib/constants.js`, `components/widgets/WhatsAppButton.jsx`, `app/[locale]/(site)/area-do-anunciante/page.js` |
| Plataformas — abertura própria ("Algumas campanhas precisam aparecer. Outras precisam ser impossíveis de ignorar."), que enquadra a amplitude do portfólio e justifica nove plataformas em vez de uma | `components/sections/PlatformsCarousel.jsx` |
| Qualificador — 6 etapas, resumo acumulado com `EDITAR`, barra `X de 6`, convite ao Diagnóstico só para quem marca "Ainda não sei" no objetivo, celular oculto quando a preferência é e-mail, e microcopy dizendo o que falta em vez de asterisco vermelho. Grava o lead antes do redirecionamento ao WhatsApp, com campanha de origem (querystring) e página de origem no payload | `components/forms/QualifierForm.jsx`, `lib/leads/origens.js` |
| Qualificador — CNPJ e rascunho no navegador (12/09/2026). O campo **CNPJ (opcional)** entrou na etapa de contato, ao lado de Empresa: máscara `XX.XXX.XXX/XXXX-XX` na digitação, validação dos dois dígitos verificadores nos dois lados (cliente e `lib/leads/validate.js`), já aceitando o CNPJ alfanumérico que a Receita emite desde julho de 2026. Opcional porque parte dos leads é MEI ou ainda não tem empresa aberta, mas preenchido tem que ser um CNPJ inteiro e válido: meio número não serve ao comercial. Vai como campo de topo do lead (`cnpj`, ao lado de `empresa`), na mensagem de WhatsApp e no admin (linha do detalhe e sublinha da listagem). **As respostas ficam salvas no navegador** (`localStorage`, chave `om:qualificador:v1`): cada mudança grava, quem fecha a aba no meio volta e encontra tudo no lugar, com a linha `Retomamos de onde você parou.` e o botão `Recomeçar`; o rascunho some ao enviar, ao recomeçar ou depois de 30 dias parado, e o aceite dos termos não é guardado. A retomada é feita sem `setState` em effect (o lint do React Compiler proíbe): o rascunho é lido uma vez por montagem e congelado, `useSyncExternalStore` diz quando a hidratação passou, e a troca de `key` remonta o formulário já com as respostas. A rolagem automática até o passo só dispara depois de uma interação, para a restauração não sequestrar a página na chegada | `components/forms/QualifierForm.jsx`, `lib/cnpj.js`, `lib/leads/leads.js`, `lib/leads/validate.js` |
| Ícones da Nova campanha — mapa da Imagine Concept aplicado nos 3 cards (Diagnóstico, Mídia Programática, Atendimento) e nas 5 etapas de opção do qualificador, 35 ícones ao todo. A etapa de contato não leva ícone, por regra do documento. As opções deixaram de ser lista de string e viraram `{ label, Icone }`; `label` segue sendo o valor da resposta, então resumo, lead e mensagem de WhatsApp não mudaram | `claude/icones-nova-campanha.md`, `components/forms/QualifierForm.jsx`, `components/sections/NovaCampanha.jsx` |
| Big numbers em bold, com a troca mais evidente (G1 do briefing da reta final) — o peso entra como utilitária no número de `StatGrid` e `BigNumbers`, não dentro de `.display`, que veste todo hero do site e continua em 400. A troca ficou mais evidente pela mola (`bounce` de 0,15 para 0,34, a letra passa do lugar e volta) e pelo intervalo entre giros (5s para 3,4s), não pela duração: acelerar a duração faria a letra piscar, e o número deixaria de ser legível durante a troca, que é o problema que o `LetterSwap` existe para resolver. `LetterSwap` só é usado por esses dois componentes, então o ajuste é o G1 inteiro e não alcança nenhum outro texto | `components/ui/LetterSwap.jsx`, `StatGrid.jsx`, `BigNumbers.jsx` |
| Redes sociais do rodapé — o X saiu (briefing da reta final) e o YouTube entrou no lugar. A ordem é a do cliente: Instagram, LinkedIn, YouTube, Facebook. Os perfis de YouTube e Facebook seguem montados a partir do handle do Instagram, sob `TODO(cliente)` | `components/layout/Footer.jsx` |
| Carrossel contínuo — vídeo devolve o decodificador. Pausar o `<video>` não libera nada: o elemento segue segurando decodificador e buffers, e o navegador tem um teto pequeno deles; passando do teto tudo cai para decodificação em software, que era a travada da home com os seis vídeos vivos ao mesmo tempo. O card que se afasta do centro solta a fonte de verdade (`removeAttribute` mais `load()`) e a seção inteira solta as suas 1,2s depois de sair da tela, recarregando pelo `data-src` ao voltar. A folga entre carregar e soltar é histerese, senão o card na fronteira soltaria e recarregaria a cada passagem; as duas distâncias encurtaram para 1,35 e 2,1 com a chegada do `poster` (ver as linhas seguintes) e hoje moram em `LIMITES_MIDIA` | `components/ui/CarrosselContinuo.jsx` |
| Carrossel contínuo — fita pousada custa mesmo zero. A deriva caía por exponencial, que nunca chega a zero: com o ponteiro em cima, `pos` seguia mudando na décima quinta casa e `pintar()` reescrevia as nove transformações a cada frame por segundos. Um piso de 1e-4 card/s zera a velocidade, `pos` para de mudar e o laço passa a sair antes de tocar no DOM. O `posPintada = NaN` subiu para fora da guarda do `raf` no mesmo movimento: com o laço já rodando, era o que faltava para a seção repintar (e reanexar os vídeos) ao reaparecer, inclusive sob `prefers-reduced-motion`, onde a fita não anda sozinha | `components/ui/CarrosselContinuo.jsx` |
| Carrossel contínuo — a troca de fonte de vídeo saiu de dentro do frame (10/09/2026). `src =`, `load()` e `play()` custam milissegundos na thread principal, e rodavam dentro do `pintar()`, ou seja, dentro do `requestAnimationFrame`: caíam exatamente no frame que estava sendo montado. Era o solavanco a cada card que cruzava um limiar (na deriva, um a cada ~2s) e a trava inteira num arrasto rápido, em que vários cruzam no mesmo punhado de frames. Agora o laço só escreve `transform`, `opacity`, `z-index` e `visibility`; a mídia roda em `requestIdleCallback` (com `timeout`, para não ser adiada para sempre), **uma ação por passagem**, e nenhuma enquanto a fita passa de 0,9 card/s, porque decisão tomada com a fita voando é desfeita no frame seguinte. O desenho e a matemática do movimento não mudaram uma vírgula: a `transform` gerada é idêntica à de antes | `components/ui/CarrosselContinuo.jsx` |
| Carrossel contínuo — um vídeo tocando por vez, agora de verdade. A regra era `distância < 0,85` por card, e com os cards a uma unidade de distância a fita passando entre dois deixava **os dois** tocando: dois decodificadores de 1080p no ar é a carga que derruba o navegador para decodificação em software, que é a travada que o resto do arquivo existe para evitar. Passou a ser o card mais perto do centro, e só ele, com pausa sempre antes do play (nem o instante com dois) e uma margem de 0,12 card de histerese, para a fita pousada no meio do caminho entre dois cards não ficar trocando de vídeo | `lib/carrosselMidia.js` |
| Decisão de mídia do carrossel é função pura — `proximaAcaoDeMidia` recebe o retrato do momento (posição, quem tem fonte, quem está carregado, quem toca) e devolve **uma** ação, ou nada; quem executa é o componente. Uma por vez é o que espalha as trocas de fonte por vários tiques em vez de despejá-las juntas. Ser pura é o que permite simular a fita inteira sem navegador: deriva de 5 min, ponteiro pousado, arremesso a cada 8s e arrasto longo passam com no máximo 3 fontes vivas, 1 vídeo tocando e 1 ação por frame — foi essa simulação que revelou o bug dos dois vídeos simultâneos | `lib/carrosselMidia.js`, `components/ui/CarrosselContinuo.jsx` |
| Pôster no vídeo do card, e por isso limiares curtos — 7 das 9 entradas de `PLATFORMS_LISTAGEM` são vídeo sem foto, e um `<video>` sem `src` não pinta nada: o card subia **vazio** sob o véu laranja até a fonte chegar, e era para encurtar essa janela que a fonte era anexada a 2 cards do centro e só solta a 3, mantendo cinco vivas de uma vez. Com `poster` o card nunca fica vazio, então a fonte entra a 1,35 card e sai a 2,1 — três candidatos, os do meio — com teto de 3 fontes. O pôster é sempre o **quadro 0** do próprio arquivo, nunca um quadro escolhido no meio: o vídeo começa do zero quando a fonte é anexada, então só o quadro 0 troca sem salto. Gerado por `scripts/generate-video-posters.mjs` (9 arquivos, 446 KB), com o nome derivado do vídeo em `lib/videoPoster.js`, para não virar nove campos escritos à mão | `lib/videoPoster.js`, `scripts/generate-video-posters.mjs`, `components/ui/PlatformShowcaseCard.jsx`, `components/ui/CoverMedia.jsx` |
| `will-change` acompanha o card, não fica ligado de fábrica — os 9 cards subiam com `will-change:transform,opacity` permanente, ou seja, uma camada de composição viva para cada um (mais as camadas internas de vídeo e foto) mesmo para os que estão do outro lado do círculo. Agora ele é desligado no mesmo ponto em que o card já vira `visibility:hidden` e religado quando ele volta — a religada acontece com o card ainda em opacidade zero, então a camada tem toda a travessia do fade para existir antes de aparecer. Mesma troca no `SlideStage`, onde o slide **em repouso** segurava uma camada do tamanho da foto sem ter o que animar; lá o `will-change` cobre o deslize inteiro, inclusive os dois frames de preparo, senão chegaria no mesmo frame da transição e não adiantaria nada | `components/ui/CarrosselContinuo.jsx`, `components/ui/SlideStage.jsx` |
| `frontlights.mp4` na receita da casa (10/09/2026) — chegou depois da passagem de 1080p e subiu a **5,0 Mbps**, o dobro do teto de 2,5 Mbps que o projeto fixou, justamente num card do carrossel da home. Passou pela mesma receita dos outros seis (H.264, CRF 26, teto de 2,5 Mbps, sem faixa de áudio, `faststart`): 5,05 MB para 2,35 MB, 53% menos, mesmos 189 quadros, mesmos 1920×1080 e 24 fps. Conferido na medida real de exibição (820px), que é o tamanho do card: SSIM 0,996 e PSNR 48,2 dB, ou seja, indistinguível. O original de 5 Mbps foi para `public/media/images/plataformas/`, fora do versionamento, como os demais | `public/media/plataformas/frontlights.mp4` |
| Título "Plataformas" sobe por `transform`, não por `padding-top`. A escrita já era uma por coluna, mas `padding-top` é propriedade de layout: a transição de 800ms que ela dispara refaz layout e pintura das onze colunas a cada frame enquanto corre, e as onze são escalonadas ao longo da mesma rolagem que traz o carrossel para a tela. Eram ~2s de layout na thread principal em cima do primeiro giro da fita. O `h2` ganhou `overflow-hidden` para cortar a haste que desce 54px, com `box-content pt-5 -mt-5` abrindo a folga que o hover da letra (-10px) precisa sem mexer em altura nem em posição: a margem negativa e o `mb` do parágrafo acima colapsam em 2px, e os 20px de padding recompõem os 22px de antes | `components/sections/PlatformsCarousel.jsx` |
| Vídeo do hero pausa fora da tela — é `autoPlay loop` e seguia decodificando 1080p a 7 Mbps pela visita inteira, muito depois de sair da tela, disputando decodificador e thread de composição com os carrosséis logo abaixo. `IntersectionObserver` com 120px de folga, mais `visibilitychange`. Ninguém o vê pausado, porque ele só pausa fora de tela | `components/sections/Hero.jsx` |
| Trilho da home fora do ciclo de render — a altura do preenchimento muda em todo frame de rolagem e era estado do React, o que obrigava o trilho inteiro (onze botões, estilo inline em cada um) a reconciliar 60 vezes por segundo enquanto a página rola, bem em cima da rolagem que traz os carrosséis para a tela. Ela passou a ser escrita direto no elemento por um ref, e `height` saiu do objeto de estilo do JSX: o que o React não conhece ele não sobrescreve na re-renderização seguinte. Seção ativa, seção de fundo e rodapé continuam em estado, porque são discretos e só mudam ao trocar de seção | `components/widgets/HomeTimeline.jsx` |
| WhatsApp flutuante — um botão só no canto, o balão verde (`icone-whatsapp-verde.png`) para o comercial da Outdoormídia. Entre 09/09/2026 e 12/09/2026 havia um segundo balão, com o raio, para o chat da MercadoOOH (mídia programática); ele saiu junto com a remoção da página de Mídia Programática, e o verde ficou sozinho, renderizado a 36px (medida em que o desenho do balão já saía correto, sem a margem interna do PNG). Botão flutuante não carrega rótulo, e é o ícone que diz qual é qual | `components/widgets/WhatsAppButton.jsx` |
| WhatsApp com mensagem pré-preenchida por CTA (pré-qualificação) | `lib/whatsapp.js` |
| ProposalForm (briefing) | `app/proposta/` |
| Plataformas — índice + página das 7 | `app/plataformas/`, `lib/platforms.js` |
| Plataformas na home — coverflow contínuo das 9 entradas de `PLATFORMS_LISTAGEM` (as 8 do catálogo + Icônicos): card central em tamanho cheio, vizinhos girados para dentro em 3D. Roda em `CarrosselContinuo`, não no `Coverflow` que a home usava antes: a fita é um círculo que gira sozinho, devagar, e o visitante roda para os dois lados sem chegar a ponta nenhuma. Título "Plataformas" animado letra a letra como um letreiro de postes luminosos, cada um subindo até a própria altura em ordem embaralhada conforme a seção entra na tela; o "f" nasce com o poste aceso em laranja. Substituiu o carrossel de peek com setas; o acordeão `Platforms` segue vivo só em `/solucoes` | `components/sections/PlatformsCarousel.jsx`, `components/ui/CarrosselContinuo.jsx`, `lib/platforms.js` |
| `CarrosselContinuo` — coverflow sem começo nem fim, para onde a ordem da lista não significa nada. Não usa scroll nativo, scroll-snap nem cópias do conjunto no DOM: cada item aparece uma vez e a posição é um número contínuo que um único `requestAnimationFrame` incrementa, com `envolver(i - pos)` dando a distância de cada card até o centro pelo caminho mais curto do círculo. Sem emenda para atravessar e sem salto de `scrollLeft` para esconder, que era de onde vinha a travada ao passar pelo primeiro item. O laço escreve só `transform` e `opacity` (mais `z-index` e `visibility`, que só mudam quando trocam de valor), mede a geometria uma vez (montagem e resize), não lê nada do DOM dentro do frame, não re-renderiza o React uma única vez e não repinta quando a fita está parada. O deslocamento do eixo de giro vai dobrado na matriz (`T(ox)·lista·T(−ox)`) em vez de sair num `transform-origin` reescrito por frame: era a única propriedade não-compositável no caminho quente, e tirá-la baixou o custo de DOM do carrossel de 0,127 ms para 0,0875 ms por frame, medido no navegador. A dobra é pixel-idêntica ao `transform-origin` (verificada projetando os 4 cantos com a perspectiva real em 6 posições, diferença zero). A ida ao centro é uma mola criticamente amortecida em forma fechada, não uma aproximação exponencial: ela parte da velocidade que a fita já tinha, então clicar num card enquanto ela gira não troca de regime, e a trajetória não depende da taxa de frames (`dt` de 1/60 e de 0,05 dão a mesma curva), então frame perdido não vira solavanco nem repique. Gira sozinho a 0,055 card/s, para com o ponteiro em cima e com o foco dentro, e volta a girar sozinho depois de um arrasto, sem encaixar em card nenhum. Sai de cena com `IntersectionObserver` e com a aba escondida. Desde 09/09/2026 monta também os depoimentos, e com isso o `Coverflow` ficou sem call site: o arquivo segue no repo, mas nenhuma seção do site o usa | `components/ui/CarrosselContinuo.jsx` |
| Vídeo do card só toca no centro — antes os 6 vídeos de `PLATFORMS_LISTAGEM` baixavam e decodificavam os 9 ao mesmo tempo (27, com as cópias do modo contínuo antigo). O card entrega o vídeo em `data-src`, sem `autoPlay`, e o carrossel anexa a fonte quando o card chega a um card de distância do centro e dá o play só no que está passando por ele. É a maior parte dos frames que a seção recuperou | `components/ui/CarrosselContinuo.jsx`, `components/sections/PlatformsCarousel.jsx` |
| Vídeos do carrossel em 1080p — os 6 estavam em 3840×2160 para uma caixa de 820×461, ~22× mais pixels do que a tela usa, decodificados sem parar no card central. Reencodados em 1920×1080 (H.264, CRF 26, teto de 2,5 Mbps, sem faixa de áudio, `faststart`): 79 MB viraram 26,5 MB, 67% menos, com o custo de decode caindo cerca de 4×. Conferido quadro a quadro contra o original reduzido a 820px, que é o tamanho real de exibição: indistinguível, inclusive no `outdoor-digital` (o que exigiu mais compressão) e no `midia-movel` (o de mais movimento). Fica a decisão em aberto de cair de 59,94 para 30 fps em quatro deles, que dividiria o decode pela metade de novo, mas mexe no material do cliente. O `video-iconicos.mp4`, que chegou depois, tinha escapado da passagem e subiu em 3840×2160 a 7,9 Mbps, justamente no card que abre a listagem e nasce no centro: passou pela mesma receita em 08/09/2026 (10,5 MB para 3,3 MB, mesmos 313 quadros). O original de 4K foi para `public/media/images/plataformas/`, fora do versionamento, como os demais originais | `public/media/plataformas/` |
| Sem fileira de bolinhas embaixo do carrossel da home — com giro contínuo a posição na lista não quer dizer nada, e a bolinha marcada era o único ponto do site que anunciava uma ordem que a seção não tem. Navegação por arrasto, trackpad horizontal, clique no card lateral e setas do teclado; o foco manda o card ao centro, e com o teclado dentro da fita todos os 9 voltam a existir para o Tab não pular os que estão do outro lado do círculo | `components/ui/CarrosselContinuo.jsx` |
| Icônicos na home — faixa laranja logo abaixo das Plataformas: projeto em destaque (`.display`) e abas dos 3 projetos. Lê `lib/iconicos.js` | `components/sections/Iconicos.jsx` |
| Animações da foto dos Icônicos (11/09/2026) — o desenho aprovado no Claude Design, transcrito para a faixa: **Green** cresce cinco cipós em SVG (`stroke-dashoffset`) em volta da moldura, brota 34 folhas ao longo deles que balançam em ritmos diferentes, seis folhas caem, três esporos sobem, e a foto ganha Ken Burns, halo verde atrás e uma varredura verde por cima; **Regenerativo** cobre a foto com 24 ladrilhos em preto e branco que viram e somem para revelar a colorida (o antes → depois), com barra de leitura, grade, três árvores que se desenham e brotam, ondas e partículas; **Elegancy** gira raios e varre um cone de luz atrás da foto, e por cima passa reflexo, clarão, três orbes e a moldura que se desenha, com dez estrelas cintilando em volta, mais brilho (`filter`) na própria foto. Tudo em `transform`, `opacity`, `filter` e `stroke-dashoffset`: a barra de leitura, que no protótipo animava `left`, anda por `translate` de um invólucro com a largura da foto. Os 28 keyframes moram no `@theme` (`--animate-*`, nomes em português); atraso e duração por elemento vão em `style`, que vence o shorthand da utilitária. As camadas só montam com a faixa perto da tela (`IntersectionObserver`, 120px de folga) e somem inteiras em `prefers-reduced-motion`, porque sem animação o cipó por desenhar ficaria invisível. **O `SlideStage` não é remontado na troca de aba:** a foto fica no mesmo lugar da árvore e só a camada troca de tipo com o slug, senão o deslize entre fotos morreria. O Ken Burns e o brilho entram na própria `<img>` por `classe` no slide (prop nova do `SlideStage`), para andarem junto com o deslize. As duas legendas abaixo da foto (`Antes → depois`, `Luz como assinatura`) vivem nos quatro `messages/*.json`. Os verdes e brancos quentes são do desenho aprovado, não da paleta, como o verde da placa no mapa de Rodovias | `components/ui/IconicosFx.jsx`, `components/ui/SlideStage.jsx`, `components/sections/Iconicos.jsx`, `app/globals.css` |
| Projetos Icônicos — hub + página das 3 linhas (ISR 300 + `generateStaticParams`) | `app/plataformas/projetos-iconicos/`, `lib/iconicos.js` |
| Handoff de Plataformas aplicado (`claude/handoff-plataformas.md`, 03/09/2026) — hub, Icônicos e as 8 páginas de plataforma na estrutura do documento: hero, "Quando essa plataforma é a escolha certa", quadro de números, blocos de contexto, ativos espelhados, produtos, Gestão 360 e Nova campanha | `app/plataformas/`, `lib/platforms.js`, `lib/produtos.js`, `lib/iconicos.js` |
| Mapa da rede de Rodovias — a seção que o handoff pedia em `/plataformas/rodovias`, desenhada em SVG a partir de coordenadas reais em vez de uma imagem exportada: 9 corredores nas 6 BRs oficiais, 18 cidades em três desenhos de marcador, etiquetas de BR inclinadas com a via, setas de sentido nos dois lados, barra de escala, rosa dos ventos e o selo de São Paulo, que é referência de distância e leva uma linha dizendo isso, porque o handoff proíbe a página de afirmar cobertura em SP. Passar o ponteiro num corredor ou numa cidade acende o conjunto e apaga o resto; os chips das 6 BRs prendem o mesmo destaque. É a única seção governada por `mapaRede` na entrada da plataforma, e a única cor fora dos tokens da marca no site é o verde do selo, que é placa de estrada dentro do desenho | `components/ui/MapaRodovias.jsx`, `lib/mapaRodovias.js`, `app/plataformas/[slug]/page.js` |
| Geometria do mapa de Rodovias gerada fora do build — o protótipo da peça dependia do d3 em runtime para projetar (`geoMercator().fitExtent`), curvar (`curveCatmullRom.alpha(0.6)`) e medir o traçado (`getPointAtLength`), e nada disso muda depois que a página carrega. `scripts/generate-rodovias-map.mjs` roda uma vez, transcreve os três e commita `lib/mapaRodovias.js` com os `d` e as transformações prontos: nenhuma dependência nova no `package.json`, nenhuma conta no primeiro frame. Mesmo caminho de `generate-map-paths.mjs`. O solucionador de colisão de rótulos do protótipo não foi portado porque media texto com `getBBox()` no browser: conferidos os 18 rótulos contra o desenho aprovado, nenhum tinha sido movido do lado declarado, então o lado virou dado e o desenho parou de depender da fonte | `scripts/generate-rodovias-map.mjs`, `lib/mapaRodovias.js` |
| Icônicos, nova estrutura — `ICONICOS_ASSINATURA` são os 4 ativos que não pertencem a linha nenhuma (Aeroporto Square, Mosaico Square, Distrito de Mídia Duo Square, Duo Vision); `ICONICOS` são as 3 linhas, cada uma carregando os ativos instalados, 16 ao todo. A ordem virou Green · Regenerativo · Elegancy, a do documento, e o carrossel da home acompanha | `lib/iconicos.js` |
| Ícones de assinatura dentro de Elegancy — decisão de 06/09/2026: os 4 ativos de `ICONICOS_ASSINATURA` (Aeroporto Square, Mosaico Square, Distrito de Mídia Duo Square, Duo Vision) deixaram de ter seção própria na página de Icônicos e entraram na linha **Elegancy**, que é o mobiliário de assinatura. A lista continua exportada à parte, porque `/plataformas/aeroporto` espelha três deles por slug e `getAtivoBySlug` a consulta primeiro, mantendo o "Ver na plataforma Aeroporto" de cada card. A seção 02 do hub saiu, `Process` virou 02 e o botão "Ver os ícones" do hero aponta para `#elegancy` | `lib/iconicos.js`, `app/plataformas/projetos-iconicos/page.js` |
| Espelhamento de ativo (regra C8) — o texto de um ativo existe uma vez e é renderizado em quantas rotas precisar. Os 3 do Distrito aparecem em Icônicos e em `/plataformas/aeroporto`; o MUB Garden em Green e em `/plataformas/mub`, com o link de volta invertido por `getAtivoBySlug` para não apontar para a própria página | `lib/iconicos.js`, `app/plataformas/[slug]/page.js` |
| `BigNumbers` (C1) — de 2 a 4 números por página de plataforma. Sem `bignumbers` na entrada o componente não renderiza: Front Light, Mídia Móvel e Digital Signage sobem sem o quadro porque o dado não veio, em vez de exibir número inventado. É outro componente que o `StatGrid`, que continua sendo a faixa fixa da marca | `components/ui/BigNumbers.jsx` |
| As três linhas, sem navegação duplicada — a seção "As três linhas" (`LinhaTabs`) saiu de `/plataformas/projetos-iconicos`: tinha sua própria navegação Green/Regenerativo/Elegancy, repetindo a que já existe na faixa laranja de `Iconicos`. O grid de ativos de cada linha subiu para dentro do próprio `Iconicos` (prop `comAtivos`), numa seção clara logo abaixo da faixa, trocado pelo mesmo `active` das abas e setas de cima. Os 3 grids seguem todos no HTML, só o `hidden` muda qual aparece — mesma razão de sempre, para o texto das outras duas linhas não sair do documento. A âncora continua abrindo a linha certa (`#green` etc.), agora ouvida pelo próprio `Iconicos` | `components/sections/Iconicos.jsx` |
| `ProdutoCard` (C7) — anatomia fixa do produto: kicker, nome, copy, ficha técnica. O seletor de pílulas ESTÁTICO/DIGITAL (C4) saiu do card em 12/09/2026, a pedido do cliente: em vez de escolher a tecnologia por texto, o card sobe as fotos reais de Top Sight, Poster Sight, Billboard e Topo de Prédio (`imagemPor` em `lib/produtos.js`, mapa tecnologia → `{ src, alt }`), lado a lado quando as duas existem e uma só quando falta a foto do outro lado (Poster Sight e Billboard só têm digital). `tecnologiaPadrao` saiu de `lib/platforms.js` junto, por ficar sem call site. `ficha` (a linha de specs) segue lendo `specsPor.digital`, único lado com dado do cliente | `components/ui/ProdutoCard.jsx`, `lib/produtos.js` |
| `AtivoCard` — card do ativo nomeado, com a foto, a linha de specs e a lista de pontos. Ponto sem endereço mostra só a foto, em vez de anunciar na página que falta um dado | `components/ui/AtivoCard.jsx` |
| Fotos dos ativos icônicos — 20 fotos aplicadas nos 16 ativos. Os PNG originais de 4000px (143 MB) ficam em `public/media/images`, fora do versionamento por `.gitignore`; o site serve os WebP de 2000px em `public/media/iconicos`, 4 MB ao todo. A Cascata Square usa as 4, uma por ponto | `public/media/iconicos/`, `lib/iconicos.js` |
| Fotos de Digital Signage (09/09/2026) — as três peças do cliente aplicadas na página da plataforma: a fachada digital no hero e as outras duas numa faixa de duas colunas logo abaixo de "Quando essa plataforma é a escolha certa", sem título de seção, porque cabeçalho ali anunciaria uma seção que o texto do cliente não tem. Chegaram recortadas, em retrato, com fundo transparente e o arco laranja desenhado na própria imagem: entram sem moldura e contidas na caixa (`recorte` no `CoverMedia`), porque borda arredondada em volta de uma curva desenharia um segundo contorno e `object-cover` cortaria justamente a curva. A foto de recorte não desce para `PLATFORMS_LISTAGEM`: o card do coverflow é 16/9 com véu laranja por cima, e a peça entraria cortada ao meio, com o fundo transparente aparecendo atrás do véu. Os PNG originais (9,9 MB) ficam em `public/media/images/digital-signage/`, fora do versionamento; o site serve os WebP de 2000px, 668 KB ao todo | `lib/platforms.js`, `components/ui/CoverMedia.jsx`, `app/plataformas/[slug]/page.js`, `public/media/digital-signage/` |
| Cartaz "Empresas que atendemos" em Digital Signage (09/09/2026) — peça pronta do cliente com os logotipos de 8 clientes que já operam a plataforma, aplicada como faixa de prova social entre Cases e o FAQ da página. Ao contrário das outras fotos da plataforma, esta chega com fundo laranja e título já desenhados na própria imagem, então sobe sem `SectionHeading` por cima (duplicaria o título) e sem `recorte` (é um retângulo cheio, não um cutout): a proporção da imagem é 16/9 exata, então o `CoverMedia` normal não corta nada. O PNG original (714 KB) fica em `public/media/images/digital-signage/`, fora do versionamento; o site serve o WebP de 2000px, 71 KB | `lib/platforms.js`, `app/[locale]/(site)/plataformas/[slug]/page.js`, `public/media/digital-signage/` |
| Contexto da plataforma no lead — decisão de 03/09/2026: o handoff pedia `/nova-campanha?plataforma=`, mas a rota não existe e o formulário continua sendo a seção no fim de cada página. O contexto vai por prop até o `QualifierForm` e entra no lead como "Plataforma de interesse". A página de origem já diria a plataforma nas rotas de `/plataformas`, mas não diz a linha de quem preenche pela aba Green dentro do hub | `components/sections/NovaCampanha.jsx`, `components/forms/QualifierForm.jsx`, `lib/leads/origens.js` |
| Mídia Indoor são São José, Park Shopping Boulevard e Itália — o handoff fechou a divergência que estava aberta desde a COPY_SITE. O Mueller saiu do site; o Itália entrou, com os 26 andares | `lib/platforms.js` |
| Público/mês dos três shoppings — números confirmados no briefing da reta final: São José 70 mil, Itália 150 mil, Boulevard 35 mil, **255 mil** no total. O total estava em 250 mil, que não fechava com as três parcelas. O 70 mil, que já circulou como fluxo do Itália, é do São José | `lib/platforms.js` |
| Rodovias em 6 BRs — 101, 116, 277, 376, 407 e 470, a lista oficial do handoff, que vale para o site inteiro. Entraram também os 4 passos do Sob Demanda e o quadro de impactos | `lib/platforms.js` |
| Rodovias sem seção de Formatos — briefing da reta final: a plataforma é sob demanda, o painel nasce no ponto que a campanha pedir, e o diagrama de proporções fixas contradizia isso na própria página que anuncia o contrário. `semFormatos: true` na entrada desliga a seção; ela some inteira em vez de subir vazia. Quem descreve a plataforma agora é o mapa da rede. Desde 10/09/2026 a flag também vale para **Aeroporto**, a pedido do cliente: o card único da Empena digital 6×18 m saiu, e com ele a seção inteira, porque era o único formato da lista. Quem descreve a estrutura ali são os três ativos de assinatura do Distrito e a FAQ, que já falava da empena. São as duas únicas plataformas sem produto de catálogo, e agora nenhuma das duas sobe com diagrama | `lib/platforms.js`, `app/[locale]/(site)/plataformas/[slug]/page.js` |
| Praça de Conveniência Batel — briefing da reta final: o ativo deixou de ser Praça Pet e o eixo da comunicação virou conveniência. Segue na linha Regenerativo, porque continua sendo requalificação, mas não é mais isso que o card anuncia: o kicker passou a ser **primeiro produto côncavo de Curitiba**, e a face curva entrou no texto. O slug acompanhou (`praca-conveniencia-batel`); o arquivo da foto não foi renomeado, porque nome de asset não é copy. Decisão de 08/09/2026: o nome passou a valer para o site inteiro (era "Bento Viana", nome de rua; ficou "Batel", nome de bairro, igual ao resto do site), corrigido também em `lib/esg.js`, `lib/diferenciais.js`, `lib/seo.js` e `app/sobre/{social,ambiental}/page.js` | `lib/iconicos.js`, `lib/esg.js`, `lib/diferenciais.js`, `lib/seo.js` |
| Filtro de tags em dropdown — a barra deixou de listar as ~30 tags de uma vez: um botão por grupo (Plataforma, Cobertura, Indústrias), a lista abre em popover com a contagem de resultados de cada tag, opção sem resultado é omitida e os filtros ativos viram chips com × abaixo da barra. Serve blog e cases pelo mesmo componente | `components/ui/TagFilter.jsx`, `components/blog/PostsExplorer.jsx`, `components/cases/CasesExplorer.jsx` |
| Cases com filtro por tag | `app/cases/`, `lib/cases/` |
| Blog com CMS próprio | `app/blog/artigos/`, `app/admin/`, `lib/blog/` |
| Classificação obrigatória do post — Plataforma, Cobertura e Indústrias são grupos fixos do escopo `blog`: existem sempre (sem doc no Firestore), o admin não renomeia nem exclui, e nenhum post é publicado sem ao menos uma tag de cada. Rascunho pode ficar incompleto | `lib/tags/obrigatorios.js`, `lib/blog/validate.js`, `app/api/admin/posts/` |
| Rascunho local do post — botão "Salvar rascunho no navegador" grava em `localStorage` (uma chave por post) e oferece restaurar/descartar ao reabrir o editor; some ao salvar no painel | `components/forms/PostEditorForm.jsx` |
| Voltar ação no editor de post — histórico de edição do formulário inteiro (Ctrl+Z / Ctrl+Shift+Z / Ctrl+Y + botões ↶ ↷ na barra). Digitação entra em rajada de 600ms; barra de formatação, tags e uploads abrem um passo cada. Substitui o desfazer nativo, que o textarea controlado perde | `lib/useUndoableState.js`, `components/forms/PostEditorForm.jsx` |
| Hub do Blog (portas Cases, Artigos e Podcast + destaque) | `app/blog/page.js` |
| Podcast — 3ª porta do Blog (estrutura pronta; episódios em `TODO(cliente)`) | `app/blog/podcast/`, `lib/podcast.js` |
| Menu colapsável com os hubs e o nível 2 | `components/layout/Header.jsx`, `lib/nav.js` |
| Hub Sobre nós — hero, Sobre a OM, Presença, bloco institucional com os big numbers, linha do tempo, Gestão 360 OM sob o título "Por que a Outdoormídia", Nosso compromisso e banco de talentos. Checklist do cliente aplicado (`claude/checklist-sobre-nos.md`, 25/08/2026) | `app/sobre/`, `lib/sobre.js` |
| Linha do tempo — cinco marcos (1959 · 1980s · 2000s · 2010 · Hoje). Em 12/09/2026 o cliente reescreveu 2000s (a troca de geração da empresa) e devolveu o marco de 2010 (pioneiros no outdoor digital, o maior roteiro de projetos icônicos do Sul), que tinha sido fundido ao anterior em 25/08. Os dois textos entraram verbatim, inclusive a concordância de "Os anos 2000 marcou"; os títulos dos dois cards são nossos, porque a copy veio sem título. 2010 é o único marco sem foto de acervo e sobe no painel bege com o ano | `lib/sobre.js`, `lib/i18n/content/sobre.*.js` |
| Linha do tempo em onda, movida pela rolagem (09/09/2026) — a seção de `/sobre` deixou de ser o grid de quatro cards e virou um palco preso na tela: uma curva laranja se desenha da esquerda para a direita enquanto a página rola, e cada marco acende quando a linha chega nele, a foto entrando do lado da curva e o texto do lado livre. Quem mede é o mesmo padrão de `Process`, na mesma página: `getBoundingClientRect` da pista a cada frame de rolagem (agendado por `requestAnimationFrame`), com o avanço sendo a rolagem já consumida dentro dela. **Não usa `IntersectionObserver` de propósito:** a primeira versão marcava quatro sentinelas de 1px numa faixa de 10% da tela (`rootMargin` de -45%), e rolagem de trackpad passa dos ~72px dessa faixa entre dois frames — o observer não vê mudança de estado, não dispara, e o marco nunca acendia. Só o primeiro subia, porque a chamada inicial do observer pega todos os alvos de uma vez. Medir posição absoluta não tem faixa para pular | `components/sections/LinhaDoTempo.jsx`, `components/sections/Process.jsx` |
| Linha do tempo — a linha fica fora do ciclo de render. O `stroke-dashoffset` muda em todo frame de rolagem e é escrito direto no elemento por um ref, **e não aparece no `style` do JSX**: o que o React conhece ele reescreve na re-renderização seguinte, apagando o valor recém-gravado (mesma lição de `HomeTimeline`). O que é estado é só a contagem de marcos acesos, que muda quatro vezes na rolagem inteira, em vez dos quatro nós e quatro textos reconciliando 60 vezes por segundo. O traçado usa `pathLength="1"`, então o dash é fração do caminho e nada precisa ser medido no navegador; sem `strokeDashoffset` no JSX ele nasce em 0, que é a linha inteira, o estado certo para SSR e para quem está sem JS. Toda posição é porcentagem de um viewBox de 1200×560, e o container carrega a mesma proporção: a peça encolhe inteira entre 980px e 1280px sem que nó e texto se desencontrem. O conteúdo vem de `getMarcos(locale)`, sem uma palavra trocada | `components/sections/LinhaDoTempo.jsx` |
| Linha do tempo abaixo de 980px — a onda sai e entra a lista empilhada, com a mesma animação virada para a vertical (12/09/2026): um trilho à esquerda dos cards se preenche de laranja conforme a rolagem, e cada card acende (nó laranja, card subindo em fade) quando o preenchimento chega no seu nó. A lista não é presa na tela como a onda: o ponto de leitura é fixo na janela (72% da altura) e desce pela lista conforme ela sobe, então o card acende com o resto dele ainda entrando pela dobra de baixo. O preenchimento é `scaleY` escrito por ref, fora do `style` do JSX, pela mesma razão do dash da onda. No tablet o card é deitado (foto à esquerda, texto à direita), porque em coluna única a foto 16/9 ocuparia a tela inteira; no telefone volta a empilhar. Posição absoluta em px não reflui, e continuar encolhendo o palco da onda deixaria o texto do card ilegível muito antes de o layout quebrar. Só um dos dois palcos está no documento por vez (`display:none`), então nada é lido duas vezes por leitor de tela, mas os dois refs existem sempre e o palco que saiu volta ao estado inteiro na troca de breakpoint. Sem medição (SSR, sem JS ou `prefers-reduced-motion`) os cinco nascem acesos e a linha, inteira, em vez de a seção subir vazia | `components/sections/LinhaDoTempo.jsx` |
| Capa do topo de `/sobre` (11/09/2026) — a foto aérea da sede em Curitiba (os dois galpões com placas solares, a fachada com a marca e a bandeira), no lugar da foto do time que subiu em 10/09: o time segue na página, mas só na seção do Banco de Talentos, que é onde ele fala com candidato. O mesmo arquivo abre o hero de `/trabalhe-conosco`, que virou o hero de duas colunas das páginas de plataforma (texto à esquerda, foto à direita). O WebP servido é 2000×1125, 16/9 exato, então nos dois lugares a capa sobe nessa proporção e nada é cortado; em 16/7 o corte levaria a fileira de carros da frente e o telhado do galpão de trás. O PNG original de 7680×4320 (8 MB) fica em `public/media/images/sobre-nos/`, fora do versionamento. Entra com `priority` nas duas páginas, por ser a maior imagem da primeira dobra, e em `/sobre` o alt vive nos quatro idiomas (`SobrePage.capaAlt`); em `/trabalhe-conosco` ele é PT fixo, como o resto daquele hero, que ainda não passou pelo `next-intl` | `app/[locale]/(site)/sobre/page.js`, `app/[locale]/(site)/trabalhe-conosco/page.js`, `messages/*.json`, `public/media/sobre-nos/foto-da-sede.webp` |
| Fotos da linha do tempo — uma por marco, do acervo do cliente. Os quatro WebP 1600×900 foram regerados em 09/09/2026 a partir dos PNG de acervo: os originais tinham substituído os WebP na pasta servida, com outros nomes, e `lib/sobre.js` seguia apontando para os antigos, então os quatro cards subiam com a imagem quebrada. Os scans de 1980s e 2000s vêm em retrato e foram rotacionados 270° na conversão (as duas direções foram conferidas antes, 90° deixa a rua de cabeça para baixo). 87 MB de PNG viraram 594 KB de WebP | `lib/sobre.js`, `public/media/linha-do-tempo/` |
| Gestão 360 OM compartilhado — o mesmo `Process` monta a seção na home e em `/sobre`; só `num` e `title` mudam. Editar num lugar reflete nos dois | `components/sections/Process.jsx` |
| Filhas de Sobre nós — Ambiental, Social e Governança com a copy dos checklists de 25/08/2026. Ambiental: "O que já é realidade" (Praça de Carregamento Elétrico, Praça de Conveniência Batel e Jardim Vertical, cada card abrindo pelo endereço), "O ciclo da lona" e "Como a operação reduz impacto". Social: Corajosamente Éticos, Loja OM do Bem com a Caminho do Renascer e a Mídia Regenerativa. Governança: "Quem responde" (retrato do CEO, texto institucional) e os 5 pilares. Saíram todos os cards de meta vazia, "em breve" e certificação não confirmada | `app/sobre/{ambiental,social,governanca}/`, `lib/esg.js` |
| Fotos de Social — três aplicadas em 07/09/2026: o selo do movimento na seção 01, a prateleira da Loja OM do Bem e a foto institucional da Caminho do Renascer na seção 02, e o poste da Praça de Conveniência Batel (câmera e botão de emergência da Muralha Digital) na seção 03. Originais em `public/media/images/social/`, fora do versionamento; o site serve os WebP em `public/media/social/` | `app/sobre/social/page.js`, `public/media/social/` |
| Hub Soluções + Diferenciais + Regiões | `app/solucoes/`, `lib/diferenciais.js` |
| Regiões e cobertura — checklist de 02/09/2026 aplicado: saiu a faixa de cinco cards do rodapé do mapa, que repetia a lista da seção 02 linha por linha; a contagem de plataformas, única informação exclusiva dela, migrou para a linha da lista como rótulo laranja em caixa alta, derivada de `formats.length` para nunca divergir dos chips ao lado. A seção 02 passou a se chamar **Regiões atendidas**, o mapa virou peça estática nesta página (`mapaEstatico`) e a instrução de passar o mouse saiu do hero junto com ele. O `mapaEstatico` deixou de existir em 08/09/2026, com a troca do mapa: o novo é interativo nas três seções de cobertura, por pedido do cliente | `app/solucoes/regioes-cobertura/page.js`, `components/sections/CoverageExplorer.jsx`, `components/ui/CoverageMap.jsx` |
| Regiões e cobertura — copy de 02/09/2026 (`claude/copy-regioes.md`) conferida linha por linha: hero, seção 01, chips, botão, linha de apoio, abertura da seção 02 e as cinco regiões já estavam idênticas ao documento. O que mudou foi o SEO. O title deixou de ser o nome da página e passou a listar as cidades, que é como a busca chega aqui, e a description veio do documento. `lib/seo.js` acompanha, para a linha do `llms.txt` não divergir da meta | `app/solucoes/regioes-cobertura/page.js`, `lib/seo.js` |
| Cards de região fora do site (10/09/2026) — a faixa de cinco cards (`N PLATAFORMAS` + nome + descrição, montada sobre `getLocations`) saiu da seção Regiões de `/solucoes`, a única rota que a exibia. A seção fica com o texto de Presença e o `MapaCobertura`, que já nomeia as cinco regiões e continua sendo o caminho para `/solucoes/regioes-cobertura`. `getLocations` segue alimentando os selects de `/proposta` e de `Sua marca no OOH` e o editor do admin | `app/[locale]/(site)/solucoes/page.js` |
| Plataformas em `/solucoes` no mesmo carrossel da home (10/09/2026) — o acordeão de linhas (`Platforms`) deu lugar ao `PlatformsCarousel`, com o letreiro de postes e o `CarrosselContinuo` das nove entradas de `PLATFORMS_LISTAGEM`. As duas leituras da mesma lista deixam de divergir de desenho, e o `id="plataformas"` continua valendo como âncora. `components/sections/Platforms.jsx` ficou sem call site: o arquivo segue no repo, como o `Coverflow` | `app/[locale]/(site)/solucoes/page.js`, `components/sections/PlatformsCarousel.jsx` |
| Slug de Regiões — a rota virou `/solucoes/regioes-cobertura`, o slug do documento e o mesmo par que o menu e o breadcrumb já usavam. `/solucoes/regioes` segue como redirect permanente. Acompanharam os links internos do hub de Soluções, do menu, do 404 e dos dois CTAs contextuais do diagnóstico | `next.config.mjs`, `lib/nav.js`, `lib/seo.js`, `lib/diagnostico.js` |
| Região é local, praça é Praça Pet — decisão de 02/09/2026: `praça` não designa cidade, mercado nem área de cobertura na copy do site; fica reservado aos ativos Praça Pet e Praça de Carregamento Elétrico. Aplicado nas ocorrências que o checklist enumera: hero da home, Gestão 360 OM (passo 01 e abertura), Cobertura, as duas respostas do FAQ e o marco 2000s da linha do tempo. Nomes de componente, constante e parâmetro de URL não mudam, por serem código | `components/sections/Hero.jsx`, `Process.jsx`, `CoverageExplorer.jsx`, `lib/faq.js`, `lib/sobre.js` |
| Páginas dos diferenciais (SSG) — mesma estrutura, conteúdo por slug. `publicado: false` tira do ar sem apagar o texto. Toda seção abaixo do "o que é" é opcional e some quando o campo não existe: "A prova", "Aplicação prática", a comparação e o mini-case. Também são opcionais `aside.footer`, os cards do "o que é" (com `cardsTitle` próprio), a capa do topo (`image`) e a da seção 01 (`oQueE.image`), e o `lead` aceita string ou lista de parágrafos. O CTA secundário do topo vem de `ctaSecundario` quando existe; sem ele, cai na âncora de "Aplicação prática" como antes | `app/solucoes/diferenciais/[slug]/`, `lib/diferenciais.js` |
| Diferencial 01 · Face Única — checklist de 27/08/2026. "O que é" com o texto oficial do PDF Conceito Face Única em dois parágrafos e os 3 benefícios como card; "A prova", "Aplicação prática" e o mini-case saíram; a comparação virou **Amador / Especialista** em foto, em seção própria (`#comparacao`), com a nota de rodapé que vale só para o lado Amador, que é mockup. O CTA "Ver na prática" do topo, órfão com a saída de "Aplicação prática", passou a apontar para a comparação | `lib/diferenciais.js` |
| Diferencial 02 · Aeroporto Square — versão curta de 27/08/2026: só argumento de diferenciação, nenhum número de rede e nenhuma localização, porque os dois também aparecem na plataforma Aeroporto e divergiriam ali. O CTA secundário leva a `/plataformas/aeroporto`. O slug virou `aeroporto-square`; `/solucoes/diferenciais/painel-hibrido` segue como redirect permanente | `lib/diferenciais.js`, `next.config.mjs` |
| Diferencial 03 · Inteligência e audiência — texto final de 02/09/2026 (`claude/copy-inteligencia-e-audiencia.md`). A página deixou de seguir o esqueleto dos outros diferenciais: hero sem botão e sem card lateral, e quatro seções próprias no lugar de "O que é", "A prova" e "Aplicação prática" — monitoramento (governada pelo vídeo: sem ele a seção não sobe), os 8 itens do relatório em lista, a leitura de audiência com o período apurado declarado na abertura e o bloco de privacidade. Saíram os 82 equipamentos e as 138 telas, números fora de circulação, e o mini-case que o comercial nunca confirmou. O slug virou `inteligencia-e-audiencia`; `/solucoes/diferenciais/audiencia-mensurada` segue como redirect permanente. A home não muda: `intro` continua sendo a copy do card 03 e o hero da página usa `subtitulo` | `lib/diferenciais.js`, `next.config.mjs` |
| Template de diferencial totalmente opcional — `oQueE` passou a depender do `lead` (um `oQueE` só com `cards` alimenta os marcadores do card na home sem abrir a seção na página), `aside` some e o hero vira uma coluna, `semCta` tira os botões do topo, `subtitulo` separa o texto do hero do texto do card da home e `seo` sobrescreve title e description. As seções novas (`monitoramento`, `relatorio`, `leitura`, `privacidade`) entram como qualquer outra | `app/solucoes/diferenciais/[slug]/page.js` |
| Responsividade do template de diferencial (08/09/2026) — o hero deixou de ser um clamp só para os seis headings: acima de 21 caracteres (hoje só Inteligência e audiência, com 25) ele entra num degrau menor, `clamp(34px,8vw,76px)`, que fecha em uma linha a partir de ~1120px e em duas abaixo disso. Com o clamp único, a linha encostava na borda do `.wrap` entre 1150px e 1300px, faixa em que a fonte já está no teto e o container não cresce mais. Entraram junto o degrau de tablet nas seções, a proporção fixa no vídeo de monitoramento (a fonte é 1280×720, então nada é cortado e a altura para de saltar quando o arquivo chega), o `whitespace-normal` no telefone para os CTAs do hero, que são `nowrap` por primitivo e sangravam com rótulo longo, e o empilhamento do par título + "Ver todos" em Outros diferenciais | `app/solucoes/diferenciais/[slug]/page.js`, `components/ui/SectionHeading.jsx` |
| Ícones das seções 01 e 02 de Inteligência e audiência — a seção do relatório ganhou um ícone por métrica (as oito de `relatorio`) e a leitura na prática, um por recorte de audiência (faixa etária, os dois gêneros e as duas faixas de renda). O ícone é dado da entrada (`Icone` em `lib/diferenciais.js`), não escolha do template: quem edita a métrica edita o ícone junto, no mesmo lugar. Laranja da marca sobre fundo claro e `size={24}`, que é a medida de card | `lib/diferenciais.js`, `app/solucoes/diferenciais/[slug]/page.js` |
| Capa dos seis diferenciais (06/09/2026) — as cinco fotos e o vídeo entregues pelo cliente aplicados em três lugares: os cards da seção da home (que também roda em `/solucoes`), o card da listagem do hub e a capa do topo das páginas de Face Única, Aeroporto Square e Mídia Regenerativa. Inteligência e audiência é o único sem foto e abre o card com o próprio vídeo de monitoramento (`cardVideo`), a mesma peça que agora destrava a seção 01 da página dedicada. Circuito MUB e Gestão 360 OM não têm página: neles a capa serve só os dois cards | `lib/diferenciais.js`, `components/ui/DiferencialCard.jsx`, `app/solucoes/diferenciais/page.js` |
| Diferenciais em coverflow (07/09/2026) — o painel preto de abas saiu da home e de `/solucoes`: os seis viraram os mesmos cards claros da listagem do hub, rodando no `CarrosselContinuo` das Plataformas, com a mesma fita que gira sozinha, para com o ponteiro em cima e não tem ponta em lado nenhum. O card virou peça compartilhada (`DiferencialCard`), pelo mesmo motivo do `PlatformShowcaseCard`: as duas leituras da mesma lista não podem divergir de desenho. A seção deixou de ser client component, porque a única interação agora vive dentro do carrossel. O vídeo do card 03 entra por `data-src` (`videoDeferido` no `CoverMedia`), então quem dá o play é o carrossel, e só no card que passa pelo centro | `components/sections/Diferenciais.jsx`, `components/ui/DiferencialCard.jsx`, `components/ui/CoverMedia.jsx` |
| Capa de Face Única é recorte, não o enquadramento inteiro — no arquivo entregue, dois dos painéis exibem "+380 milhões de impactos mensais", número fora de circulação. O recorte da direita mantém o argumento da seção (uma estrutura inteira ocupada por uma marca só) sem republicar o número. O original completo fica em `public/media/images/diferenciais/`, fora do versionamento | `public/media/diferenciais/face-unica.webp` |
| Peso dos assets dos diferenciais — os PNG de 4000 a 7680px (45 MB ao todo) e o MP4 em AV1 720p a 5,6 Mbps ficam em `public/media/images/diferenciais/`, fora do versionamento por `.gitignore`; o site serve os WebP de 2000px e o MP4 em H.264 sem faixa de áudio (a original tinha 2 kbps, silêncio), 5,2 MB ao todo. AV1 em MP4 não toca em todo Safari, e é por isso que o vídeo foi transcodificado, não só recomprimido | `public/media/diferenciais/` |
| Teaser de "Outros diferenciais" usa o texto canônico do hub — o card lê `text`, o mesmo campo que monta o card na home e na listagem, em vez do `resumo`. `resumo` continua sendo a linha do `llms.txt` | `app/solucoes/diferenciais/[slug]/page.js` |
| Diferenciais, nova estrutura de 02/09/2026 (`claude/diferenciais-home-v2.md`, que substitui a seção 05 do checklist da home) — seguem seis cards, dois saem, dois entram e um é reescrito: **04 · Mídia Regenerativa** perdeu o "e Segurança" e absorveu o card de Gentileza Urbana (eram a mesma caixinha, e ficavam lado a lado falando de cidade), **05 · Circuito MUB por nicho** e **06 · Gestão 360 OM** entram no lugar de Gentileza Urbana e de Operação e monitoramento. Este último saiu por ser o único card que não nomeava nada: o que ele dizia já vive no 03 e na própria Gestão 360 OM. Nenhum conteúdo se perde, a carteira Gentileza Urbana segue com copy completa em `/sobre/ambiental`. Os dois slugs que saíram do ar viram redirect permanente: `gentileza-urbana` para a Ambiental, `operacao-propria` para o hub | `lib/diferenciais.js`, `next.config.mjs` |
| Diferencial que é âncora, não página — critério de 02/09/2026: conceito ganha página, ativo ou produto vira âncora para a plataforma ou a seção que já o abriga. Quem marca é o próprio `href`: apontando para fora de `/solucoes/diferenciais/`, a entrada não gera rota estática, não entra no sitemap e não entra no `llms.txt` (`DIFERENCIAIS_COM_PAGINA`), e `cardCta` troca o rótulo do link, porque "Ver diferencial" mentiria sobre o destino. É assim que o 05 leva à página da plataforma MUB (`/plataformas/mub`, decisão de 10/09/2026: a âncora `/plataformas#mub` parava o leitor no card do catálogo, e o card promete a plataforma) e o 06 leva à seção Gestão 360 OM de `/sobre` (`/sobre#processo`) | `lib/diferenciais.js`, `components/sections/Diferenciais.jsx`, `components/sections/PlatformsCatalog.jsx`, `app/sitemap.js`, `app/llms.txt/route.js` |
| Mídia Regenerativa, "O que é" virou "o que a marca ganha" (10/09/2026) — a seção trocou a anatomia técnica do ativo (Muralha Digital, botão de emergência, já ditas no hero e no `aside`) pelo argumento de negócio: presença que vira permanência, e a associação com o bairro que mídia avulsa não compra. Abaixo dela entra `carteira`, os quatro projetos da linha Regenerativo em card com link direto: Praças Pet e Jardim Digital abrem a linha certa em Projetos Icônicos, MUB Garden vai à plataforma MUB, e Praça de Carregamento Elétrico à Ambiental, cada um enquadrado por `scroll-mt-24`. O card de ativo (`AtivoCard`) e o card de "O que já é realidade" da Ambiental ganharam `id={slug}` para isso: nenhum dos dois tinha âncora própria até então, só a linha inteira (`#green`, `#regenerativo`, `#elegancy`). A âncora de ativo dentro de Icônicos exigiu ensinar o efeito de hash a procurar o slug dentro de `ativos` de cada linha, não só o da própria linha, e a rolar até o card manualmente depois de trocar de aba, porque ele nasce `hidden` e o pulo nativo do navegador já falhou antes da troca | `lib/diferenciais.js`, `app/solucoes/diferenciais/[slug]/page.js`, `components/sections/Iconicos.jsx`, `components/ui/AtivoCard.jsx`, `app/sobre/ambiental/page.js` |
| Card 06 · Gestão 360 OM é teaser, não seção — a seção continua sendo a dona dos três passos; o card existe para dar o destaque que o Halisson pediu e entregar o leitor nela. Não crescer: se ganhar os três passos, a seção perde a razão de existir. O destino do card virou `/sobre#processo` no briefing da reta final: o mesmo `Process` monta a seção na home e em `/sobre`, e é em Sobre nós que o briefing manda o botão cair | `lib/diferenciais.js`, `components/sections/Process.jsx` |
| Área do anunciante (hub + 4 ferramentas) — checklist de 26/08/2026 aplicado: os 4 cards ganharam ícone `lucide-react` em laranja (medidor, painel, lâmpada e interrogação) e textos novos. Saíram o kicker `Downloads` e a promessa de impactos e faixa de investimento do card de Sua marca no OOH: a ferramenta aplica logo ou peça sobre a foto real do painel, e nada além disso. O kicker do FAQ conta as perguntas de `lib/faq.js` em vez de trazer o número na mão | `app/area-do-anunciante/page.js` |
| Simulador de campanha (estimativa de impactos e CPM) — fora do ar desde 11/09/2026, substituído por Sua marca no OOH; os arquivos seguem no repo sem call site | `components/forms/SimuladorForm.jsx`, `lib/simulador.js` |
| Melhores Práticas (09/09/2026) — a página voltou ao site em `/area-do-anunciante/melhores-praticas`, reescrita do zero pelo `claude/checklist-melhores-praticas.md`: já não é a página de downloads que nunca teve arquivo (o antigo Mídia Kit, depois Guia do Anunciante), é conteúdo de decisão. Hero, abertura, as 8 práticas, a tabela objetivo × plataforma, as 5 perguntas de fechamento, as 3 saídas e o `NovaCampanha` compartilhado. Só tipografia, sem imagem por prática: oito fotos de painel aqui competiriam com `Sua marca no OOH`, que é onde a foto trabalha. Voltaram junto o item do menu, o card do hub (kicker `Conteúdo · 8 práticas`, contagem derivada de `PRATICAS`) e a entrada de sitemap/llms.txt. `/anunciante/midia-kit` e `/area-do-anunciante/guia-do-anunciante` deixaram de cair no hub e passaram a apontar para a página. **O nome Mídia Kit não aparece em lugar nenhum da página**, e o material segue sob demanda do comercial, nunca como download, que é o que a resposta do FAQ já diz | `app/area-do-anunciante/melhores-praticas/`, `lib/melhoresPraticas.js`, `next.config.mjs`, `lib/nav.js`, `lib/seo.js` |
| Melhores Práticas — a fronteira com FAQ e Blog é o que mantém a página curta. Prazo de veiculação, quem faz a arte, exclusividade do ponto e comprovação são do FAQ, e nenhuma das 8 práticas repete resposta de lá: o bloco que explicava a bi-semana em 14 dias saiu na revisão de 09/09 do próprio checklist, porque o FAQ já responde isso em duas perguntas, e virou uma linha de aplicação com link. A página também não traz nenhum número além dos `67 anos` da abertura: big number aqui empurra o leitor de volta para a lógica de tamanho, que é justamente o que as práticas 01 e 04 pedem para ele abandonar. Fora dela, por regra do checklist: faixa de preço, CPM, promessa de alcance e o prazo de 15 meses de Rodovias, que é condição comercial e muda | `lib/melhoresPraticas.js` |
| Melhores Práticas — a tabela nomeia plataforma, nunca formato. `Super Top Sight` é formato, e nomear formato ali cria expectativa de disponibilidade que a página não pode garantir; a decisão de formato pertence à conversa comercial. As nove linhas cobrem as nove plataformas oficiais com a descrição aprovada de cada uma, e cada nome leva à página dela, que é o principal caminho de saída desta página para o portfólio | `lib/melhoresPraticas.js` |
| Melhores Práticas — SEO com título de busca próprio. O title tag é `Como planejar uma campanha de mídia exterior: 8 práticas`, não o nome da ferramenta: `Melhores práticas` é como a página se chama dentro do site e ninguém busca por isso, enquanto `como escolher outdoor` e `como fazer campanha de outdoor` são a busca de quem está exatamente no momento de decisão que a página atende. O H1 continua sendo `Melhores práticas.` | `app/area-do-anunciante/melhores-praticas/page.js`, `lib/seo.js` |
| FAQ — checklist do cliente aplicado (26/08/2026): 19 perguntas nos mesmos 4 grupos, com as quatro do Marcelo (empresa pequena, mídia exterior vs redes sociais, ponto específico, o que está incluso no valor) e a home com uma seleção própria de 8, na ordem do documento. "Todos os painéis são iluminados?" saiu, absorvida pela pergunta de diferença entre formatos | `components/sections/Faq.jsx`, `FaqCategorias.jsx`, `PlatformFaq.jsx`, `lib/faq.js` |
| Resposta do FAQ em parágrafos — `a` é lista, `fonte` é a linha de atribuição em corpo reduzido abaixo dela, e o `Accordion` aceita `**negrito**` no meio do parágrafo. As FAQs das plataformas seguem passando `a` como string | `components/ui/Accordion.jsx`, `lib/faq.js` |
| Avaliações de clientes — sete cards 9:16 com capa, badge de duração, citação sobre o gradiente e modal de vídeo. Desde 09/09/2026 a fita é o `CarrosselContinuo` das Plataformas e dos Diferenciais, no lugar do `Coverflow` com scroll nativo e bolinhas: sem ponta em lado nenhum, girando sozinha e parando com o ponteiro em cima. O card que nasce no centro é o do Guilherme Heimbecher (Claro), por pedido do cliente. O card 03 (Cia do Pastel) é título editorial, sem aspas: entre aspas viraria fala fabricada. Os quatro que entraram em 09/09/2026 (Confeitaria Didé, Dra. Gabriele Andrioli, Rayan Chemite, Felipe/Expo MotorHome) tiveram a citação transcrita da legenda queimada no próprio vídeo, não ouvida nem redigida — mesma exigência de fidelidade dos três originais | `components/sections/Reviews.jsx` |
| Banco de talentos — sem formulário no site desde 25/08/2026: a seção traz o texto, o botão **Preencher cadastro** (Google Forms do cliente, nova aba) e o e-mail do RH como alternativa. As respostas caem direto no Drive do cliente, sem formulário, validação, armazenamento nem envio do nosso lado; as áreas de atuação vivem dentro do formulário, não na página. Nenhuma promessa de prazo de resposta ou de validade do cadastro, porque não há processo definido para isso | `components/sections/BancoDeTalentos.jsx`, `TALENTOS_FORM_URL` em `lib/constants.js` |
| Diagnóstico de marca (quiz) | `app/diagnostico/`, `lib/diagnostico.js` |
| Mapa de cobertura (08/09/2026) — o protótipo aprovado pelo cliente substituiu o mapa de pins nas três seções de cobertura (home, `/solucoes` e `/solucoes/regioes-cobertura`), com os filtros inteiros: chips das cinco regiões, interruptor de rodovias, interruptor de todos os nomes, legenda e o cartão de foco que troca de texto conforme o que está aceso. São duas leituras no mesmo desenho: onde existe mídia urbana o município inteiro é pintado de laranja, e onde o alcance é pela estrada a cidade vira um ponto sobre o eixo do corredor. Nada é calculado em runtime além da colisão dos rótulos, que depende da métrica da Poppins e por isso não pôde ser assada no arquivo de dados como em `MapaRodovias`: o solucionador escolhe o lado de cada nome no `useLayoutEffect` e repete a conta quando a fonte carrega. A geometria não vem mais do Firestore, então o mapa parou de depender da coleção `locations` — ela segue alimentando as listas de região das duas páginas de Soluções e o editor do admin. O laranja e o grafite do protótipo viraram `--color-orange` e `--color-ink`; o bege de "sem cobertura" sai de um `color-mix` do próprio laranja, para não entrar cor nova na paleta | `components/ui/MapaCobertura.jsx`, `lib/mapaCobertura.js` |
| Corredor do litoral fechado em Garuva (11/09/2026) — o protótipo do mapa de cobertura cortava o corredor PR-407 · PR-412 na cidade de Guaratuba e colocava o ponto de Guaratuba no centroide do município, no interior: a linha morria no mar e sobravam dois pontos soltos entre Paranaguá e Joinville, enquanto o mapa de Rodovias leva o mesmo corredor até Garuva. Os dois mapas saem da mesma geometria real (a relação entre eles é escala uniforme + translação, ajustada pelos oito entroncamentos comuns com resíduo abaixo de 0,4 px), então o trecho Guaratuba ⇄ Garuva foi derivado de `lib/mapaRodovias.js` e não desenhado à mão, e termina no entroncamento BR-376/BR-101 que já existia. O ponto de Guaratuba foi para a cidade, sobre a estrada, com rótulo à direita como no mapa de Rodovias; Garuva entrou nos `munis` do corredor e o nome ganhou o destino nos quatro idiomas. Seguem seis corredores. O Contorno Leste (BR-116 por Piraquara), que o mapa de Rodovias desenha, continua fora: é alça dentro da mancha laranja da Região Metropolitana e não acrescenta cobertura | `lib/mapaCobertura.js`, `lib/i18n/content/mapaCobertura.*.js` |
| Mapa de praças (SVG, dados IBGE) — contorno suavizado: malha `intermediaria` do IBGE, anéis degenerados descartados (os dois pontinhos no oeste do PR eram artefato de 4 vértices, não ilhas), simplificação Ramer-Douglas-Peucker e conversão em Bézier cúbica (Catmull-Rom). O epsilon é alto de propósito (6 no contorno, 10 na divisa, ~72 vértices por estado contra 418 da malha crua): o mapa aparece com menos de 500px de largura, e nesse tamanho detalhe geográfico fino não lê como costa, lê como ruído. Subir a resolução da malha sem simplificar junto piora a peça. A divisa PR/SC é desenhada duas vezes, uma por estado, então a simplificação é topológica: os arcos compartilhados são simplificados uma vez e reaproveitados nos dois lados, e a tangente é zerada no ponto tríplice. Sem isso os dois traçados divergem e abre uma fresta. Tudo no gerador, que roda uma vez e é commitado — nenhuma dependência nova e nada em runtime. Desde 08/09/2026 esta peça serve só o admin: quem desenha a cobertura no site é o `MapaCobertura` | `scripts/generate-map-paths.mjs`, `components/ui/CoverageMap.jsx`, `lib/mapShapes.js` |
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
| **Melhores Práticas — quatro pontos de validação com a Alexandra** | O checklist foi escrito antes da validação, por decisão de 06/09/2026, para a página sair do bloqueio em que estava desde 26/08. **Bloqueiam a publicação:** (01, encerrado) a pergunta 05 deixou de ser "Existem custos após o período inicial de veiculação?" e virou "O que está incluso no valor da campanha?", a solução que o FAQ já validou em 26/08, e não depende mais de validação; (02) instalação inclusa está confirmada pelo documento de campo e pelo checklist de Digital Signage, resta confirmar se vale para todos os produtos da frente ou só parte; (03) **escopo do Face Única, o mais urgente** — o `checklist-faq.md` afirma exclusividade em toda face, sem ressalva, e a base de plataformas registra o Face Única documentado apenas no Mosaico Square. Se valer só para alguns ativos, o problema é maior que esta página: a resposta do FAQ promete garantia e precisa ser corrigida antes de qualquer publicação, e a prática 06 passa a citar os projetos nomeados; (04) se existe leitura de fluxo e perfil de público por ponto — hoje a prática 07 **ensina a pergunta em vez de garantir a resposta**, porque afirmar o contrário conflita com a base, que não tem alcance validado. Se existir, a redação volta para a forma afirmativa e o card `Sua marca no OOH` pode ser reavaliado. Enquanto o ponto 03 não fecha, a página fica com `robots: noindex` e fora do sitemap, como Ambiental e Podcast: a garantia de Face Única aparece nela duas vezes, na prática 06 e na pergunta 01 |
| Melhores Práticas — a tabela chama a plataforma de `Malls` | É o nome que o checklist de 09/09 usa, ancorado na base de plataformas e nomenclatura, e é o mesmo nome que o chip de Curitiba já usa no filtro do Blog. Mas `lib/platforms.js` segue nomeando a plataforma **Mídia Indoor** (slug `shoppings`), então a tabela e a página de destino divergem de nome. Renomear o catálogo inteiro não estava em checklist nenhum e precisa de decisão: ou o catálogo vira Malls, ou esta linha volta a Mídia Indoor |
| Melhores Práticas — decisões que não bloqueiam | Três, do próprio checklist: se a página recebe imagem de apoio por prática (a recomendação é não, e é o que está no ar); se as oito práticas viram também oito artigos no Blog, com esta página como índice; e a periodicidade de revisão, com a sugestão de uma por ciclo comercial, para a página não envelhecer junto com o portfólio |
| **Diagnóstico de presença — revisão completa** | Checklist fechado em 26/08/2026, com prioridade sobre o resto deste documento nesse escopo: de 7 para 10 perguntas, de 3 para 5 faixas de resultado, bloco educativo novo, CTA de fim de página, captura de e-mail opcional e mudança de rota para `/area-do-anunciante/diagnostico-de-presenca`. Ainda não implementado — a página de hoje continua em `app/diagnostico/`. Ver `## Checklist Pendente — Diagnóstico de Presença` logo abaixo desta tabela. Bloqueada por 2 itens até publicar |
| Horário de atendimento no JSON-LD | Razão social, CNPJ e endereço já estão preenchidos em `lib/empresa.js` (e saem no rodapé, na Política de Privacidade, no JSON-LD e no llms.txt). Falta só `horarios`, ainda vazio sob `TODO(cliente)`: campo vazio é omitido do schema, porque dado errado em structured data vira horário errado no Google |
| Encarregado de dados (LGPD) | `lib/empresa.js` ainda tem `encarregado` vazio sob `TODO(cliente)`. Enquanto não vier, a Política de Privacidade usa o e-mail geral como canal do titular |
| Revisão jurídica de `/privacidade` e `/termos` | Os textos de `lib/legal.js` são minuta redigida a partir do que o site de fato coleta, alinhada à Lei 13.709/2018. Precisam passar pelo jurídico do cliente antes de valerem como peça legal |
| Evento de conversão em `/obrigado` | A página existe e é o destino dos dois formulários, mas não há GA4/GTM no projeto. Instalar Analytics torna falsa a frase "sem rastreamento" do `CookieNotice` e exige decidir opt-in — os dois andam juntos |
| Imagem de Open Graph | Nenhuma rota declara `openGraph.images` fora do blog e não há asset de OG em `public/`. Link compartilhado sai sem card. `logo.png` e `om.png` são brancos (viram máscara CSS), não servem como `logo` de schema |
| Idiomas (PT / EN / ES / ZH) | Os botões de idioma (agora dentro do menu) só trocam `useState` — não há i18n |
| Envio de e-mail nos formulários | Falta integrar Resend. `ProposalForm` e o qualificador já gravam em `leads` — o comercial vê tudo em `/admin/leads` —, mas ninguém é **avisado**: só descobre entrando no painel. A copy de `/obrigado?origem=proposta` foi escrita quando nada era guardado e ainda não promete guarda; pode ser revista |
| Leads do Diagnóstico e de Sua marca no OOH | Os dois fluxos são anônimos hoje (o diagnóstico só tem as notas, a pré-visualização só a logo no navegador) — gravar exige antes decidir um passo de contato. `lib/leads/origens.js` já nasceu preparado: basta uma entrada nova no mapa para a validação, a listagem e o detalhe passarem a aceitá-los |
| Página de case individual (`/cases/[slug]`) | Não existe; só a listagem. `isCaseSlugTaken` mantém o slug único de propósito, para a página poder ser criada depois sem colisão |
| Números oficiais do simulador | `lib/simulador.js` usa ordem de grandeza estimada — falta CPM e alcance por plataforma. O simulador está fora do ar desde 11/09/2026; o número só volta a importar se ele voltar |
| Imagens de Ambiental / Governança | Toda a copy dos três checklists está aplicada; falta a foto. Ambiental: os 3 cards de "O que já é realidade" (a Praça de Carregamento Elétrico é a única sem foto disponível, e é o **único item que bloqueia a publicação** — a página segue com `robots: noindex` até ela chegar; Praça de Conveniência Batel e Jardim Vertical têm foto no SharePoint do cliente). Governança: retrato profissional do Halisson Pontarola, fundo neutro, meio corpo, olhar para a câmera — não serve recorte de foto de evento. Social já recebeu as três fotos (ver Concluído) |
| Autorização de uso da imagem da ONG Caminho do Renascer | A foto aplicada em `/sobre/social` (seção Loja OM do Bem) vem da própria apresentação institucional da ONG, mas o checklist original exige autorização escrita dos responsáveis para imagem de criança. Confirmar com a Alexandra se esse material já cobre o uso no site antes de considerar o item resolvido |
| Governança — declaração em primeira pessoa | O bloco "Quem responde" está no ar com o texto institucional, e a legenda da foto identifica o CEO **sem ser assinatura**. A versão em primeira pessoa (com "nunca mudou de dono") está no checklist e só entra com a aprovação do Halisson. Na troca, o texto institucional sai, o texto em primeira pessoa entra e a legenda vira assinatura; o layout não muda |
| Governança — validação jurídica em paralelo | Não bloqueia a publicação (decisão de 25/08/2026), mas 4 afirmações precisam de confirmação com a Alexandra e o jurídico: licença municipal para todas as faces e quem guarda, cláusula de exclusividade na minuta de contrato, existência de código de conduta escrito, e se a afirmação de métricas agregadas e anônimas se sustenta sob LGPD (a de maior exposição da página) |
| Conteúdo do Podcast | Estrutura no ar em `/blog/podcast` com episódios de exemplo em `lib/podcast.js` sob `TODO(cliente)`. Falta gravar os episódios e preencher o campo `audio`; a página está com `robots: noindex` até lá |
| Botões do mapa de Rodovias | O mapa da rede subiu (ver Concluído); faltam os dois links do Google My Maps que o handoff previa abaixo dele. O de pontos disponíveis o documento cita mas não traz a URL; o de painéis instalados está quebrado e o próprio handoff manda deixar o botão oculto até o Marketing gerar um viewer funcional (pendência 7). Regra do handoff quando vierem: só URL em modo viewer, jamais com `/edit`, e nunca como iframe |
| Dimensões físicas em metros dos produtos | Pendência 2 do handoff: Top Sight, Poster Sight, Super Poster, Super Billboard, Super Top Sequencial, Billboard, Empena, Bike e Bus. É o que preenche `specsPor.estatico` nos cards de dupla tecnologia e `specs` nos estáticos puros. Enquanto não vier, o card sobe só com a ficha digital (ver `ProdutoCard` em Concluído) |
| Dados de Digital Signage, Front Light e Mídia Móvel | As três páginas sobem sem o quadro de números, por decisão do handoff. Digital Signage estava prometido pelo Marketing para 05/09/2026; Front Light o Marketing confirmou não ter hoje; Mídia Móvel segue em aberto. Basta preencher `bignumbers` na entrada da plataforma para o quadro aparecer |
| Specs da Empena | Pendência 11 do handoff. O card sobe com o shopping onde o formato existe e sem medida |
| **O handoff descreve o Aeroporto Square de dois jeitos** | A seção 3 e a seção 7 trazem textos diferentes para o mesmo ativo, o que a própria regra C8 do documento proíbe. Vale a versão da seção 3, porque a 7 se declara o espelho ("espelhados em Icônicos"). Confirmar com o João qual fica, e corrigir o documento |
| Origem da diferença 284 vs 312 m² no Aeroporto Square | Pendência 10 do handoff. Não bloqueia nada: 312 é o oficial e é o que está no site |
| Impactos de Cascata, Mosaico e Duo Vision | Pendência 12: desejável, não bloqueia. Os três cards sobem sem número de impacto |
| Alertas do handoff que não são tarefa de build | O PDF do Distrito circula com tabela de preço e valor negociado, e nenhum valor entra no site (regra global 1); avisar a Alexandra. Os materiais comerciais de 2026 listam 3 pontos de Cascata, mas são 4 na operação, com o Batel de volta: o material de venda está desatualizado, sinalizar ao Marketing. As frases de condição comercial dos PDFs de shopping não entram no site |
| Retaxonomia das plataformas — a conta de 22 não fecha | Os produtos foram desdobrados em `lib/produtos.js` a partir do handoff de 03/09/2026, mas o documento afirma 22 produtos de catálogo e enumera 19: 16 em `lib/produtos.js` mais MUB Garden, Urbanity e Urbanity Light, que vivem nos Icônicos e são espelhados. Faltam 3. A página não cita 22: a contagem do hub é derivada de `PRODUTOS.length`, para não afirmar um número que a listagem não sustenta. Confirmar com o João quais são os três que faltam, ou corrigir a contagem no documento |
| CPM de referência | Fechado no que sai: o R$ 2,06 em rodovias saiu de circulação em 26/08/2026, sem fonte identificada em nenhum material do projeto. Falta o comercial validar um CPM — quando validar, ele entra em `lib/simulador.js` (hoje R$ 8 a 14, ordem de grandeza estimada) e volta para a resposta de custo em `lib/faq.js` |
| FAQ sem a pergunta de antecedência | Única das 20 do checklist que não subiu: dois dos três parágrafos vieram marcados AGUARDANDO DADO (prazo para subir criativo em LED · prazo de produção e instalação de lona). Só o de rodovia sob demanda está fechado, em 15 meses. Quando o dado vier, ela entra em segundo lugar em Contratação e a página passa de 19 para 20 — a home não muda, porque ela já fica fora da seleção de 8 |
| FAQ da home — dois checklists divergem | O checklist da home (item 12) e o checklist do FAQ (item 06) mandam oito perguntas cada, e as seleções não têm nada em comum além de custo, duração e comprovação. Vale o do FAQ, que é o documento dedicado ao escopo e diz explicitamente "SUBSTITUIR SELEÇÃO"; o da home também fala em "todas as 18" perguntas, contagem que o do FAQ levou a 20. Confirmar com o cliente que a home fica com a seleção do checklist do FAQ |
| FAQ — o que está incluso no valor | A base não registra se produção da lona e instalação entram no valor da campanha. Se entrarem, vão para a lista do primeiro parágrafo; se não, para a exceção do segundo. São os dois itens que o anunciante mais teme receber como extra |
| FAQ — escopo de "donos dos pontos" | "Operamos estrutura própria, sem ativos de concessão" está dito de forma geral, mas MUB é mobiliário urbano e banca e relógio digital costumam existir por concessão municipal. Se for o caso, a frase precisa ficar restrita ao Aeroporto, que é o próprio exemplo que ela dá |
| FAQ — fluxo de ponto específico | A resposta de "Posso escolher um ponto específico?" é genérica de propósito: o fluxo real do comercial para quem chega com a foto de um painel no celular não está documentado. Confirmar se aceita foto e endereço, se oferece alternativa no mesmo trajeto e se existe fila de espera |
| Mídia Regenerativa sem prova | Está no ar sem os números de "A prova" e sem mini-case; as seções são omitidas até o dado chegar. Aeroporto Square saiu desta linha: lá a ausência é decisão de 27/08/2026, não falta de dado |
| Números do Circuito MUB | O card 05 sobe sem número, e isso não bloqueia nada. Os 77 locais, os 13 milhões de impactos e as 339.570 inserções mensais são da safra de 2024 corrigida em bloco em 25/08/2026 e nunca foram revalidados. Com a Alexandra: os seis circuitos seguem com esses nomes, quantos locais existem hoje e as inserções atualizadas. Quando vierem, entra uma linha só no fim do card, `São X locais e Y milhões de impactos por mês.` O texto antigo, com os números velhos, segue arquivado em `mub-segmentado` com `publicado: false` |
| Gestão 360 OM como card teaser | Confirmar com o Halisson que o destaque da consultoria em card com âncora atende ao que ele pediu. Se ele quiser mais peso, o caminho é engordar a seção da home, nunca o card |
| Aeroporto Square — o documento de 02/09 marca o card 02 como "sem alteração" | O texto que ele reproduz é o antigo, com o Aeroporto Internacional de Curitiba e os 700 mil impactos por mês. A versão no ar é a curta de 27/08/2026, que tirou de propósito localização e número de rede para não divergir da plataforma Aeroporto. Ficou como está; confirmar com o cliente que a decisão de 27/08 continua valendo |
| Imagens do diferencial 03 | Nenhuma bloqueia a publicação, e o vídeo de monitoramento já chegou (06/09/2026), o que colocou a seção 01 no ar. Faltam o print da tela do relatório de audiência (seção "O que entra no relatório", com dados de cliente borrados ou substituídos: é a imagem mais importante da página), as 3 a 4 fotos de pontos monitorados da seção de monitoramento e a foto de painel digital em operação da capa do topo. Os alt texts já estão escritos em `lib/diferenciais.js` |
| Números de audiência do diferencial 03 | A seção "A leitura na prática" sobe com a apuração de outubro a dezembro de 2022, com o período declarado na abertura. Quando a Alexandra enviar a apuração recente, trocam-se os seis números e a data; o layout não muda. O período nunca sai da frase de abertura: número de audiência sem período declarado é o que a página combate |
| CTA final do diferencial 03 | O texto final não traz CTA e deixou a decisão aberta. A página fecha com o `NovaCampanha` compartilhado, como todas as outras, para não perder a âncora `#nova-campanha` que o botão fixo do header usa. Se o cliente decidir que ela fecha na privacidade, é só tirar o componente desta rota. Se o CTA for confirmado, o parâmetro previsto é `origem=inteligencia-e-audiencia` |
| Fotos dos diferenciais 01 e 02 | **Segue bloqueando a publicação de Face Única.** As capas do topo das duas chegaram em 06/09/2026. Face Única ainda precisa dos dois lados da comparação (Amador e Especialista), e sem eles a seção sobe com dois painéis beges: as duas do PDF Conceito Face Única servem como referência de enquadramento; confirmar se entram como estão ou se precisam de captação nova. Aeroporto Square está publicável, e o que falta é a foto da seção "O que é", ilustrando o conceito híbrido. Regra da base para todas: foto real, painel 100% limpo e visível, sem filtro ou IA que altere cor ou proporção, sem fio elétrico na frente, produto nunca cortado |
| Depoimentos — autorização | Os 7 depoimentos da home são reais e identificam pessoa e marca (Claro, Agência Verbal, Cia do Pastel, Confeitaria Didé, Andriolli Estética, Afinco Imóveis, Expo MotorHome). Confirmar autorização de uso antes de publicar |
| Depoimentos — nome e cargo da Confeitaria Didé | O vídeo (09/09/2026) não traz cartela de identificação, ao contrário dos outros seis: o card hoje só nomeia o negócio ("Confeitaria Didé") e o cargo genérico "Cliente Outdoormídia". Confirmar com o cliente o nome e o cargo de quem fala, para não publicar um card sem crédito pessoal enquanto os outros seis têm |
| Vídeos de case sem depoimento (Lacta, Select) | Dois arquivos chegaram junto com os quatro depoimentos novos (`public/media/cases-videos/Campanha Lacta.mp4`, `Campanha Select.mp4`, nomes originais, não renomeados) mas são reels de case (motion graphics + drone, números de impacto), sem fala de cliente: não têm quem citar nem nomear, então não entraram em `Reviews.jsx`. Ficam à espera de uma seção de cases em vídeo, que não existe hoje (`/cases/[slug]` também não existe, só a listagem) |
| Icônicos — dois endereços faltando | O descritivo oficial, as specs e as fotos dos 16 ativos entraram com o handoff de 03/09/2026. Seguem abertos, os dois que o próprio documento marca como pendência: o segundo endereço do Jardim Vertical (a foto existe, o endereço não, e sem ele o ponto aparece só como imagem) e o endereço do Topo de Prédio estático de Joinville, em `lib/produtos.js` |
| Foto das plataformas no carrossel da home | `PLATFORMS_LISTAGEM` carrega o campo `image` (16/9, ≥1600px) e nenhuma das 9 entradas tem foto: os cards caem no painel bege com o nome. As 20 fotos que chegaram em 03/09/2026 são dos ativos icônicos, não das plataformas, e por isso alimentam os cards de ativo, não o carrossel. As três de Digital Signage, de 09/09/2026, são recortes em retrato: servem a página da plataforma e não o card 16/9 da listagem. Falta também o hero de cada uma das 9 páginas de plataforma, e o vídeo de drone previsto na regra 7 do handoff |
| **Originais da linha do tempo estão versionados dentro de `public/`** | Os quatro PNG de acervo (`A primeira face na rua.png`, `A rede se espalha.png`, `2000s.png`, `Hoje - A rua em tempo real.png`) foram commitados em `public/media/linha-do-tempo/` e somam **87 MB**. Contraria a convenção do próprio projeto, que manda o original para `public/media/images/` (fora do versionamento, por `.gitignore`) e serve só o WebP. Como está, os 87 MB entram no `next build` e vão para o Cloud Run a cada deploy, sem que nenhuma página os referencie. O conserto é `git mv` dos quatro para `public/media/images/linha-do-tempo/`; ficou fora desta alteração porque é remoção de binário já commitado, decisão do Erik. Os WebP servidos (594 KB) já estão no lugar certo e são os que `lib/sobre.js` referencia |
| Imagens de Sobre nós | A capa do topo saiu do `TODO(Imagine)` em 10/09/2026 e desde 11/09/2026 é a foto aérea da sede (ver Concluído), e a linha do tempo já tem foto nos 4 marcos. Segue em aberto a foto própria de cada card de Nosso compromisso, que hoje reaproveita as três capas de ESG (`ambiental.webp`, `social.webp`, `governanca.webp`). Se a Imagine enviar uma capa dedicada para o topo, ela substitui a aérea; o slot `CAPA` continua sendo o ponto único de troca |
| Telefone comercial de Santa Catarina | `lib/empresa.js` tem `telefoneSc` vazio sob `TODO(cliente)`. Quando o número chegar, o rodapé e o JSON-LD passam a mostrar os dois sozinhos |
| Blog na home — sistema de cor por tipo | O checklist da home pede Case preto, Podcast cinza e Artigo branco no teaser. Depende de duas decisões que ainda não vieram: quais cards entram no lançamento (o teaser hoje só lista artigos) e como o card preto convive com a regra de paleta, que só abre exceção para o de Mídia Programática |
| Conteúdo do blog para o lançamento | Um artigo só, com erro de título (`Porque` → `Por que`) e assinatura "Shunda" sem autor identificado. O checklist da home exige três artigos com autoria antes de publicar. É conteúdo no Firestore, corrigido pelo `/admin`, não pelo código |
| Sua marca no OOH — o que sobrou do checklist de 26/08/2026 | A ferramenta está no ar (ver Concluído). Ficam abertos: (1) **mapa painel → plataforma e endereço de cada ponto**, com o Marketing: o mapa de `lib/suaMarca.js` foi derivado do catálogo e do nome de cada foto, `endereco` está `null` nos 12 e a legenda sai só com nome e `Painel real da rede Outdoormídia.`; painel nomeado na vitrine é promessa de disponibilidade, então o comercial precisa confirmar que os 12 são vendáveis; (2) as 4 plataformas sem foto (Aeroporto, Mídia Móvel, Rodovias, Digital Signage) não aparecem no seletor até vir foto tratada no padrão do protótipo (área útil em laranja sólido, resto em P&B): entra em `public/media/images/sua-marca/`, um objeto em `MOCKUPS` e `node scripts/generate-sua-marca.mjs`; o checklist previa 18 fotos, 2 por plataforma; (3) o formulário de contato que o checklist pedia depois de `Enviar para o comercial` ficou de fora por decisão de 11/09/2026: o botão vai ao WhatsApp com plataforma e painel na mensagem, sem lead novo no Firestore; (4) só logo, só PNG, também decisão de 11/09/2026: a opção de peça pronta do checklist saiu do subtítulo e do card do hub, e por isso o seletor de cor é sempre visível; (5) a copy do card do hub e do subtítulo passou a dizer plataforma e painel em vez de praça e formato, que é o que a ferramenta faz: confirmar com o cliente |
| Aviso de tratamento de dados no Google Forms | O cadastro do banco de talentos coleta nome, e-mail, WhatsApp e link de portfólio, e o formulário não traz aviso de tratamento de dados no cabeçalho. É alteração dentro do próprio Google Forms, não no código. Confirmar também que o `rh@outdoormidia.com.br` está ativo e monitorado |
| `/obrigado?origem=talentos` ficou órfã | Com a saída do formulário de talentos, nada mais leva a essa URL: a entrada em `lib/obrigado.js` e o ramo de `ObrigadoCta` seguem no ar sem produtor. Não quebra nada e o `MAILTO_RH` que ela oferece agora aponta para o RH, mas é código sem caminho de chegada |
| Contagem de plataformas de Curitiba | A linha diz 5 plataformas e mostra 5 chips, mas Bike Mídia e Bus Mídia circulam na capital e Digital Signage é sob medida. Confirmar com o cliente se faltam plataformas na capital ou se a contagem está certa. Enquanto isso, a contagem é derivada de `formats`, então linha e chips não divergem |
| Digital Signage por região | Definir se aparece em alguma região de `/solucoes/regioes-cobertura` ou se, por ser sob medida, fica fora da página |
| Filtro do Blog ainda traz `Mídia Indoor` | O chip de Curitiba já virou **Malls**; a tag do filtro do Blog vive no Firestore e é renomeada pelo `/admin/tags`, não pelo código. A plataforma em `lib/platforms.js` continua nomeada `Mídia Indoor` (slug `shoppings`): renomear o catálogo inteiro não estava no checklist de 02/09 e precisa de decisão |
| Varredura de `praça` fora do checklist | O checklist de 02/09 enumera as ocorrências vindas dos documentos de copy, e essa lista é incompleta. Seguem no ar, sem instrução do cliente: hub `/solucoes` (dois trechos), `/blog`, `/not-found`, `/obrigado`, `lib/obrigado.js`, `lib/legal.js`, `lib/diagnostico.js`, `lib/diferenciais.js`, `lib/esg.js`, `lib/iconicos.js`, `lib/seo.js`, `lib/faq.js` (quatro respostas além das duas trocadas) e os textos do admin. Trocar exige a redação aprovada de cada uma |
| Diagnóstico — "remover as palavras em laranja" foi cumprido recolorindo | O rótulo da nota passou de `text-orange` para `text-ink` em `DiagnosticoQuiz.jsx`. O motivo declarado no briefing ("excesso de informação, sem ganho de clareza") sugere tirar o rótulo, não repintá-lo. Confirmar antes de remover: é conteúdo saindo da tela, não estilo |
| Diferenciais — segunda imagem dentro da página | Briefing da reta final: unificar os cards, adicionar imagens e GIFs em cada um, ícones nos blocos 01 e 02, e 2 imagens na página mais 1 no hero de Face Única. Os seis cards ganharam imagem em 06/09/2026, o hero de Face Única também, os ícones das seções 01 e 02 entraram em 07/09/2026 e a unificação fechou no mesmo dia, com a home passando a montar o card da listagem (ver Concluído). Segue em aberto a segunda imagem dentro da página, que depende de material que não veio |
| Soluções — "adicionar um botão a mais" no card de plataforma | O card do coverflow tem um CTA só. O briefing não diz qual é o segundo botão. Se for o "Ver tipos de mídia", ele existe, mas em `/plataformas`, não em `/solucoes`. Confirmar com o João |
| Hero de Soluções usa o vídeo da home | `SolucoesHero` sobe com `/media/video-hero.mp4` como fundo enquanto o vídeo dedicado não chega do João. Fundo de vídeo é justamente o padrão que o G2 do briefing tirou de circulação nas plataformas: confirmar se Soluções é exceção ou se o hero também vira card lateral |
| Trabalhe conosco — Missão, Visão e Valores | O arquivo já foi enviado pelo cliente e a decisão de entrar nesta página é do João. Nada no repo ainda |
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
- **Bloqueia publicação:** confirmar que as páginas de destino dos CTAs contextuais
  existem — `Regiões e cobertura`, `Plataformas`, `Projetos Icônicos` e `Soluções`.
  O CTA que apontava para `Melhores Práticas` passou a apontar para `/solucoes` com a
  saída daquela página.

### CTA de fim de página · novo

Hoje a página encerra direto no rodapé, sem bloco de saída. Entra:

**Título:** `Subir de degrau é decisão de mídia.`

**Corpo:**
> Presença não se constrói com uma campanha. Se constrói aparecendo onde o seu
> público passa todo dia, o ano inteiro. É isso que a Outdoormídia faz há 67 anos em
> Curitiba, Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário
> Camboriú.

- Botão primário: `Falar com um especialista →`
- Botão secundário: removido. O checklist pede `Ver as Melhores Práticas →` (que ele
  ainda chama de "Guia do Anunciante"), mas a página saiu do site: o CTA de fim de
  página ficou só com o botão primário
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
| Midia Kit | *(item removido do menu junto com a página)* |
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
gravados com esse slug. **Gentileza Urbana** saiu do catálogo de plataformas e, em
02/09/2026, saiu também do bloco de diferenciais, absorvida pela Mídia Regenerativa:
a rota de plataforma 404 e a de diferencial redireciona para a Ambiental. O nome saiu
da copy visível em 10/09/2026, por decisão do cliente: a carteira que reúne a Praça de
Carregamento Elétrico, a Praça de Conveniência Batel e o Jardim Vertical na seção 01 da
Ambiental chama-se **Mídia Regenerativa**, e a tag dos três cards é **Regenerativo**, o
nome da linha de Icônicos a que eles pertencem. `Gentileza Urbana` sobrevive só na
entrada arquivada de `lib/diferenciais.js` (`publicado: false`) e no slug do redirect.

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
- Preto não faz parte da paleta. As exceções que existiam (a porta de Mídia
  Programática no bloco Nova campanha e o hero e a faixa da própria página de
  Programática) saíram do site em 10/09/2026 e 12/09/2026: hoje não há exceção
  de paleta em nenhuma página
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

- Mensagens fixas (constantes): flutuante, Cobertura e o Atendimento rápido da
  Nova campanha (`WA_ATENDIMENTO_AGORA`). Cobertura traz campos a preencher
  (praça, período) — é o CTA de maior intenção. O CTA do Header deixou de ser
  WhatsApp: leva a `/#nova-campanha`.
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