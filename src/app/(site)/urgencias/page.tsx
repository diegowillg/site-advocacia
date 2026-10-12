import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Icon, type IconName } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Panel } from "@/components/tilt";
import { getImages } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";
import { urgentTopics } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "Triagem de intimações, execuções, penhoras, bloqueios, leilões e despejo em Uberaba e região.",
  alternates: { canonical: "/urgencias" },
};

const topicIcons: IconName[] = ["gavel", "bank", "home", "scale", "lock"];

const documents = [
  "Intimação, citação ou mandado recebido",
  "Edital de leilão, com as datas",
  "Extrato do bloqueio (Sisbajud)",
  "Contrato e comprovantes de pagamento",
  "Matrícula do imóvel, se houver",
];

export default async function UrgenciasPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const whatsappUrgent = contact(settings).whatsappUrgent;

  return (
    <>
      <PageHero
        eyebrow="Triagem de prazos"
        title="Urgências patrimoniais"
        lede="Intimações, execuções, penhoras, bloqueios, leilões e despejo. A primeira conversa serve para localizar o prazo e os documentos, não para prometer um resultado."
        image={images.forum}
      >
        <a href={whatsappUrgent} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          <Icon name="whatsapp" size={18} />
          Enviar o documento agora
        </a>
      </PageHero>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:py-28">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Situações atendidas</p>
          <h2 className="display mt-5 text-4xl md:text-5xl">Quando o patrimônio está em risco imediato</h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {urgentTopics.map((topic, index) => (
            <li key={topic.title} className="reveal-3d">
              <Panel className="!p-8">
                <div className="flex items-start justify-between">
                  <span className="icon-badge">
                    <Icon name={topicIcons[index] ?? "alert"} size={22} />
                  </span>
                  <span className="display text-4xl leading-none text-line">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="display mt-6 text-2xl md:text-[1.7rem]">{topic.title}</h3>
                <p className="mt-3 leading-7 text-stone">{topic.text}</p>
              </Panel>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper py-14 md:py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <p className="eyebrow">Como agir</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">O que enviar pelo WhatsApp</h2>
            <p className="mt-6 leading-7 text-stone">
              A triagem verifica o que ainda está dentro do prazo e quais peças precisam ser lidas antes de qualquer protocolo. Leilões imobiliários, em especial, exigem análise individual de documentos, intimações e datas.
            </p>
            <Link href="/blog/o-que-analisar-quando-o-imovel-vai-a-leilao" className="text-link mt-8">
              Ler: o que analisar quando o imóvel vai a leilão
              <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="reveal-3d">
            <Panel tone="ink" className="!p-8 md:!p-10">
              <p className="eyebrow on-dark">Checklist</p>
              <ul className="mt-6 divide-y divide-white/10">
                {documents.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 text-cream/85">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Icon name="check" size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={whatsappUrgent} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-8 w-full">
                <Icon name="whatsapp" size={18} />
                Enviar para triagem
              </a>
            </Panel>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tem intimação, leilão ou bloqueio?"
        text="Mande o documento pelo WhatsApp para a triagem de prazos no horário de atendimento."
        urgent
        label="Enviar o caso pelo WhatsApp"
      />
    </>
  );
}
