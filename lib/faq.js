// Perguntas frequentes — usadas na seção da home e na página
// /area-do-anunciante/faq.
//
// Redação oficial do cliente, checklist de aplicação fechado em 26/08/2026.
// A ordem daqui é a da página, que agrupa por `categoria`; a ordem da home é
// outra e está em `PERGUNTAS_HOME`, no fim do arquivo.
//
// `a` é a lista de parágrafos da resposta e `fonte` é a linha de atribuição em
// corpo reduzido logo abaixo dela. O Accordion aceita `**negrito**` dentro do
// parágrafo.
//
// TODO(cliente): falta a pergunta "Qual a antecedência mínima para colocar a
// campanha no ar?", entregue marcada como AGUARDANDO DADO em dois dos três
// parágrafos (prazo para subir criativo em LED · prazo de produção e instalação
// de lona). Só o terceiro está fechado: painel de rodovia sob demanda leva 15
// meses, porque envolve obra e licenciamento. Pergunta visível sem resposta é
// pior que pergunta ausente, então ela não sobe enquanto o dado não vier —
// quando vier, entra em segundo lugar em Contratação, colada em "Quanto custa",
// e a página passa de 19 para as 20 perguntas do documento.
export const CATEGORIAS_FAQ = [
  'Como começar',
  'Formatos e praças',
  'Medição e resultados',
  'Contratação',
]

export const FAQS = [
  // ──────────── 01 · Como começar ────────────
  //
  // As três primeiras formam o bloco de quem está conhecendo, e é o que o
  // visitante encontra nas três primeiras linhas da página. "Direto ou agência"
  // desceu para quarta: é pergunta de quem já sabe o que quer.
  {
    categoria: 'Como começar',
    q: 'Nunca anunciei em outdoor. Vocês me ajudam a escolher?',
    a: [
      'Sim, e é o caso mais comum. Partimos do objetivo, do público e da região para recomendar formato, ponto e período. Se você ainda não sabe por onde começar, o Diagnóstico de Presença faz a leitura da presença atual da sua marca e aponta o caminho.',
    ],
  },
  {
    categoria: 'Como começar',
    q: 'Minha empresa é pequena. Vale a pena anunciar em mídia exterior?',
    a: [
      'Vale, e é a pergunta que mais recebemos. Mídia exterior não é reservada a marca grande: ela é definida por praça e por ciclo. Uma empresa que atende um bairro ou uma região não precisa da cidade inteira, precisa dos pontos por onde o cliente dela passa todo dia.',
      'O ciclo padrão é a bi-semana, de 14 dias, e existem circuitos organizados por nicho que concentram a verba em quem interessa, em vez de espalhar. O que define o tamanho da campanha é o objetivo, não o tamanho da empresa.',
    ],
  },
  {
    // A resposta soma, nunca substitui: quem faz essa pergunta já investe em
    // rede social e não quer ouvir que errou.
    categoria: 'Como começar',
    q: 'Devo investir em mídia exterior ou em redes sociais?',
    a: [
      'Os dois resolvem coisas diferentes, e comparar um com o outro costuma levar à escolha errada. Rede social fala com quem já procurou você ou já se parece com quem procurou. Mídia exterior fala com quem ainda não sabe que você existe, e é isso que alimenta o topo de tudo o que vem depois.',
      'No Brasil, a mídia exterior alcança 89% da população e é o segundo meio mais consumido do país. Ela não disputa a verba de performance: ela aumenta a base de gente que reconhece a marca quando o anúncio aparece na tela.',
    ],
    fonte: 'Fonte: Kantar Ibope Media, Target Group Index, 2024.',
  },
  {
    categoria: 'Como começar',
    q: 'Melhor comprar direto com vocês ou através de agência?',
    a: [
      'Atendemos os dois. Agências contam com condições específicas, dados organizados por praça e apoio na defesa do plano. Anunciantes diretos recebem atendimento consultivo do planejamento ao relatório final.',
    ],
  },
  {
    // A página existe em /area-do-anunciante/melhores-praticas: o checklist da
    // home de 26/08 fechou a renomeação do Mídia Kit, e é por isso que esta
    // resposta pode citar Melhores Práticas pelo nome.
    categoria: 'Como começar',
    q: 'Vocês têm mídia kit?',
    a: [
      'Sim. O time comercial envia a versão completa mediante solicitação. Na página de Melhores Práticas você encontra conteúdos e recomendações sobre como escolher praça, formato e período.',
    ],
  },
  {
    categoria: 'Como começar',
    q: 'Como faço para receber uma proposta?',
    a: [
      'Responda seis perguntas em Nova Campanha, sobre momento, objetivo, praça, período e segmento. Nossa resposta chega em até um dia útil, com as opções disponíveis para o seu caso.',
    ],
  },

  // ──────────── 02 · Formatos e praças ────────────
  //
  // "Todos os painéis são iluminados?" saiu: o conteúdo foi absorvido pelo
  // segundo parágrafo da pergunta de diferença entre formatos, sem perda de
  // informação. Era detalhe de proposta ocupando vaga de FAQ.
  {
    categoria: 'Formatos e praças',
    q: 'Qual a diferença entre front light, outdoor digital, MUB e os demais formatos?',
    a: [
      'São nove plataformas, divididas entre estático e digital. O Front Light é o outdoor clássico de 18 m² em via urbana, iluminado por padrão, e o nome vem daí. O Outdoor Digital é a tela de LED com troca de conteúdo em tempo real. O MUB são bancas e relógios digitais organizados em circuitos por nicho.',
      'Nas demais plataformas estáticas a iluminação varia conforme a viabilidade técnica de cada ponto, e a proposta informa quais dos pontos selecionados são iluminados. Cada plataforma tem página própria com formato, dimensão e praça.',
    ],
  },
  {
    // TODO(cliente): resposta genérica de propósito — o fluxo real do comercial
    // para quem chega com a foto de um painel no celular não está documentado.
    // Confirmar: aceita foto e endereço, consulta disponibilidade, oferece
    // alternativa no mesmo trajeto, existe fila de espera?
    categoria: 'Formatos e praças',
    q: 'Posso escolher um ponto específico?',
    a: [
      'Pode. Fale com a nossa equipe informando o ponto de interesse e verificamos disponibilidade e período. Cada face é de um anunciante só, por Face Única, então a agenda de cada ponto é individual.',
      'Se quiser ver antes como a sua marca ficaria, use a ferramenta **Sua marca no OOH**.',
    ],
  },
  {
    categoria: 'Formatos e praças',
    q: 'Em quais cidades a Outdoormídia está presente?',
    a: [
      'Curitiba, Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário Camboriú, além das principais rodovias do Paraná e de Santa Catarina, entre elas BR-116, BR-277, BR-376 e BR-101.',
    ],
  },

  // ──────────── 03 · Medição e resultados ────────────
  //
  // Grupo intocado pelo checklist: cobre com precisão o gestor de marketing que
  // precisa justificar investimento e o profissional de digital que desconfia
  // do OOH. Os três números do circuito de 40 faces têm fonte na Apresentação
  // 2025 e a progressão fecha nos três períodos.
  {
    categoria: 'Medição e resultados',
    q: 'Como sei que a campanha veiculou mesmo? Existe comprovação?',
    a: [
      'Sim. Todos os pontos digitais têm câmeras conectadas ao vivo, com equipe dedicada 24 horas por dia, sete dias por semana. Você acompanha o checking online e recebe relatório semanal com audiência, impactos, frequência média e CPI, além da análise qualitativa da mídia contratada.',
    ],
  },
  {
    categoria: 'Medição e resultados',
    q: 'Como vocês medem quantas pessoas viram minha campanha?',
    a: [
      'Com Wi-Fi tracking e eye tracking, que mostram por onde as pessoas circulam e quem efetivamente viu a peça. Você recebe impactos, frequência média, CPM, CPI e perfil de audiência por gênero, faixa etária e faixa de renda.',
    ],
  },
  {
    categoria: 'Medição e resultados',
    q: 'Quantos pontos preciso para a campanha ser percebida?',
    a: [
      'Depende da praça e do objetivo. Um exemplo de referência: um circuito de 40 faces entrega cerca de 8,4 milhões de impactos em 7 dias, 18 milhões em 15 dias e 36 milhões em 30 dias.',
    ],
  },

  // ──────────── 04 · Contratação ────────────
  //
  // Custo abre o grupo. Depois vem o bloco do que você recebe: duração, arte e
  // o que está incluso.
  {
    // Sem valor de CPM. Versões anteriores traziam R$ 2,06 por mil impactos em
    // rodovias; nenhum material do projeto registra esse número, a origem não
    // foi identificada e ele saiu de circulação. Preço em FAQ público é a
    // informação mais checável que existe, e um valor errado é desmentido pelo
    // próprio comercial na primeira ligação.
    //
    // TODO(cliente): se o comercial validar um CPM de referência, ele entra na
    // base e volta para esta resposta — junto com lib/simulador.js, que hoje
    // estima de R$ 8 a R$ 14.
    categoria: 'Contratação',
    q: 'Quanto custa anunciar em outdoor?',
    a: [
      'O investimento varia conforme formato, praça, quantidade de pontos e período. A proposta é montada a partir do seu objetivo e do orçamento disponível, e você recebe as opções que cabem no que pretende investir.',
    ],
  },
  {
    categoria: 'Contratação',
    q: 'Existe duração mínima de veiculação?',
    a: [
      'O período padrão de mídia exterior é a bi-semana, ciclos de 14 dias, com possibilidade de rodízio entre pontos ao longo da campanha. Painéis de rodovia construídos sob demanda têm prazo mínimo de 15 meses, porque envolvem obra e licenciamento.',
    ],
  },
  {
    categoria: 'Contratação',
    q: 'Quem faz a arte? Quais são as especificações de arquivo?',
    a: [
      'Você pode enviar a arte pronta ou contar com a nossa equipe. Para peças digitais: MP4 ou codec MPEG-4, 10 segundos, até 10 MB, 6000 kbps e 60 fps. Para peças impressas: arquivo em RGB a 150 ppi, entregue em PSD ou AI.',
      'Recomendamos pouco texto, alto contraste entre fundo e tipografia, e evitar fontes finas ou serifadas. Fundo branco ou preto não é recomendado.',
    ],
  },
  {
    // Substituiu "Existe algum custo depois dos primeiros 30 dias?", que era
    // letra miúda vestida de pergunta: plantava a dúvida que pretendia
    // resolver. A informação continua toda aqui, agora depois de uma lista do
    // que já está pago — o custo de rodovia deixa de ser manchete e vira
    // exceção declarada.
    //
    // TODO(cliente): a base não registra se produção da lona e instalação
    // entram no valor. Se entrarem, precisam aparecer no primeiro parágrafo; se
    // não entrarem, no segundo. São os dois itens que o anunciante mais teme
    // receber como extra.
    categoria: 'Contratação',
    q: 'O que está incluso no valor da campanha?',
    a: [
      'A veiculação no período contratado, a manutenção da estrutura, o monitoramento em tempo real e a comprovação: checking online e relatório com audiência, impactos, frequência média e CPI, além da análise qualitativa da mídia. Você não paga separado por acompanhamento nem por relatório.',
      'A única linha que aparece fora disso é o custo de operação dos painéis de rodovia, incidente após os 30 dias iniciais de veiculação, e ele consta na proposta desde o começo.',
    ],
  },
  {
    categoria: 'Contratação',
    q: 'Meu concorrente pode estar no mesmo painel que eu?',
    a: [
      'Não. O conceito Face Única garante que cada face seja dedicada exclusivamente a um anunciante. Além de eliminar a disputa pela atenção, isso evita que sua marca apareça ao lado de outra sem afinidade com ela.',
    ],
  },
  {
    // TODO(cliente): "Operamos estrutura própria, sem ativos de concessão" está
    // dito de forma geral, mas MUB é mobiliário urbano, e banca de revista e
    // relógio digital costumam existir por concessão municipal. Se for o caso,
    // a frase precisa ficar restrita ao Aeroporto, que é o próprio exemplo que
    // ela dá. Afirmação de propriedade de ativo é o tipo de coisa que
    // concorrente contesta.
    categoria: 'Contratação',
    q: 'Vocês são donos dos pontos ou revendem de terceiros?',
    a: [
      'Operamos estrutura própria. No Aeroporto Internacional Afonso Pena, por exemplo, atuamos em terreno particular, sem ativos de concessão, o que garante liberdade de formato e agilidade que o modelo de licitação não permite.',
    ],
  },
  {
    categoria: 'Contratação',
    q: 'Preciso de autorização da prefeitura? Posso ter problema?',
    a: [
      'Nossos pontos são licenciados e seguem os decretos municipais, incluindo a área padrão de 18 m² em Curitiba. Em projetos de painel exclusivo, o Gestão 360 OM inclui consultoria legal de licenciamento e dimensionamento dentro da norma.',
    ],
  },
]

// As oito da home, nesta ordem. É seleção, não recorte: a ordem da home responde
// a quem está conhecendo (vale a pena, quanto custa, como pedir proposta), e não
// é a ordem da página, que agrupa por categoria.
//
// "Vocês são donos dos pontos" e "Preciso de autorização da prefeitura" ficam
// só na página completa: são de quem já está decidindo.
const PERGUNTAS_HOME = [
  'Nunca anunciei em outdoor. Vocês me ajudam a escolher?',
  'Minha empresa é pequena. Vale a pena anunciar em mídia exterior?',
  'Devo investir em mídia exterior ou em redes sociais?',
  'Quanto custa anunciar em outdoor?',
  'Existe duração mínima de veiculação?',
  'Meu concorrente pode estar no mesmo painel que eu?',
  'Como sei que a campanha veiculou mesmo? Existe comprovação?',
  'Como faço para receber uma proposta?',
]

export const FAQS_HOME = PERGUNTAS_HOME.map((q) => FAQS.find((f) => f.q === q))
