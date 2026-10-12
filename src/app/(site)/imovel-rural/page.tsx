import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { AreaLinks } from "@/components/service-view";
import { AreaTopics, type AreaTopic } from "@/components/area-topics";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { getImages } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";

export const metadata: Metadata = {
  description:
    "Atuação para produtores rurais em contratos, regularização, penhora e riscos sobre imóveis rurais em Uberaba e região.",
  alternates: { canonical: "/imovel-rural" },
};

const points: AreaTopic[] = [
  {
    icon: "contract",
    title: "Contratos de compra e arrendamento",
    text: "Revisão de preço, prazo, área, benfeitorias e da correspondência entre o contrato e a matrícula.",
  },
  {
    icon: "field",
    title: "Regularização e área",
    text: "Divergência de área, georreferenciamento, cadeias antigas e documentos que não acompanharam a ocupação real da terra.",
  },
  {
    icon: "gavel",
    title: "Penhora e execução",
    text: "Análise de constrições sobre imóvel rural, produção ou contas, sempre a partir dos autos e dos registros do bem.",
  },
  {
    icon: "user",
    title: "Família e sucessão",
    text: "Inventário, condomínio entre herdeiros e organização do patrimônio produtivo antes de um conflito.",
  },
];

const MESSAGE = "Olá, Dr. Eduardo. Gostaria de falar sobre um imóvel rural.";

export default async function ImovelRuralPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const whatsapp = contact(settings).whatsapp(MESSAGE);

  return (
    <>
      <PageHero
        eyebrow="Produtores e investidores"
        title="Imóvel rural"
        lede="Atuação para produtores rurais e investidores com patrimônio no Triângulo Mineiro, da conferência do título às situações em que o bem já está em risco."
        image={images.fachada}
      >
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <Icon name="whatsapp" size={18} />
          Falar sobre imóvel rural
        </a>
      </PageHero>
      <AreaTopics
        eyebrow="Patrimônio produtivo"
        title="Da conferência do título à defesa da propriedade"
        topics={points}
        note="O atendimento pode ser presencial em Uberaba ou on-line. Leve matrícula, contrato, CAR ou documentos de área se já os tiver. O que faltar é pedido na triagem, sem antecipar providência antes da leitura."
        links={[{ href: "/protecao-patrimonial", label: "Ver proteção patrimonial" }]}
      />
      <AreaLinks href="/imovel-rural" />
      <CtaBand message={MESSAGE} />
    </>
  );
}
