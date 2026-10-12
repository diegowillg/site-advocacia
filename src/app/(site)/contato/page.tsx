import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Tilt } from "@/components/tilt";
import { getImages } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "WhatsApp, telefone, e-mail e endereço do escritório do Dr. Eduardo Bonifácio em Uberaba/MG.",
  alternates: { canonical: "/contato" },
};

type Channel = { icon: IconName; label: string; value: string; href: string; external?: boolean; primary?: boolean };

export default async function ContatoPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const links = contact(settings);
  const channels: Channel[] = [
    { icon: "whatsapp", label: "WhatsApp", value: settings.whatsapp, href: links.whatsappDefault, external: true, primary: true },
    { icon: "phone", label: "Telefone", value: settings.phone, href: links.tel },
    { icon: "mail", label: "E-mail", value: settings.email, href: links.mailto },
    { icon: "document", label: "Catálogo de serviços", value: "Ver no WhatsApp", href: settings.catalogUrl, external: true },
  ];

  return (
    <>
      <PageHero
        eyebrow="Uberaba e região"
        title="Entre em contato"
        lede="Orientação inicial mediante análise individual. Atendimento presencial em Uberaba/MG e on-line para o Triângulo Mineiro."
        image={images.fachada}
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:py-28">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <li key={channel.label} className="reveal-3d">
              <Tilt>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${channel.primary ? "card-ink" : "card-surface"} go-card p-7`}
                >
                  <span className="icon-badge">
                    <Icon name={channel.icon} size={21} />
                  </span>
                  <span className={`mt-6 text-[0.68rem] uppercase tracking-[0.2em] ${channel.primary ? "text-gold" : "text-stone"}`}>
                    {channel.label}
                  </span>
                  <span className={`mt-1 break-all text-lg font-semibold ${channel.primary ? "text-cream" : "text-ink"}`}>{channel.value}</span>
                  <span className="go-label">
                    Abrir
                    <Icon name="arrow" size={15} />
                  </span>
                </a>
              </Tilt>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal space-y-8">
            <div>
              <p className="eyebrow">Endereço</p>
              <h2 className="display mt-5 text-4xl">{settings.building}</h2>
              <address className="mt-4 not-italic leading-7 text-stone">{links.fullAddress}</address>
            </div>
            <div className="flex gap-4 border-t border-line pt-6">
              <Icon name="clock" size={22} className="shrink-0 text-wine" />
              <div>
                <p className="font-semibold">{settings.hours}</p>
                <p className="mt-1 text-sm leading-6 text-stone">Triagem de situações urgentes pelo WhatsApp para análise de prazos e documentos.</p>
              </div>
            </div>
            <div className="flex gap-4 border-t border-line pt-6">
              <Icon name="globe" size={22} className="shrink-0 text-wine" />
              <div>
                <p className="font-semibold">Presencial e on-line</p>
                <p className="mt-1 text-sm leading-6 text-stone">{site.region}, do primeiro contato à assinatura de documentos.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-line pt-6">
              <a href={links.mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <Icon name="pin" size={16} />
                Como chegar
              </a>
              <a href={settings.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Icon name="google" size={16} />
                Perfil no Google
              </a>
            </div>
            <div className="border-t border-line pt-6">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone">Redes oficiais</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {settings.socials.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-xs text-ink/75 transition hover:border-wine hover:text-wine"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="reveal-3d frame-gold relative min-h-[460px] overflow-hidden rounded-[1.4rem] shadow-[0_40px_60px_-40px_rgba(12,11,12,0.7)]">
            <iframe
              title="Mapa do escritório na Avenida Maranhão, Uberaba"
              src={links.mapsEmbed}
              className="absolute inset-0 h-full w-full grayscale-[0.35]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
