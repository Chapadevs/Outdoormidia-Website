import {
  Activity,
  CalendarRange,
  DollarSign,
  Eye,
  Focus,
  Gauge,
  GitMerge,
  Mars,
  Receipt,
  Repeat2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Venus,
  Wallet,
} from 'lucide-react'

// Os diferenciais da Outdoormídia.
//
// Redação oficial do cliente (COPY_SITE). Cada item alimenta dois lugares: os
// campos de topo (`title`, `tagline`, `text`, `href`, `cardCta`) montam os
// cards da home e da listagem; o restante monta a página dedicada em
// /solucoes/diferenciais/[slug].
//
// Nem todo card tem página. Critério fechado em 02/09/2026: diferencial que é
// conceito ganha página; diferencial que é ativo ou produto vira âncora para a
// plataforma ou a seção que já o abriga. Quem marca a diferença é o próprio
// `href`: apontando para fora de /solucoes/diferenciais/, a entrada não gera
// rota, não entra no sitemap e não entra no llms.txt (ver
// DIFERENCIAIS_COM_PAGINA no fim do arquivo). `cardCta` troca o rótulo do link
// do card nesses casos, porque "Ver diferencial" mentiria sobre o destino.
//
// `publicado: false` mantém o conteúdo escrito e fora do ar: a entrada não
// aparece na home, na listagem, no sitemap nem no llms.txt, e a rota dela
// responde 404. É como ficam os diferenciais que saíram do recorte do documento
// e os dois que saíram do bloco em 02/09/2026, Gentileza Urbana e Operação e
// monitoramento.
//
// Toda seção da página dedicada é opcional: "A prova", "Aplicação prática", a
// comparação e o mini-case só entram quando o campo existe. Número inventado em
// página indexada vira alegação falsa.
//
// Face Única e Aeroporto Square estão sem essas seções por decisão de
// 27/08/2026, não por falta de dado: a primeira troca "Aplicação prática" pela
// comparação em foto, a segunda é versão curta de propósito. Mídia Regenerativa
// segue esperando os números.
//
// Inteligência e audiência vai além disso: o texto final de 02/09/2026 trocou o
// esqueleto inteiro por quatro seções próprias (`monitoramento`, `relatorio`,
// `leitura`, `privacidade`), sem "O que é", sem "A prova" e sem "Aplicação
// prática". Junto com elas entraram `subtitulo` (hero diferente do card da
// home), `semCta` (hero sem botão), `seo` (title e description próprios) e o
// `aside` opcional, que quando ausente deixa o hero em uma coluna.

// A mesma peça de vídeo em dois lugares: a seção de monitoramento da página
// dedicada e a capa do card de Inteligência e audiência na home, que é o único
// dos seis sem foto.
const VIDEO_MONITORAMENTO = '/media/diferenciais/monitoramento.mp4'
const VIDEO_GESTAO_360_OM = '/media/diferenciais/gestao-360-om.mp4'

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
    // Capa trocada em 13/09/2026 (decisão do Erik): a estrutura de três
    // painéis inteira ocupada pela campanha do Colégio Marista, o próprio
    // conceito da página em foto real.
    image: '/media/diferenciais/face-unica.webp',
    imageAlt:
      'Estrutura de três outdoors à beira de avenida em Curitiba inteiramente ocupada pela campanha de matrículas do Colégio Marista',
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
          Icone: Eye,
        },
        {
          title: 'Sem distrações',
          text: 'Atenção total do público, sem interferência de outras campanhas.',
          Icone: Focus,
        },
        {
          title: 'Experiência visual premium',
          text: 'Maior impacto, melhor leitura e lembrança mais duradoura.',
          Icone: Sparkles,
        },
      ],
    },
    // Comparação em foto, nomenclatura do PDF oficial. A nota de rodapé vale só
    // para o lado Amador, que é mockup: a foto do lado Especialista é real.
    // Fotos aplicadas em 08/09/2026 e trocadas em 14/09/2026. A troca ganhou
    // nome de arquivo novo de propósito: `/media/` sai com cache de sete dias, e
    // substituir o arquivo no mesmo caminho deixou o CDN entregando a foto
    // antiga. Os PNG originais ficam em public/media/images/diferenciais/, fora
    // do versionamento; o site serve os WebP.
    comparativo: {
      amador: {
        label: 'Amador',
        image: '/media/diferenciais/face-unica-amador-v2.webp',
        imageAlt: 'Três outdoors genéricos dividindo a mesma estrutura, cada um de uma marca diferente',
      },
      especialista: {
        label: 'Especialista',
        image: '/media/diferenciais/face-unica-especialista.webp',
        imageAlt: 'Estrutura inteira ocupada pela campanha Trolls 2 da Telecine, uma marca só do início ao fim',
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
    image: '/media/diferenciais/aeroporto-square.webp',
    imageAlt:
      'Aeroporto Square, painel híbrido curvo da Outdoormídia, com a campanha de um único anunciante ocupando toda a extensão da estrutura',
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
    // A página dedicada não segue o esqueleto dos outros diferenciais. O texto
    // final de 02/09/2026 (claude/copy-inteligencia-e-audiencia.md) fecha em
    // hero mais quatro seções próprias: monitoramento, o que entra no
    // relatório, a leitura na prática e privacidade. Não há "O que é", "A
    // prova" nem "Aplicação prática" aqui.
    //
    // Saíram nessa troca os 82 equipamentos e as 138 telas da antiga "A prova",
    // números fora de circulação, e o mini-case que o comercial nunca
    // confirmou.
    //
    // `oQueE` fica sem `lead` de propósito: os três nomes de métrica são o que
    // o card 03 da home lista abaixo do texto, e a home não muda nesta entrega
    // (decisão de 02/09). Sem `lead`, a seção "O que é" não sobe na página.
    slug: 'inteligencia-e-audiencia',
    publicado: true,
    title: 'Inteligência e audiência',
    tagline: 'Audiência mensurada',
    text: 'Wi-Fi tracking e eye tracking respondem por onde as pessoas circulam, quem viu e como reagiu.',
    href: '/solucoes/diferenciais/inteligencia-e-audiencia',
    resumo: 'CPM, frequência, gênero, faixa etária e renda por campanha.',
    heading: 'Inteligência e audiência.',
    // `intro` é a copy do card 03 da home e continua intocada. O hero da página
    // dedicada usa `subtitulo`, que é o único lugar onde a tese aparece escrita
    // depois que os dois botões saíram no fechamento: ele não pode encurtar.
    intro:
      'Wi-Fi tracking e eye tracking respondem o que a mídia exterior nunca respondeu: por onde as pessoas circulam, quem realmente viu e como reagiu. Você recebe relatório completo, métricas reais e monitoramento 24/7. Nada de estimativa, apenas dado apurado campanha por campanha.',
    subtitulo:
      'Toda campanha de mídia exterior termina com a mesma pergunta na reunião seguinte: quantas pessoas viram de verdade? A Outdoormídia responde com dado apurado ponto a ponto, não com estimativa de fluxo. Wi-Fi tracking, eye tracking e monitoramento em tempo real transformam presença urbana em relatório que se apresenta e se defende.',
    // Sem botão no hero e sem o card lateral: os dois CTAs saíram no
    // fechamento, e o aside repetiria a tese que o subtítulo carrega sozinho.
    semCta: true,
    seo: {
      title: 'Audiência mensurada em mídia exterior | Outdoormídia',
      description:
        'Wi-Fi tracking e eye tracking medem quem circula e quem viu sua campanha. Relatório com impactos, frequência, CPM, CPI e perfil de audiência.',
    },
    // TODO(Imagine): painel digital em operação, foto real, nunca render (16/9,
    // ≥1600px). Enquanto for null, o topo não renderiza capa nenhuma.
    image: null,
    imageAlt:
      'Painel digital da Outdoormídia em operação, com fluxo de veículos e pedestres no entorno',
    // Único dos seis cards sem foto: na home e na listagem ele abre com o
    // próprio vídeo de monitoramento, em vez de cair no painel bege.
    cardVideo: VIDEO_MONITORAMENTO,
    oQueE: {
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
    // A seção é o vídeo: os dois parágrafos dão contexto e saem da frente. Sem
    // o vídeo ela não sobe, porque o conteúdo já está dito no hero, e é por
    // isso que `video` governa a renderização inteira.
    //
    // O 24 horas por dia, sete dias por semana descreve a equipe e a operação
    // de monitoramento. A cobertura de câmera não é universal e há rodízio:
    // nunca acrescentar número de câmeras, número de pontos nem percentual de
    // cobertura aqui.
    monitoramento: {
      title: 'A campanha acompanhada enquanto está no ar',
      video: VIDEO_MONITORAMENTO,
      paragrafos: [
        'Wi-Fi tracking e eye tracking apuram por onde as pessoas circulam e quem efetivamente viu a peça. A exibição é acompanhada por câmera durante a veiculação, com equipe dedicada 24 horas por dia, sete dias por semana, que age assim que alguma coisa sai do lugar.',
        'O acompanhamento é diário. O relatório consolidado chega toda semana.',
      ],
      // TODO(cliente): 3 a 4 fotos de pontos monitorados. Não bloqueiam a
      // seção; a faixa some enquanto a lista estiver vazia.
      imagens: [],
      imagensAlt:
        'Ponto de mídia da Outdoormídia acompanhado por câmera durante a veiculação da campanha',
    },
    // Os oito itens saem da Apresentação 2025, bloco de análise de campanha,
    // com os nomes das métricas preservados como constam ali. "Métricas
    // precisas" é rótulo do bloco, não métrica, e por isso ficou de fora.
    relatorio: {
      title: 'O que entra no relatório',
      lead: 'O relatório não é resumo de veiculação. É a leitura completa do que a campanha entregou, ponto a ponto, no vocabulário que o planejamento de mídia já usa.',
      itens: [
        {
          Icone: Target,
          title: 'Total de impactos por ponto',
          text: 'Quanto cada face entregou, isolado. Permite comparar desempenho dentro da própria campanha.',
        },
        {
          Icone: Repeat2,
          title: 'Frequência média',
          text: 'Quantas vezes a mesma pessoa foi impactada no período. Alcance sem frequência não constrói memória.',
        },
        {
          Icone: Gauge,
          title: 'Taxa de eficiência',
          text: 'A relação entre o público exposto e o público efetivamente atingido em cada ponto.',
        },
        {
          Icone: DollarSign,
          title: 'CPM',
          text: 'Custo por mil impactos, na mesma métrica que o resto do plano de mídia usa.',
        },
        {
          Icone: Receipt,
          title: 'CPI',
          text: 'Custo por impacto, para comparação direta entre formatos e praças.',
        },
        {
          Icone: Users,
          title: 'Perfil de audiência',
          text: 'Gênero, faixa etária e faixa de renda do público alcançado em cada ponto.',
        },
        {
          Icone: GitMerge,
          title: 'Cross entre pontos',
          text: 'Quanto os pontos da campanha se sobrepõem e quanto ampliam alcance de verdade.',
        },
        {
          Icone: Activity,
          title: 'Dados em tempo real',
          text: 'Acompanhamento diário durante a veiculação, com relatório consolidado toda semana.',
        },
      ],
      // A mesma linha do FAQ, item "O que está incluso no valor da campanha".
      // As duas andam juntas: mudou uma, muda a outra.
      fechamento:
        'Você não paga separado por acompanhamento nem por relatório. A comprovação faz parte da campanha.',
      // TODO(cliente): print real de uma tela do relatório de audiência, com
      // dados de cliente borrados ou substituídos. É a imagem mais importante
      // da página: prova em dois segundos o que o texto leva seis parágrafos
      // para dizer. Não bloqueia, mas a seção perde muito sem ela.
      image: null,
      imageAlt:
        'Tela do relatório de audiência da Outdoormídia, com impactos, frequência e perfil de público por ponto',
    },
    // O período declarado vive na abertura e não sai dali em nenhuma revisão,
    // tradução ou ajuste de layout: é o que separa dado apurado de estimativa.
    //
    // TODO(cliente): quando a apuração recente chegar, trocam-se os seis
    // números e a data da abertura. O layout não muda.
    leitura: {
      title: 'A leitura na prática',
      lead: 'Uma apuração de audiência da rede, realizada entre outubro e dezembro de 2022, mostra o tipo de resposta que o relatório entrega:',
      dados: [
        { Icone: CalendarRange, n: '85,5%', label: 'do público entre 18 e 60 anos' },
        { Icone: Mars, n: '55,6%', label: 'masculino' },
        { Icone: Venus, n: '44,4%', label: 'feminino' },
        { Icone: Wallet, n: '35,5%', label: 'classe C+' },
        { Icone: TrendingUp, n: '29,9%', label: 'classes A/B' },
      ],
    },
    privacidade: {
      title: 'Dado de audiência, não dado pessoal',
      paragrafos: [
        'As métricas da rede digital são agregadas e anônimas. A medição descreve público, não pessoa: nenhum dado identificável é coletado, armazenado ou entregue ao anunciante.',
      ],
    },
  },
  {
    // Reescrito em 02/09/2026. O card absorveu o antigo card de Gentileza
    // Urbana: os dois contavam a mesma coisa, contrapartida urbana, e ficavam
    // lado a lado falando de cidade. O nome perdeu o "e Segurança", porque a
    // segurança virou um exemplo do argumento em vez de ser o argumento.
    //
    // Hero reescrito em 14/09/2026 sobre a definição do cliente: Mídia
    // Regenerativa é o projeto que gera efeito positivo para a cidade e, além
    // de revitalizar o espaço, entrega uma utilidade à população (Praças Pet,
    // Praça de Carregamento). É o que a separa de Green (jardim) e dos demais
    // Icônicos. A Muralha Digital e o botão de emergência seguem no card do
    // ativo, em Icônicos. Vale para os quatro idiomas.
    slug: 'midia-regenerativa',
    publicado: true,
    title: 'Mídia Regenerativa',
    tagline: 'Legado na cidade',
    text: 'Mídia que deixa a cidade melhor do que encontrou: revitaliza o espaço e entrega uma utilidade a quem vive ali.',
    href: '/solucoes/diferenciais/midia-regenerativa',
    resumo: 'Mídia exterior que devolve serviço à cidade, da segurança pública às praças pet.',
    heading: 'Mídia Regenerativa.',
    // Hero reescrito pelo cliente em 14/09/2026, em quatro parágrafos. O
    // `intro` segue sendo a descrição de busca e o texto do card do hub.
    subtitulo: [
      'Mais do que ocupar um espaço, a Mídia Regenerativa transforma.',
      'São projetos que revitalizam áreas da cidade e, ao mesmo tempo, criam novas possibilidades para a população. A mídia deixa de ser apenas um ponto de comunicação e passa a fazer parte da experiência urbana, gerando um impacto positivo e uma utilidade real para quem vive a cidade.',
      'É o conceito presente nas Praças Pet, que criam espaços de convivência e lazer para animais e seus tutores, e nas Praças de Carregamento, que oferecem infraestrutura e praticidade para a população.',
      'Porque regenerar a cidade é mais do que transformar espaços. É criar valor para as pessoas.',
    ],
    intro:
      'Mídia Regenerativa é o projeto que gera um efeito positivo para a cidade. Revitalizar o espaço é só o começo: a estrutura entrega uma utilidade para a população, como o lazer das Praças Pet e a energia da Praça de Carregamento Elétrico. A marca patrocina algo que o bairro usa todos os dias, mesmo quando ninguém está olhando para o anúncio, e que continua servindo depois que a campanha sai do ar. Presença urbana também é responsabilidade urbana.',
    ctaLabel: 'Quero um ponto com contrapartida urbana',
    image: '/media/diferenciais/midia-regenerativa.webp',
    imageAlt:
      'Totem de mídia da Outdoormídia com câmera de monitoramento no alto, instalado em esquina do Batel, em Curitiba',
    aside: {
      text: 'O critério é simples: um projeto é regenerativo quando, além de revitalizar o espaço, entrega uma utilidade a quem passa por ele. Uma praça para levar o cachorro, um ponto para carregar o carro. A cidade ganha antes mesmo de a campanha entrar no ar.',
      footer: 'Praças Pet e Praça de Carregamento Elétrico, Curitiba',
    },
    // Seção reescrita pelo cliente em 14/09/2026: o pioneirismo da Praça de
    // Conveniência Batel na Muralha Digital e o argumento de segurança urbana,
    // no lugar do texto de 10/09 sobre permanência e associação com o bairro.
    // Os `**negrito**` são os realces do documento do cliente, renderizados
    // por `comDestaque`.
    oQueGanha: {
      eyebrow: 'Pioneirismo · Segurança urbana',
      title: 'Mídia Regenerativa',
      lead: [
        '**Praça de Conveniência Batel**. O **primeiro ativo de mídia exterior conectado à Muralha Digital de Curitiba**, o sistema de monitoramento e inteligência urbana da cidade.',
        'A estrutura continua cumprindo sua função de conectar marcas e pessoas, mas passa a contribuir também para a **segurança pública** e a qualidade do espaço urbano. São monitoramento integrado à Muralha Digital e um **botão de emergência** instalado para apoio em situações de vulnerabilidade, em um dos espaços de convivência mais usados da cidade.',
        'Somos **pioneiros na integração entre mídia exterior e segurança urbana** em Curitiba. Em um mercado que discute ESG e cidades inteligentes, esta é a diferença entre **ocupar um espaço e qualificar um espaço**.',
        'Para o anunciante, é a chance de estar em uma estrutura que a cidade reconhece como útil. **Presença urbana também é responsabilidade urbana**, e a melhor comunicação é a que deixa legado.',
      ],
    },
    // A carteira lê `getAtivoBySlug`/AtivoCard pelo mesmo `id={slug}` que a
    // regra C8 já usa para espelhar ativo entre rotas: o card abre direto no
    // projeto certo em vez de só cair no topo da página de destino.
    carteira: {
      title: 'Os projetos no ar',
      lead: 'Cada projeto resolve uma coisa diferente para a cidade, e por isso associa a marca a uma coisa diferente. O que eles têm em comum é que continuam servindo depois que a veiculação termina.',
      projetos: [
        {
          title: 'Praças Pet',
          text: 'Lazer e convívio em bairros de alta circulação. A marca aparece onde a família escolhe passar a tarde.',
          href: '/plataformas/projetos-iconicos#regenerativo',
          label: 'Ver o projeto',
          image: '/media/iconicos/praca-pet-guilherme-pugsley.webp',
          imageAlt: 'Praça pet iluminada à noite, com letreiro, brinquedos e painéis do patrocinador',
        },
        {
          title: 'MUB Garden',
          text: 'O primeiro mobiliário urbano digital de Curitiba com jardim vivo. Tecnologia e natureza na mesma estrutura, e a marca no meio das duas.',
          href: '/plataformas/mub#mub-garden',
          label: 'Ver o projeto',
          image: '/media/iconicos/mub-garden.webp',
          imageAlt: 'Mobiliário urbano digital com jardim vivo no topo, na calçada de uma via residencial',
        },
        {
          title: 'Jardim Digital',
          text: 'Exibição exclusiva em um suporte que a cidade olha por ser bonito, não por ser anúncio.',
          href: '/plataformas/projetos-iconicos#jardim-digital',
          label: 'Ver o projeto',
          image: '/media/iconicos/jardim-digital.webp',
          imageAlt: 'Painel digital com letra caixa integrada a um jardim vertical natural, à beira da via',
        },
        {
          title: 'Praça de Carregamento Elétrico',
          text: 'A primeira do Sul do Brasil, movida a energia solar. Presença associada a um serviço que a pessoa usa enquanto espera.',
          href: '/sobre/ambiental#praca-de-carregamento-eletrico',
          label: 'Ver o projeto',
          // Sem foto ainda (é o item que segura /sobre/ambiental em noindex);
          // o vídeo do card ESG serve como capa aqui também.
          video: '/media/ambiental/praca-carregamento-eletrico.mp4',
        },
      ],
    },
    // TODO(cliente): faltam os números da seção "A prova" (quantos ativos
    // conectados, desde quando, acionamentos registrados) e um mini-case. As
    // seções ficam omitidas até o dado chegar.
  },
  {
    // Card novo de 02/09/2026, sem página dedicada por decisão do mesmo
    // documento: o circuito é produto comercial e pertence à plataforma que o
    // abriga, não a uma página de conceito. Por isso o `href` entrega o leitor
    // direto na página da plataforma MUB.
    //
    // Sem número neste card, de propósito. Os 77 locais, os 13 milhões de
    // impactos e as 339.570 inserções mensais são da mesma safra de 2024 que já
    // foi corrigida em bloco em 25/08/2026, e nenhum deles foi revalidado desde
    // então. O texto arquivado em `mub-segmentado`, no fim deste arquivo, ainda
    // os carrega, e é por isso que segue fora do ar.
    //
    // TODO(cliente): com a Alexandra, confirmar se os seis circuitos seguem com
    // esses nomes, quantos locais existem hoje e as inserções atualizadas.
    // Quando vierem, entra uma linha só no fim do card, no padrão dos outros:
    // "São X locais e Y milhões de impactos por mês."
    slug: 'circuito-mub',
    publicado: true,
    title: 'Circuito MUB por nicho',
    tagline: 'Público certo, não público grande',
    text: 'Seis circuitos semanais montados por perfil de público, no mobiliário urbano que ele já usa na rotina.',
    href: '/plataformas/mub',
    cardCta: 'Ver a plataforma',
    resumo: 'Seis circuitos de mobiliário urbano montados por perfil de público.',
    heading: 'Circuito MUB por nicho.',
    intro:
      'Seis circuitos semanais montados por perfil de público: Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper Mercado. Em vez de espalhar a campanha pela cidade inteira, ela roda no mobiliário urbano que o seu público já usa na rotina.',
    // Diferencial sem página dedicada: a capa serve o card da home e o da
    // listagem, e já fica pronta caso o card vire página.
    image: '/media/diferenciais/circuito-mub.webp',
    imageAlt:
      'Mobiliário urbano MUB com jardim no topo e campanha de anunciante na face iluminada, em rua de Curitiba',
  },
  {
    // Card novo de 02/09/2026, pedido do Halisson para destacar a consultoria.
    //
    // É teaser, não seção: a Gestão 360 OM já tem seção inteira, com os três
    // passos, e o `href` entrega o leitor nela. Não crescer este card. Se ele
    // ganhar os três passos ou virar bloco grande, a seção perde a razão de
    // existir. Três linhas e a âncora.
    //
    // O destino é `/sobre#processo`, não a home: o mesmo `Process` monta a
    // seção nas duas rotas, e o briefing da reta final manda este botão levar a
    // Sobre nós, onde ela abre sob "Por que a Outdoormídia".
    slug: 'gestao-360-om',
    publicado: true,
    title: 'Gestão 360 OM',
    tagline: 'Consultoria do início ao fim',
    text: 'Planejamento, produção e veiculação conduzidos por quem opera a estrutura.',
    href: '/sobre#processo',
    cardCta: 'Ver como funciona',
    resumo: 'Planejamento, produção e veiculação conduzidos por quem opera a estrutura.',
    heading: 'Gestão 360 OM.',
    intro:
      'Planejamento, produção e veiculação conduzidos por quem opera a estrutura. Em projetos de painel exclusivo, inclui consultoria legal de licenciamento, dimensionamento dentro da norma e instalação completa. Você aprova a campanha, não administra fornecedor.',
    // Diferencial sem página dedicada: a capa serve o card da home e o da
    // listagem. Vídeo institucional no lugar da foto, mesmo padrão do card de
    // Inteligência e audiência.
    cardVideo: VIDEO_GESTAO_360_OM,
  },
  {
    slug: 'gentileza-urbana',
    // Saiu do bloco de diferenciais em 02/09/2026: Gentileza Urbana e Mídia
    // Regenerativa eram a mesma caixinha, e os dois cards ficavam lado a lado
    // falando de cidade. Nada de conteúdo se perde: a carteira segue com copy
    // completa em /sobre/ambiental (lib/esg.js). O que saiu foi o card.
    publicado: false,
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
    // Saiu do bloco de diferenciais em 02/09/2026: era o único card que não
    // nomeava nada, promessa de manutenção que qualquer concorrente também faz.
    // O que ele dizia vive dentro de Inteligência e audiência e da própria
    // Gestão 360 OM.
    slug: 'operacao-propria',
    publicado: false,
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
    // Fora do recorte do documento de copy: a segmentação do MUB passou a viver
    // na página da plataforma. Quem ocupa o card hoje é `circuito-mub`, que
    // aponta para lá em vez de abrir página própria. Esta entrada segue
    // arquivada pelos números de 2024 que ela carrega, nunca revalidados.
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

// A ordem sai da lista publicada: `publicado: false` tira a entrada do ar sem
// apagar o texto.
export const DIFERENCIAIS = TODOS_DIFERENCIAIS.filter((d) => d.publicado)

// Só quem aponta para dentro de /solucoes/diferenciais/ tem página: os cards
// que viram âncora (a plataforma que abriga o produto, a seção da home que já
// conta a história) não geram rota, não entram no sitemap e não entram no
// llms.txt. Um `href` externo é a única marcação necessária.
const PREFIXO_PAGINA = '/solucoes/diferenciais/'

export const DIFERENCIAIS_COM_PAGINA = DIFERENCIAIS.filter((d) =>
  d.href.startsWith(PREFIXO_PAGINA)
)

export function getDiferencialBySlug(slug) {
  return DIFERENCIAIS_COM_PAGINA.find((d) => d.slug === slug)
}

export function getOutrosDiferenciais(slug) {
  return DIFERENCIAIS.filter((d) => d.slug !== slug)
}

// Versao de cada idioma. O overlay e aplicado sobre TODOS_DIFERENCIAIS, antes
// do filtro de publicado: as posicoes precisam bater com as 11 entradas daqui.
// Slug, href, imagem, video, icone e numero continuam vindo deste arquivo.
import { porLocale } from '@/lib/i18n/overlay'
import { TODOS_DIFERENCIAIS as en } from '@/lib/i18n/content/diferenciais.en'
import { TODOS_DIFERENCIAIS as es } from '@/lib/i18n/content/diferenciais.es'
import { TODOS_DIFERENCIAIS as zh } from '@/lib/i18n/content/diferenciais.zh'

const conteudo = porLocale(TODOS_DIFERENCIAIS, { en, es, zh })

function publicados(locale) {
  return conteudo(locale).filter((d) => d.publicado)
}

export function getDiferenciais(locale) {
  return publicados(locale)
}

export function getDiferenciaisComPagina(locale) {
  return publicados(locale).filter((d) => d.href.startsWith(PREFIXO_PAGINA))
}

export function getDiferencialBySlugLocale(slug, locale) {
  return getDiferenciaisComPagina(locale).find((d) => d.slug === slug)
}

export function getOutrosDiferenciaisLocale(slug, locale) {
  return publicados(locale).filter((d) => d.slug !== slug)
}

// Nível 3 do menu, na coluna Soluções: os seis publicados, no idioma ativo. O
// `href` é o do card, então os que são âncora (Circuito MUB, Gestão 360 OM)
// levam ao mesmo destino que o card da home, não a uma rota que não existe.
export function getDiferenciaisNav(locale) {
  return publicados(locale).map(({ href, title }) => ({ href, label: title }))
}
