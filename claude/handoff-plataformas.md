# HANDOFF · PLATAFORMAS E PRODUTOS · OUTDOORMÍDIA

**Projeto:** Redesign site Outdoormídia × Imagine Concept
**Fechado:** 03/09/2026 · João Bernardo
**Este arquivo substitui:** `copy-produtos.md`, `copy-plataformas.md` (versões de rascunho). `copy-iconicos.md` e `copy-aeroporto.md` estão incorporados aqui.
**Uso duplo:** versão organizada para o Drive (aprovação Alexandra) e versão de build para o Erik aplicar via Claude.
**Idiomas:** PT (este arquivo) · EN · ES · 中文 (após aprovação do PT)

---

# 0 · REGRAS GLOBAIS

1. **Nenhum preço, valor, CPM ou CPI em nenhuma página, em nenhum idioma.**
2. **Nomenclatura fixa:** Elegancy (não traduzir, não "corrigir" para Elegance em EN) · Cascata Square Martim Afonso (não Champagnat) · Praça Pet Bento Viana (não Praça Pet Batel) · Projetos Icônicos sempre primeiro em qualquer lista de plataformas.
3. **BRs de Rodovias, em todo o site:** 101 · 116 · 277 · 376 · 407 · 470.
4. **Contagem oficial:** 9 plataformas, 22 produtos de catálogo. Ativos icônicos nomeados não entram na soma de produtos.
5. **Fotos de campanhas com marcas de clientes:** autorização confirmada pela Alexandra. Usar as imagens dos PDFs oficiais.
6. **Links do Google My Maps:** publicar apenas URLs em modo viewer. NUNCA publicar URL com `/edit`.
7. **Hero com vídeo:** em toda página de plataforma ou card de ativo que tiver vídeo disponível (capturas de drone: Batel, Champagnat, Cascata, Distrito de Mídia, Duo Vision, Praças Pet, entre outros listados no material do cliente), o hero usa vídeo em loop, mudo, com a foto como fallback de carregamento. Onde não há vídeo, foto estática. A lista de quais ativos têm drone está no documento de casos do cliente; João consolida junto com o pacote de imagens.

---

# 1 · COMPONENTES REUTILIZÁVEIS

Construir uma vez, usar em todas as páginas.

**C1 · BIGNUMBERS** — obrigatório em toda página de plataforma. De 2 a 4 números grandes lado a lado, rótulo curto abaixo de cada um, sem parágrafo de apoio. Posição: imediatamente abaixo da seção "Quando essa plataforma é a escolha certa". Onde não há dado validado, o componente não renderiza e a página ganha pendência (nunca inventar número).

**C2 · STEP CARD** — passos numerados com título e descrição. Usado em Rodovias (4 passos) e reutilizável no Gestão 360.

**C3 · TABS DE LINHA** — navegação por abas com frase de linha + cards. Exclusivo da página Icônicos (Green / Regenerativo / Elegancy).

**C4 · TOGGLE ESTÁTICO/DIGITAL** — produtos com dupla tecnologia são UM card com seletor, nunca dois cards. Aplica-se a: Top Sight, Poster Sight, Billboard, Topo de Prédio. O toggle abre por padrão na tecnologia da plataforma onde o card está sendo exibido.

**C5 · GESTÃO 360 OM** — bloco compartilhado de "como contratar", 3 passos. Mesmo texto em todas as plataformas, versão ampliada só em Digital Signage.

**C6 · NOVA CAMPANHA** — bloco final de toda página, com querystring: `/nova-campanha?plataforma=[slug]` (e `&linha=[linha]` dentro de Icônicos).

**C7 · CARD DE PRODUTO** — anatomia fixa: kicker em caixa alta · nome · copy de até 4 linhas · linha de specs.

**C8 · REGRA DE ESPELHAMENTO** — o mesmo ativo pode aparecer em duas páginas (flagships do Aeroporto ↔ Icônicos; MUB Garden ↔ MUB e Green; produtos de dupla tecnologia ↔ Front Light e Outdoor Digital; Urbanity ↔ Outdoor Digital e Elegancy). É sempre O MESMO texto nos dois lugares. Alterou num, altera no outro na mesma revisão. Recomendação de build: conteúdo único por produto, renderizado em múltiplas rotas.

---

# 2 · HUB `/plataformas`

## Hero
**Kicker:** CATÁLOGO · 9 PLATAFORMAS
**Título:** Plataformas.
**Subtítulo:**
> Nenhuma campanha se resolve com um formato só. São nove plataformas que se combinam conforme o público que você precisa alcançar, do LED de alta circulação ao mobiliário urbano de bairro, cobrindo Paraná e Santa Catarina. Abrindo a lista, os Projetos Icônicos: estruturas de assinatura desenhadas ponto a ponto.

**Botões:** `Planejar campanha` (sólido) → `/nova-campanha` · `Ver formatos` (ghost) → âncora seção Formatos

## BIGNUMBERS do hub
| **9** | **175** | **+530 mi** | **67** |
|---|---|---|---|
| Plataformas | Telas digitais | Impactos por mês | Anos de operação |

## Grid 3×3 · rótulo PLATAFORMAS
Anatomia do card: numeração · rótulo de dado · nome · descrição até 3 linhas · `Ver plataforma →`.

**01 · Projetos Icônicos** — EXCLUSIVO · ALTO IMPACTO
> Estruturas únicas nos pontos mais nobres da cidade. Esquinas digitais em 3D, painéis híbridos e jardins vivos integrados à estrutura. Onde a marca se torna a paisagem.
→ `/plataformas/projetos-iconicos`

**02 · Outdoor Digital** — DIGITAL · 175 TELAS
> Painéis de LED com troca de conteúdo em tempo real. Sem produção de lona, sem espera entre a decisão e o ar. A maior rede DOOH regional do Sul do Brasil, com 20 milhões de impactos semanais.
→ `/plataformas/outdoor-digital`

**03 · Front Light** — ESTÁTICO · 18 M² · ILUMINADO
> O outdoor clássico em vias de alta circulação, na horizontal e na vertical. Grande formato, presença contínua e a memorização que só a repetição diária constrói.
→ `/plataformas/front-light`

**04 · Mídia Indoor** — DIGITAL · SHOPPINGS
> Operação 100% digital nos principais shoppings da região. Totens de corredor e painéis de estacionamento alcançam o público no lugar e no momento da compra.
→ `/plataformas/midia-indoor`

**05 · Aeroporto** — HÍBRIDO · 577,5 M²
> Distrito de Mídia Duo Square: 5 telas de LED e 10 frontlights na única via de saída do Aeroporto Internacional Afonso Pena. O conjunto abriga o Aeroporto Square, maior painel híbrido do Sul do Brasil.
→ `/plataformas/aeroporto`

**06 · Mídia Móvel** — ESTÁTICO · BIKE E BUS
> Bike Mídia e Bus Mídia chegam onde a estrutura fixa não vai. Calçadões, parques e centros movimentados, seguindo o trajeto real de quem você precisa alcançar.
→ `/plataformas/midia-movel`

**07 · MUB** — DIGITAL · 6 CIRCUITOS
> Bancas e relógios digitais integrados ao tecido da cidade, organizados em circuitos por nicho: saúde, educação, shoppings, alto padrão. Você contrata o público, não o ponto.
→ `/plataformas/mub`

**08 · Rodovias** — SOB DEMANDA · BR 101 · 116 · 277 · 376 · 407 · 470
> Você escolhe a região, nós construímos o painel. Angariação em raio de 3 km do ponto indicado, no formato que a campanha pedir, nos maiores fluxos do Sul.
→ `/plataformas/rodovias`

**09 · Digital Signage** — SOB MEDIDA · GESTÃO 360 OM
> Painel exclusivo para o seu negócio: fachada digital, posto de combustível, passagem digital. Licenciamento, instalação, conteúdo e manutenção 24 horas por dia, sete dias por semana.
→ `/plataformas/digital-signage`

## Seção Formatos
**Título:** Plataforma é onde. Formato é como.
> A plataforma define o ambiente que sua marca ocupa. O formato define o tamanho, a proporção e o tipo de peça que vai no ar. São 22 produtos de catálogo, e cada plataforma trabalha com um recorte deles.

**Caixa destacada:**
> **Como ler os nomes.** Top é vertical, o mesmo enquadramento de um reel. Poster é horizontal, o mesmo enquadramento de um vídeo. Tudo que começa com Super tem o dobro do tamanho.

## Nova Campanha
Bloco C6, querystring vazia.

---

# 3 · PÁGINA `/plataformas/projetos-iconicos`

## Hero
**Kicker:** ÍCONES · MOBILIÁRIO DE ASSINATURA
**Título:** Icônicos.
**Subtítulo:**
> Existem endereços que a cidade já reconhece. Os Projetos Icônicos ocupam esses pontos com estruturas desenhadas uma a uma, sem molde de catálogo. É o produto que a Outdoormídia projeta, não o que ela replica.

**Botões:** `Quero avaliar um Icônico` (sólido) → `/nova-campanha?plataforma=projetos-iconicos` · `Ver os ícones` (ghost) → âncora

## BIGNUMBERS
| **4** | **3** | **até 1 mi** | **800 mil** |
|---|---|---|---|
| Ícones de assinatura | Linhas exclusivas | Impactos/mês por esquina digital | Impactos/mês no Distrito de Mídia |

## Seção 01 · Ícones de assinatura (fora das linhas)
> Quatro estruturas que não pertencem a nenhuma linha, porque cada uma resolveu um problema que não se repete. Três estão no Distrito de Mídia do Aeroporto, uma na Avenida das Torres.

**Aeroporto Square** — HÍBRIDO · 312 M²
> O maior painel híbrido de OOH do Sul do Brasil. Telas de LED de última geração combinadas com painéis front light na mesma estrutura, unindo o dinamismo do digital ao poder de impacto do estático. Mais de 700 mil impactos mensais sobre o público de maior poder aquisitivo do estado.
`Ver na plataforma Aeroporto →`

**Mosaico Square** — FACE ÚNICA · 265,5 M²
> Onde a publicidade vira arte. Aplica o conceito Face Única: uma marca, sem vizinhança visual, sem disputa de atenção. Vitrine de exclusividade total na saída do Aeroporto Internacional Afonso Pena.
`Ver na plataforma Aeroporto →`

**Distrito de Mídia Duo Square** — PRIMEIRO DO BRASIL · 577,5 M²
> O primeiro Distrito de Mídia do país. Cinco telas de LED e dez painéis front light na única via de saída do aeroporto, mais de 800 mil impactos mensais sobre viajantes, executivos e formadores de opinião.
`Ver na plataforma Aeroporto →`

**Duo Vision** — SINCRONIZADO · AV. DAS TORRES
> Dois painéis digitais operando em sincronia, um em cada lado da via. A Avenida das Torres vista dos dois sentidos, na mesma hora, com a mesma mensagem: cobertura total do corredor, sem ponto cego.
Specs: Av. das Torres, 2100 · Curitiba

## Seção 02 · As três linhas (componente C3, abas)

### Aba GREEN
> Vegetação viva integrada à estrutura. Jardim vivo incorporado à própria mídia, associando a marca a bem-estar em vez de só ocupar o campo de visão.

`Quero avaliar um Green →` `/nova-campanha?plataforma=projetos-iconicos&linha=green`

**Batel Square** — DIGITAL · 3D E 2D · ANAMÓRFICO
> O primeiro projeto de mídia digital 3D e 2D de Curitiba, alimentado por energia limpa. O efeito anamórfico faz o conteúdo saltar do painel para quem passa, com até 1 milhão de impactos mensais em uma das esquinas mais valorizadas da cidade.
Specs: 2048×512 px no total, duas faces de 1024×512 px · distância da calçada 3 m · melhor visualização do 3D a aprox. 30 m · Av. Visconde de Guarapuava, 5292

**Champagnat Square** — DIGITAL · 3D E 2D · JARDIM VIVO
> A segunda esquina digital de Curitiba, com parede viva integrada à estrutura do painel. Mídia de última geração em 2D, 3D e anamórfico ao lado de vegetação real, unindo tecnologia e bem-estar no mesmo ponto. Cerca de 1 milhão de impactos mensais.
Specs: 1536×512 px no total, faces de 512×512 e 1024×512 px · distância da calçada 0,5 m · melhor visualização do 3D a aprox. 30 m · Rua Alferes Ângelo Sampaio, 2384

**Cascata Square** — DIGITAL · 3 PAINÉIS SINCRONIZADOS · 4 PONTOS
> Três painéis de LED verticais em composição assimétrica, criando o efeito de uma cascata digital em movimento. Os painéis interagem entre si: a campanha pode fluir como peça única ou exibir três conteúdos autônomos, com fluxo visual que prende o olhar.
Specs: 1344×2520 px, divididos em três painéis de 1344×840 px · MP4 · 10 segundos
Pontos: Curitiba Martim Afonso (Rua Martim Afonso, 642) · Curitiba Água Verde (Av. Iguaçu, 3083) · Curitiba Batel (Av. Silva Jardim, 2427 / Rua Bento Viana, 806) · Joinville (Av. Juscelino Kubitschek, 110)

**MUB Garden** — MOBILIÁRIO URBANO DIGITAL · JARDIM NO TOPO
> O primeiro mobiliário urbano digital de Curitiba com jardim vivo no topo. A estrutura de rua ganha cobertura verde, e a marca exibida herda o contexto de cuidado com a cidade que só um mobiliário assim carrega.
Specs: Av. Iguaçu, 3925 · espelhado na plataforma MUB (regra C8)

### Aba REGENERATIVO
> A veiculação começa fora do painel. Praças, canteiros e pontos de convívio requalificados pela marca, que devolve à cidade o espaço que ocupa.

`Quero avaliar um Regenerativo →` `/nova-campanha?plataforma=projetos-iconicos&linha=regenerativo`

**Jardim Horizontal** — PAREDE VIVA · GRANDE FORMATO
> Vegetação viva tomando conta de metade da estrutura, ao lado da peça publicitária. A marca divide o painel com um canteiro vertical de verdade, num formato que já valorizou lançamentos como o do GT.Building em Curitiba.

**Jardim Vertical** — PAREDE VIVA · POSTER SIGHT · 2 PONTOS
> O painel publicitário como elemento vivo. Aplicado em Poster Sight estratégico, associa a marca a sustentabilidade e bem-estar em meio ao ritmo acelerado da cidade.
Pontos: Rua Bispo Dom José, 2866 · segundo ponto: endereço pendente

**Jardim Digital** — PAREDE VIVA · LETRA CAIXA · 17H DIÁRIAS
> Jardim vertical natural com letra caixa integrada, exibindo a campanha do cliente de forma exclusiva por 17 horas diárias, sem dividir atenção com nenhuma outra marca. Um respiro verde em uma das áreas mais nobres de Curitiba.
Specs: Rua Desembargador Motta, 3220

**Praça Pet Guilherme Pugsley** — REQUALIFICAÇÃO URBANA · PRIMEIRA DE CURITIBA
> A primeira Praça Pet de Curitiba. Infraestrutura de lazer e convivência que transformou um espaço urbano comum em ponto de encontro, com a marca patrocinadora associada ao início desse movimento na cidade.
Specs: Rua Guilherme Pugsley, 820

**Praça Pet Bento Viana** — REQUALIFICAÇÃO URBANA
> Espaço planejado para lazer, bem-estar e inclusão, com infraestrutura segura e moderna que revitaliza o entorno e cria um novo ponto de encontro entre marcas, pessoas e cidade.
Specs: Rua Bento Viana, esquina com Sete de Setembro

**Praça Pet Silva Jardim** — REQUALIFICAÇÃO URBANA · TERCEIRA ENTREGA
> A terceira Praça Pet do projeto Gentileza Urbana. Consolida o compromisso da marca patrocinadora com a valorização de espaços públicos, ampliando o legado iniciado nas duas praças anteriores.
Specs: Av. Silva Jardim, 3338

### Aba ELEGANCY
> Design moderno em endereços nobres: a mídia valoriza a paisagem e a marca herda esse contexto.

`Quero avaliar um Elegancy →` `/nova-campanha?plataforma=projetos-iconicos&linha=elegancy`

**Top Sight Digital Urbanity** — ARQUITETURA COMO PROJETO
> A arquitetura entrou no desenho do painel antes da tecnologia. Linhas que valorizam a rua em vez de disputar com ela, com acabamento que eleva a percepção de qualquer marca exibida.
Specs (Super Top Digital Urbanity): 768×1024 px · MP4 · 10 segundos

**Top Sight Digital Urbanity Light** — LUZ COMO ASSINATURA
> A iluminação contorna, revela e valoriza a estrutura, criando presença reconhecível mesmo antes da campanha ser lida. O painel se torna elemento de paisagem, e a marca herda o contexto de modernidade e alto valor percebido.
Specs: Rua Coronel Dulcídio, 457, esquina com Alameda Dom Pedro II

## Gestão 360 (C5) · Nova Campanha (C6)

---

# 4 · PÁGINA `/plataformas/outdoor-digital`

## Hero
**Kicker:** DIGITAL · 175 TELAS
**Título:** Outdoor Digital.
**Subtítulo:**
> Briefing na mão pela manhã, campanha no ar pela tarde. O circuito digital elimina a etapa mais lenta do OOH tradicional: produção, impressão e instalação entre a aprovação da peça e a veiculação. A maior rede DOOH regional do Sul do Brasil.

## Quando essa plataforma é a escolha certa
- Campanha com troca frequente de criativo
- Promoção com data curta
- Presença contínua com mensagem que muda por horário

## BIGNUMBERS
| **175** | **+20 mi** | **1º** |
|---|---|---|
| Telas digitais | Impactos por semana | Maior rede DOOH regional do Sul |

## Produtos (cards C7, toggle C4 abrindo em Digital)
- **Top Sight** (ver seção 12, card canônico)
- **Poster Sight** (ver seção 12)
- **Billboard** (ver seção 12)
- **Topo de Prédio** (ver seção 12)
- **Top Sight Digital Urbanity e Urbanity Light** — cards resumidos espelhados de Elegancy, com link `Ver na linha Elegancy →` (regra C8)

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=outdoor-digital`

---

# 5 · PÁGINA `/plataformas/front-light`

## Hero
**Kicker:** ESTÁTICO · 18 M² · ILUMINADO
**Título:** Front Light.
**Subtítulo:**
> O formato que construiu a mídia exterior e continua entregando o que nenhum outro entrega: a mesma marca, no mesmo lugar, todos os dias, para as mesmas pessoas. Memorização se constrói por repetição, e repetição é a especialidade da casa há 67 anos.

## Quando essa plataforma é a escolha certa
- Reforço de marca no longo prazo
- Ocupação de território
- Presença em corredor de trajeto diário

## BIGNUMBERS
**Sem dado validado. Componente não renderiza.** Pendência: contagem de pontos Front Light na rede (Marketing confirmou que não há informação disponível hoje; slot fica reservado para quando houver).

## Produtos
- **Top Sight** (seção 12, toggle abrindo em Estático)
- **Poster Sight** (seção 12)
- **Billboard** (seção 12)
- **Topo de Prédio** (seção 12)

**Super Poster** — ESTÁTICO · 2X MAIOR
> Tudo do Poster Sight, no dobro do tamanho. Para a campanha que precisa dominar o quarteirão, não só participar dele.

**Super Top Sequencial** — ESTÁTICO · SEQUENCIAL
> Painéis verticais em sequência na mesma via. A marca aparece, reaparece e confirma: repetição dentro do mesmo trajeto, multiplicando a memorização de uma única passagem.

**Super Billboard** — ESTÁTICO · 2X MAIOR
> O maior formato estático do portfólio. Quando o briefing pede escala de paisagem, o Super Billboard é a resposta: o dobro do Billboard, para marcas que querem ser vistas de longe e lembradas de perto.

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=front-light`

---

# 6 · PÁGINA `/plataformas/midia-indoor`

## Hero
**Kicker:** DIGITAL · 3 SHOPPINGS
**Título:** Mídia Indoor.
**Subtítulo:**
> No shopping, o público não está passando. Está decidindo. A operação é 100% digital, em três centros com perfis distintos de consumo, do familiar ao corporativo. Você escolhe o ambiente que conversa com o seu cliente.

## Quando essa plataforma é a escolha certa
- Campanha de varejo com conversão próxima
- Lançamento de produto em ponto de venda
- Construção de marca junto a público de alta recorrência

## BIGNUMBERS
| **3** | **+170** | **70 mil** |
|---|---|---|
| Shoppings | Lojas no Shopping São José | Pessoas/mês no Shopping Itália |

## Produtos
**Totem** — DIGITAL · CORREDOR
> Na altura dos olhos, no meio do fluxo. O Totem acompanha o visitante pelo corredor do shopping e coloca sua marca a metros da prateleira. É o último ponto de contato antes da decisão de compra.
Specs: 1080×1920 px · MP4 · 10 segundos · disponível nos três shoppings

**Mega Banner** — DIGITAL · SUSPENSO
> Pendurado sobre o corredor central, o Mega Banner é visto de longe e de todos os ângulos. Formato vertical de grande presença, ideal para lançamento e institucional em ambiente de alto fluxo.
Specs: 640×1024 px · MP4 · 10 segundos · Shopping São José

**Empena** — DIGITAL · GRANDE FORMATO INTERNO
> A maior área visual do ambiente indoor. A Empena transforma a parede do shopping em mídia, com escala que nenhum outro formato interno alcança.
Specs: dimensões pendentes · Park Shopping Boulevard

## Os três ambientes
**Shopping São José · São José dos Pinhais**
> O maior shopping da Região Metropolitana de Curitiba, a 7 minutos do Aeroporto Internacional Afonso Pena. Mais de 170 lojas, eventos recorrentes e perfil familiar de alto fluxo, somando consumidores locais, turistas e profissionais em deslocamento.
Formatos: Mega Banner e Totem · Rua Dona Izabel A Redentora, 1434, Centro

**Park Shopping Boulevard · Curitiba, região Sul**
> O maior shopping do extremo sul de Curitiba, no eixo que conecta Sítio Cercado, Portão, Novo Mundo, Capão Raso, Pinheirinho, Vila Hauer, Alto Boqueirão e Xaxim. Público em uma das regiões que mais crescem na cidade, com consumo cotidiano e forte fidelização.
Formatos: Empena e Totem · BR-116, 16303, Xaxim

**Shopping Itália · Curitiba, Centro**
> Um dos empreendimentos mais consolidados de Curitiba, em operação desde 1982. São 26 andares que reúnem comércio, serviços e escritórios em circulação constante: fluxo médio de 70 mil pessoas por mês, com público corporativo, profissional e recorrente.
Formato: Totem · Rua Marechal Deodoro, 630, Centro

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=midia-indoor`

---

# 7 · PÁGINA `/plataformas/aeroporto`

## Hero
**Kicker:** HÍBRIDO · 577,5 M²
**Título:** Aeroporto.
**Subtítulo:**
> Quem chega a Curitiba de avião passa por uma única via de saída, na região metropolitana com quase 3,7 milhões de habitantes. É nela que está o Distrito de Mídia Duo Square, o primeiro projeto do tipo no Brasil, concebido para gerar presença qualificada já no desembarque.

**Botões:** `Planejar campanha no Aeroporto` (sólido) → `/nova-campanha?plataforma=aeroporto` · `Ver os três ativos` (ghost) → âncora

## Quando essa plataforma é a escolha certa
- Falar com decisor em trânsito: executivos, investidores e formadores de opinião
- Construir percepção de porte nacional para a marca
- Campanha B2B ou institucional de alto valor, sem necessidade de segmentação por bairro

## BIGNUMBERS
| **577,5 m²** | **800 mil** | **14,8 mi** | **3.697.928** |
|---|---|---|---|
| Área visual | Impactos por mês | Passageiros por ano | Habitantes na região |

## Onde está
> O Distrito está posicionado na Av. Rocha Pombo, na única saída do Aeroporto Internacional Afonso Pena, no município de São José dos Pinhais, região metropolitana de Curitiba.

Detalhe de apoio: média de 20 mil passageiros por dia.

## Público
> Viajantes aéreos têm maior poder aquisitivo. O perfil de quem passa pelo Distrito inclui executivos, turistas, compradores internacionais, investidores, profissionais em trânsito e formadores de opinião, o tipo de audiência que nenhuma outra plataforma do portfólio entrega no mesmo volume.

## Ativos em destaque (espelhados em Icônicos, regra C8)
**Distrito de Mídia Duo Square** — PRIMEIRO DO BRASIL · 577,5 M²
> O primeiro Distrito de Mídia do país, criado para impactar com força já na chegada a Curitiba. Cinco telas de LED de 60 m² e dez painéis front light, totalizando 577,5 m² de área visual na única via de saída do aeroporto. Mais de 800 mil impactos mensais sobre um público altamente qualificado.

**Aeroporto Square** — HÍBRIDO · 312 M²
> O maior painel híbrido de OOH do Sul do Brasil. Telas de LED de última geração combinadas com painéis front light na mesma estrutura, entregando primazia arquitetônica e alta capacidade de impacto. A união entre o dinamismo do DOOH e o poder do OOH estático, com mais de 700 mil impactos mensais.

**Mosaico Square** — FACE ÚNICA · 265,5 M²
> Onde a publicidade se transforma em arte. Aplica o conceito Face Única: apenas uma marca ocupa toda a área, garantindo comunicação direta, sem distrações e com alto retorno. Alcança empresários, profissionais liberais e viajantes que circulam diariamente pelo local.

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=aeroporto`

---

# 8 · PÁGINA `/plataformas/midia-movel`

## Hero
**Kicker:** ESTÁTICO · BIKE E BUS
**Título:** Mídia Móvel.
**Subtítulo:**
> Nem todo público está em uma avenida. Bike Mídia e Bus Mídia levam a campanha para dentro do calçadão, do parque e do centro, no trajeto que as pessoas fazem a pé.

## Quando essa plataforma é a escolha certa
- Ativação em evento ou data específica
- Cobertura de área fechada ao trânsito
- Reforço tático de uma campanha maior

## BIGNUMBERS
**Sem dado validado. Componente não renderiza.** Pendência: dados de rota, frota ou alcance com o Marketing.

## Produtos
**Bike Mídia** — ESTÁTICO · TRIO SEQUENCIAL
> Três bikes em sequência, uma mensagem em movimento. O trio circula por calçadões, parques e eventos, chegando onde estrutura fixa não entra. Presença simpática, fotografável e impossível de ignorar na escala do pedestre.

**Bus Mídia** — ESTÁTICO · ROTA URBANA
> Sua marca no trajeto diário de milhares de pessoas. O Bus Mídia percorre os corredores da cidade repetindo a exposição em horários e bairros diferentes, com o alcance de uma rota inteira pelo custo de um ponto.

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=midia-movel`

---

# 9 · PÁGINA `/plataformas/mub`

## Hero
**Kicker:** DIGITAL · 6 CIRCUITOS
**Título:** MUB.
**Subtítulo:**
> Bancas e relógios digitais fazem parte da rua, não competem com ela. A rede é organizada em circuitos por perfil de público, então você contrata quem quer alcançar, não um endereço isolado.

## Quando essa plataforma é a escolha certa
- Campanha segmentada por nicho
- Presença de bairro com custo controlado
- Marca que precisa aparecer perto do ponto de decisão

## BIGNUMBERS
| **6** | **3** |
|---|---|
| Circuitos por nicho | Formatos digitais |

## Produtos
**Banca Horizontal** — DIGITAL · NÍVEL DA CALÇADA
> Mídia digital na altura de quem caminha. A Banca Horizontal ocupa esquinas e travessias de alto fluxo de pedestres, com leitura confortável para quem espera o sinal abrir.
Specs: 1024×512 px · MP4 · 10 segundos

**Banca Vertical** — DIGITAL · NÍVEL DA CALÇADA
> A versão vertical da banca, com o enquadramento do celular. Perfeita para reaproveitar a peça do social no ponto físico, falando com o pedestre na linguagem que ele já consome.
Specs: 768×1024 px · MP4 · 10 segundos

**Relógio Digital** — DIGITAL · UTILIDADE
> O único formato que as pessoas procuram com os olhos. Hora e temperatura trazem o olhar, sua campanha aproveita a atenção. Presença pulverizada pela cidade, em pontos de parada e travessia.
Specs: 768×1024 px · MP4 · 10 segundos

**MUB Garden** — MOBILIÁRIO URBANO DIGITAL · JARDIM NO TOPO · selo GREEN
> O primeiro mobiliário urbano digital de Curitiba com jardim vivo no topo. A estrutura de rua ganha cobertura verde, e a marca exibida herda o contexto de cuidado com a cidade que só um mobiliário assim carrega.
Specs: Av. Iguaçu, 3925 · `Ver na linha Green →` (regra C8; selo GREEN e linha Green são a mesma entidade, um componente só)

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=mub`

---

# 10 · PÁGINA `/plataformas/rodovias`

## Hero
**Kicker:** SOB DEMANDA · PR E SC · BR 101 · 116 · 277 · 376 · 407 · 470
**Título:** Rodovias.
**Subtítulo:**
> Você escolhe a região, nós construímos o painel. A rede Rodovias conecta os principais corredores entre o Paraná e Santa Catarina, de Ponta Grossa a Florianópolis, passando pelo litoral e por Joinville, alcançando quem se desloca todos os dias entre essas regiões.

## Quando essa plataforma é a escolha certa
- Cobertura de rota entre praças
- Campanha regional fora do perímetro urbano
- Presença em corredor logístico ou turístico

## BIGNUMBERS
| **1,6 mi** | **19,2 mi** | **38,4 mi** | **6** |
|---|---|---|---|
| Impactos por mês | Impactos em 12 meses | Impactos em 24 meses | BRs cobertas |

## Como funciona o Sob Demanda (componente C2, step card)
1. **Escolha a região.** Indique o ponto aproximado onde a campanha precisa estar, no corredor que conecta seu público.
2. **Angariação em 3 km.** A operação localiza e negocia o melhor ponto disponível num raio de 3 km do local indicado.
3. **Escolha o tamanho do painel.** A estrutura é construída sob medida, no formato que a campanha pedir.
4. **Contrato de 15 meses.** Prazo mínimo de veiculação, compatível com a construção de um painel exclusivo para sua marca.

## Texto de apoio dos números
> Rodovias é a plataforma de maior volume do portfólio. Onde as outras plataformas segmentam por perfil de público, Rodovias entrega escala: milhares de veículos por dia, em corredores que as pessoas percorrem repetidamente entre uma cidade e outra.

## Mapa da rede
Arte final produzida pela Imagine (rota Curitiba–Florianópolis com pontos e BRs marcados). Entra como imagem, nunca como iframe do Google Maps. O marcador de São Paulo (369 km) é recurso visual de escala, não afirmação de cobertura: nenhum texto da página menciona atendimento em SP.

**Botões abaixo do mapa:**
```
Ver pontos disponíveis (ghost)  → [link viewer da simulação, funcional]
Ver painéis instalados (ghost)  → SEM DESTINO. Não publicar até o Marketing gerar link viewer funcional. Botão fica oculto no build.
```

## Gestão 360 (C5) · Nova Campanha (C6) com `?plataforma=rodovias`

---

# 11 · PÁGINA `/plataformas/digital-signage`

## Hero
**Kicker:** SOB MEDIDA · GESTÃO 360 OM
**Título:** Digital Signage.
**Subtítulo:**
> Um painel que é só da sua marca, no seu endereço. Fachada digital, posto de combustível, passagem digital: a Outdoormídia projeta, licencia, instala e opera, e o conteúdo fica no seu controle.

## Quando essa plataforma é a escolha certa
- Transformar a própria fachada em mídia
- Comunicar promoção no ponto de venda em tempo real
- Projeto de rede própria com gestão terceirizada

## BIGNUMBERS
**Sem dado validado. Componente não renderiza.** Marketing envia dados na sexta-feira (05/09). Slot reservado.

## Produto
**Painel Exclusivo** — SOB MEDIDA · GESTÃO 360 OM
> Da consultoria legal de licenciamento à manutenção 24 horas por dia, sete dias por semana, o Gestão 360 OM cuida de tudo que fica entre a sua fachada e um painel funcionando. Você entra com o ponto e a marca. A operação entra com o resto.

## Gestão 360 ampliado (única página com versão estendida)
> Consultoria legal de licenciamento · projeto e instalação completa · produção de conteúdo · manutenção 24 horas por dia, sete dias por semana.

## Nova Campanha (C6) com `?plataforma=digital-signage`

---

# 12 · CARDS CANÔNICOS · PRODUTOS DE DUPLA TECNOLOGIA

Um card por produto, toggle C4. Renderizados em Front Light E Outdoor Digital (regra C8). O toggle abre na tecnologia da página.

**Top Sight** — ESTÁTICO E DIGITAL · VERTICAL
> Presença vertical nos corredores de maior circulação, ocupando o campo de visão de quem dirige e de quem caminha. No estático, iluminação que mantém a campanha viva depois que o sol se põe. No digital, o mesmo enquadramento de um reel: a campanha funciona tanto nas mídias sociais quanto na plataforma, sem adaptação de proporção.
Specs (digital): 768×1024 px · MP4 · 10 segundos

**Poster Sight** — ESTÁTICO E DIGITAL · HORIZONTAL
> O outdoor como ele deve ser: grande, horizontal, impossível de não ler, nas vias que estruturam o trajeto diário da cidade. No digital, o enquadramento clássico do vídeo, com troca de conteúdo em tempo real e sem custo de produção física.
Specs (digital): 1024×512 px · MP4 · 10 segundos

**Billboard** — ESTÁTICO E DIGITAL · GRANDE FORMATO
> O grande formato de proporção estendida, disponível nas duas tecnologias. Área generosa para a direção de arte respirar, nos pontos de tráfego intenso.
Specs (digital): 1536×512 px · MP4 · 10 segundos

**Topo de Prédio** — ESTÁTICO E DIGITAL · EXCLUSIVO SANTA CATARINA
> O formato mais alto do portfólio, no alto das duas cidades mais relevantes de Santa Catarina. Em Balneário Camboriú, painel digital em ponto nobre da Av. Brasil. Em Joinville, um painel digital com conteúdo em tempo real e um estático de presença contínua. Visibilidade premium para marcas que buscam protagonismo na paisagem, onde só a Outdoormídia chega.
Pontos: Balneário Camboriú (Av. Brasil, 3830) · Joinville digital (Rua João Colin, 1875) · Joinville estático (endereço pendente)
**Destaque de build:** selo "EXCLUSIVO SC" no card, nas duas páginas onde aparece.

---

# 13 · MATÉRIA-PRIMA · MELHORES PRÁTICAS (não publicar como está)

Conteúdo validado das fichas técnicas, reservado para a copy da página Melhores Práticas, a ser escrita em rodada própria:
> MP4, 10 segundos, até 10 MB, 6.000 kbps, 60 fps · arte em 150 ppi, RGB, na dimensão do ponto · pouco texto, fontes com peso, sem serifa · contraste forte entre fundo e mensagem · evitar fundo branco ou preto · storyboard obrigatório em arquivos abertos · Cascata: arquivo guia PSD com máscaras disponível para download.

---

# 14 · PENDÊNCIAS CONSOLIDADAS

| # | Item | Bloqueia | Responsável | Status |
|---|---|---|---|---|
| 1 | Fotos de todos os ativos e formatos | Publicação | João (buscando agora) | Em andamento |
| 2 | Dimensões físicas em metros: Top Sight, Poster Sight, Super Poster, Super Billboard, Super Top Sequencial, Billboard, Empena, Bike, Bus | Specs seção formatos | Marketing | Aberto |
| 3 | Dados Digital Signage | Bignumbers da página | Marketing | Prometido sexta 05/09 |
| 4 | Nomes dos 6 circuitos MUB (4 conhecidos: saúde, educação, shoppings, alto padrão) | Página MUB | Marketing | Aberto |
| 5 | Contagem de rede Front Light | Bignumbers da página | Marketing | Sem dado hoje |
| 6 | Dados de rota/frota Mídia Móvel | Bignumbers da página | Marketing | Aberto |
| 7 | Link viewer funcional dos painéis instalados (Rodovias) | Botão 2 do mapa | Marketing/TI | Link atual quebrado |
| 8 | Segundo endereço do Jardim Vertical | Card Regenerativo | Marketing | Aberto |
| 9 | Endereço do Topo de Prédio estático Joinville | Card Topo de Prédio | Marketing | Aberto |
| 10 | Origem da diferença 284 vs 312 m² no Aeroporto Square | Nada (312 é o oficial) | Marketing | Explicação pendente |
| 11 | Specs da Empena | Card Empena | Marketing | Aberto |
| 12 | Impactos mensais de Cascata, Mosaico e Duo Vision | Reforço de copy | Marketing | Desejável, não bloqueia |

# 15 · ALERTAS ATIVOS (não são tarefas de build)

- **PDF do Distrito circula com preço** (tabela e negociado). Avisar Alexandra com cuidado. Nenhum valor no site.
- **Cascata Batel existe e está de volta ao site** (4 pontos), mas os materiais comerciais 2026 só listam 3. O material de venda está desatualizado em relação à operação, sinalizar ao Marketing.
- **Frases de condição comercial dos PDFs de shopping** ("faturamento pelo líquido contra cliente") não entram no site.
