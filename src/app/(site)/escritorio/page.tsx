import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Tilt } from "@/components/tilt";
import { galleryOrder, getImages } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";
import { principles } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "Batista e Bonifácio Advocacia em Uberaba/MG. Dr. Eduardo Bonifácio e Dr. Rômulo Batista Cassiano, atendimento presencial e on-line.",
  alternates: { canonical: "/escritorio" },
};

export default async function EscritorioPage() {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const links = contact(settings);
  const lawyers = [
    {
      name: "Dr. Eduardo Corrêa Bonifácio",
      oab: settings.oab,
      photo: images.eduardo.src,
      role: `Sócio · ${settings.role}`,
      text: "Conduz a atuação em proteção patrimonial e Direito Imobiliário em Uberaba e região: contratos, regularização, execuções, penhoras, leilões e bloqueios.",
    },
    {
      name: settings.partnerName,
      oab: settings.partnerOab,
      photo: images.romulo.src,
      role: "Sócio",
      text: `Sócio da ${settings.firm}. Assina com o Dr. Eduardo a condução técnica dos casos de Direito Imobiliário.`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={settings.firm}
        title="O escritório"
        lede="Ambientes planejados para conforto, discrição e atendimento profissional. Cada caso é conduzido pessoalmente, com comunicação constante."
        image={images.recepcao}
      />

      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:py-28">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Quem conduz o atendimento</p>
          <h2 className="display mt-5 text-4xl md:text-5xl">Os advogados</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {lawyers.map((lawyer) => (
            <article key={lawyer.name} className="reveal-3d">
              <Tilt intensity={7}>
                <div className="card-surface h-full">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image src={lawyer.photo} alt={lawyer.name} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-[50%_20%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="display text-3xl text-cream">{lawyer.name}</p>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-gold">{lawyer.oab}</p>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wine">{lawyer.role}</p>
                    <p className="mt-3 leading-7 text-stone">{lawyer.text}</p>
                  </div>
                </div>
              </Tilt>
            </article>
          ))}
        </div>
      </section>

      <section className="grain on-dark bg-night relative overflow-hidden py-14 text-cream md:py-24">
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow">Princípios</p>
            <h2 className="display mt-5 text-4xl text-cream md:text-5xl">Como o atendimento funciona</h2>
            <p className="mt-6 leading-7 text-cream/65">
              {settings.building}, {links.fullAddress}. Atendimento presencial em Uberaba e on-line para o Triângulo Mineiro.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {principles.map((item, index) => (
              <li key={item} className="reveal-3d card-ink p-6">
                <span className="display text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 leading-7 text-cream/85">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5">
          <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">A estrutura</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">Ambientes do escritório</h2>
            </div>
            <a href={links.mapsDirections} target="_blank" rel="noopener noreferrer" className="text-link">
              <Icon name="pin" size={15} />
              Como chegar
            </a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryOrder.map((slot) => (
              <div key={slot} className="reveal-3d">
                <PhotoFrame src={images[slot].src} alt={images[slot].alt} sizes="(min-width: 1024px) 360px, 50vw" caption={images[slot].alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
