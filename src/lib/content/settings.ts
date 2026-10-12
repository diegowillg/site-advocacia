import { cache } from "react";
import { readJson, writeJson } from "@/lib/content/store";

export type Social = { name: string; href: string };

export type Settings = {
  name: string;
  firm: string;
  oab: string;
  role: string;
  partnerName: string;
  partnerOab: string;
  email: string;
  whatsapp: string;
  phone: string;
  catalogUrl: string;
  building: string;
  street: string;
  neighborhood: string;
  city: string;
  cep: string;
  hours: string;
  hoursShort: string;
  googleRating: number;
  googleTotal: number;
  googleProfileUrl: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  socials: Social[];
};

export const defaultSettings: Settings = {
  name: "Dr. Eduardo Bonifácio",
  firm: "Batista e Bonifácio Advocacia",
  oab: "OAB/MG 205.525",
  role: "Especialista em Direito Imobiliário",
  partnerName: "Dr. Rômulo Batista Cassiano",
  partnerOab: "OAB/MG 205.535",
  email: "eduardocorreabonifacioo@gmail.com",
  whatsapp: "(34) 99964-7010",
  phone: "(34) 99710-3222",
  catalogUrl: "https://wa.me/c/553499647010",
  building: "Cosmopolitan Office Building",
  street: "Avenida Maranhão, nº 1320, Primeiro andar, Sala 107",
  neighborhood: "Bairro Santa Maria",
  city: "Uberaba/MG",
  cep: "38050-470",
  hours: "Segunda a sábado, das 8h às 21h",
  hoursShort: "Seg. a sáb., 8h às 21h",
  googleRating: 5,
  googleTotal: 129,
  googleProfileUrl:
    "https://www.google.com/maps/search/?api=1&query_place_id=ChIJNetZoUnRupQR4b9p3vW2YsI&query=Dr.+Eduardo+Bonifacio+Uberaba",
  heroEyebrow: "Direito Imobiliário e Proteção Patrimonial · Uberaba/MG",
  heroTitle: "Defenda seu imóvel *antes* que o prazo acabe",
  heroSubtitle:
    "Advogado especialista em Direito Imobiliário e patrimonial em Uberaba/MG. Análise técnica do seu caso e dos prazos, direto com o advogado.",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/bonifacio__advocacia/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dr-eduardo-corr%C3%AAa-bonif%C3%A1cio-594274237" },
    { name: "YouTube", href: "https://www.youtube.com/@bonifacio__advocacia" },
    { name: "TikTok", href: "https://www.tiktok.com/@bonifacio__advocacia" },
    { name: "Telegram", href: "https://t.me/DR_EDUARDOBONIFACIO" },
    { name: "Threads", href: "https://www.threads.com/@bonifacio__advocacia" },
    { name: "X", href: "https://x.com/eduardocorrebo2" },
    { name: "Kwai", href: "https://k.kwai.com/u/@eduardocorreab620/dB8zAGCa" },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100083388068671" },
  ],
};

export const getSettings = cache(async (): Promise<Settings> => {
  const saved = await readJson<Partial<Settings>>("settings.json");
  return { ...defaultSettings, ...saved };
});

export async function saveSettings(settings: Settings) {
  await writeJson("settings.json", settings);
}

const DEFAULT_MESSAGE =
  "Olá, Dr. Eduardo. Gostaria de informações sobre atendimento jurídico em proteção patrimonial ou Direito Imobiliário.";
const URGENT_MESSAGE =
  "Olá, Dr. Eduardo. Preciso de atendimento sobre uma situação urgente envolvendo meu imóvel ou patrimônio.";

// Números brasileiros digitados de qualquer jeito viram formato internacional (55 + DDD + número).
export function toE164(display: string) {
  const digits = display.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return `55${digits}`;
}

export function contact(settings: Settings) {
  const whatsappNumber = toE164(settings.whatsapp);
  const whatsapp = (text = DEFAULT_MESSAGE) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  const addressQuery = `${settings.street.replace(/,?\s*(Primeiro andar|Sala).*$/i, "")} ${settings.neighborhood.replace(/^Bairro\s+/i, "")} ${settings.city} ${settings.cep}`;
  return {
    whatsapp,
    whatsappDefault: whatsapp(),
    whatsappUrgent: whatsapp(URGENT_MESSAGE),
    tel: `tel:+${toE164(settings.phone)}`,
    mailto: `mailto:${settings.email}`,
    fullAddress: `${settings.street}, ${settings.neighborhood}, ${settings.city}, CEP ${settings.cep}`,
    mapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery)}`,
    mapsEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&z=16&output=embed`,
  };
}

export type Contact = ReturnType<typeof contact>;
