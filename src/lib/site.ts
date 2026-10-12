// Dados fixos do site. Contatos, textos principais, imagens e blog são editáveis pelo painel (src/lib/content).
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduardocorreabonifacioadvogadoespecialista.com",
  city: "Uberaba/MG",
  region: "Uberaba e região do Triângulo Mineiro",
  description:
    "Dr. Eduardo Bonifácio, advogado em Uberaba/MG. Atuação em Direito Imobiliário e proteção patrimonial: contratos, regularização, execuções, penhoras, leilões e bloqueios. Atendimento presencial e on-line.",
  coordinates: { lat: -19.7509567, lng: -47.9581997 },
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const navigation: NavItem[] = [
  {
    href: "/direito-imobiliario",
    label: "Direito Imobiliário",
    children: [
      { href: "/direito-imobiliario/acao-de-despejo", label: "Ação de Despejo" },
      { href: "/direito-imobiliario/usucapiao", label: "Usucapião" },
      { href: "/direito-imobiliario/reintegracao-de-posse", label: "Reintegração de Posse" },
      { href: "/direito-imobiliario/leilao-e-execucao", label: "Leilão e Execução" },
      { href: "/direito-imobiliario/vicios-em-imoveis", label: "Vícios em Imóveis" },
      { href: "/direito-imobiliario/distrato-imobiliario", label: "Distrato Imobiliário" },
    ],
  },
  {
    href: "/protecao-patrimonial",
    label: "Proteção Patrimonial",
    children: [
      { href: "/protecao-patrimonial/defesa-patrimonial", label: "Defesa Patrimonial" },
      { href: "/protecao-patrimonial/holding-familiar", label: "Holding Familiar" },
      { href: "/urgencias", label: "Urgências Patrimoniais" },
    ],
  },
  {
    href: "/imovel-rural",
    label: "Imóvel Rural",
    children: [
      { href: "/imovel-rural/execucao-e-penhora", label: "Execução e Penhora Rural" },
      { href: "/imovel-rural/contratos-agrarios", label: "Contratos Agrários" },
      { href: "/imovel-rural/holding-rural", label: "Holding Rural" },
    ],
  },
  { href: "/escritorio", label: "Escritório" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export const practiceCards = [
  {
    href: "/direito-imobiliario",
    title: "Direito Imobiliário",
    text: "Contratos, regularização, posse, compra e venda, locação, condomínio e conflitos relacionados a imóveis.",
    action: "Conhecer Direito Imobiliário",
  },
  {
    href: "/protecao-patrimonial",
    title: "Proteção Patrimonial",
    text: "Diagnóstico de imóveis, contratos, garantias, patrimônio familiar, sucessão e riscos empresariais.",
    action: "Conhecer Proteção Patrimonial",
  },
  {
    href: "/urgencias",
    title: "Urgências Patrimoniais",
    text: "Intimações, execuções, penhoras, bloqueios, leilões e situações com prazo ou risco imediato.",
    action: "Ver atendimento urgente",
  },
] as const;

export const urgentTopics = [
  {
    title: "Defesa em execuções e ações de cobrança",
    text: "Análise técnica das medidas de defesa aplicáveis ao patrimônio ameaçado.",
  },
  {
    title: "Leilões imobiliários",
    text: "Análise de nulidades, prazos e medidas cabíveis em praça ou leilão.",
  },
  {
    title: "Ações de despejo",
    text: "Análise e resposta processual conforme as circunstâncias do caso.",
  },
  {
    title: "Embargos à execução",
    text: "Contestação de cobranças e defesa do patrimônio em processos de execução.",
  },
  {
    title: "Bloqueios de contas e bens (Sisbajud)",
    text: "Análise de impenhorabilidade, excesso e demais medidas juridicamente cabíveis.",
  },
] as const;

export const otherAreas = [
  {
    title: "Direito Civil patrimonial",
    text: "Questões urgentes envolvendo patrimônio: execuções, penhoras, bloqueios judiciais, responsabilidade civil e indenizações.",
  },
  {
    title: "Direito Imobiliário",
    text: "Compra e venda, locações, usucapião e regularização de imóveis.",
  },
  {
    title: "Defesa patrimonial",
    text: "Proteção de bens contra penhoras e constrições judiciais, execuções e medidas de urgência.",
  },
  {
    title: "Contratos",
    text: "Elaboração, revisão e análise de riscos contratuais.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Contato pelo WhatsApp",
    text: "Relato inicial do caso e envio de documentos para triagem no horário de atendimento.",
  },
  {
    number: "02",
    title: "Análise e estratégia",
    text: "Os documentos são avaliados, as opções são explicadas em linguagem clara e as alternativas cabíveis são apresentadas, com transparência sobre custos e prazos.",
  },
  {
    number: "03",
    title: "Medidas jurídicas cabíveis",
    text: "As providências adequadas são adotadas conforme os documentos, os prazos e a análise individual do caso.",
  },
] as const;

export const principles = [
  "Atendimento próximo e personalizado em Uberaba e região.",
  "Experiência técnica em Direito Civil e áreas correlatas.",
  "Transparência sobre prazos, custos e estratégias do caso.",
  "Comunicação constante sobre o andamento processual.",
] as const;

export const faqs = [
  {
    question: "Fui citado em uma execução ou ação de cobrança. O que faço primeiro?",
    answer:
      "A partir da citação, o tempo para se defender costuma ser curto. Reúna a citação, o contrato e os comprovantes que tiver e chame no WhatsApp. A análise inicial orienta os próximos passos conforme os documentos e o prazo do seu caso.",
  },
  {
    question: "Meu imóvel foi para leilão. Ainda dá para fazer alguma coisa?",
    answer:
      "Depende da fase do procedimento, da intimação e dos documentos. Em diversas situações existem medidas para discutir o leilão ou o débito, e quanto mais cedo o caso é analisado, mais alternativas podem estar disponíveis. Cada processo exige conferência individual dos prazos.",
  },
  {
    question: "Minha conta foi bloqueada de repente (Sisbajud). Como liberar?",
    answer:
      "O bloqueio judicial pode atingir valores que a lei trata como impenhoráveis, como salário. Identificada a origem do bloqueio, é possível pedir a liberação ao juízo competente. Leve o extrato e a intimação, se houver, para a análise.",
  },
  {
    question: "Atendem empresas e produtores rurais?",
    answer:
      "Sim. A atuação em proteção patrimonial alcança pessoas físicas e jurídicas: execuções contra empresas, penhora de faturamento, bloqueio de contas de pessoa jurídica e constrições sobre bens rurais e imóveis.",
  },
  {
    question: "Vocês atendem on-line ou só presencialmente?",
    answer:
      "Os dois. O atendimento presencial é em Uberaba/MG, na Avenida Maranhão, 1320, Santa Maria. O atendimento on-line cobre a região do Triângulo Mineiro, do primeiro contato à assinatura de documentos.",
  },
  {
    question: "Quanto custa uma consulta?",
    answer:
      "Os honorários variam conforme a complexidade do caso e são apresentados com transparência antes de qualquer contratação.",
  },
  {
    question: "Em quanto tempo meu caso se resolve?",
    answer:
      "Depende da medida e do andamento do Judiciário. Pedidos urgentes, como os relacionados a leilão, podem ser apreciados em poucos dias, enquanto ações completas levam mais tempo. A análise inicial traz uma estimativa realista para o seu caso.",
  },
] as const;
