import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSettings } from "@/lib/content/settings";

export const metadata: Metadata = {
  description: "Como o site do Dr. Eduardo Bonifácio trata dados e serviços externos.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default async function PrivacidadePage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="LGPD"
        title="Política de Privacidade"
        lede="Este site apresenta informações do escritório. O atendimento é feito por WhatsApp, telefone ou e-mail, que são serviços de terceiros."
      />
      <section className="mx-auto w-full max-w-3xl space-y-6 px-5 py-14 text-[1.05rem] leading-8 text-ink/80 md:py-24">
        <p>
          O site não possui formulário de cadastro e não pede senha. Ao clicar em WhatsApp, telefone, e-mail, mapa ou redes sociais, você sai deste site e passa a usar as regras do serviço escolhido.
        </p>
        <p>
          As avaliações exibidas no site são as publicadas no perfil do Google do escritório.
        </p>
        <p>
          A área administrativa (/admin) é restrita ao escritório e usa apenas um cookie de sessão para manter o acesso. Visitantes não recebem cookies deste site.
        </p>
        <p>
          Documentos do seu caso não devem ser enviados por este site. O envio acontece no WhatsApp ou no canal combinado com o advogado, para a triagem do atendimento.
        </p>
        <p>
          Para falar sobre dados pessoais ligados ao atendimento, use {settings.email} ou o telefone {settings.phone}. Responsável pelo site: {settings.name}, {settings.oab}, {settings.street}, {settings.city}.
        </p>
      </section>
    </>
  );
}
