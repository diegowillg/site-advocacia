import { SiteChrome } from "@/components/site-chrome";
import { NotFoundView } from "@/components/not-found-view";
import { contact, getSettings } from "@/lib/content/settings";

// Endereços que não existem: mostra a 404 com o cabeçalho e o rodapé do site.
export default async function NotFound() {
  const settings = await getSettings();
  return (
    <SiteChrome>
      <NotFoundView whatsapp={contact(settings).whatsappDefault} />
    </SiteChrome>
  );
}
