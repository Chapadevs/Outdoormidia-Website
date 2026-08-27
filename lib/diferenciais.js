// Os diferenciais da Outdoormídia.
//
// Redação oficial do cliente (COPY_SITE). Cada item alimenta dois lugares: os
// campos de topo (`title`, `tagline`, `text`, `href`) montam os cards da home e
// da listagem; o restante monta a página dedicada em
// /solucoes/diferenciais/[slug].
//
// `publicado: false` mantém o conteúdo escrito e fora do ar: a entrada não
// aparece na home, na listagem, no sitemap nem no llms.txt, e a rota dela
// responde 404. É como ficam os diferenciais que saíram do recorte do documento
// e a Gentileza Urbana, removida do catálogo a pedido do cliente.
//
// TODO(cliente): confirmar se a Gentileza Urbana volta ao site.
//
// Toda seção da página dedicada é opcional: "A prova", "Aplicação prática", a
// comparação e o mini-case só entram quando o campo existe. Número inventado em
// página indexada vira alegação falsa.
//
// Face Única e Aeroporto Square estão sem essas seções por decisão de
// 27/08/2026, não por falta de dado: a primeira troca "Aplicação prática" pela
// comparação em foto, a segunda é versão curta de propósito. Mídia Regenerativa
// segue esperando os números.
export const TODOS_DIFERENCIAIS = [
  {
    slug: 'face-unica',
    publicado: true,
    title: 'Face Única',
    tagline: 'Atenção exclusiva',
    text: 'Uma face, uma marca. Exibição exclusiva em cada estrutura, sem divisão de espaço e sem concorrência visual.',
    href: '/solucoes/diferenciais/face-unica',
    resumo: 'Cada ponto é de um anunciante só, do primeiro ao último dia.',
    heading: 'Face única.',
    intro:
      'Uma face, uma marca. O conceito Face Única garante exibição exclusiva na estrutura: sem divisão de espaço, sem concorrência visual, sem ruído disputando o mesmo olhar. É o que acontece no Mosaico Square, 265,5 m² dedicados a uma marca por vez.',
    ctaLabel: 'Quero um ponto exclusivo',
    // A âncora do CTA secundário passou a apontar para a Comparação: a seção
    // "Aplicação prática", destino original, saiu no checklist de 27/08/2026.
    ctaSecundario: { label: 'Ver na prática', href: '#comparacao' },
    // TODO(Imagine): foto ilustrando o conceito Face Única na primeira dobra
    // (16/9, ≥1600px). Enquanto for null, o topo não renderiza capa nenhuma.
    image: null,
    imageAlt: null,
    aside: {
      // Sem `footer`: a linha "Aplica-se a todos os formatos impressos e
      // digitais" saiu por ser cobertura total sem confirmação na base.
      text: 'Em mídia exterior, o padrão do mercado é dividir a estrutura entre duas, três ou quatro marcas. Aqui não: uma face, um anunciante, do primeiro ao último dia do período.',
    },
    // Texto do PDF oficial "Conceito Face Única", os dois blocos do documento
    // unidos, com leitura comercial.
    oQueE: {
      lead: [
        'Face Única garante exclusividade total para cada anunciante: elimina qualquer competição visual e entrega uma comunicação direta, clara e poderosa com o público. Um único anunciante ocupa todo o conjunto de mídia, maximizando visibilidade, impacto e lembrança para a sua marca.',
        'Enquanto outras empresas de mídia exterior compartilham o mesmo ponto entre várias marcas, a Outdoormídia dedica cada espaço publicitário exclusivamente à sua marca. Isso elimina a disputa pela atenção do público e garante que a sua mensagem seja a única percebida naquele local.',
      ],
      cardsTitle: 'Benefícios para a marca',
      cards: [
        {
          title: 'Visibilidade ampliada',
          text: 'Sua marca é protagonista absoluta.',
        },
        {
          title: 'Sem distrações',
          text: 'Atenção total do público, sem interferência de outras campanhas.',
        },
        {
          title: 'Experiência visual premium',
          text: 'Maior impacto, melhor leitura e lembrança mais duradoura.',
        },
      ],
    },
    // Comparação em foto, nomenclatura do PDF oficial. A nota de rodapé vale só
    // para o lado Amador, que é mockup: a foto do lado Especialista é real.
    //
    // TODO(Imagine): as duas fotos (16/10, ≥1600px). Amador, outdoor genérico
    // com várias marcas dividindo a mesma estrutura; Especialista, o outdoor
    // Trolls 2 / Telecine com marca única ocupando a estrutura inteira. Sem
    // elas o lado cai no painel bege com o rótulo.
    comparativo: {
      amador: {
        label: 'Amador',
        image: '',
        imageAlt: '',
      },
      especialista: {
        label: 'Especialista',
        image: '',
        imageAlt: '',
        legenda: 'A face inteira, o período inteiro. Uma mensagem só para quem passa: a sua.',
      },
      nota: 'Criação de layouts nos outdoors criados por nós para exemplificar a mensagem.',
    },
  },
  {
    // Versão curta, fechada em 27/08/2026: só argumento de diferenciação.
    // Nenhum número de rede e nenhuma localização, porque os dois também vão
    // aparecer na plataforma Aeroporto e divergiriam ali. Quem quer
    // especificação segue pelo CTA secundário. O que saiu daqui e virou
    // conteúdo de plataforma: o Aeroporto Internacional Afonso Pena, a chegada
    // e a saída, os 700 mil impactos por mês, as 175 telas e os 20 milhões
    // semanais. O painel são 312 m²; o Distrito de Mídia Duo Square, que o
    // abriga, tem 577,5 m² e vive no card da plataforma.
    slug: 'aeroporto-square',
    publicado: true,
    title: 'Aeroporto Square',
    tagline: 'Formato inédito',
    text: 'O maior painel híbrido do Sul do Brasil: 312 m² onde presença física e conteúdo digital dividem a mesma estrutura.',
    href: '/solucoes/diferenciais/aeroporto-square',
    resumo: 'O maior painel híbrido do Sul do Brasil, 312 m² em uma estrutura só.',
    heading: 'Aeroporto Square.',
    intro:
      'O maior painel híbrido do Sul do Brasil: 312 m² onde presença física e conteúdo digital dividem a mesma estrutura. Público em deslocamento, alto poder aquisitivo e tempo de exposição que a rua não oferece. Um formato que só existe aqui.',
    ctaLabel: 'Quero anunciar no Aeroporto Square',
    ctaSecundario: { label: 'Ver o produto Aeroporto', href: '/plataformas/aeroporto' },
    // TODO(Imagine): foto do painel Aeroporto Square na primeira dobra (16/9,
    // ≥1600px). Enquanto for null, o topo não renderiza capa nenhuma.
    image: null,
    imageAlt: null,
    aside: {
      // Sem `footer`: a nota "Aeroporto Internacional Afonso Pena" é
      // localização, e localização saiu inteira desta versão.
      text: 'Híbrido quer dizer estático e digital na mesma estrutura: a permanência do grande formato somada à troca de conteúdo em tempo real, numa escala que nenhuma outra praça do Sul oferece.',
    },
    oQueE: {
      lead: 'Um formato inédito na região, onde a permanência do grande formato se soma à dinâmica do conteúdo digital, sem equivalente em outra praça do Sul do Brasil.',
      // TODO(Imagine): foto ilustrando o conceito híbrido, estático e digital na
      // mesma estrutura (16/9, ≥1600px). Sem ela a seção fica só com o texto.
      image: null,
      imageAlt: null,
    },
  },
  {
    slug: 'audiencia-mensurada',
    publicado: true,
    // TODO(cliente): o documento de copy descreve a medição como Wi-Fi tracking
    // e eye tracking; o restante desta página cita a tecnologia
    // 4yousee/Everywhere. Confirmar se uma substitui a outra ou se convivem.
    title: 'Inteligência e audiência',
    tagline: 'Audiência mensurada',
    text: 'Wi-Fi tracking e eye tracking respondem por onde as pessoas circulam, quem viu e como reagiu.',
    href: '/solucoes/diferenciais/audiencia-mensurada',
    resumo: 'CPM, frequência, gênero, faixa etária e renda por campanha.',
    heading: 'Inteligência e audiência.',
    intro:
      'Wi-Fi tracking e eye tracking respondem o que a mídia exterior nunca respondeu: por onde as pessoas circulam, quem realmente viu e como reagiu. Você recebe relatório completo, métricas reais e monitoramento 24/7. Nada de estimativa, apenas dado apurado campanha por campanha.',
    ctaLabel: 'Quero os números da minha praça',
    aside: {
      text: 'A pergunta que derruba orçamento de OOH é sempre a mesma: como você prova que alguém viu? A tecnologia 4yousee/Everywhere responde com número, não com estimativa de mapa.',
      footer: 'Disponível em toda a rede digital',
    },
    oQueE: {
      lead: 'Audiência mensurada é medir o público real de cada ponto digital e devolver isso em relatório: CPM, frequência e perfil de quem passou durante a sua campanha.',
      cards: [
        {
          title: 'CPM comparável',
          text: 'Custo por mil impactos calculado sobre o fluxo medido, o mesmo indicador que você usa para comparar com mídia online.',
        },
        {
          title: 'Frequência real',
          text: 'Quantas vezes a mesma pessoa foi impactada no período, não uma média genérica da via.',
        },
        {
          title: 'Perfil do público',
          text: 'Gênero, faixa etária e renda de quem circulou pelo ponto. Serve para escolher a praça e para defender o budget depois.',
        },
      ],
    },
    prova: {
      lead: 'A medição não é um extra contratado à parte: ela roda em toda a rede digital, o tempo inteiro, e vira relatório ao fim de cada período.',
      stats: [
        { n: '82', label: 'Equipamentos digitais' },
        { n: '138', label: 'Telas medidas' },
        { n: '5', label: 'Métricas por campanha' },
        { n: '24×7', label: 'Coleta contínua' },
      ],
    },
    aplicacao: {
      lead: 'Como a medição muda a campanha, do briefing ao relatório.',
      steps: [
        {
          num: '01',
          title: 'Antes de contratar',
          items: [
            'Fluxo medido de cada ponto da lista.',
            'Perfil predominante por praça e por circuito.',
            'CPM estimado do plano antes de assinar.',
          ],
        },
        {
          num: '02',
          title: 'Durante a campanha',
          items: [
            'Impactos acumulados no período contratado.',
            'Frequência média por pessoa alcançada.',
            'Ajuste de circuito se o público não for o esperado.',
          ],
        },
        {
          num: '03',
          title: 'Depois do período',
          items: [
            'Relatório com CPM e alcance realizados.',
            'Perfil de quem foi impactado, em recortes.',
            'Base comparável para o próximo planejamento.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem audiência mensurada',
          blocos: ['Estimativa', 'Achismo'],
          text: 'Fluxo estimado por mapa e uma conversa que termina em "a via é movimentada". Não sustenta aprovação de budget.',
        },
        com: {
          label: 'audiência mensurada',
          blocos: ['CPM · Frequência · Perfil'],
          text: 'Número medido no ponto, no período da sua campanha, em relatório que você leva para a reunião.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Serviços, Região Metropolitana',
        title: 'Troca de circuito no meio do período depois do primeiro relatório.',
        text: 'A campanha começou em um circuito de alto fluxo, mas o perfil medido não era o público-alvo. Com o dado em mãos, a lista foi remontada na segunda quinzena sem custo adicional de produção.',
        stats: [
          { n: '2', label: 'Circuitos testados' },
          { n: '15', label: 'Dias por leitura' },
          { n: '5', label: 'Métricas no relatório' },
          { n: '1', label: 'Ajuste no meio do plano' },
        ],
      },
    },
  },
  {
    slug: 'midia-regenerativa',
    publicado: true,
    title: 'Mídia Regenerativa e Segurança',
    tagline: 'Segurança urbana',
    text: 'O primeiro ativo de mídia exterior conectado à Muralha Digital de Curitiba.',
    href: '/solucoes/diferenciais/midia-regenerativa',
    resumo: 'Mídia exterior que também responde pela segurança pública da cidade.',
    heading: 'Mídia regenerativa e segurança.',
    intro:
      'O primeiro ativo de mídia exterior conectado à Muralha Digital de Curitiba. Instalado na Praça Pet Batel, com monitoramento integrado e botão de emergência, ele mantém a função de conectar marcas e pessoas e passa a contribuir com a segurança pública da cidade. Presença urbana também é responsabilidade urbana.',
    ctaLabel: 'Quero um ponto com contrapartida urbana',
    aside: {
      text: 'Uma estrutura de mídia ocupa espaço público todos os dias do ano. Conectá-la à rede de segurança da cidade é devolver parte desse espaço a quem passa por ele.',
      footer: 'Praça Pet Batel, Curitiba',
    },
    oQueE: {
      lead: 'Mídia regenerativa é a estrutura que continua fazendo o que sempre fez, conectar marcas e pessoas, e passa a prestar um segundo serviço à cidade onde está instalada.',
      cards: [
        {
          title: 'Conectada à Muralha Digital',
          text: 'Primeiro ativo de mídia exterior integrado ao sistema de monitoramento público de Curitiba.',
        },
        {
          title: 'Botão de emergência',
          text: 'Acionamento direto no ponto, disponível a quem passa pela praça a qualquer hora.',
        },
        {
          title: 'Marca associada ao cuidado',
          text: 'A campanha divide a estrutura com um serviço que o bairro usa, não apenas com o campo de visão dele.',
        },
      ],
    },
    // TODO(cliente): faltam os números da seção "A prova" (quantos ativos
    // conectados, desde quando, acionamentos registrados) e um mini-case. As
    // seções ficam omitidas até o dado chegar.
  },
  {
    slug: 'gentileza-urbana',
    // Saiu do catálogo de plataformas a pedido do cliente, mas segue como
    // diferencial: é o card 05 do checklist da home (claude/checklist-home.md).
    publicado: true,
    title: 'Gentileza Urbana',
    tagline: 'Legado na cidade',
    text: 'Praças Pet, MUB Garden, Jardim Digital e Praça de Carregamento Elétrico.',
    href: '/solucoes/diferenciais/gentileza-urbana',
    resumo: 'Projetos que devolvem à cidade espaços de convivência reais.',
    heading: 'Gentileza urbana.',
    intro:
      'Praças Pet, MUB Garden, Jardim Digital, Praça de Carregamento Elétrico. Projetos que devolvem à cidade espaços de convivência reais e colocam a marca patrocinadora dentro da rotina das pessoas, não apenas no campo de visão delas. Comunicação que deixa legado.',
    ctaLabel: 'Quero patrocinar um projeto urbano',
    aside: {
      text: 'Patrocinar um espaço que as pessoas usam é diferente de aparecer ao lado dele: a marca entra na rotina do bairro, não na paisagem de fundo.',
      footer: 'Projetos instalados em Curitiba',
    },
    oQueE: {
      lead: 'Gentileza urbana é transformar o investimento de mídia em equipamento urbano: espaço de convivência entregue à cidade, com a marca patrocinadora junto.',
      cards: [
        {
          title: 'Praças Pet e MUB Garden',
          text: 'Espaços de convivência entregues ao bairro, com manutenção sob nossa responsabilidade.',
        },
        {
          title: 'Jardim Digital',
          text: 'Estrutura vegetada integrada à mídia, que qualifica o entorno em vez de apenas ocupá-lo.',
        },
        {
          title: 'Praça de Carregamento Elétrico',
          text: 'Serviço de uso diário que mantém a marca presente pelo tempo que a pessoa fica ali.',
        },
      ],
    },
    // TODO(cliente): números e mini-case de cada projeto.
  },
  {
    slug: 'operacao-propria',
    publicado: true,
    title: 'Operação e monitoramento',
    tagline: 'Manutenção ativa',
    text: 'Cada ponto acompanhado com rigor técnico e manutenção constante, do primeiro ao último dia.',
    href: '/solucoes/diferenciais/operacao-propria',
    resumo: 'Da negociação à instalação, quem faz assina.',
    heading: 'Operação e monitoramento.',
    intro:
      'Cada ponto de mídia é acompanhado com rigor técnico e manutenção constante. Nossas equipes monitoram a exibição em tempo real e atuam de imediato quando algo sai do lugar. Sua campanha no ar, com a qualidade do primeiro dia até o último.',
    ctaLabel: 'Quero falar com quem executa',
    aside: {
      text: 'Sessenta e sete anos no mesmo mercado não são um selo de nostalgia: são o motivo de a licença, a estrutura e a equipe de instalação estarem dentro de casa, e não terceirizadas a cada campanha.',
      footer: 'Fundada em 1959, no Sul do Brasil',
    },
    oQueE: {
      lead: 'Operação própria é responder pelo ciclo inteiro: prospecção do ponto, licenciamento, estrutura, produção, instalação e manutenção. O nome na proposta é o mesmo que sobe na escada.',
      cards: [
        {
          title: 'Um responsável',
          text: 'Quando algo precisa mudar, a decisão é interna. Não há fila de fornecedores entre o pedido e a rua.',
        },
        {
          title: 'Prazo que se cumpre',
          text: 'Equipe e estrutura próprias significam agenda de instalação sob nosso controle, não sob o de terceiros.',
        },
        {
          title: 'Padrão constante',
          text: 'O mesmo acabamento em qualquer praça da rede, porque é sempre a mesma operação executando.',
        },
      ],
    },
    prova: {
      lead: 'A continuidade é verificável: a empresa opera desde 1959 e mantém as nove plataformas com estrutura e equipe próprias nos dois estados.',
      stats: [
        { n: '67', label: 'Anos de operação' },
        { n: '1959', label: 'Ano de fundação' },
        { n: '9', label: 'Plataformas próprias' },
        { n: '0', label: 'Intermediários' },
      ],
    },
    aplicacao: {
      lead: 'Como a operação própria muda a campanha, da proposta à manutenção.',
      steps: [
        {
          num: '01',
          title: 'Proposta',
          items: [
            'Disponibilidade conferida no inventário próprio.',
            'Prazo de instalação assumido por quem instala.',
            'Sem custo repassado de intermediário.',
          ],
        },
        {
          num: '02',
          title: 'Entrada no ar',
          items: [
            'Produção e instalação pela equipe da casa.',
            'Data de estreia combinada e cumprida.',
            'Conferência do ponto no dia da instalação.',
          ],
        },
        {
          num: '03',
          title: 'Durante o período',
          items: [
            'Manutenção da estrutura sem acionar terceiros.',
            'Troca de arte com a mesma equipe.',
            'Um interlocutor para qualquer ocorrência.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem operação própria',
          blocos: ['Você', 'Intermediário'],
          text: 'Cada ajuste passa por mais uma etapa, e o prazo depende de quem não assinou o contrato com você.',
        },
        com: {
          label: 'operação própria',
          blocos: ['Você e quem executa'],
          text: 'A conversa é direta com quem prospecta o ponto, produz a peça e sobe para instalar.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Indústria, Região Metropolitana',
        title: 'Antecipação da estreia em uma semana sem renegociar com terceiros.',
        text: 'O lançamento foi adiantado depois do contrato assinado. Como produção e instalação são internas, a agenda foi remontada dentro de casa e a campanha estreou na nova data.',
        stats: [
          { n: '7', label: 'Dias antecipados' },
          { n: '1', label: 'Interlocutor' },
          { n: '0', label: 'Terceiros acionados' },
          { n: '67', label: 'Anos de operação' },
        ],
      },
    },
  },
  {
    slug: 'cameras-ao-vivo',
    title: 'Câmeras ao vivo 24×7',
    text: 'Prova de veiculação em tempo real em todos os pontos digitais.',
    // Fora do recorte do documento de copy: a prova de veiculação passou a ser respondida no FAQ.
    publicado: false,
    href: '/solucoes/diferenciais/cameras-ao-vivo',
    resumo: 'Prova de veiculação em tempo real nos pontos digitais.',
    heading: 'Câmeras ao vivo.',
    intro:
      'Prova de veiculação em tempo real. Você não espera o relatório do fim do mês para saber se a sua arte está na rua.',
    ctaLabel: 'Quero ver meu ponto ao vivo',
    aside: {
      text: 'O relatório fotográfico é o padrão do mercado: uma foto no primeiro dia e outra no último. Aqui a câmera fica ligada: qualquer dia, qualquer hora, a face está a um clique.',
      footer: 'Em todos os pontos digitais da rede',
    },
    oQueE: {
      lead: 'Câmera ao vivo é transmissão contínua do ponto durante todo o período contratado. Serve de prova de veiculação, de conferência de arte e de leitura do entorno.',
      cards: [
        {
          title: 'Veiculação comprovada',
          text: 'A face aparece na tela com a sua arte. Não é declaração de fornecedor, é imagem do ponto, agora.',
        },
        {
          title: 'Correção no mesmo dia',
          text: 'Arte errada, tela apagada ou obstrução aparecem na hora, não trinta dias depois.',
        },
        {
          title: 'Leitura do entorno',
          text: 'Dá para ver o fluxo, a luz do fim de tarde e como a peça se comporta no contexto real da via.',
        },
      ],
    },
    prova: {
      lead: 'A câmera não é um serviço adicional de alguns pontos premium: ela está em toda a rede digital, ligada o tempo inteiro.',
      stats: [
        { n: '24×7', label: 'Transmissão ao vivo' },
        { n: '82', label: 'Equipamentos digitais' },
        { n: '100%', label: 'Dos pontos digitais' },
        { n: '138', label: 'Telas em operação' },
      ],
    },
    aplicacao: {
      lead: 'Como a câmera muda a campanha, do primeiro dia ao relatório final.',
      steps: [
        {
          num: '01',
          title: 'Entrada no ar',
          items: [
            'Conferência da arte na tela no dia da estreia.',
            'Enquadramento e legibilidade no ponto real.',
            'Acesso à câmera liberado junto com o contrato.',
          ],
        },
        {
          num: '02',
          title: 'Durante o período',
          items: [
            'Acompanhamento a qualquer hora, de qualquer lugar.',
            'Registro de ocorrência no mesmo dia em que acontece.',
            'Captura de imagem para uso interno da marca.',
          ],
        },
        {
          num: '03',
          title: 'Prestação de contas',
          items: [
            'Relatório fotográfico somado ao acesso ao vivo.',
            'Comprovação para cliente final ou matriz.',
            'Histórico do período para o próximo planejamento.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem câmera ao vivo',
          blocos: ['Foto do 1º dia', 'E depois?'],
          text: 'Duas fotos e a palavra do fornecedor cobrindo trinta dias de veiculação. O que aconteceu no meio ninguém viu.',
        },
        com: {
          label: 'câmera ao vivo 24×7',
          blocos: ['Seu ponto, agora'],
          text: 'A face na tela em tempo real, todos os dias do período. Prova que não depende de promessa.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Rede varejista, Curitiba',
        title: 'Arte de promoção trocada no mesmo dia em que a data virou.',
        text: 'A rede acompanhou a virada da peça pela câmera e confirmou a nova arte no ar minutos depois da troca, sem depender de deslocamento de equipe até o ponto.',
        stats: [
          { n: '0', label: 'Visitas ao ponto' },
          { n: '24×7', label: 'Acesso à imagem' },
          { n: '1', label: 'Dia para validar' },
          { n: '100%', label: 'Do período coberto' },
        ],
      },
    },
  },
  {
    slug: 'mub-segmentado',
    title: 'MUB segmentado',
    text: 'Seis circuitos: Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper. O maior roteiro de MUB digitalizado em uma única cidade do Brasil.',
    // Fora do recorte do documento de copy: a segmentação do MUB passou a viver na página da plataforma.
    publicado: false,
    href: '/solucoes/diferenciais/mub-segmentado',
    resumo: 'Seis circuitos, do Full ao Super & Hiper.',
    heading: 'MUB segmentado.',
    intro:
      'Seis circuitos de mobiliário urbano, cada um montado em torno de um público. Você não compra a cidade inteira para falar com um bairro.',
    ctaLabel: 'Quero escolher meu circuito',
    aside: {
      text: 'Mobiliário urbano costuma ser vendido como pacote único: tantas faces espalhadas pela cidade. Aqui o roteiro é fatiado por contexto: saúde, educação, shoppings, alto padrão, super & hiper e o circuito Full.',
      footer: 'O maior roteiro de MUB digitalizado do país em uma só cidade',
    },
    oQueE: {
      lead: 'Segmentar o MUB é agrupar os pontos pelo lugar onde estão e pelo público que circula ali. O mesmo investimento fala com quem interessa em vez de se diluir pela cidade.',
      cards: [
        {
          title: 'Circuito por contexto',
          text: 'Hospitais, escolas, shoppings, bairros de alto padrão ou supermercados, a lista muda conforme o objetivo.',
        },
        {
          title: 'Verba concentrada',
          text: 'Frequência alta no público certo em vez de presença rala em toda a rede.',
        },
        {
          title: 'Combinação livre',
          text: 'Dois ou três circuitos no mesmo plano quando a campanha precisa de mais de um público.',
        },
      ],
    },
    prova: {
      lead: 'A segmentação só existe porque o roteiro tem escala: é o maior conjunto de MUB digitalizado em uma única cidade do Brasil.',
      stats: [
        { n: '77', label: 'Locais em operação' },
        { n: '6', label: 'Circuitos segmentados' },
        { n: '13M', label: 'Impactos por mês' },
        { n: '1º', label: 'Roteiro digitalizado do país' },
      ],
    },
    aplicacao: {
      lead: 'Como a segmentação muda a campanha, da escolha do circuito ao relatório.',
      steps: [
        {
          num: '01',
          title: 'Escolha do circuito',
          items: [
            'Objetivo da campanha traduzido em público.',
            'Circuito ou combinação que cobre esse público.',
            'Volume de impactos estimado por circuito.',
          ],
        },
        {
          num: '02',
          title: 'Montagem do plano',
          items: [
            'Lista de locais do circuito escolhido.',
            'Período e frequência de exibição por ponto.',
            'Arte adequada ao formato do mobiliário.',
          ],
        },
        {
          num: '03',
          title: 'Leitura do resultado',
          items: [
            'Impactos realizados no circuito contratado.',
            'Perfil do público que passou pelos pontos.',
            'Recomendação de circuito para o próximo ciclo.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem circuito segmentado',
          blocos: ['Rota única', 'Público genérico'],
          text: 'Uma lista só para toda a cidade. Metade da verba fala com quem nunca vai comprar de você.',
        },
        com: {
          label: 'MUB segmentado',
          blocos: ['6 circuitos, um público'],
          text: 'O roteiro montado em torno de quem você quer atingir, e a frequência onde ela importa.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Saúde, Curitiba',
        title: 'Clínica no circuito Saúde em vez do roteiro completo da cidade.',
        text: 'Em vez de espalhar a verba por toda a rede, a campanha ficou concentrada nos pontos do entorno hospitalar durante um mês, com frequência alta sobre o público que já circulava pela região.',
        stats: [
          { n: '1', label: 'Circuito escolhido' },
          { n: '30', label: 'Dias no ar' },
          { n: '6', label: 'Circuitos disponíveis' },
          { n: '6', label: 'Circuitos segmentados' },
        ],
      },
    },
  },
  {
    slug: 'rede-propria',
    title: 'Rede própria em PR e SC',
    text: 'Nove plataformas, dois estados, um fornecedor e um contrato.',
    // Fora do recorte do documento de copy: a cobertura passou a ser contada na seção de Cobertura.
    publicado: false,
    href: '/solucoes/diferenciais/rede-propria',
    resumo: 'Nove plataformas, dois estados, um contrato.',
    heading: 'Rede própria.',
    intro:
      'Nove plataformas cobrindo Paraná e Santa Catarina. Um fornecedor, um contrato e a mesma equipe respondendo pelos dois estados.',
    ctaLabel: 'Quero cobrir PR e SC',
    aside: {
      text: 'Campanha regional costuma virar quebra-cabeça: um fornecedor por praça, um contrato por formato e ninguém responsável pelo conjunto. Aqui a rede é nossa, de ponta a ponta.',
      footer: 'De Curitiba ao litoral de Santa Catarina',
    },
    oQueE: {
      lead: 'Rede própria é ter o inventário na mão: os pontos são nossos, a instalação é nossa e a disponibilidade é conferida na hora, sem intermediário entre o seu pedido e o ativo.',
      cards: [
        {
          title: 'Um contrato só',
          text: 'Capital, região metropolitana, litoral, rodovias e Santa Catarina no mesmo pedido e na mesma nota.',
        },
        {
          title: 'Nove plataformas combináveis',
          text: 'Do LED de alta circulação ao mobiliário de bairro, dentro do mesmo plano e do mesmo interlocutor.',
        },
        {
          title: 'Disponibilidade real',
          text: 'A resposta sobre praça livre vem do nosso inventário, não de uma consulta a terceiros.',
        },
      ],
    },
    prova: {
      lead: 'Escala é o que permite montar campanha regional sem fragmentar fornecedor: a rede cobre os dois estados do Sul onde a marca precisa aparecer.',
      stats: [
        { n: '9', label: 'Plataformas' },
        { n: '2', label: 'Estados cobertos' },
        { n: '+530M', label: 'Impactos por mês' },
        { n: '1', label: 'Contrato' },
      ],
    },
    aplicacao: {
      lead: 'Como a rede própria muda a campanha, do primeiro pedido à instalação.',
      steps: [
        {
          num: '01',
          title: 'Plano regional',
          items: [
            'Praças de PR e SC na mesma proposta.',
            'Mix de plataformas conforme o objetivo.',
            'Um cronograma para toda a campanha.',
          ],
        },
        {
          num: '02',
          title: 'Contratação',
          items: [
            'Um contrato e uma nota para tudo.',
            'Um interlocutor comercial do início ao fim.',
            'Alteração de praça sem renegociar com terceiros.',
          ],
        },
        {
          num: '03',
          title: 'Operação',
          items: [
            'Equipe própria instalando nos dois estados.',
            'Mesmo padrão de acabamento em toda a rede.',
            'Prestação de contas unificada no fim do período.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem rede própria',
          blocos: ['Fornecedor PR', 'Fornecedor SC'],
          text: 'Dois contratos, dois padrões de entrega e ninguém respondendo pelo resultado da campanha inteira.',
        },
        com: {
          label: 'rede própria',
          blocos: ['Um contrato, PR + SC'],
          text: 'Um fornecedor para os dois estados, com o mesmo padrão de operação e uma prestação de contas só.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Rede regional, PR e SC',
        title: 'Campanha de verão em capital, litoral e rodovia no mesmo pedido.',
        text: 'A rede acompanhou o deslocamento do público para o litoral sem trocar de fornecedor no meio do caminho: capital nas primeiras semanas, litoral e rodovias na alta temporada, tudo no mesmo contrato.',
        stats: [
          { n: '2', label: 'Estados' },
          { n: '3', label: 'Tipos de praça' },
          { n: '1', label: 'Contrato' },
          { n: '9', label: 'Plataformas disponíveis' },
        ],
      },
    },
  },
]

// A ordem, e o número exibido, saem da lista publicada, para não abrir buraco na
// numeração quando uma entrada sai do ar.
export const DIFERENCIAIS = TODOS_DIFERENCIAIS.filter((d) => d.publicado).map((d, i) => ({
  ...d,
  num: String(i + 1).padStart(2, '0'),
}))

export function getDiferencialBySlug(slug) {
  return DIFERENCIAIS.find((d) => d.slug === slug)
}

export function getOutrosDiferenciais(slug) {
  return DIFERENCIAIS.filter((d) => d.slug !== slug)
}
