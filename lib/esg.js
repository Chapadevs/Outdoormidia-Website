// Ramo ESG do hub Sobre nós — Ambiental, Social e Governança.
//
// Copy fechada com o cliente em 25/08/2026 (checklists de Ambiental, Social e
// Governança). Aqui só entram os blocos que se repetem em card; o texto corrido
// de cada seção vive na própria página.
//
// A régua continua a mesma: nada de card com meta sem número, selo "em breve"
// ou certificação não confirmada. Página de ESG vazia vale menos que nenhuma,
// porque é lida por quem avalia a empresa em licitação.

// Seção 01 da Ambiental. Todo card abre pelo endereço, que é o que prova a
// entrega. Os três integram a carteira Gentileza Urbana.
//
// TODO(Imagine): falta a foto da Praça de Carregamento Elétrico (16/9,
// ≥1600px) — é a única que ainda bloqueia a publicação da página. Praça Pet
// Batel e Jardim Vertical já têm foto aplicada.
export const AMBIENTAL_REALIDADE = [
  {
    slug: 'praca-de-carregamento-eletrico',
    tag: 'Gentileza Urbana · Mobilidade',
    title: 'Praça de Carregamento Elétrico',
    image: '',
    text: [
      'Alameda Augusto Stellfeld, 445. A primeira praça do Sul do Brasil dedicada à mobilidade limpa, abastecida por energia solar. Mais que um ponto de recarga: infraestrutura moderna e acessível que a população usa todo dia, em uma cidade que se move cada vez mais no elétrico.',
      'Para a marca patrocinadora, é presença associada a um serviço real. Não é mídia que interrompe, é mídia que resolve.',
    ],
  },
  {
    slug: 'praca-pet-batel',
    tag: 'Gentileza Urbana · Cidade',
    title: 'Praça Pet Batel',
    image: '/media/ambiental/praca-pet-batel.webp',
    text: [
      'Bento Viana com Sete de Setembro. Infraestrutura planejada e design acolhedor em um dos bairros de maior circulação de Curitiba. Lazer, bem-estar e convívio em um espaço seguro que revalorizou a esquina inteira.',
      'É publicidade em mobiliário urbano no melhor formato possível: a marca aparece no lugar onde as pessoas escolhem ficar, não no lugar por onde elas apenas passam. Permanência, não impacto de passagem.',
    ],
  },
  {
    slug: 'jardim-vertical',
    tag: 'Gentileza Urbana · Paisagem',
    title: 'Jardim Vertical',
    image: '/media/ambiental/jardim-vertical.webp',
    text: [
      'Rua Bispo Dom José, 2866. Um Poster Sight que virou elemento vivo da paisagem, com irrigação, poda e reposição das plantas por nossa conta.',
      'No ritmo acelerado da cidade, ele para o olhar pela diferença. A marca anunciada leva junto o que a estrutura comunica: sustentabilidade, bem-estar e cuidado com o espaço urbano. Branding com propósito em suporte de mídia exterior.',
    ],
  },
]

// Seção 03 da Ambiental. Prática corrente, sem selo de meta e sem "em breve".
// O card de energia fala de projetos nomeados, não da operação inteira: energia
// limpa está documentada em ativos específicos.
export const AMBIENTAL_PRATICAS = [
  {
    slug: 'iluminacao-led',
    title: 'Conversão para iluminação LED',
    text: 'Faces impressas com iluminação convertida para LED. Menos consumo por ponto, mesma legibilidade à noite.',
  },
  {
    slug: 'energia-nos-iconicos',
    title: 'Energia nos projetos icônicos',
    text: 'Projetos como o Batel Square e a Praça de Carregamento Elétrico operam com energia limpa. A tecnologia entra junto com a estrutura, não como adaptação posterior.',
  },
  {
    slug: 'destinacao-da-lona',
    title: 'Destinação da lona',
    text: 'A lona retirada das faces é encaminhada para reaproveitamento em vez de aterro, através do programa de doação para transformação em produtos.',
  },
  {
    slug: 'mobiliario-urbano',
    title: 'Contrapartida em mobiliário urbano',
    text: 'Cada praça onde operamos recebe mobiliário urbano instalado e mantido por nós. Jardins, bancos, estruturas de convívio e pontos de serviço. O que ocupamos da cidade, devolvemos em uso público.',
  },
]

// Seção 02 da Governança. Cinco pilares.
//
// O card "Canal de denúncia" saiu por decisão de 25/08/2026: não existe canal,
// e prometer tratamento formal de relato sem canal, processo e responsável cria
// expectativa jurídica que a empresa não tem como cumprir. Não volta sem os três.
export const GOV_PILARES = [
  {
    slug: 'operacao-propria',
    title: 'Operação própria, responsabilidade própria',
    text: 'Da negociação do ponto à instalação, a operação é nossa. Sem intermediário e sem terceirizado: quem vende é quem executa.',
  },
  {
    slug: 'licencas-e-regularidade',
    title: 'Licenças e regularidade dos pontos',
    text: 'Cada face opera com a licença exigida pelo município. A regularidade do ponto é condição para ele entrar no inventário.',
  },
  {
    slug: 'contratos-e-face-unica',
    title: 'Contrato e Face Única',
    text: 'Exclusividade por ponto está no contrato, não na conversa: cada face é de um único anunciante no período contratado.',
  },
  {
    slug: 'dados-e-privacidade',
    title: 'Dados de audiência e privacidade',
    text: 'As métricas de audiência da rede digital são agregadas e anônimas: perfil de público, nunca identificação de pessoa.',
  },
  {
    slug: 'conduta-comercial',
    title: 'Conduta comercial',
    text: 'Regras claras sobre brindes, relacionamento com poder público e conflito de interesse na negociação de pontos.',
  },
]
