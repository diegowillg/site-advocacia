import { cache } from "react";
import { readJson, writeJson } from "@/lib/content/store";

export type SiteImage = { src: string; alt: string };

export const imageSlots = {
  eduardo: {
    label: "Retrato do Dr. Eduardo",
    usage: "Topo da página inicial, página do escritório e autor dos artigos",
    src: "/media/eduardo.webp",
    alt: "Dr. Eduardo Bonifácio, advogado em Uberaba/MG",
  },
  socios: {
    label: "Foto dos sócios",
    usage: "Seção “Sobre o escritório” e página de Proteção Patrimonial",
    src: "/media/socios.webp",
    alt: "Dr. Eduardo Bonifácio e Dr. Rômulo Batista Cassiano, sócios, no escritório em Uberaba/MG",
  },
  romulo: {
    label: "Retrato do Dr. Rômulo",
    usage: "Página do escritório",
    src: "/media/romulo-retrato.webp",
    alt: "Dr. Rômulo Batista Cassiano, advogado sócio",
  },
  recepcao: {
    label: "Recepção",
    usage: "Página do escritório e galeria",
    src: "/media/recepcao.webp",
    alt: "Recepção do escritório",
  },
  atendimento: {
    label: "Sala de atendimento",
    usage: "Direito Imobiliário, galeria e serviços",
    src: "/media/atendimento.webp",
    alt: "Sala de atendimento ao cliente",
  },
  reunioes: {
    label: "Sala de reuniões",
    usage: "Blog, galeria e serviços",
    src: "/media/reunioes.jpg",
    alt: "Sala de reuniões",
  },
  fachada: {
    label: "Fachada do edifício",
    usage: "Contato, Imóvel Rural, galeria e serviços",
    src: "/media/fachada.webp",
    alt: "Fachada do edifício na Avenida Maranhão",
  },
  forum: {
    label: "No Fórum de Uberaba",
    usage: "Urgências, galeria e serviços",
    src: "/media/forum.webp",
    alt: "Dr. Eduardo Bonifácio em atuação no Fórum de Uberaba",
  },
} as const;

export type ImageSlot = keyof typeof imageSlots;
export type SiteImages = Record<ImageSlot, SiteImage>;

export function isImageSlot(value: string): value is ImageSlot {
  return value in imageSlots;
}

export const getImages = cache(async (): Promise<SiteImages> => {
  const saved = (await readJson<Partial<SiteImages>>("images.json")) ?? {};
  const entries = Object.entries(imageSlots).map(([key, slot]) => {
    const custom = saved[key as ImageSlot];
    return [key, { src: custom?.src || slot.src, alt: custom?.alt || slot.alt }];
  });
  return Object.fromEntries(entries) as SiteImages;
});

export async function saveImages(images: Partial<SiteImages>) {
  await writeJson("images.json", images);
}

export async function getSavedImages() {
  return (await readJson<Partial<SiteImages>>("images.json")) ?? {};
}

// Fotos da galeria do escritório e de cada página de serviço.
export const galleryOrder: ImageSlot[] = ["recepcao", "atendimento", "reunioes", "fachada", "forum"];

export const serviceImageSlot: Record<string, ImageSlot> = {
  "acao-de-despejo": "atendimento",
  usucapiao: "forum",
  "reintegracao-de-posse": "fachada",
  "leilao-e-execucao": "forum",
  "vicios-em-imoveis": "reunioes",
  "distrato-imobiliario": "recepcao",
  "defesa-patrimonial": "eduardo",
  "holding-familiar": "socios",
  "execucao-e-penhora": "fachada",
  "contratos-agrarios": "reunioes",
  "holding-rural": "reunioes",
};
