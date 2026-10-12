import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Icon } from "@/components/icons";
import { contact, type Settings } from "@/lib/content/settings";
import { navigation } from "@/lib/site";

export function Footer({ settings }: { settings: Settings }) {
  const links = contact(settings);
  return (
    <footer className="grain on-dark relative overflow-hidden bg-ink text-cream">
      <div aria-hidden className="gold-rule" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image src={logo} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
              <div>
                <p className="display text-3xl leading-none">{settings.name}</p>
                <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-gold">{settings.firm}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-6 text-cream/65">
              {settings.role}. Proteção patrimonial e Direito Imobiliário em Uberaba e no Triângulo Mineiro, com atendimento presencial e on-line.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-cream/45">
              {settings.oab} · {settings.partnerName}, {settings.partnerOab}
            </p>
          </div>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">Contato</p>
            <ul className="mt-5 space-y-4 text-sm">
              <FooterContact icon="whatsapp" label="WhatsApp" href={links.whatsappDefault} external>
                {settings.whatsapp}
              </FooterContact>
              <FooterContact icon="phone" label="Telefone" href={links.tel}>
                {settings.phone}
              </FooterContact>
              <FooterContact icon="mail" label="E-mail" href={links.mailto}>
                <span className="break-all">{settings.email}</span>
              </FooterContact>
              <li>
                <a href={settings.catalogUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  Catálogo de serviços
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">Endereço</p>
            <address className="mt-5 text-sm not-italic leading-6 text-cream/75">
              {settings.building}
              <br />
              {links.fullAddress}
            </address>
            <p className="mt-4 flex items-start gap-2 text-sm text-cream/75">
              <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-gold" />
              {settings.hours}
            </p>
            <a href={links.mapsDirections} target="_blank" rel="noopener noreferrer" className="text-link mt-4">
              Como chegar
              <Icon name="arrow" size={14} />
            </a>
          </div>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">Navegação</p>
            <ul className="mt-5 grid gap-2.5 text-sm text-cream/75">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/urgencias" className="transition hover:text-gold">
                  Urgências
                </Link>
              </li>
              <li>
                <a href={settings.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                  Avaliações no Google
                </a>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="transition hover:text-gold">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">Redes oficiais</p>
          <ul className="flex flex-wrap gap-2">
            {settings.socials.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/12 px-3.5 py-1.5 text-xs text-cream/70 transition hover:border-gold hover:text-gold"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs leading-5 text-cream/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.firm}. Todos os direitos reservados.
          </p>
          <p className="max-w-md">
            Conteúdo informativo, em conformidade com o Código de Ética e Disciplina da OAB. Não constitui consulta jurídica nem garante resultado.
          </p>
          <a
            href="https://www.instagram.com/diego.dev_/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-cream/70 hover:text-gold"
          >
            Desenvolvido por <span className="font-medium text-cream">@diego.dev_</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({
  icon,
  label,
  href,
  external = false,
  children,
}: {
  icon: "whatsapp" | "phone" | "mail";
  label: string;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start gap-3"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-gold transition group-hover:border-gold">
          <Icon name={icon} size={15} />
        </span>
        <span>
          <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-cream/45">{label}</span>
          <span className="mt-0.5 block text-cream/85 transition group-hover:text-gold">{children}</span>
        </span>
      </a>
    </li>
  );
}
