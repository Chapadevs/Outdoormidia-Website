// Conteúdo da página de confirmação pós-formulário (/obrigado).
//
// A origem chega pela query (?origem=proposta). Quem não trouxer origem
// conhecida cai em `padrao` — acesso direto à URL não pode renderizar undefined.
//
// A copy de cada origem herda a tela de sucesso que ficava inline no próprio
// formulário antes desta página existir. Atenção ao texto de `talentos`: o
// TalentForm não envia nada (ver o comentário no topo dele), então a página não
// pode dizer que guardamos o perfil — o caminho real é o e-mail do RH.

export const ORIGENS = {
  proposta: {
    eyebrow: 'Recebido',
    titulo: ['Proposta', 'a caminho.'],
    texto:
      'Obrigado! Nosso time comercial analisa as praças e formatos disponíveis e volta com uma sugestão sob medida em até 1 dia útil.',
    passos: [
      {
        num: '01',
        title: 'O briefing já está com o comercial',
        text: 'Praça, formato, período e verba que você marcou estão na mesa de quem monta o plano de mídia.',
      },
      {
        num: '02',
        title: 'Retorno em até 1 dia útil',
        text: 'Voltamos com a disponibilidade real dos pontos, os formatos que cabem no seu objetivo e os valores.',
      },
      {
        num: '03',
        title: 'Dá para adiantar agora',
        text: 'O botão de WhatsApp acima abre a conversa já com o briefing que você acabou de enviar escrito na mensagem.',
      },
    ],
  },

  talentos: {
    eyebrow: 'Recebido',
    titulo: ['Candidatura', 'registrada.'],
    texto:
      'Obrigado pelo interesse. Para o seu perfil entrar de fato na nossa fila, envie o currículo por e-mail: é por lá que o RH organiza as candidaturas.',
    passos: [
      {
        num: '01',
        title: 'Envie o currículo por e-mail',
        text: 'O botão acima abre um e-mail para o RH já com o assunto certo. Anexe o PDF e conte em duas linhas o que você faz.',
      },
      {
        num: '02',
        title: 'O RH organiza por área',
        text: 'Comercial, criação, operações, tecnologia, administrativo: cada currículo fica na fila da sua área.',
      },
      {
        num: '03',
        title: 'Chamamos quando abrir vaga',
        text: 'Não mantemos processo aberto o ano inteiro. Quando a vaga aparece, o banco de talentos é o primeiro lugar onde olhamos.',
      },
    ],
  },

  padrao: {
    eyebrow: 'Recebido',
    titulo: ['Mensagem', 'recebida.'],
    texto:
      'Obrigado pelo contato. Nosso time comercial retorna em até 1 dia útil. Enquanto isso, dá para adiantar a conversa pelo WhatsApp.',
    passos: [
      {
        num: '01',
        title: 'Seu contato chegou',
        text: 'A solicitação já está com o time que atende a sua praça no Paraná ou em Santa Catarina.',
      },
      {
        num: '02',
        title: 'Retorno em até 1 dia útil',
        text: 'Voltamos com disponibilidade de pontos, formatos e valores para o que você precisa anunciar.',
      },
      {
        num: '03',
        title: 'Prefere resolver agora?',
        text: 'O botão de WhatsApp acima abre a conversa direto com o comercial, sem passar por fila.',
      },
    ],
  },
}

// Rotas oferecidas na terceira seção. São as páginas que respondem a dúvida de
// quem acabou de mandar um briefing e ficou esperando o retorno.
export const SUGESTOES = [
  {
    href: '/cases',
    meta: 'Cases',
    title: 'Campanhas que já estão na rua',
    text: 'Marcas reais em outdoor, LED, MUB e aeroporto no Paraná e em Santa Catarina.',
  },
  {
    href: '/plataformas',
    meta: 'Catálogo',
    title: 'As plataformas de mídia',
    text: 'Do outdoor digital ao mobiliário urbano: onde a sua marca pode aparecer e para quem.',
  },
  {
    href: '/anunciante/simulador',
    meta: 'Ferramenta',
    title: 'Simulador de campanha',
    text: 'Escolha praça, plataforma e período e veja a ordem de grandeza dos impactos.',
  },
  {
    href: '/blog/artigos',
    meta: 'Artigos',
    title: 'Como planejar Out of Home',
    text: 'Conteúdo sobre audiência, formatos e o que faz uma campanha de rua funcionar.',
  },
]
