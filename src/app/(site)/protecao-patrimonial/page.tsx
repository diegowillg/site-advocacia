import type { Metadata } from "next";
import { AreaTopics, type AreaTopic } from "@/components/area-topics";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { AreaLinks } from "@/components/service-view";
import { getImages } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";

export const metadata: Metadata = {
  description:
    "Diagnóstico de imóveis, contratos, garantias, patrimônio familiar, sucessão e riscos empresariais no Triângulo Mineiro.",
  alternates: { canonical: "/protecao-patrimonial" },
};

const items: AreaTopic[] = [
  {
    icon: "home",
    title: "Imóveis e garantias",
    text: "Imóveis, contratos e garantias que sustentam o patrimônio, lidos em conjunto com matrícula, ônus e obrigações assumidas.",
  },
  {
    icon: "lock",
    title: "Penhora, bloqueio e execução",
    text: "Riscos de penhora, bloqueio e execução sobre bens da família ou da empresa, com atenção aos prazos de defesa.",
  },
  {
    icon: "document",
    title: "Sucessão e organização",
    text: "Planejamento sucessório e organização documental antes de um conflito, quando as alternativas ainda são mais amplas.",
  },
  {
    icon: "bank",
    title: "Empresários e produtores",
    text: "Patrimônio de empresários, produtores rurais e investidores, considerando pessoa física, empresa e bens rurais.",
  },
];

const MESSAGE = "Olá, Dr. Eduardo. Gostaria de uma análise de proteção patrimonial.";

export default async function ProtecaoPatrimonialPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const whatsapp = contact(settings).whatsapp(MESSAGE);

  return (
    <>
      <PageHero
        eyebrow="Pessoas físicas e empresas"
        title="Proteção Patrimonial"
        lede="Diagnóstico de imóveis, contratos, garantias, patrimônio familiar, sucessão e riscos empresariais, com linguagem clara sobre o que é cabível e o que depende de cada caso."
        image={images.socios}
      >
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <Icon name="whatsapp" size={18} />
          Solicitar diagnóstico
        </a>
      </PageHero>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-20 md:grid-cols-2 md:pt-28">
        <p className="reveal display text-3xl leading-snug text-ink md:text-4xl">
          O objetivo da primeira análise é mostrar <em className="text-wine">onde está o risco</em> e quais documentos precisam ser lidos antes de qualquer medida.
        </p>
        <div className="reveal space-y-5 leading-7 text-stone">
          <p>
            A atuação em Direito Civil nesta frente é dedicada a questões que envolvem patrimônio: execuções, penhoras, bloqueios judiciais, responsabilidade civil e organização preventiva.
          </p>
          <p>
            Não se trata de um pacote padrão. Família, empresa e imóvel rural têm registros, contratos e prazos diferentes. A orientação é apresentada com transparência sobre custos e sobre o que o Judiciário ainda precisará decidir.
          </p>
        </div>
      </section>

      <AreaTopics
        eyebrow="O que é analisado"
        title="Quatro frentes de proteção do patrimônio"
        topics={items}
        links={[
          { href: "/imovel-rural", label: "Patrimônio rural" },
          { href: "/urgencias", label: "Situações com risco imediato" },
        ]}
      />
      <AreaLinks href="/protecao-patrimonial" />
      <CtaBand message={MESSAGE} />
    </>
  );
}
