// Tradução de lib/produtos.js. Nome de produto é nome oficial e não se
// traduz em idioma nenhum; `slug`, `plataformas`, `tecnologias`, `image`,
// `imagemPor.<tecnologia>.src` e os endereços continuam vindo do arquivo em
// português. Só o `.alt` de cada `imagemPor` traduz.

export const PRODUTOS = [
  {
    kicker: '竖版',
    text: '在车流最密集的通勤走廊中形成竖向存在感，同时占据驾车者与步行者的视野。静态版本配有照明，日落之后战役依然在线。数字版本采用与短视频相同的画幅：同一套素材在社交媒体与户外平台上都成立，无需调整比例。',
    specsPor: { digital: '768×1024 px · MP4 · 10 秒' },
    imagemPor: {
      estatico: { alt: 'Outdoormídia 位于库里蒂巴路边的静态 Top Sight 广告牌' },
      digital: { alt: 'Outdoormídia 展示LED广告内容的数字 Top Sight 广告牌' },
    },
  },
  {
    kicker: '横版',
    text: '户外大牌本该有的样子：大尺幅、横向、让人无法不读，坐落在构成城市日常动线的主干道上。数字版本采用经典视频画幅，内容可实时更换，且没有实体制作成本。',
    specsPor: { digital: '1024×512 px · MP4 · 10 秒' },
    imagemPor: {
      digital: { alt: 'Outdoormídia 位于道路上方的数字 Poster Sight LED 广告牌' },
    },
  },
  {
    kicker: '大尺幅',
    text: '超宽比例的大尺幅形式，两种技术均可选择。在车流密集的点位上，为艺术指导留出充足的发挥空间。',
    specsPor: { digital: '1536×512 px · MP4 · 10 秒' },
    imagemPor: {
      digital: { alt: 'Outdoormídia 夜间照明的大型 Billboard 广告结构' },
    },
  },
  {
    name: '楼顶广告牌',
    kicker: '圣卡塔琳娜州独有',
    selo: 'SC 独有',
    text: '产品线中位置最高的形式，矗立于圣卡塔琳娜州两座最重要城市的高处。在坎布里乌海滨市，数字大屏位于 Av. Brasil 的黄金地段；在若因维利，一块可实时更新内容的数字屏搭配一块持续曝光的静态画面。为追求在城市天际线中占据主角地位的品牌提供高端曝光，而这样的位置只有 Outdoormídia 能够抵达。',
    pontos: [
      { name: '坎布里乌海滨市' },
      { name: '若因维利 · 数字' },
      { name: '若因维利 · 静态' },
    ],
    imagemPor: {
      estatico: { alt: 'Outdoormídia 位于建筑顶部的静态屋顶广告牌' },
      digital: { alt: 'Outdoormídia 位于建筑顶部的数字屋顶广告牌' },
    },
  },
  {
    kicker: '两倍尺寸',
    text: 'Poster Sight 的全部优势，尺寸翻倍。适合需要主宰整个街区、而不只是参与其中的战役。',
  },
  {
    name: '超级序列广告牌',
    kicker: '连续序列',
    text: '同一条道路上连续排布的竖版画面。品牌出现、再次出现、最终确认：在同一段行程中完成重复曝光，仅一次经过就成倍提升记忆度。',
  },
  {
    kicker: '两倍尺寸',
    text: '产品线中最大的静态形式。当创意简报需要景观级的尺度时，Super Billboard 就是答案：两倍于 Billboard，献给希望远观可见、近看难忘的品牌。',
  },
  {
    name: '数字立牌',
    kicker: '通道',
    text: '在视线高度，置身人流之中。Totem 伴随顾客走过商场通道，让品牌出现在距离货架仅几米之处。这是购买决策前的最后一个触点。',
    specs: '1080×1920 px · MP4 · 10 秒 · 三家商场均可投放',
    imageAlt: 'Outdoormídia 在 Park Shopping Boulevard 的数字立牌',
  },
  {
    name: '巨型横幅',
    kicker: '悬挂式',
    text: '悬挂于中庭通道上方，Mega Banner 可远距离、全角度被看见。竖版大尺幅、存在感强，适合高人流环境中的新品发布与品牌宣传。',
    specs: '640×1024 px · MP4 · 10 秒 · Shopping São José',
    imageAlt: 'Outdoormídia 悬挂于商场通道上方的 Mega Banner',
  },
  {
    name: '建筑山墙',
    kicker: '室内大尺幅',
    text: '室内环境中面积最大的视觉载体。Empena 把商场墙面变成媒体，其尺度是其他任何室内形式都无法企及的。',
    specs: 'Park Shopping Boulevard',
    imageAlt: 'Outdoormídia 位于商场墙面的 Empena 数字画面',
  },
  {
    name: '横向报刊亭',
    kicker: '人行道高度',
    text: '与步行者视线齐平的数字媒体。Banca Horizontal 占据人流密集的街角与过街路口，让等红灯的人可以轻松阅读。',
    specs: '1024×512 px · MP4 · 10 秒',
  },
  {
    name: '纵向报刊亭',
    kicker: '人行道高度',
    text: '书报亭形式的竖版版本，采用手机画幅。非常适合把社交媒体素材直接沿用到线下点位，用行人熟悉的语言与他们对话。',
    specs: '768×1024 px · MP4 · 10 秒',
  },
  {
    name: '数字钟',
    kicker: '实用功能',
    text: '唯一一种人们会主动用眼睛去寻找的形式。时间与温度吸引目光，您的战役承接这份注意力。曝光分散在城市各处的停留点与过街点。',
    specs: '768×1024 px · MP4 · 10 秒',
  },
  {
    name: '单车媒体',
    kicker: '三车序列',
    text: '三辆自行车依次通过，传递同一条移动中的信息。车队穿行于步行街、公园与各类活动现场，抵达固定设施无法进入的地方。亲切、上镜，在行人尺度上让人无法忽视。',
  },
  {
    name: '巴士媒体',
    kicker: '城市路线',
    text: '让品牌进入数千人的日常通勤。Bus Mídia 穿行城市主干道，在不同时段与不同街区反复曝光，以单个点位的成本获得整条线路的覆盖。',
  },
  {
    name: '专属广告牌',
    kicker: '定制 · OM 360 全流程管理',
    text: '从牌照合规的法务咨询到全天候的运维，OM 360 全流程管理负责您的门面与一块正常运转的屏幕之间的一切。您提供点位与品牌，其余交给我们的运营团队。',
  },
]
