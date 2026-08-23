// Ramo ESG do hub Sobre nós — Ambiental, Social e Governança.
//
// TODO(cliente): nenhum número, prazo, certificação, projeto ou documento foi
// confirmado. Item sem `n`/`url`/`file` aparece como "Em breve", e faixa de
// indicadores sem os 4 números não é renderizada — preencher aqui publica,
// sem tocar no JSX.
//
// A régua é a do briefing: compromisso ambiental sem número e sem prazo não
// entra. Uma página de ESG vazia vale menos que nenhuma página, porque é lida
// por quem está avaliando a empresa em licitação.

export const AMBIENTAL_COMPROMISSOS = [
  {
    slug: 'residuos-de-lona',
    title: 'Destinação da lona e do vinil',
    meta: 'Meta · prazo a definir',
    text: 'Percentual da lona e do vinil retirados das faces que segue para reciclagem ou reaproveitamento, em vez de aterro.',
    n: '',
  },
  {
    slug: 'iluminacao-led',
    title: 'Conversão para iluminação LED',
    meta: 'Meta · prazo a definir',
    text: 'Faces impressas com iluminação convertida para LED, reduzindo o consumo por ponto sem perder legibilidade à noite.',
    n: '',
  },
  {
    slug: 'origem-da-energia',
    title: 'Origem da energia dos painéis',
    meta: 'Meta · prazo a definir',
    text: 'Parcela da energia que alimenta os equipamentos digitais vinda de fonte renovável certificada.',
    n: '',
  },
  {
    slug: 'mobiliario-urbano',
    title: 'Contrapartida em mobiliário urbano',
    meta: 'Meta · prazo a definir',
    text: 'Itens de mobiliário urbano instalados e mantidos como contrapartida da operação nas praças onde atuamos.',
    n: '',
  },
]

// Ponte para os projetos icônicos de menor impacto que já existem no site.
export const AMBIENTAL_PRODUTOS = [
  {
    href: '/plataformas/projetos-iconicos/green',
    eyebrow: 'Projeto icônico · Sustentabilidade',
    title: 'Green',
    text: 'Jardins verticais e estruturas vegetadas, com irrigação, poda e reposição por nossa conta.',
    cta: 'Ver o projeto Green',
  },
  {
    href: '/plataformas/projetos-iconicos/regenerativo',
    eyebrow: 'Projeto icônico · Cidade',
    title: 'Regenerativo',
    text: 'Praças, canteiros e pontos de convívio requalificados como contrapartida da veiculação.',
    cta: 'Ver o projeto Regenerativo',
  },
]

export const AMBIENTAL_AUTORIDADE = [
  {
    slug: 'certificacao-ambiental',
    tipo: 'Certificação',
    title: 'Certificação ambiental',
    text: 'Certificação de gestão ambiental ou de destinação de resíduos emitida por organismo acreditado.',
    url: '',
  },
  {
    slug: 'associacao-setorial',
    tipo: 'Associação',
    title: 'Associação setorial',
    text: 'Filiação a entidade do setor de mídia exterior com código de conduta ambiental publicado.',
    url: '',
  },
  {
    slug: 'parceria-de-destinacao',
    tipo: 'Parceria',
    title: 'Parceria de destinação',
    text: 'Cooperativa ou empresa responsável pelo destino da lona retirada, com comprovante de destinação.',
    url: '',
  },
]

export const AMBIENTAL_INDICADORES = [
  { n: '', label: 'Lona destinada por ano' },
  { n: '', label: 'Faces com LED' },
  { n: '', label: 'Energia renovável' },
  { n: '', label: 'Itens de mobiliário' },
]

export const SOCIAL_PROJETOS = [
  {
    slug: 'campanhas-de-utilidade-publica',
    title: 'Campanhas de utilidade pública',
    meta: 'Espaço cedido',
    text: 'Faces cedidas a campanhas de saúde, segurança no trânsito e prevenção veiculadas nas praças onde operamos.',
  },
  {
    slug: 'instituicoes-apoiadas',
    title: 'Instituições apoiadas',
    meta: 'Parceria contínua',
    text: 'Organizações da região metropolitana que usam nossa mídia para captar doações e voluntários.',
  },
  {
    slug: 'cultura-e-esporte',
    title: 'Cultura e esporte',
    meta: 'Patrocínio local',
    text: 'Apoio a eventos culturais e esportivos que acontecem na rua, o mesmo lugar onde a nossa mídia vive.',
  },
  {
    slug: 'campanhas-de-emergencia',
    title: 'Resposta a emergências',
    meta: 'Ativação rápida',
    text: 'Em enchente, campanha de doação ou alerta público, a rede digital muda a mensagem no mesmo dia.',
  },
]

export const SOCIAL_IMPACTO = [
  { n: '', label: 'Faces cedidas por ano' },
  { n: '', label: 'Instituições apoiadas' },
  { n: '', label: 'Cidades alcançadas' },
  { n: '', label: 'Valor de mídia doado' },
]

export const GOV_PILARES = [
  {
    slug: 'operacao-propria',
    title: 'Operação própria, responsabilidade própria',
    text: 'Da negociação do ponto à instalação, a operação é nossa. Não há intermediário para quem cobrar quando algo sai do combinado.',
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
  {
    slug: 'canal-de-denuncia',
    title: 'Canal de denúncia',
    text: 'Caminho para relatar conduta irregular envolvendo a empresa, com tratamento formal de cada relato.',
  },
]

export const GOV_CERTIFICACOES = [
  {
    slug: 'auditoria-de-audiencia',
    title: 'Auditoria de audiência',
    meta: 'Mensuração',
    text: 'Verificação independente dos números de impacto e frequência entregues pela tecnologia de mensuração.',
    url: '',
  },
  {
    slug: 'associacao-setorial',
    title: 'Associação setorial',
    meta: 'Filiação',
    text: 'Filiação a entidade do setor, com adesão ao código de conduta da mídia exterior.',
    url: '',
  },
  {
    slug: 'regularidade-fiscal',
    title: 'Regularidade fiscal e trabalhista',
    meta: 'Certidões',
    text: 'Certidões negativas exigidas em processos de compra e em licitação pública.',
    url: '',
  },
]

// TODO(cliente): colocar os PDFs em /public/governanca/ e preencher `file`.
export const GOV_DOCUMENTOS = [
  {
    slug: 'codigo-de-conduta',
    title: 'Código de conduta',
    meta: 'PDF · política',
    text: 'Regras de conduta que valem para o time, para fornecedores e para a relação com clientes.',
    file: '',
  },
  {
    slug: 'politica-de-privacidade',
    title: 'Política de privacidade',
    meta: 'Página · LGPD',
    text: 'Como tratamos dados de contato de clientes e dados agregados de audiência da rede digital.',
    // Único documento que já existe: virou página em vez de PDF. `href` é rota
    // interna; `file` continua sendo download.
    href: '/privacidade',
    file: '',
  },
  {
    slug: 'dados-cadastrais',
    title: 'Dados cadastrais e certidões',
    meta: 'PDF · cadastro',
    text: 'Razão social, CNPJ, endereço e certidões, o pacote pedido para cadastro de fornecedor.',
    file: '',
  },
  {
    slug: 'contrato-padrao',
    title: 'Minuta de contrato',
    meta: 'PDF · jurídico',
    text: 'Modelo do contrato de veiculação, para o jurídico avaliar antes da proposta.',
    file: '',
  },
]
