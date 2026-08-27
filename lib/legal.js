// Textos legais do site — Política de Privacidade (/privacidade) e Termos de Uso
// (/termos). Os dois são renderizados pelo mesmo componente,
// components/ui/LegalDoc.jsx: cada seção vira um bloco numerado com âncora e
// entra automaticamente no sumário.
//
// MINUTA: redigida a partir do que este site de fato coleta, alinhada à Lei
// 13.709/2018 (LGPD). Não substitui revisão do jurídico do cliente.
//
// Quem é o controlador sai de lib/empresa.js — razão social, CNPJ e endereço
// estão sob TODO(cliente) lá e cada linha vazia é omitida pelo LegalDoc.
//
// Ao mexer em prazo de guarda, base legal ou cookies aqui, conferir se o texto
// do CookieNotice e o pilar `dados-e-privacidade` de lib/esg.js continuam
// dizendo a mesma coisa.

export const ATUALIZADO_EM = '2026-08-20'

export const PRIVACIDADE = [
  {
    id: 'controlador',
    titulo: 'Quem trata os seus dados',
    paragrafos: [
      'Esta Política explica como a Outdoormídia coleta, usa, compartilha e protege os dados pessoais de quem visita este site ou fala com a gente por meio dele.',
      'A Outdoormídia é a controladora desses dados, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018). A identificação completa da empresa e o canal para exercer os seus direitos estão no fim desta página.',
    ],
  },
  {
    id: 'dados',
    titulo: 'Quais dados coletamos',
    paragrafos: [
      'Coletamos apenas o necessário para responder você e para o site funcionar. Não montamos perfil publicitário de visitante.',
    ],
    lista: [
      'Dados que você informa nos formulários: nome, e-mail, telefone, empresa, praça de interesse, formato, período e verba da campanha, além do que você escrever nos campos livres. Em Trabalhe Conosco, também a área de atuação e a cidade.',
      'Dados de contato por WhatsApp: ao clicar em um botão de WhatsApp, você é levado ao aplicativo com uma mensagem já escrita. A partir daí a conversa acontece na plataforma da Meta, sob as regras dela.',
      'Dados técnicos de navegação: registros de acesso gerados automaticamente pelo servidor (endereço IP, data e hora, página acessada e navegador), mantidos por exigência do Marco Civil da Internet.',
      'Cookies e armazenamento local necessários: usados só para o site funcionar, como lembrar que você já fechou o aviso de cookies.',
    ],
  },
  {
    id: 'audiencia',
    titulo: 'Dados de audiência da nossa rede',
    paragrafos: [
      'Os números de audiência da rede digital (impactos, frequência e perfil de público por ponto) são medidos de forma agregada e anônima. Eles descrevem o fluxo de pessoas diante de um painel; não identificam ninguém.',
      'Esses dados não são cruzados com os dados de contato que você envia pelo site e não servem para reconhecer indivíduos.',
    ],
  },
  {
    id: 'finalidades',
    titulo: 'Para que usamos os seus dados',
    paragrafos: [
      'Cada dado tem um uso declarado. Não vendemos, não alugamos e não cedemos dados pessoais para terceiros usarem em marketing próprio.',
    ],
    lista: [
      'Responder à sua solicitação e montar a proposta comercial que você pediu.',
      'Entrar em contato pelos canais que você informou, sobre o assunto que você trouxe.',
      'Avaliar candidaturas e manter o banco de talentos.',
      'Manter o site no ar, seguro e funcionando.',
      'Cumprir obrigações legais e regulatórias.',
    ],
  },
  {
    id: 'bases-legais',
    titulo: 'Com que base legal tratamos',
    lista: [
      'Procedimentos preliminares de contrato (art. 7º, V): tratar o briefing que você enviou até chegar a uma proposta.',
      'Consentimento (art. 7º, I): quando você preenche um formulário por vontade própria para ser contatado, inclusive no banco de talentos.',
      'Cumprimento de obrigação legal (art. 7º, II): guarda dos registros de acesso.',
      'Legítimo interesse (art. 7º, IX): segurança do site e melhoria da navegação, sempre dentro da sua expectativa.',
    ],
  },
  {
    id: 'compartilhamento',
    titulo: 'Com quem compartilhamos',
    paragrafos: [
      'Internamente, o acesso é restrito a quem precisa do dado para trabalhar: o comercial, no caso de uma proposta; o RH, no caso de uma candidatura.',
    ],
    lista: [
      'Provedores de infraestrutura: o site e o banco de dados rodam em serviços de nuvem do Google (Firebase e Google Cloud), que atuam como operadores.',
      'WhatsApp: quando você escolhe esse canal, a conversa passa a ser tratada na plataforma da Meta, sob a política de privacidade dela.',
      'Autoridades públicas: apenas mediante requisição legal.',
    ],
  },
  {
    id: 'cookies',
    titulo: 'Cookies e armazenamento local',
    paragrafos: [
      'Este site usa apenas cookies e armazenamento local necessários para funcionar: por exemplo, para lembrar que você já leu o aviso de cookies e para guardar temporariamente, dentro do seu próprio navegador, o briefing recém-enviado, de modo a montar a mensagem de WhatsApp da tela de confirmação.',
      'Não há cookies de publicidade, de redes sociais nem de rastreamento entre sites. Você pode bloquear ou apagar cookies nas configurações do navegador; parte do site pode deixar de funcionar como esperado.',
    ],
  },
  {
    id: 'retencao',
    titulo: 'Por quanto tempo guardamos',
    lista: [
      'Dados de contato comercial: enquanto durar a negociação e por até 5 anos depois, prazo usual para questionamento sobre a relação comercial.',
      'Currículos e dados do banco de talentos: por até 2 anos, ou até você pedir a exclusão.',
      'Registros de acesso: 6 meses, conforme o Marco Civil da Internet.',
    ],
    fecho: [
      'Vencido o prazo, os dados são eliminados ou anonimizados, salvo quando a lei exigir guarda maior.',
    ],
  },
  {
    id: 'direitos',
    titulo: 'Os seus direitos como titular',
    paragrafos: [
      'A LGPD garante a você os direitos abaixo. Para exercer qualquer um deles, use o canal no fim desta página; respondemos em até 15 dias.',
    ],
    lista: [
      'Confirmar se tratamos dados seus e acessar esses dados.',
      'Corrigir dados incompletos, inexatos ou desatualizados.',
      'Pedir anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados fora da lei.',
      'Pedir a portabilidade dos dados para outro fornecedor.',
      'Pedir a eliminação dos dados tratados com base no seu consentimento.',
      'Saber com quem compartilhamos os seus dados.',
      'Revogar o consentimento a qualquer momento.',
      'Peticionar junto à Autoridade Nacional de Proteção de Dados (ANPD).',
    ],
  },
  {
    id: 'seguranca',
    titulo: 'Segurança',
    paragrafos: [
      'Adotamos medidas técnicas e administrativas para proteger os dados: acesso restrito por autenticação, tráfego criptografado por HTTPS e infraestrutura em provedor de nuvem com controles próprios de segurança.',
      'Nenhum sistema é infalível. Havendo incidente de segurança com risco relevante aos titulares, comunicamos os afetados e a ANPD, como manda a lei.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações desta Política',
    paragrafos: [
      'Podemos atualizar esta Política quando mudarmos a forma de tratar dados ou quando a legislação exigir. A data da última atualização fica sempre no topo da página, e mudanças relevantes são anunciadas aqui.',
    ],
  },
]

export const CONTATO_PRIVACIDADE = {
  titulo: 'Encarregado de dados',
  texto:
    'Para exercer qualquer um dos seus direitos, tirar dúvida sobre esta Política ou relatar um problema com os seus dados, fale com a gente pelos canais abaixo.',
}

export const TERMOS = [
  {
    id: 'aceitacao',
    titulo: 'Aceitação destes Termos',
    paragrafos: [
      'Ao navegar neste site, você concorda com estes Termos de Uso e com a nossa Política de Privacidade. Se não concordar com algum ponto, o caminho é não utilizar o site.',
    ],
  },
  {
    id: 'operacao',
    titulo: 'Quem opera este site',
    paragrafos: [
      'Este site é operado pela Outdoormídia, empresa de mídia Out of Home que atua no Paraná e em Santa Catarina desde 1959. A identificação completa está no fim desta página.',
    ],
  },
  {
    id: 'uso',
    titulo: 'Uso permitido',
    paragrafos: [
      'O site existe para consulta de informações comerciais sobre as nossas plataformas de mídia exterior e para contato com o time comercial. Ao usá-lo, você se compromete a não:',
    ],
    lista: [
      'tentar acessar áreas restritas, contas de terceiros ou o painel administrativo;',
      'extrair conteúdo em massa por robô, raspagem ou automação, salvo os rastreadores autorizados no nosso robots.txt;',
      'sobrecarregar, interromper ou testar a segurança do site sem autorização por escrito;',
      'enviar informação falsa, dado de terceiro sem autorização ou conteúdo ilícito nos formulários.',
    ],
  },
  {
    id: 'propriedade',
    titulo: 'Conteúdo e propriedade intelectual',
    paragrafos: [
      'A marca, o logotipo, os textos, as fotos dos pontos, os mapas de cobertura, os vídeos e a própria estrutura deste site pertencem à Outdoormídia ou a quem nos licenciou o uso.',
      'A reprodução, distribuição ou adaptação desse material exige autorização prévia por escrito. Citação com crédito e link para a página de origem é permitida.',
    ],
  },
  {
    id: 'materiais',
    titulo: 'Melhores Práticas e materiais para download',
    paragrafos: [
      'Os materiais oferecidos para download destinam-se à avaliação comercial de uma campanha. Não podem ser redistribuídos, alterados nem incorporados a material de terceiros sem a nossa autorização.',
      'Tabelas, especificações e listas de pontos valem para a data do download. Disponibilidade e valores mudam com a ocupação da rede.',
    ],
  },
  {
    id: 'estimativas',
    titulo: 'Sua marca no OOH, diagnóstico e números de audiência',
    paragrafos: [
      'Sua marca no OOH e o Diagnóstico de Presença são ferramentas de orientação. Os números que apresentam são estimativas de ordem de grandeza, calculadas a partir de médias da nossa rede, e não constituem proposta comercial, não vinculam preço e não garantem resultado. O diagnóstico reflete a autoavaliação de quem responde: ele não mede a presença real da marca.',
      'Disponibilidade de ponto, valores e projeção de audiência só são firmes na proposta emitida pelo time comercial.',
    ],
  },
  {
    id: 'formularios',
    titulo: 'Formulários e contato',
    paragrafos: [
      'Ao enviar um formulário, você declara que as informações são verdadeiras e que tem autorização para informar os dados da empresa que representa.',
      'O envio não obriga nenhuma das partes a contratar, não reserva ponto nem período e não gera direito a preço.',
    ],
  },
  {
    id: 'links',
    titulo: 'Links para terceiros',
    paragrafos: [
      'O site leva a serviços de terceiros, como WhatsApp e redes sociais. Não controlamos o conteúdo, a disponibilidade nem as políticas desses serviços, e o uso deles fica sujeito às regras de cada um.',
    ],
  },
  {
    id: 'disponibilidade',
    titulo: 'Disponibilidade e responsabilidade',
    paragrafos: [
      'Fazemos esforço razoável para manter o site no ar e correto, mas pode haver interrupção por manutenção, falha técnica ou indisponibilidade de terceiros.',
      'Não respondemos por danos indiretos decorrentes do uso ou da indisponibilidade do site, nem por decisão tomada exclusivamente com base nas estimativas das ferramentas.',
    ],
  },
  {
    id: 'privacidade',
    titulo: 'Privacidade',
    paragrafos: [
      'O tratamento de dados pessoais neste site é regido pela nossa Política de Privacidade, que é parte integrante destes Termos.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações destes Termos',
    paragrafos: [
      'Podemos alterar estes Termos a qualquer momento. A data da última atualização fica no topo da página, e o uso do site depois da mudança significa concordância com a nova versão.',
    ],
  },
  {
    id: 'foro',
    titulo: 'Lei aplicável e foro',
    paragrafos: [
      'Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Curitiba, Paraná, para dirimir qualquer questão deles decorrente, ressalvada a hipótese de foro obrigatório do consumidor.',
    ],
  },
]

export const CONTATO_TERMOS = {
  titulo: 'Fale com a gente',
  texto:
    'Dúvida sobre estes Termos, pedido de autorização para uso de conteúdo ou qualquer outro assunto jurídico:',
}
