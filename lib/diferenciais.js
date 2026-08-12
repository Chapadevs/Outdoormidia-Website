// Os 6 diferenciais da Outdoormídia.
//
// TODO(cliente): lista derivada do material interno (Face Única,
// 4yousee/Everywhere, câmeras 24×7, circuitos MUB) somada ao ângulo de
// território e tempo de mercado. Confirmar antes de publicar.
//
// Cada item alimenta dois lugares: os campos de topo (`num`, `title`, `text`,
// `href`) montam os cards da home e da listagem; o restante monta a página
// dedicada em /solucoes/diferenciais/[slug], que é a mesma estrutura para os
// seis — só o conteúdo muda.
//
// TODO(cliente): os números de `prova` e de `miniCase` são a ordem de grandeza
// que temos hoje. Os mini-cases são ilustrativos e precisam do aval do
// comercial antes de publicar — por isso cada página traz a nota de rodapé.
export const DIFERENCIAIS = [
  {
    slug: 'face-unica',
    num: '01',
    title: 'Face Única',
    text: 'Cada ponto é de um anunciante só. Sua marca não divide o espaço com a concorrência.',
    href: '/solucoes/diferenciais/face-unica',
    resumo: 'Cada ponto é de um anunciante só, do primeiro ao último dia.',
    heading: 'Face única.',
    intro:
      'Cada ponto é de um anunciante só. Sua marca não divide o espaço com a concorrência — nem com mais ninguém.',
    ctaLabel: 'Quero um ponto exclusivo',
    aside: {
      text: 'Em mídia exterior, o padrão do mercado é dividir a estrutura entre duas, três ou quatro marcas. Aqui não: uma face, um anunciante, do primeiro ao último dia do período.',
      footer: 'Aplica-se a todos os formatos impressos e digitais',
    },
    oQueE: {
      lead: 'Face única é um compromisso comercial: o espaço que você contrata não é compartilhado. Nenhum concorrente, nenhum vizinho de lona disputando o mesmo olhar.',
      cards: [
        {
          title: 'Exclusividade de estrutura',
          text: 'A face contratada exibe só a sua marca. Sem rodízio com outros anunciantes na mesma superfície.',
        },
        {
          title: 'Contexto sob controle',
          text: 'Sua mensagem não aparece ao lado de categorias que você não escolheu. O entorno da marca é seu.',
        },
        {
          title: 'Impacto sem divisão',
          text: 'Todo o tempo de exposição do ponto conta para você — não é uma fração dele.',
        },
      ],
    },
    prova: {
      lead: 'Nada disso depende de confiança: os pontos digitais têm câmeras ao vivo 24×7 e relatório fotográfico de veiculação. Você vê a face — só com a sua marca nela.',
      stats: [
        { n: '1', label: 'Marca por face' },
        { n: '138', label: 'Telas digitais' },
        { n: '24×7', label: 'Câmeras ao vivo' },
        { n: '380M', label: 'Impactos por mês' },
      ],
    },
    aplicacao: {
      lead: 'Como a exclusividade da face muda a campanha, do briefing ao relatório.',
      steps: [
        {
          num: '01',
          title: 'Escolha do ponto',
          items: [
            'Mapa da praça com faces livres no período.',
            'Fluxo, sentido da via e visada de cada face.',
            'Reserva da face inteira em nome da marca.',
          ],
        },
        {
          num: '02',
          title: 'Criativo sem concessão',
          items: [
            'Arte ocupa 100% da área útil da face.',
            'Cor de fundo livre — sem competir com o vizinho.',
            'Adequação da arte ao ponto antes da produção.',
          ],
        },
        {
          num: '03',
          title: 'Prova de veiculação',
          items: [
            'Relatório fotográfico da face instalada.',
            'Câmera ao vivo nos pontos digitais.',
            'Dados de audiência ao fim do período.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem face única',
          blocos: ['Sua marca', 'Concorrente'],
          text: 'Metade da superfície, atenção dividida e risco de aparecer ao lado de quem disputa o mesmo cliente.',
        },
        com: {
          label: 'face única',
          blocos: ['Sua marca'],
          text: 'A face inteira, o período inteiro. Uma mensagem só para quem passa — a sua.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Varejo, Curitiba',
        title: 'Inauguração de loja com quatro faces exclusivas no entorno.',
        text: 'Quatro pontos nas vias de acesso ao bairro, cada um com a face inteira da marca durante 30 dias. Sem concorrente na mesma estrutura, a leitura ficou a mesma em todos os sentidos da via.',
        stats: [
          { n: '4', label: 'Faces exclusivas' },
          { n: '30', label: 'Dias no ar' },
          { n: '0', label: 'Concorrentes na face' },
          { n: '100%', label: 'Da área útil' },
        ],
      },
    },
  },
  {
    slug: 'audiencia-mensurada',
    num: '02',
    title: 'Audiência mensurada',
    text: 'Tecnologia 4yousee/Everywhere: CPM, frequência, gênero, faixa etária e renda por campanha.',
    href: '/solucoes/diferenciais/audiencia-mensurada',
    resumo: 'CPM, frequência, gênero, faixa etária e renda por campanha.',
    heading: 'Audiência mensurada.',
    intro:
      'Quantas pessoas passaram, quantas vezes e quem eram. Mídia exterior com o mesmo nível de relatório que você cobra do digital.',
    ctaLabel: 'Quero os números da minha praça',
    aside: {
      text: 'A pergunta que derruba orçamento de OOH é sempre a mesma: como você prova que alguém viu? A tecnologia 4yousee/Everywhere responde com número, não com estimativa de mapa.',
      footer: 'Disponível em toda a malha digital',
    },
    oQueE: {
      lead: 'Audiência mensurada é medir o público real de cada ponto digital e devolver isso em relatório: CPM, frequência e perfil de quem passou durante a sua campanha.',
      cards: [
        {
          title: 'CPM comparável',
          text: 'Custo por mil impactos calculado sobre o fluxo medido — o mesmo indicador que você usa para comparar com mídia online.',
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
      lead: 'A medição não é um extra contratado à parte: ela roda em toda a malha digital, o tempo inteiro, e vira relatório ao fim de cada período.',
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
    slug: 'cameras-ao-vivo',
    num: '03',
    title: 'Câmeras ao vivo 24×7',
    text: 'Prova de veiculação em tempo real em todos os pontos digitais.',
    href: '/solucoes/diferenciais/cameras-ao-vivo',
    resumo: 'Prova de veiculação em tempo real nos pontos digitais.',
    heading: 'Câmeras ao vivo.',
    intro:
      'Prova de veiculação em tempo real. Você não espera o relatório do fim do mês para saber se a sua arte está na rua.',
    ctaLabel: 'Quero ver meu ponto ao vivo',
    aside: {
      text: 'O relatório fotográfico é o padrão do mercado — uma foto no primeiro dia e outra no último. Aqui a câmera fica ligada: qualquer dia, qualquer hora, a face está a um clique.',
      footer: 'Em todos os pontos digitais da malha',
    },
    oQueE: {
      lead: 'Câmera ao vivo é transmissão contínua do ponto durante todo o período contratado. Serve de prova de veiculação, de conferência de arte e de leitura do entorno.',
      cards: [
        {
          title: 'Veiculação comprovada',
          text: 'A face aparece na tela com a sua arte. Não é declaração de fornecedor — é imagem do ponto, agora.',
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
      lead: 'A câmera não é um serviço adicional de alguns pontos premium: ela está em toda a malha digital, ligada o tempo inteiro.',
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
    num: '04',
    title: 'MUB segmentado',
    text: 'Seis circuitos — Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper. O maior roteiro de MUB digitalizado em uma única cidade do Brasil.',
    href: '/solucoes/diferenciais/mub-segmentado',
    resumo: 'Seis circuitos — do Full ao Super & Hiper.',
    heading: 'MUB segmentado.',
    intro:
      'Seis circuitos de mobiliário urbano, cada um montado em torno de um público. Você não compra a cidade inteira para falar com um bairro.',
    ctaLabel: 'Quero escolher meu circuito',
    aside: {
      text: 'Mobiliário urbano costuma ser vendido como pacote único: tantas faces espalhadas pela cidade. Aqui o roteiro é fatiado por contexto — saúde, educação, shoppings, alto padrão, super & hiper e o circuito Full.',
      footer: 'O maior roteiro de MUB digitalizado do país em uma só cidade',
    },
    oQueE: {
      lead: 'Segmentar o MUB é agrupar os pontos pelo lugar onde estão e pelo público que circula ali. O mesmo investimento fala com quem interessa em vez de se diluir pela cidade.',
      cards: [
        {
          title: 'Circuito por contexto',
          text: 'Hospitais, escolas, shoppings, bairros de alto padrão ou supermercados — a lista muda conforme o objetivo.',
        },
        {
          title: 'Verba concentrada',
          text: 'Frequência alta no público certo em vez de presença rala em toda a malha.',
        },
        {
          title: 'Combinação livre',
          text: 'Dois ou três circuitos no mesmo plano quando a campanha precisa de mais de um público.',
        },
      ],
    },
    prova: {
      lead: 'A segmentação só existe porque o roteiro tem escala: são 77 locais em operação, o maior conjunto de MUB digitalizado em uma única cidade do Brasil.',
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
          text: 'O roteiro montado em torno de quem você quer atingir — e a frequência onde ela importa.',
        },
      },
      miniCase: {
        eyebrow: 'Mini-case · Saúde, Curitiba',
        title: 'Clínica no circuito Saúde em vez do roteiro completo da cidade.',
        text: 'Em vez de espalhar a verba por toda a malha, a campanha ficou concentrada nos pontos do entorno hospitalar durante um mês, com frequência alta sobre o público que já circulava pela região.',
        stats: [
          { n: '1', label: 'Circuito escolhido' },
          { n: '30', label: 'Dias no ar' },
          { n: '6', label: 'Circuitos disponíveis' },
          { n: '13M', label: 'Impactos/mês na malha' },
        ],
      },
    },
  },
  {
    slug: 'malha-propria',
    num: '05',
    title: 'Malha própria em PR e SC',
    text: 'Nove plataformas, dois estados, um fornecedor e um contrato.',
    href: '/solucoes/diferenciais/malha-propria',
    resumo: 'Nove plataformas, dois estados, um contrato.',
    heading: 'Malha própria.',
    intro:
      'Nove plataformas cobrindo Paraná e Santa Catarina. Um fornecedor, um contrato e a mesma equipe respondendo pelos dois estados.',
    ctaLabel: 'Quero cobrir PR e SC',
    aside: {
      text: 'Campanha regional costuma virar quebra-cabeça: um fornecedor por praça, um contrato por formato e ninguém responsável pelo conjunto. Aqui a malha é nossa, de ponta a ponta.',
      footer: 'De Curitiba ao litoral de Santa Catarina',
    },
    oQueE: {
      lead: 'Malha própria é ter o inventário na mão: os pontos são nossos, a instalação é nossa e a disponibilidade é conferida na hora — sem intermediário entre o seu pedido e o ativo.',
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
      lead: 'Escala é o que permite montar campanha regional sem fragmentar fornecedor: a malha cobre os dois estados do Sul onde a marca precisa aparecer.',
      stats: [
        { n: '9', label: 'Plataformas' },
        { n: '2', label: 'Estados cobertos' },
        { n: '380M', label: 'Impactos por mês' },
        { n: '1', label: 'Contrato' },
      ],
    },
    aplicacao: {
      lead: 'Como a malha própria muda a campanha, do primeiro pedido à instalação.',
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
            'Mesmo padrão de acabamento em toda a malha.',
            'Prestação de contas unificada no fim do período.',
          ],
        },
      ],
      comparativo: {
        sem: {
          label: 'Sem malha própria',
          blocos: ['Fornecedor PR', 'Fornecedor SC'],
          text: 'Dois contratos, dois padrões de entrega e ninguém respondendo pelo resultado da campanha inteira.',
        },
        com: {
          label: 'malha própria',
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
  {
    slug: 'operacao-propria',
    num: '06',
    title: 'Operação própria desde 1959',
    text: 'Da negociação à instalação, quem faz assina. Sem intermediários entre a decisão e a rua.',
    href: '/solucoes/diferenciais/operacao-propria',
    resumo: 'Da negociação à instalação, quem faz assina.',
    heading: 'Operação própria.',
    intro:
      'Desde 1959 na rua. Da negociação à instalação, quem faz assina — não há intermediário entre a sua decisão e a face no ponto.',
    ctaLabel: 'Quero falar com quem executa',
    aside: {
      text: 'Sessenta e seis anos no mesmo mercado não são um selo de nostalgia: são o motivo de a licença, a estrutura e a equipe de instalação estarem dentro de casa, e não terceirizadas a cada campanha.',
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
          text: 'O mesmo acabamento em qualquer praça da malha, porque é sempre a mesma operação executando.',
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
]

export function getDiferencialBySlug(slug) {
  return DIFERENCIAIS.find((d) => d.slug === slug)
}

export function getOutrosDiferenciais(slug) {
  return DIFERENCIAIS.filter((d) => d.slug !== slug)
}
