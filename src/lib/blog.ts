// Artigos iniciais. Depois que o proprietário salvar o blog pelo painel, o conteúdo passa a vir de storage/posts.json.
type SeedBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type SeedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt: string;
  blocks: SeedBlock[];
};

export const seedPosts: SeedPost[] = [
  {
    slug: "riscos-da-compra-de-imoveis-irregulares-em-uberaba",
    title: "Riscos da compra de imóveis irregulares em Uberaba",
    description:
      "Documentação irregular, contrato de gaveta, ausência de escritura e restrições na matrícula podem comprometer a compra de um imóvel em Uberaba.",
    date: "2026-07-29",
    excerpt:
      "A compra parece concluída quando o preço é pago e as chaves são entregues. A segurança jurídica depende da documentação, da titularidade e do registro.",
    blocks: [
      {
        type: "p",
        text: "A compra de um imóvel pode parecer concluída quando o preço é pago e as chaves são entregues. Juridicamente, a segurança do negócio depende da documentação, da titularidade, da situação registral e da regularidade do contrato. Em Uberaba e região, problemas nesses pontos podem impedir a transferência, dificultar financiamento, gerar cobranças e colocar o bem em disputa.",
      },
      { type: "h2", text: "A lógica do risco imobiliário" },
      {
        type: "p",
        text: "O comprador entrega dinheiro, assume a posse ou inicia os pagamentos, mas o imóvel pode ter pendências documentais ou registrar outra realidade. Propriedade, posse e obrigação contratual são situações distintas. A aquisição da propriedade imobiliária exige o título adequado e o registro, além da análise das obrigações assumidas pelas partes.",
      },
      {
        type: "p",
        text: "Antes de pagar ou assinar, é necessário verificar quem pode vender, o que efetivamente está sendo vendido e se existem obstáculos à transferência.",
      },
      { type: "h2", text: "Sinais de que a documentação merece atenção" },
      {
        type: "ul",
        items: [
          "O vendedor recebeu valores, mas não outorga a escritura.",
          "O negócio existe apenas por contrato de gaveta.",
          "O imóvel não possui matrícula individualizada.",
          "A área construída não consta corretamente no registro.",
          "Há inventário, divórcio, condomínio ou sucessão pendente.",
          "Existem penhoras, indisponibilidades, hipoteca ou alienação fiduciária.",
          "A posse é exercida por terceiro ou há conflito de limites.",
        ],
      },
      { type: "h2", text: "Principais riscos para o comprador" },
      {
        type: "ol",
        items: [
          "Impossibilidade de registro. Um contrato pode gerar obrigações entre as partes e, ainda assim, não permitir o registro imediato. Sem registro, o comprador pode ter dificuldade para demonstrar a propriedade perante terceiros.",
          "Dívidas e restrições. A matrícula e as certidões podem revelar gravames, ações ou situações que afetam a segurança do negócio. A análise deve considerar o imóvel, o vendedor e a natureza da operação.",
          "Divergência entre a realidade e os documentos. Construções não averbadas, metragem incorreta, parcelamento irregular e ausência de individualização podem exigir providências administrativas, registrais ou judiciais.",
          "Conflito possessório. Comprar um bem ocupado sem compreender a origem e a qualidade da posse pode resultar em litígio, demora e novos custos.",
        ],
      },
      { type: "h2", text: "O que verificar antes de assinar ou pagar" },
      {
        type: "ul",
        items: [
          "Matrícula atualizada e cadeia de titularidade.",
          "Certidões relacionadas ao imóvel e às partes.",
          "Situação fiscal, municipal e condominial.",
          "Correspondência entre área, construção, cadastro e registro.",
          "Existência de financiamento, garantia ou restrição.",
          "Cláusulas sobre preço, prazo, entrega, escritura, multa e inadimplemento.",
          "Estado da posse e eventual ocupação por terceiros.",
        ],
      },
      {
        type: "p",
        text: "A revisão preventiva deve ocorrer antes da assinatura ou do pagamento relevante. Quando o problema já existe, o primeiro passo é organizar contrato, comprovantes, mensagens, certidões, matrícula, documentos da posse e histórico de pagamentos. Conforme os fatos, podem ser avaliadas medidas como notificação, obrigação de outorgar escritura, adjudicação compulsória, regularização, retificação, usucapião, resolução contratual ou pedido de reparação.",
      },
      {
        type: "p",
        text: "Se houver intimação, penhora, consolidação da propriedade ou data de leilão, os prazos podem alterar as providências disponíveis. Imóvel, contrato e patrimônio precisam ser analisados juntos.",
      },
    ],
  },
  {
    slug: "o-que-analisar-quando-o-imovel-vai-a-leilao",
    title: "O que analisar quando o imóvel vai a leilão",
    description:
      "Leilão imobiliário pede leitura da intimação, da fase do procedimento e dos prazos. Conteúdo informativo, sem promessa de resultado.",
    date: "2026-08-18",
    excerpt:
      "Um edital de leilão não se analisa pelo anúncio sozinho. Intimação, fase do procedimento e documentos do imóvel mudam o que ainda pode ser feito.",
    blocks: [
      {
        type: "p",
        text: "Receber a notícia de que um imóvel irá a leilão costuma vir com pressa. O anúncio, o edital ou a intimação precisa ser lido junto com o processo, a matrícula e as datas. Conteúdo informativo: cada caso depende desses documentos. Não há medida única que sirva para todas as praças.",
      },
      { type: "h2", text: "O que separar logo no início" },
      {
        type: "ul",
        items: [
          "Intimação, mandado ou mensagem que comunicou o leilão.",
          "Número do processo e o juízo, se constarem.",
          "Edital, datas de praça e valor de avaliação, se já existirem.",
          "Matrícula atualizada do imóvel.",
          "Contrato, financiamento ou garantia que deu origem à dívida, quando houver.",
        ],
      },
      { type: "h2", text: "Por que a fase importa" },
      {
        type: "p",
        text: "A leitura muda se o procedimento ainda está em fase de cobrança, se já houve praça designada ou se o bem foi arrematado. Prazos processuais podem ser curtos. Quanto mais próxima a data, menor costuma ser o espaço para análise com calma. Por isso a triagem começa pelo documento que trouxe a data e pelo andamento do processo.",
      },
      { type: "h2", text: "O que a análise individual observa" },
      {
        type: "ul",
        items: [
          "Se a parte foi intimada na forma prevista para aquele procedimento.",
          "Se há discussão pendente sobre o valor da dívida, excesso ou nulidade.",
          "Se o bem tem característica que a lei protege em certas hipóteses, o que só se confirma nos autos.",
          "Se existem outros imóveis, contas ou garantias atingidos pela mesma execução.",
        ],
      },
      {
        type: "p",
        text: "A partir desses pontos, o advogado explica as alternativas juridicamente cabíveis, os custos e o que depende do Judiciário. Algumas providências podem ser apreciadas em poucos dias. Outras acompanham o tempo do processo. A estimativa só existe depois da leitura do caso.",
      },
      {
        type: "p",
        text: "Se a conta também foi bloqueada ou se há penhora de outros bens, leve esses comprovantes na mesma conversa. Muitas vezes o leilão é apenas a face mais visível de uma execução maior.",
      },
    ],
  },
];

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
