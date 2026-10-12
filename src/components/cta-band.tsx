import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Icon } from "@/components/icons";
import { contact, getSettings } from "@/lib/content/settings";

export async function CtaBand({
  title = "Fale direto com o advogado",
  text = "Atendimento presencial em Uberaba e on-line. A análise inicial considera os documentos, os prazos e as particularidades do caso.",
  message,
  urgent = false,
  label = "Falar com o advogado pelo WhatsApp",
}: {
  title?: string;
  text?: string;
  message?: string;
  urgent?: boolean;
  label?: string;
}) {
  const settings = await getSettings();
  const links = contact(settings);
  const href = message ? links.whatsapp(message) : urgent ? links.whatsappUrgent : links.whatsappDefault;
  return (
    <section className="bg-cream px-5 py-12 md:py-20">
      <div className="reveal-3d grain on-dark bg-night relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-gold/15 px-6 py-12 text-cream shadow-[0_50px_80px_-50px_rgba(12,11,12,0.9)] md:px-14 md:py-16">
        <Image
          src={logo}
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -right-16 -top-10 hidden h-[26rem] w-[26rem] object-contain opacity-[0.06] md:block"
        />
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Atendimento</p>
            <h2 className="display mt-5 text-4xl text-cream md:text-5xl">{title}</h2>
            <p className="mt-5 max-w-xl leading-7 text-cream/70">{text}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <Icon name="whatsapp" size={18} />
              {label}
            </a>
            <Link href="/contato" className="btn btn-line">
              Ver contato e endereço
            </Link>
            <p className="mt-2 flex items-center justify-center gap-2 text-xs text-cream/55 md:justify-start">
              <Icon name="clock" size={14} className="text-gold" />
              {settings.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
