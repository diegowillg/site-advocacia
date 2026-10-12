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
    "Contratos, regularização, posse, compra e venda, locação, condomínio e usucapião em Uberaba e no Triângulo Mineiro.",
  alternates: { canonical: "/direito-imobiliario" },
};

const topics: AreaTopic[] = [
  {
    icon: "contract",
    title: "Compra e venda",
    text: "Conferência de matrícula, cadeia de titularidade, certidões, contrato e cláusulas de preço, prazo, escritura e inadimplemento antes de assinar ou pagar.",
  },
  {
    icon: "document",
    title: "Regularização e usucapião",
    text: "Imóvel sem escritura, área não averbada, divergência de metragem e caminhos de regularização registral ou judicial, conforme os documentos.",
  },
  {
    icon: "key",
    title: "Posse e conflitos",
    text: "Disputa de posse, limites, ocupação por terceiro e situações em que a realidade do imóvel não coincide com o registro.",
  },
  {
    icon: "building",
    title: "Locação e condomínio",
    text: "Contratos de locação, despejo, cobranças condominiais e conflitos entre condôminos ou com a administração.",
  },
];

const MESSAGE = "Olá, Dr. Eduardo. Gostaria de falar sobre um caso de Direito Imobiliário.";

export default async function DireitoImobiliarioPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const whatsapp = contact(settings).whatsapp(MESSAGE);

  return (
    <>
      <PageHero
        eyebrow="Uberaba e região"
        title="Direito Imobiliário"
        lede="Contratos, regularização, posse, compra e venda, locação, condomínio e conflitos relacionados a imóveis, com análise técnica antes de qualquer providência."
        image={images.atendimento}
      >
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <Icon name="whatsapp" size={18} />
          Falar sobre meu imóvel
        </a>
      </PageHero>
      <AreaTopics
        eyebrow="Frentes de atuação"
        title="Segurança jurídica em cada etapa da vida do imóvel"
        topics={topics}
        note="Documentação irregular, contrato de gaveta, ausência de escritura, restrições na matrícula e divergência de área podem comprometer a segurança da aquisição. A leitura preventiva é feita sobre os documentos do imóvel e das partes, não sobre um modelo genérico de contrato."
        links={[
          { href: "/blog/riscos-da-compra-de-imoveis-irregulares-em-uberaba", label: "Riscos da compra de imóveis irregulares" },
          { href: "/urgencias", label: "Casos com prazo ou leilão" },
        ]}
      />
      <AreaLinks href="/direito-imobiliario" />
      <CtaBand message={MESSAGE} />
    </>
  );
}
