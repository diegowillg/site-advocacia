import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Panel, Tilt } from "@/components/tilt";
import type { Service } from "@/lib/services";
import { getImages, serviceImageSlot } from "@/lib/content/images";
import { contact, getSettings } from "@/lib/content/settings";
import { navigation } from "@/lib/site";

export async function ServiceView({ service }: { service: Service }) {
  const [settings, images] = await Promise.all([getSettings(), getImages()]);
  const links = contact(settings);
  const area = navigation.find((item) => item.href === `/${service.group}`);
  const whatsapp = links.whatsapp(service.whatsapp);
  const slot = serviceImageSlot[service.slug];
  const siblings = area?.children?.filter((child) => !child.href.endsWith(`/${service.slug}`)) ?? [];

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lede={service.lede}
        image={slot ? images[slot] : undefined}
        crumbs={area ? [{ href: area.href, label: area.label }] : []}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <Icon name="whatsapp" size={18} />
            Falar sobre este caso
          </a>
          <a href="#duvidas" className="btn btn-line">
            Dúvidas frequentes
          </a>
        </div>
      </PageHero>

      <section className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-14 md:py-28 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="reveal">
            <p className="eyebrow">Quando se aplica</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">Situações mais comuns</h2>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {service.situations.map((item, index) => (
              <li key={item} className="reveal-3d">
                <Panel className="flex gap-4 text-[0.95rem] leading-7">
                  <span className="display text-2xl leading-none text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </Panel>
              </li>
            ))}
          </ul>

          <div className="reveal mt-20">
            <p className="eyebrow">Pontos de atenção</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">O que a análise considera</h2>
          </div>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {service.points.map((point) => (
              <li key={point} className="reveal flex gap-4 py-5 leading-7 text-ink/85">
                <Icon name="check" size={20} className="mt-1 shrink-0 text-wine" />
                {point}
              </li>
            ))}
          </ul>

          <aside className="reveal mt-10 flex gap-4 rounded-2xl border border-gold/40 bg-[#fbf6ea] p-6 text-sm leading-6 text-ink/80">
            <Icon name="scale" size={22} className="shrink-0 text-gold-deep" />
            <p>{service.note}</p>
          </aside>

          <div id="duvidas" className="scroll-mt-40">
            <div className="reveal mt-20">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2 className="display mt-5 text-4xl md:text-5xl">Perguntas sobre {service.title.toLowerCase()}</h2>
            </div>
            <div className="mt-8">
              <FaqList items={service.questions} />
            </div>
          </div>
        </div>

        <aside className="self-start lg:sticky lg:top-36">
          <Tilt intensity={6}>
            <div className="card-ink p-7">
              <p className="eyebrow on-dark">Atendimento</p>
              <p className="display mt-4 text-2xl text-cream">Envie os documentos para uma análise inicial</p>
              <p className="mt-3 text-sm leading-6 text-cream/65">Contrato, intimação, matrícula ou o que tiver em mãos. A conversa é direta com o advogado.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6 w-full">
                <Icon name="whatsapp" size={18} />
                WhatsApp
              </a>
              <a href={links.tel} className="btn btn-line mt-3 w-full text-cream">
                <Icon name="phone" size={16} />
                {settings.phone}
              </a>
              <p className="mt-5 flex items-center gap-2 text-xs text-cream/50">
                <Icon name="clock" size={14} className="text-gold" />
                {settings.hoursShort}
              </p>
            </div>
          </Tilt>

          {siblings.length ? (
            <nav aria-label={`Outros serviços em ${area?.label}`} className="mt-8">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone">Também em {area?.label}</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {siblings.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="group flex items-center justify-between py-3.5 text-sm font-medium transition hover:text-wine">
                      {child.label}
                      <Icon name="arrow" size={15} className="text-stone transition group-hover:translate-x-1 group-hover:text-wine" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </section>

      <CtaBand message={service.whatsapp} />
    </>
  );
}

export function AreaLinks({ href }: { href: string }) {
  const item = navigation.find((entry) => entry.href === href);
  if (!item?.children?.length) return null;

  return (
    <section className="bg-paper py-14 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="reveal">
          <p className="eyebrow">Serviços</p>
          <h2 className="display mt-5 text-4xl md:text-5xl">Nesta área</h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {item.children.map((child, index) => (
            <li key={child.href} className="reveal-3d">
              <Panel className="!p-0">
                <Link href={child.href} className="go-card p-6 md:p-7">
                  <span className="display text-3xl leading-none text-line">{String(index + 1).padStart(2, "0")}</span>
                  <span className="display mt-6 text-2xl">{child.label}</span>
                  <span className="go-label">
                    Ver detalhes
                    <Icon name="arrow" size={15} />
                  </span>
                </Link>
              </Panel>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
