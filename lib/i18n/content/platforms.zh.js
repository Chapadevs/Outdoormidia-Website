// Tradução de lib/platforms.js. Só os campos de texto: slug, vídeo, imagem,
// ativos, ícones, proporções e todos os números continuam vindo de lá.
//
// Nome de plataforma: os descritivos são traduzidos (Mídia Indoor, Aeroporto,
// Mídia Móvel, Rodovias), os que já são nome de produto ficam como estão
// (Outdoor Digital, Front Light, MUB, Digital Signage). Mesmo critério do menu.
//
// A ordem das entradas tem de bater com a de lib/platforms.js: o overlay é
// aplicado por posição.
export const PLATFORMS = [
  {
    // outdoors-digitais
    desc: '数字 · 175 块屏幕',
    short:
      '可实时更换内容的 LED 屏。无需印刷制作，决策到上刊之间没有等待。巴西南部最大的区域性 DOOH 网络，每周 2000 万次曝光。',
    eyebrow: '媒体平台 · 数字 · 175 块屏幕',
    heading: 'Outdoor Digital.',
    intro:
      '上午拿到 brief，下午广告就能上刊。数字线路省去了传统户外广告最慢的环节：从素材审定到正式投放之间的制作、印刷和安装。巴西南部最大的区域性 DOOH 网络。',
    quando: ['素材需要频繁更换的投放', '档期很短的促销活动', '按时段变换信息的持续曝光'],
    bignumbers: [
      { label: '数字屏幕' },
      { label: '每周曝光量' },
      { label: '巴西南部最大的区域性 DOOH 网络' },
    ],
    formats: [
      {
        label: '数字',
        title: 'LED 高清屏',
        text: '位于高人流地段的 LED 屏，素材可动态更换，无需印刷制作。',
      },
    ],
    faqs: [
      {
        q: '我需要制作印刷素材吗？',
        a: '不需要。数字大屏的素材直接在屏幕上更换，无需印刷，也无需安装。',
      },
      {
        q: '我可以多久更换一次广告内容？',
        a: '更换是动态的：您可以按时段、按星期或按投放阶段轮换素材，不产生重新印刷的费用。',
      },
      {
        q: '能统计谁看过广告吗？',
        a: '可以。4yousee/Everywhere 技术可测量所触达受众的 CPM、频次、性别、年龄段和收入，所有点位均配有 24×7 实时摄像头。',
      },
    ],
  },
  {
    // front-lights
    desc: '静态 · 18 平方米 · 带照明',
    short:
      '位于高人流道路上的经典广告牌，有横版和竖版。大幅面、持续曝光，以及只有每日重复才能建立的记忆度。',
    eyebrow: '媒体平台 · 静态 · 18 平方米 · 带照明',
    heading: 'Front Light.',
    intro:
      '这个格式奠定了户外广告，至今仍在提供别的格式给不了的东西：同一个品牌，在同一个位置，每天出现在同一批人面前。记忆靠重复建立，而重复正是我们 67 年来的看家本领。',
    quando: ['长期的品牌加固', '区域占位', '日常通勤动线上的曝光'],
    formats: [
      {
        label: '横版',
        title: '18 平方米横版 frontlight',
        text: '经典广告牌格式，带照明，位于高车流道路旁。',
      },
      {
        label: '竖版',
        title: '18 平方米竖版 frontlight',
        text: 'frontlight 的竖版形态，适合在高处更具可见度的位置。',
      },
    ],
    faqs: [
      {
        q: '横版和竖版有什么区别？',
        a: '两者都是 18 平方米，只是朝向不同，选择取决于可用点位以及您希望在道路上呈现的阅读效果。',
      },
      {
        q: '画面制作包含在内吗？',
        a: 'Front Light 属于印刷格式，因此素材制作与点位租用是一并进行的。',
      },
      {
        q: '投放期间可以更换点位吗？',
        a: '可以，点位之间可灵活轮换，让您的媒介预算在合同期内发挥最大效用。',
      },
    ],
  },
  {
    // shoppings
    name: '室内媒体',
    desc: '数字 · 3 家购物中心',
    short:
      '在本地区主要购物中心开展的全数字化运营。走廊立牌和停车场屏幕，在消费者购买的地点和时刻触达他们。',
    eyebrow: '媒体平台 · 数字 · 3 家购物中心',
    heading: '室内媒体。',
    intro:
      '在购物中心里，人们不是路过，而是在做决定。运营全部数字化，覆盖三个消费画像各异的商场，从家庭型到商务型。您可以选择与自己客群对话的场景。',
    imageAlt: 'Outdoormídia 位于购物中心走廊的数字立牌',
    quando: ['转化路径很短的零售投放', '在销售终端进行新品发布', '面向高频到访人群的品牌建设'],
    bignumbers: [
      { label: 'Shopping São José 每月客流' },
      { label: 'Shopping Itália 每月客流' },
      { label: 'Park Shopping Boulevard 每月客流' },
      { label: '三家购物中心每月客流' },
    ],
    blocosTitle: '三个场景',
    blocos: [
      {
        title: 'Shopping São José · São José dos Pinhais',
        text: '库里蒂巴大都会区最大的购物中心，距 Afonso Pena 国际机场 7 分钟车程。拥有 170 多家店铺、常态化活动和高客流的家庭客群，汇聚本地消费者、游客和差旅人士。',
        apoio: 'Mega Banner 与立牌 · Rua Dona Izabel A Redentora, 1434, Centro',
        imageAlt: 'Outdoormídia 位于 Shopping São José 走廊的数字立牌',
      },
      {
        title: 'Park Shopping Boulevard · 库里蒂巴南区',
        text: '库里蒂巴最南端最大的购物中心，位于连接 Sítio Cercado、Portão、Novo Mundo、Capão Raso、Pinheirinho、Vila Hauer、Alto Boqueirão 和 Xaxim 的轴线上。客群来自城市增长最快的区域之一，日常消费频次高、忠诚度强。',
        apoio: '山墙屏与立牌 · BR-116, 16303, Xaxim',
        imageAlt: 'Outdoormídia 位于 Park Shopping Boulevard 的数字屏',
      },
      {
        title: 'Shopping Itália · 库里蒂巴市中心',
        text: '库里蒂巴最成熟的商业体之一，自 1982 年运营至今。26 层楼汇集商业、服务和写字楼，人流持续不断：月均客流 7 万人次，以商务、专业和高复访人群为主。',
        apoio: '立牌 · Rua Marechal Deodoro, 630, Centro',
        imageAlt: 'Outdoormídia 位于 Shopping Itália 自动扶梯旁的数字立牌',
      },
    ],
    formats: [
      {
        dims: '立牌 2.2 米',
        top: '2.2 米',
        side: '1.2 米',
        label: '立牌',
        title: '数字立牌',
        text: '竖版数字屏，设置在商场内部人流量大的区域。',
      },
    ],
    faqs: [
      {
        q: '你们在哪些购物中心有点位？',
        a: 'São José、Park Shopping Boulevard 和 Itália，立牌与屏幕均为全数字化。',
      },
      {
        q: '广告离购买决策近吗？',
        a: '近。点位设置在商场内部人流量大的区域，贴近消费者做决定的那一刻。',
      },
      {
        q: '我需要制作印刷物料吗？',
        a: '不需要。整个室内媒体业务都是数字化的，素材直接在屏幕上更换。',
      },
    ],
  },
  {
    // aeroporto
    name: '机场',
    desc: '混合 · 577.5 平方米',
    short:
      'Distrito de Mídia Duo Square：位于 Afonso Pena 国际机场唯一出口道路上的 5 块 LED 屏和 10 面 frontlight。该组合中包含 Aeroporto Square，巴西南部最大的混合广告牌。',
    eyebrow: '媒体平台 · 混合 · 577.5 平方米',
    heading: '机场。',
    intro:
      '所有乘飞机抵达库里蒂巴的人都要经过唯一一条出口道路，而这里的大都会区人口接近 370 万。Distrito de Mídia Duo Square 就坐落于此，是巴西同类项目中的第一个，专为在旅客落地那一刻就建立高质量品牌存在感而设计。',
    quando: [
      '与流动中的决策者对话：高管、投资人和意见领袖',
      '为品牌塑造全国级体量的认知',
      '高价值的 B2B 或企业形象投放，无需按街区做人群细分',
    ],
    bignumbers: [
      { label: '可视面积' },
      { label: '每月曝光量' },
      { label: '年旅客量' },
      { label: '区域人口' },
    ],
    blocosTitle: '关于这个媒体区',
    blocos: [
      {
        title: '位置',
        text: '该媒体区位于 Av. Rocha Pombo，是 Afonso Pena 国际机场唯一的出口通道，行政上属于库里蒂巴大都会区的 São José dos Pinhais 市。',
        apoio: '日均约 2 万名旅客',
      },
      {
        title: '受众',
        text: '航空旅客的购买力更强。经过该媒体区的人群包括高管、游客、国际采购商、投资人、差旅专业人士和意见领袖，这类受众的规模是产品组合中其他任何平台都无法提供的。',
      },
    ],
    formats: [
      {
        label: '山墙屏',
        title: '6×18 米数字山墙屏',
        text: '巴西南部最大的数字山墙屏，在航站楼内可全方位看到。',
      },
    ],
    faqs: [
      {
        q: '在机场投放需要参加招标吗？',
        a: '不需要。该业务为私营运营，无需招标，因此签约流程明显更快。',
      },
      {
        q: '经过机场的人群是什么画像？',
        a: '高端人群，购买力强，处于持续流动状态，非常适合希望与高档场景产生关联的品牌。',
      },
      {
        q: '数字山墙屏可以更换素材吗？',
        a: '可以，它是一块 6×18 米的数字屏，为巴西南部最大，更换素材无需任何印刷制作。',
      },
    ],
  },
  {
    // midia-movel
    name: '移动媒体',
    desc: '静态 · 单车与巴士',
    short:
      'Bike Mídia 和 Bus Mídia 能抵达固定设施到不了的地方。步行街、公园和繁华市中心，沿着您要触达的人群真实行走的路线。',
    eyebrow: '媒体平台 · 静态 · 单车与巴士',
    heading: '移动媒体。',
    intro:
      '并非所有受众都在大道上。Bike Mídia 和 Bus Mídia 把广告带进步行街、公园和市中心，走进人们步行经过的路线。',
    quando: ['活动或特定节点的现场引爆', '覆盖禁止车辆通行的区域', '为更大规模投放做战术补充'],
    formats: [
      {
        dims: '4 × 1.3 米',
        top: '4 米',
        side: '1.3 米',
        label: '移动',
        title: '移动式载体',
        text: '可巡回移动的载体，适用于季节性人流集中地点的短期活动。',
      },
    ],
    faqs: [
      {
        q: '移动媒体通常在哪些地方投放？',
        a: '海滩、公园和步行街：这些地方季节性人流很大，而固定户外媒体无法覆盖。',
      },
      {
        q: '适合短期投放吗？',
        a: '适合。它非常适用于季节性活动、单次发布，以及需要在短时间内集中曝光的现场引爆。',
      },
      {
        q: '载体可以在不同地点之间移动吗？',
        a: '可以，它本身就是巡回式的：会按照为该次活动设定的路线移动。',
      },
    ],
  },
  {
    // mub
    desc: '数字 · 6 条线路',
    short:
      '融入城市肌理的数字报刊亭和时钟，按细分行业组成线路：医疗、教育、购物中心、高端。您买的是人群，不是点位。',
    eyebrow: '媒体平台 · 数字 · 6 条线路',
    heading: 'MUB.',
    intro:
      '数字报刊亭和时钟本身就是街道的一部分，不与街道争夺注意力。整个网络按受众画像组成线路，因此您购买的是想要触达的人群，而不是一个孤立的地址。',
    imageAlt: '与垂直绿化融为一体的 MUB Garden 数字报刊亭',
    quando: ['按细分行业定向的投放', '成本可控的社区级曝光', '需要出现在决策地点附近的品牌'],
    bignumbers: [{ label: '细分行业线路' }, { label: '数字格式' }],
    formats: [
      {
        label: '天桥',
        title: 'MUB 天桥',
        text: 'MUB 线路的标准格式，点位之间可灵活轮换。',
      },
    ],
    faqs: [
      {
        q: 'MUB 可以做人群定向吗？',
        a: '可以。共有 6 条细分线路：Full、医疗、教育、购物中心、高端和大型超市。',
      },
      {
        q: 'MUB 有多少点位和曝光量？',
        a: '共有 6 条细分线路，是巴西单一城市中规模最大的数字化 MUB 网络。各线路的具体点位数会根据区域和目标人群写入方案。',
      },
      {
        q: '我可以只选其中一条线路吗？',
        a: '可以，您能只签下与目标人群最契合的那条线路，无需投放整个网络。',
      },
    ],
  },
  {
    // rodovias
    name: '公路',
    desc: '按需定制 · BR 101 · 116 · 277 · 376 · 407 · 470',
    short:
      '您选区域，我们建广告牌。以您指定的位置为中心，在 3 公里半径内寻找点位，按投放需要的格式建设，覆盖巴西南部车流最大的干道。',
    eyebrow: '媒体平台 · 按需定制 · 巴拉那州与圣卡塔琳娜州',
    heading: '公路。',
    intro:
      '您选区域，我们建广告牌。公路网络连接巴拉那州与圣卡塔琳娜州之间的主要干线，从 Ponta Grossa 到 Florianópolis，途经沿海地区和 Joinville，触达每天在这些区域之间往返的人群。',
    quandoKicker: '把公路变成机会',
    quando: [
      {
        title: '战略性覆盖',
        text: '高车流公路上的广告牌连接库里蒂巴、Florianópolis 等关键区域，同时触达本地人群和旅游人群。',
      },
      {
        title: '高可见度',
        text: '户外广告投放的核心目标，是制造强烈的视觉冲击、巩固品牌存在感，并在与受众的每一个接触点上传递专属感。',
      },
      {
        title: '多样人群与日常车流',
        text: '每天触达数以千计的车辆，在一天之中覆盖不同人群，创造多次与受众互动的机会。',
      },
      {
        title: '曝光与连接',
        text: '简短而有记忆点的信息，能与移动中的受众建立持久的关联。',
      },
    ],
    bignumbers: [
      { label: '每月曝光量' },
      { label: '12 个月累计曝光' },
      { label: '24 个月累计曝光' },
      { label: '覆盖的 BR 干线' },
    ],
    passos: [
      {
        title: '选择区域。',
        text: '告诉我们投放大致需要落在哪里。我们会进行 **3 公里范围内的点位寻源**，从您指定的位置出发，找到并谈下最合适的可用点位。',
      },
      {
        title: '选择广告牌尺寸。',
        text: '结构按需定制，可选 16 x 4 米（64 平方米）或 20 x 5 米（100 平方米）。如需照明，视运营可行性而定。',
      },
      {
        title: '15 个月合同。',
        text: '最短投放期限，含第一张画面，与为您品牌专门建设一块广告牌的周期相匹配。',
      },
    ],
    passosFases: [
      {
        title: '第一阶段',
        text: '收集 brief／需求并进行点位勘选，30 天内完成。',
      },
      {
        title: '第二阶段',
        text: '自合同签署之日起 90 天内交付安装完成的广告牌。',
      },
    ],
    formats: [
      {
        label: '公路',
        title: '12×4 米公路广告牌',
        text: '大幅面尺寸，专为车辆高速行驶中的阅读而设计，设置在主要干道旁。',
      },
      {
        label: '天桥',
        title: '10×3 米天桥',
        text: '横跨路面的广告面，双向行驶的车辆都能正面看到。',
      },
    ],
    faqs: [
      {
        q: '你们在哪些公路上有点位？',
        a: '业务覆盖巴拉那州和圣卡塔琳娜州的 BR 101、116、277、376、407 和 470。广告牌按需建设，位于您指定位置 3 公里半径内；请在 brief 中告知区域。',
      },
      {
        q: '车辆高速行驶时看得清吗？',
        a: '看得清。公路格式之所以比城市广告牌更大，正是出于这个原因：广告牌为 12×4 米，天桥为 10×3 米，素材也按极少的字数来设计。',
      },
      {
        q: '公路业务是数字的还是印刷的？',
        a: '公路业务以印刷为主。如果投放需要动态更换素材，更合适的选择是 Outdoor Digital，或者两个平台组合使用。',
      },
    ],
  },
  {
    // digital-signage
    desc: '按需定制 · Gestão 360 OM',
    short:
      '专属于您门店的广告牌：数字外墙、加油站、通道屏。许可审批、安装、内容和维护，每天 24 小时、每周 7 天。',
    eyebrow: '媒体平台 · 专属广告牌',
    heading: 'Digital Signage.',
    intro:
      '一块只属于您品牌的广告牌，就设在您自己的地址。数字外墙、加油站、通道屏：Outdoormídia 负责设计、报批、安装和运维，内容则始终由您掌控。',
    imageAlt: 'Outdoormídia 数字外墙，嵌入商业楼宇侧面、朝向大道的 LED 屏',
    galeria: [
      { alt: 'Outdoormídia 安装在楼宇入口旁的竖版 LED 屏' },
      { alt: 'Outdoormídia 安装在商业楼宇外墙的竖版 LED 屏' },
    ],
    quando: ['把自家外墙变成媒体', '在销售终端实时发布促销信息', '自建网络并交由第三方运营的项目'],
    formats: [
      {
        dims: '外墙',
        top: 'LED',
        side: '按需定制',
        label: '外墙',
        title: '数字外墙',
        text: '嵌入自家门店外墙的屏幕，播放内容由品牌自行掌控。',
      },
      {
        dims: '加油站',
        top: 'LED',
        side: '按需定制',
        label: '加油站',
        title: '加油站',
        text: '设在加油区域的屏幕，顾客每次到访都会在此停留数分钟。',
      },
      {
        dims: '通道',
        top: 'LED',
        side: '按需定制',
        label: '通道',
        title: '通道屏',
        text: '设在通行或出入口位置的结构，尺寸依现场条件而定。',
      },
    ],
    faqs: [
      {
        q: '这块广告牌属于我还是属于 Outdoormídia？',
        a: '广告牌专属于您的门店，只播放您决定的内容。Outdoormídia 负责可行性评估、建设和运维。',
      },
      {
        q: '许可审批由谁负责？',
        a: '由我们负责。在专属广告牌项目中，Gestão 360 OM 包含许可审批的法务咨询，以及符合市政法令的尺寸规划。',
      },
      {
        q: '广告牌上线之后呢？',
        a: '安装、内容管理和 24/7 维护都包含在内。团队会监控播放状态，一旦出现异常立即处理。',
      },
    ],
  },
]

// A entrada dos Icônicos na listagem. O `intro` do arquivo em português é
// montado com os nomes das três linhas; aqui ele é literal, porque Elegancy,
// Green e Regenerativo são nomes de linha e não mudam de idioma.
export const ICONICOS_NA_LISTAGEM = {
  name: '标志性项目',
  desc: '专属 · 高冲击力',
  short:
    '坐落于城市最优质地段的独特结构。3D 数字转角、混合广告牌，以及与结构融为一体的活体绿化。让品牌成为风景本身。',
  intro: '坐落于城市最优质地段的独特结构：Elegancy、Green、Regenerativo。',
}

export const CTA_PADRAO = '查看平台'
