export type ServiceGroup = "direito-imobiliario" | "protecao-patrimonial" | "imovel-rural";

export type Service = {
  group: ServiceGroup;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  lede: string;
  situations: string[];
  points: string[];
  note: string;
  questions: { question: string; answer: string }[];
  whatsapp: string;
};

export const services: Service[] = [
  {
    group: "direito-imobiliario",
    slug: "acao-de-despejo",
    title: "Ação de despejo",
    description: "Retomada de imóvel locado em Uberaba, com análise do contrato, dos atrasos e da Lei do Inquilinato.",
    eyebrow: "Lei do Inquilinato",
    lede: "A ação de despejo é o caminho para retomar imóvel locado. A Lei nº 8.245/1991 trata da locação residencial e da não residencial. Trocar a fechadura ou cortar água e luz não substitui o processo.",
    situations: [
      "Falta de pagamento de aluguéis e encargos.",
      "Infração contratual, uso diverso, sublocação não autorizada ou dano ao imóvel.",
      "Término do prazo ou locação por prazo indeterminado, com a notificação quando a lei exigir.",
      "Necessidade de uso próprio, de familiar, ou obras determinadas pelo poder público.",
    ],
    points: [
      "A liminar de desocupação do art. 59, § 1º, depende da hipótese do caso e de caução. Não é um único fundamento.",
      "A purgação da mora, quando cabível, tem prazo contado da citação. Locatário e fiador podem ter papéis diferentes.",
      "O pedido de despejo pode ser cumulado com a cobrança dos valores em aberto, conforme o art. 62.",
      "Havendo contrato de locação, a via em regra é o despejo, não a reintegração de posse.",
    ],
    note: "O cabimento, a liminar e o prazo dependem do contrato, da garantia e das datas. Não é possível fixar duração do processo de antemão.",
    questions: [
      {
        question: "Posso trocar a fechadura ou cortar água e luz?",
        answer: "Não. Essa conduta pode configurar exercício arbitrário das próprias razões e gerar responsabilidade do locador.",
      },
      {
        question: "Contrato com fiador impede a liminar?",
        answer: "Não necessariamente. A falta de pagamento sem garantia é apenas uma das hipóteses. As demais têm requisitos próprios, inclusive quando a garantia existiu e deixou de ser reposta.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre uma ação de despejo.",
  },
  {
    group: "direito-imobiliario",
    slug: "usucapiao",
    title: "Usucapião de imóvel",
    description: "Posse prolongada de casa, terreno, sítio ou fazenda em Uberaba e região, pela via judicial ou em cartório, quando couber.",
    eyebrow: "Regularização",
    lede: "Quem usa um imóvel como seu por tempo suficiente pode, conforme a modalidade, transformar a posse em propriedade registrada. O prazo não é único: muda se o bem é urbano ou rural, a área, o uso e se há justo título e boa-fé.",
    situations: [
      "Ocupa casa, terreno, sítio ou fazenda há anos, sem escritura no próprio nome.",
      "Comprou por contrato de gaveta e não conseguiu registrar.",
      "Recebeu ou herdou um imóvel que nunca foi regularizado.",
      "Precisa vender, financiar ou transmitir o bem, mas ele não está no nome de quem possui.",
    ],
    points: [
      "A primeira análise identifica a modalidade. Errar esse enquadramento compromete o pedido.",
      "A via em cartório existe em alguns casos. A usucapião especial coletiva de imóvel urbano, do art. 10 da Lei nº 10.257/2001, é judicial.",
      "Em imóvel rural, o registro depende de memorial descritivo georreferenciado, nos termos da Lei nº 6.015/1973.",
      "Não há garantia de resultado. A viabilidade depende dos documentos e do tempo de posse.",
    ],
    note: "Dr. Eduardo Bonifácio, OAB/MG 205.525, e Dr. Rômulo Batista Cassiano, OAB/MG 205.535, analisam a documentação juntos.",
    questions: [
      {
        question: "Quanto tempo de posse é necessário?",
        answer: "Não há um prazo único. As modalidades do direito brasileiro variam de poucos anos a mais de uma década, conforme área, uso e título.",
      },
      {
        question: "Serve para sítio ou fazenda?",
        answer: "Sim, há modalidades próprias para imóvel rural. O registro exige memorial georreferenciado, e quem soma área de até quatro módulos fiscais pode ter isenção dos custos desse trabalho, nos termos da lei.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre usucapião de um imóvel.",
  },
  {
    group: "direito-imobiliario",
    slug: "reintegracao-de-posse",
    title: "Reintegração de posse",
    description: "Recuperação de imóvel após esbulho, em Uberaba: invasão, ocupação indevida ou recusa em devolver o bem sem contrato de locação.",
    eyebrow: "Posse",
    lede: "A reintegração recupera o imóvel de quem perdeu a posse por esbulho. Se existe contrato de locação e o inquilino não sai, a via em regra é a ação de despejo. Confundir as duas pode extinguir o processo sem julgamento do mérito.",
    situations: [
      "Reintegração: a posse foi perdida. Houve esbulho.",
      "Manutenção: a posse foi perturbada, mas não perdida. Houve turbação.",
      "Interdito proibitório: há ameaça concreta, ainda não consumada.",
    ],
    points: [
      "Proposta a ação em até ano e dia da agressão à posse, cabe o procedimento especial, que admite liminar (CPC, art. 558).",
      "Passado esse prazo, a ação continua cabível pelo procedimento comum.",
      "Não é preciso ser o proprietário. Locatário, comodatário e promitente comprador podem ser possuidores.",
      "O desforço imediato, logo após a invasão e sem excesso, é a hipótese estreita do art. 1.210, § 1º, do Código Civil. Fora dela, a via é judicial.",
    ],
    note: "A data do esbulho deve ser documentada desde o início. Ocupação coletiva tem tratamento próprio, com mediação e órgãos públicos (CPC, art. 565).",
    questions: [
      {
        question: "Meu inquilino não sai. Cabe reintegração?",
        answer: "Em regra, não. Havendo contrato de locação, a via é a ação de despejo.",
      },
      {
        question: "Perdi o prazo de ano e dia. Ainda posso agir?",
        answer: "Sim. O direito permanece. O que muda é o procedimento, que passa a ser o comum.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre reintegração de posse.",
  },
  {
    group: "direito-imobiliario",
    slug: "leilao-e-execucao",
    title: "Leilão e execução de imóvel",
    description: "Penhora, leilão e consolidação de imóvel em Uberaba. Análise de prazos, edital e proteção da moradia da família.",
    eyebrow: "Prazos",
    lede: "Intimação de leilão, penhora ou consolidação da propriedade por atraso no financiamento pede leitura do processo e das datas. Quanto mais cedo a análise, mais medidas ainda podem estar abertas. Nenhuma delas garante resultado.",
    situations: [
      "Intimação de que o imóvel vai a leilão.",
      "Dívida que virou execução com penhora do imóvel.",
      "Banco que consolidou a propriedade na alienação fiduciária.",
      "Imóvel já arrematado, quando ainda há o que verificar sobre sobra, preferência ou nulidade.",
    ],
    points: [
      "A Lei nº 9.514/1997 marca janelas próprias na alienação fiduciária, inclusive purgação da mora e preferência até o segundo leilão, conforme o caso.",
      "A Lei nº 8.009/1990 protege o imóvel de moradia da família, com exceções legais que precisam ser lidas no processo.",
      "A proteção não funciona sozinha: precisa ser alegada e demonstrada nos autos.",
    ],
    note: "Conteúdo informativo. A viabilidade depende dos documentos e do estágio do procedimento.",
    questions: [
      {
        question: "O imóvel onde moro pode ser penhorado?",
        answer: "A regra da Lei nº 8.009/1990 é a impenhorabilidade de um imóvel de moradia permanente da família. A própria lei lista exceções, como financiamento do próprio bem, alimento, tributos do imóvel, hipoteca e fiança em locação.",
      },
      {
        question: "Vocês atendem fora de Uberaba?",
        answer: "Sim. O atendimento presencial é na região e o on-line alcança outras localidades.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Meu imóvel está em leilão ou em execução.",
  },
  {
    group: "direito-imobiliario",
    slug: "vicios-em-imoveis",
    title: "Vícios em imóveis",
    description: "Defeitos ocultos em imóvel comprado em Uberaba: infiltração, problema estrutural, pendência na matrícula e prazo para agir.",
    eyebrow: "Compra e venda",
    lede: "Defeito que não podia ser visto na compra e que compromete o uso ou o valor do imóvel pode gerar abatimento do preço, reparação ou desfazimento do negócio. O prazo muda conforme a relação seja entre particulares ou com construtora.",
    situations: [
      "Infiltração escondida por reforma ou móvel.",
      "Problema estrutural que reaparece depois da entrega.",
      "Ação, penhora ou pendência que não foi informada.",
      "IPTU ou dívida condominial que segue o imóvel.",
    ],
    points: [
      "Entre particulares, os arts. 441 a 446 do Código Civil tratam dos vícios redibitórios e dos prazos do art. 445.",
      "Compra de construtora ou incorporadora pode seguir o Código de Defesa do Consumidor, com prazo e prova próprios.",
      "Defeito de solidez da construção tem regime diferente e depende do enquadramento do contrato.",
      "Documentar o defeito antes de reformar preserva a prova. Reclamação por escrito ao vendedor ajuda a marcar a data.",
    ],
    note: "O marco relevante costuma ser a ciência do defeito, não só a data da escritura. Cada contrato precisa ser lido antes de qualquer pedido.",
    questions: [
      {
        question: "O vendedor diz que não sabia do defeito. Ele se livra?",
        answer: "Não integralmente. Mesmo o vendedor que ignorava o vício pode ter de restituir o preço e as despesas. A ciência do defeito é o que acrescenta perdas e danos, nos termos do art. 443 do Código Civil.",
      },
      {
        question: "Preciso consertar antes de procurar o escritório?",
        answer: "Não. Reformar sem registro técnico pode enfraquecer a prova. O caminho é documentar o estado do vício.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Comprei um imóvel com defeito oculto.",
  },
  {
    group: "direito-imobiliario",
    slug: "distrato-imobiliario",
    title: "Distrato imobiliário",
    description: "Desistência de imóvel na planta, atraso de obra e retenção de valores, com leitura do contrato e da Lei nº 13.786/2018.",
    eyebrow: "Imóvel na planta",
    lede: "Quem desiste de um imóvel na planta e quem enfrenta atraso da construtora estão em regimes diferentes. A retenção tem teto legal. O atraso, quando ultrapassa a tolerância contratada, pode levar à devolução integral ou a indenização mensal.",
    situations: [
      "Desistência de contrato com incorporador.",
      "Atraso na entrega da obra.",
      "Discussão de comissão de corretagem e pena convencional.",
      "Patrimônio de afetação, que muda o teto e o prazo de devolução.",
    ],
    points: [
      "A Lei nº 13.786/2018 limita a pena convencional a 25% do valor pago, além da comissão de corretagem, no art. 67-A da Lei nº 4.591/1964.",
      "No patrimônio de afetação, a pena pode chegar a 50% e a devolução segue o prazo do art. 67-A, § 5º.",
      "O prazo de tolerância de até 180 dias só vale se estiver claro e destacado no contrato (art. 43-A).",
      "O cálculo depende do contrato, do quadro-resumo e de cada comprovante de pagamento.",
    ],
    note: "Este conteúdo é informativo. Não há percentual único sem a leitura do contrato.",
    questions: [
      {
        question: "A obra atrasou. Tenho direito à devolução integral?",
        answer: "Se o atraso superar a tolerância contratada e o comprador não tiver dado causa, a lei prevê resolução com devolução integral e multa, ou indenização de 1% ao mês para quem preferir esperar o imóvel.",
      },
      {
        question: "Quanto volta se eu desistir?",
        answer: "A lei fixa um teto de retenção, mas o valor concreto depende do contrato, da comissão e de haver ou não patrimônio de afetação.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre distrato de imóvel na planta.",
  },
  {
    group: "protecao-patrimonial",
    slug: "defesa-patrimonial",
    title: "Defesa patrimonial",
    description: "Bloqueio, penhora e execução em Uberaba, para pessoas, empresas, empresários, produtores e investidores.",
    eyebrow: "Constrições",
    lede: "Bloqueio de conta, penhora de imóvel e execução pedem leitura dos autos, do prazo e da origem da dívida. A impenhorabilidade da moradia familiar existe, mas só produz efeito quando é alegada e demonstrada a tempo.",
    situations: [
      "Bloqueio de contas e valores pelo Sisbajud.",
      "Penhora de imóvel, bem de família, faturamento ou recebíveis.",
      "Execução fiscal, de título judicial ou extrajudicial.",
      "Constrição sobre patrimônio de empresa ou do produtor rural.",
    ],
    points: [
      "A Lei nº 8.009/1990 protege um imóvel de moradia permanente da família e, em regra, os móveis quitados que guarnecem a casa.",
      "As exceções estão no art. 3º e incluem financiamento do próprio imóvel, alimento, tributos do bem, hipoteca e fiança locatícia.",
      "A pequena propriedade rural trabalhada pela família tem proteção constitucional própria, distinta da sede de moradia.",
      "A medida cabível pode ser desbloqueio, impenhorabilidade, substituição de garantia, impugnação ou defesa na execução.",
    ],
    note: "A estratégia depende da fase do processo e dos bens atingidos. Não há promessa de resultado.",
    questions: [
      {
        question: "Conta bloqueada libera na hora?",
        answer: "Não. É preciso identificar a origem do bloqueio e verificar se há valor impenhorável, excesso ou outra medida cabível perante o juízo.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Preciso de defesa patrimonial em bloqueio ou penhora.",
  },
  {
    group: "protecao-patrimonial",
    slug: "holding-familiar",
    title: "Holding familiar",
    description: "Organização do patrimônio familiar em Uberaba: governança, sucessão e limites legais da holding.",
    eyebrow: "Planejamento",
    lede: "A holding pode organizar imóveis, participações e a sucessão da família. Não é solução automática e não blinda dívidas que já existem. O que decide é o momento: planejamento feito a tempo é diferente de estrutura montada contra credor certo.",
    situations: [
      "Famílias com vários imóveis ou empresas.",
      "Sucessão que se quer organizar em vida.",
      "Regras de voto, administração e usufruto.",
      "Prevenção de disputa entre herdeiros.",
    ],
    points: [
      "O estudo olha patrimônio, família, custos e efeitos tributários e sucessórios, com apoio contábil quando necessário.",
      "A Lei nº 13.097/2015, art. 54, trata da eficácia de negócios sobre imóveis diante de atos já registrados na matrícula.",
      "Doação de quotas, testamento e cláusulas de incomunicabilidade podem ser mais adequados do que uma holding, conforme o caso.",
      "O escritório não estrutura operação destinada a fraudar credores.",
    ],
    note: "Holding não substitui, por si, o inventário em todo caso. Cada planejamento é individual.",
    questions: [
      {
        question: "Holding serve para pagar menos imposto?",
        answer: "Pode haver eficiência lícita em alguns patrimônios. Não é promessa de economia. O efeito depende da atividade e da lei vigente.",
      },
      {
        question: "Dá para proteger dívida que já existe?",
        answer: "Depois que a matrícula registra citação, constrição ou indisponibilidade, reorganizar o bem deixa de proteger e pode agravar a situação.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre holding familiar e sucessão.",
  },
  {
    group: "imovel-rural",
    slug: "execucao-e-penhora",
    title: "Execução e penhora rural",
    description: "Penhora de fazenda, safra ou maquinário e leilão de imóvel rural no Triângulo Mineiro.",
    eyebrow: "Produtor rural",
    lede: "Penhora de terra, safra ou maquinário e leilão de imóvel rural pedem leitura da matrícula, do edital e das datas. Há dois regimes diferentes: a pequena propriedade trabalhada pela família e a sede de moradia no imóvel rural.",
    situations: [
      "Intimação de penhora da fazenda, da safra ou de maquinário.",
      "Execução com bloqueio de bens da propriedade.",
      "Leilão de imóvel rural.",
      "Penhora de trator, colheitadeira ou resultado da colheita.",
    ],
    points: [
      "A Constituição, art. 5º, XXVI, protege a pequena propriedade rural trabalhada pela família contra dívidas da atividade produtiva, até quatro módulos fiscais.",
      "A Lei nº 8.009/1990, art. 4º, § 2º, protege a sede de moradia e os móveis que a guarnecem mesmo quando a área é maior.",
      "A proteção não é presumida. O Tema 1.234 do STJ firma que cabe ao devedor provar a exploração familiar.",
    ],
    note: "Dr. Eduardo Bonifácio, OAB/MG 205.525, e Dr. Rômulo Batista Cassiano, OAB/MG 205.535, conferem matrícula, planta, CAR e o histórico da posse.",
    questions: [
      {
        question: "Penhoraram a safra ou o maquinário. Dá para reverter?",
        answer: "Depende do estágio e de os bens serem essenciais à atividade. Só a leitura do processo responde.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Minha fazenda ou minha produção está em penhora ou leilão.",
  },
  {
    group: "imovel-rural",
    slug: "contratos-agrarios",
    title: "Contratos agrários",
    description: "Arrendamento, parceria, quebra de safra, posse, divisas e preferência na compra da terra arrendada.",
    eyebrow: "Campo",
    lede: "Arrendamento e parceria podem ser escritos ou verbais. O decreto dos contratos agrários presume cláusulas obrigatórias no ajuste verbal e permite prova por testemunhas. Registrar continua recomendável.",
    situations: [
      "Elaborar ou revisar arrendamento e parceria.",
      "Descumprimento do contrato agrário.",
      "Quebra de safra.",
      "Posse, divisa, servidão de passagem ou esbulho.",
    ],
    points: [
      "A venda do imóvel não interrompe o contrato: o comprador se sub-roga nos direitos e obrigações do vendedor (Decreto nº 59.566/1966, art. 15).",
      "Há prazos mínimos legais de 3, 5 ou 7 anos, conforme a exploração (art. 13).",
      "O Estatuto da Terra limita a remuneração do arrendamento a percentuais do valor cadastral.",
      "O arrendatário pode ter preferência na compra, com prazos de notificação e de exercício.",
    ],
    note: "Contrato bem feito evita litígio. O resultado de uma disputa depende das provas e das datas.",
    questions: [
      {
        question: "O contrato precisa ser registrado para valer?",
        answer: "Não é condição de validade. O registro é recomendável para prova e publicidade. Quem não registrou não perde, por isso só, o contrato.",
      },
      {
        question: "O dono vai vender a fazenda que eu arrendo. Tenho preferência?",
        answer: "O art. 45 do Decreto nº 59.566/1966 prevê o direito de preempção, com notificação e prazo de 30 dias. Se a venda ocorrer sem notificação, há prazo de 6 meses para o pedido, contado da transcrição, mediante depósito do preço.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre um contrato agrário ou uma disputa no campo.",
  },
  {
    group: "imovel-rural",
    slug: "holding-rural",
    title: "Holding rural",
    description: "Sucessão da fazenda, holding do agronegócio e organização lícita do patrimônio rural em Uberaba e região.",
    eyebrow: "Sucessão no agro",
    lede: "Holding rural pode organizar a fazenda e a passagem entre gerações. Não serve para ocultar bens nem para fraudar credores. Planejar cedo é diferente de reorganizar a terra depois que a matrícula já registra uma constrição.",
    situations: [
      "Sucessão da fazenda antes de um conflito de herança.",
      "Continuidade do negócio entre gerações.",
      "Inventário ou partilha de imóvel rural.",
      "Organização lícita do patrimônio do agronegócio.",
    ],
    points: [
      "O diagnóstico olha matrículas, contratos e a família.",
      "A Lei nº 13.097/2015, art. 54, marca até quando um negócio sobre o imóvel é eficaz diante de atos anteriores.",
      "Inventário pode ser judicial ou em cartório, conforme herdeiros, dívidas e capacidade.",
      "O escritório não monta estrutura depois que o problema com o credor já está registrado.",
    ],
    note: "Proteger é possível. Blindar, não. Nenhum resultado é garantido.",
    questions: [
      {
        question: "Holding rural serve para não pagar imposto?",
        answer: "Não é esse o papel. É a organização lícita do patrimônio e da sucessão. Eficiência tributária, quando existe, depende de análise específica.",
      },
      {
        question: "Preciso de inventário mesmo com poucos herdeiros?",
        answer: "Em regra, sim, para transferir a titularidade. O caminho judicial ou extrajudicial depende do caso.",
      },
    ],
    whatsapp: "Olá, Dr. Eduardo. Gostaria de falar sobre holding rural e sucessão da fazenda.",
  },
];

export function getService(group: ServiceGroup, slug: string) {
  return services.find((service) => service.group === group && service.slug === slug);
}
