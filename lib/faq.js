// Perguntas frequentes — usadas na seção da home e na página /area-do-anunciante/faq.
//
// Redação oficial do cliente (COPY_SITE). A ordem é a do documento, que é a
// ordem da home; a página agrupa por `categoria`.
//
// TODO(cliente): falta a pergunta "Qual a antecedência mínima para colocar a
// campanha no ar?" — o documento a entregou marcada como AGUARDANDO DADO
// (prazo de produção e instalação de lona · prazo para subir criativo em LED).
// Ela é a nº 2 do documento: quando o dado chegar, entra na segunda posição e
// `FAQS_HOME` volta a ser 8 perguntas.
export const CATEGORIAS_FAQ = [
  'Como começar',
  'Formatos e praças',
  'Medição e resultados',
  'Contratação',
]

export const FAQS = [
  {
    categoria: 'Contratação',
    q: 'Quanto custa anunciar em outdoor?',
    // TODO(cliente): o documento traz "em rodovias o CPM fica em torno de
    // R$ 2,06". A faixa usada em lib/simulador.js é de R$ 8 a R$ 14 — quatro a
    // sete vezes maior. A cifra fica fora do ar até o cliente cravar qual vale;
    // com as duas no site, quem lê o FAQ e roda o simulador recebe estimativas
    // que se contradizem.
    a: 'O investimento varia conforme formato, praça, quantidade de pontos e período. A proposta é montada a partir do seu objetivo e do orçamento disponível.',
  },
  {
    categoria: 'Contratação',
    q: 'Existe duração mínima de veiculação?',
    a: 'O período padrão de mídia exterior é a bi-semana, ciclos de 14 dias, com possibilidade de rodízio entre pontos ao longo da campanha. Painéis de rodovia construídos sob demanda têm prazo mínimo de 15 meses, porque envolvem obra e licenciamento.',
  },
  {
    categoria: 'Contratação',
    q: 'Quem faz a arte? Quais são as especificações de arquivo?',
    // TODO(cliente): o documento juntava numa lista só a especificação de vídeo
    // (MP4, 10 s, 60 fps) e a de arquivo aberto (PSD ou AI), o que se
    // contradiz. Separado aqui em peça digital e peça impressa — confirmar se
    // os valores de cada uma estão corretos.
    a: 'Você pode enviar a arte pronta ou contar com a nossa equipe. Para peças digitais: MP4 ou codec MPEG-4, 10 segundos, até 10 MB, 6000 kbps e 60 fps. Para peças impressas: arquivo em RGB a 150 ppi, entregue em PSD ou AI. Recomendamos pouco texto, alto contraste entre fundo e tipografia, e evitar fontes finas ou serifadas. Fundo branco ou preto não é recomendado.',
  },
  {
    categoria: 'Contratação',
    q: 'Meu concorrente pode estar no mesmo painel que eu?',
    a: 'Não. O conceito Face Única garante que cada face seja dedicada exclusivamente a um anunciante. Além de eliminar a disputa pela atenção, isso evita que sua marca apareça ao lado de outra sem afinidade com ela.',
  },
  {
    categoria: 'Medição e resultados',
    q: 'Como sei que a campanha veiculou mesmo? Existe comprovação?',
    a: 'Sim. Todos os pontos digitais têm câmeras conectadas ao vivo, com equipe dedicada 24 horas por dia, sete dias por semana. Você acompanha o checking online e recebe relatório semanal com audiência, impactos, frequência média e CPI, além da análise qualitativa da mídia contratada.',
  },
  {
    categoria: 'Medição e resultados',
    q: 'Como vocês medem quantas pessoas viram minha campanha?',
    a: 'Com Wi-Fi tracking e eye tracking, que mostram por onde as pessoas circulam e quem efetivamente viu a peça. Você recebe impactos, frequência média, CPM, CPI e perfil de audiência por gênero, faixa etária e faixa de renda.',
  },
  {
    categoria: 'Medição e resultados',
    q: 'Quantos pontos preciso para a campanha ser percebida?',
    a: 'Depende da praça e do objetivo. Um exemplo de referência: um circuito de 40 faces entrega cerca de 8,4 milhões de impactos em 7 dias, 18 milhões em 15 dias e 36 milhões em 30 dias.',
  },

  // ──── na home, o FAQ termina aqui (marcação do documento) ────

  {
    categoria: 'Contratação',
    q: 'Vocês são donos dos pontos ou revendem de terceiros?',
    a: 'Operamos estrutura própria. No Aeroporto Internacional Afonso Pena, por exemplo, atuamos em terreno particular, sem ativos de concessão, o que garante liberdade de formato e agilidade que o modelo de licitação não permite.',
  },
  {
    categoria: 'Contratação',
    q: 'Preciso de autorização da prefeitura? Posso ter problema?',
    a: 'Nossos pontos são licenciados e seguem os decretos municipais, incluindo a área padrão de 18 m² em Curitiba. Em projetos de painel exclusivo, o Gestão 360 OM inclui consultoria legal de licenciamento e dimensionamento dentro da norma.',
  },
  {
    categoria: 'Contratação',
    q: 'Existe algum custo depois dos primeiros 30 dias?',
    a: 'Em painéis de rodovia há custo de operação incidente após os 30 dias iniciais de veiculação. Ele consta na proposta desde o início.',
  },
  {
    categoria: 'Formatos e praças',
    q: 'Todos os painéis são iluminados?',
    a: 'A iluminação varia conforme a viabilidade técnica de cada ponto. A proposta informa quais dos pontos selecionados são iluminados.',
  },
  {
    categoria: 'Formatos e praças',
    q: 'Qual a diferença entre front light, outdoor digital, MUB e os demais formatos?',
    a: 'São nove plataformas, divididas entre estático e digital. O Front Light é o outdoor clássico de 18 m² em via urbana. O Outdoor Digital é a tela de LED com troca de conteúdo em tempo real. O MUB são bancas e relógios digitais organizados em circuitos por nicho. Cada plataforma tem página própria com formato, dimensão e praça.',
  },
  {
    categoria: 'Formatos e praças',
    q: 'Em quais cidades a Outdoormídia está presente?',
    a: 'Curitiba, Região Metropolitana, Litoral do Paraná, Joinville, Itajaí e Balneário Camboriú, além das principais rodovias do Paraná e de Santa Catarina, entre elas BR-116, BR-277, BR-376 e BR-101.',
  },
  {
    categoria: 'Como começar',
    q: 'Melhor comprar direto com vocês ou através de agência?',
    a: 'Atendemos os dois. Agências contam com condições específicas, dados organizados por praça e apoio na defesa do plano. Anunciantes diretos recebem atendimento consultivo do planejamento ao relatório final.',
  },
  {
    categoria: 'Como começar',
    q: 'Nunca anunciei em outdoor. Vocês me ajudam a escolher?',
    a: 'Sim, e é o caso mais comum. Partimos do objetivo, do público e da região para recomendar formato, ponto e período. Se você ainda não sabe por onde começar, o Diagnóstico de Presença faz a leitura da presença atual da sua marca e aponta o caminho.',
  },
  {
    categoria: 'Como começar',
    q: 'Vocês têm mídia kit?',
    a: 'Sim. Os materiais de apoio ficam na página do Guia do Anunciante e o time comercial envia a versão completa mediante solicitação.',
  },
  {
    categoria: 'Como começar',
    q: 'Como faço para receber uma proposta?',
    a: 'Responda seis perguntas em Nova Campanha, sobre objetivo, praça, período e segmento. Nossa resposta chega em até um dia útil, com as opções disponíveis para o seu caso.',
  },
]

// O documento marca onde o FAQ da home termina. São 7 e não 8 porque a segunda
// pergunta do documento ainda está sem resposta — ver o TODO(cliente) no topo.
export const FAQS_HOME = FAQS.slice(0, 7)
