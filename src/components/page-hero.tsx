import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Tilt } from "@/components/tilt";

type Crumb = { href: string; label: string };

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image?: { src: string; alt: string };
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="grain on-dark bg-night relative overflow-hidden text-cream">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:120px_100%]" />
      <div
        className={`relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-10 md:pb-24 md:pt-14 ${image ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}
      >
        <div>
          <nav aria-label="Trilha" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/50">
              <li>
                <Link href="/" className="hover:text-gold">
                  Início
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={crumb.href} className="hover:text-gold">
                    {crumb.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <span className="text-cream/80" aria-current="page">
                  {title}
                </span>
              </li>
            </ol>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-6 max-w-3xl text-[2.7rem] text-cream md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-cream/72 md:text-lg md:leading-8">{lede}</p>
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
        {image ? (
          <div className="relative hidden lg:block">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.4rem] border border-gold/30" />
            <Tilt intensity={10}>
              <figure className="frame-gold relative aspect-[4/5] overflow-hidden rounded-[1.4rem] shadow-[0_50px_70px_-40px_rgba(0,0,0,0.95)]">
                <Image src={image.src} alt={image.alt} fill sizes="440px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs text-cream/80">
                  <Icon name="pin" size={14} className="text-gold" />
                  {image.alt}
                </figcaption>
              </figure>
            </Tilt>
          </div>
        ) : null}
      </div>
      <div aria-hidden className="gold-rule relative z-10" />
    </section>
  );
}
