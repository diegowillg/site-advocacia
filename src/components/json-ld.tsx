import logo from "@/assets/logo.png";
import type { Settings } from "@/lib/content/settings";
import { toE164 } from "@/lib/content/settings";
import { site } from "@/lib/site";

// Conteúdo editável vai para dentro de <script>: "<" é escapado para não fechar a tag.
export function jsonLdHtml(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function JsonLd({ settings }: { settings: Settings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    name: settings.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    logo: `${site.url}${logo.src}`,
    email: settings.email,
    telephone: [`+${toE164(settings.phone)}`, `+${toE164(settings.whatsapp)}`],
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.street,
      addressLocality: settings.city.split("/")[0],
      addressRegion: settings.city.split("/")[1] ?? "MG",
      postalCode: settings.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    },
    areaServed: site.region,
    sameAs: settings.socials.map((item) => item.href),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(data)} />;
}
