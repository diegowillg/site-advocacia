import { NotFoundView } from "@/components/not-found-view";
import { contact, getSettings } from "@/lib/content/settings";

// Conteúdo removido dentro do site (ex.: artigo apagado). O layout do site já traz cabeçalho e rodapé.
export default async function NotFound() {
  const settings = await getSettings();
  return <NotFoundView whatsapp={contact(settings).whatsappDefault} />;
}
