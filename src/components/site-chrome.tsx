import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { TiltController } from "@/components/tilt-controller";
import { contact, getSettings } from "@/lib/content/settings";

export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const links = contact(settings);

  return (
    <>
      <JsonLd settings={settings} />
      <Header
        info={{
          name: settings.name,
          oab: settings.oab,
          phone: settings.phone,
          tel: links.tel,
          whatsapp: links.whatsappDefault,
          hours: settings.hours,
          hoursShort: settings.hoursShort,
          address: `${settings.street} · ${settings.city}`,
        }}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <TiltController />
    </>
  );
}
