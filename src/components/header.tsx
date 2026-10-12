"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Icon } from "@/components/icons";
import { navigation, type NavItem } from "@/lib/site";

export type HeaderInfo = {
  name: string;
  oab: string;
  phone: string;
  tel: string;
  whatsapp: string;
  hours: string;
  hoursShort: string;
  address: string;
};

export function Header({ info }: { info: HeaderInfo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 text-cream transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-gold/15 bg-ink/92 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-ink"
      }`}
    >
      <div className="hidden border-b border-white/5 bg-black/40 text-[0.72rem] text-cream/60 md:block">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between gap-6 px-5">
          <p className="flex min-w-0 items-center gap-2">
            <Icon name="pin" size={13} className="shrink-0 text-gold" />
            <span className="truncate">{info.address}</span>
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <p className="flex items-center gap-2">
              <Icon name="clock" size={13} className="text-gold" />
              {info.hoursShort}
            </p>
            <a href={info.tel} className="flex items-center gap-2 hover:text-gold">
              <Icon name="phone" size={13} className="text-gold" />
              {info.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-[4.75rem] w-full max-w-7xl items-center justify-between gap-4 px-5">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src={logo}
            alt=""
            width={52}
            height={52}
            priority
            className="h-12 w-12 shrink-0 object-contain transition duration-500 group-hover:scale-105"
          />
          <span className="min-w-0 border-l border-white/10 pl-3">
            <span className="display block whitespace-nowrap text-[1.2rem] leading-none text-cream sm:text-[1.35rem]">{info.name}</span>
            <span className="mt-1.5 block whitespace-nowrap text-[0.6rem] uppercase tracking-[0.2em] text-gold">
              Advocacia · {info.oab}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex" aria-label="Principal">
          {navigation.map((item) => (
            <DesktopItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={info.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold hidden !py-2.5 sm:inline-flex">
            <Icon name="whatsapp" size={16} />
            Agendar análise
          </a>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition hover:border-gold xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-cream transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span className={`absolute left-0 top-1.5 block h-px w-5 bg-cream transition duration-300 ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 block h-px w-5 bg-cream transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          className="menu-pop h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-white/10 bg-ink px-5 pb-28 pt-2 xl:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-white/10 py-4">
                <Link href={item.href} className="display text-2xl text-cream" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-2 grid pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex items-center gap-2 py-2 text-[0.95rem] text-cream/70 hover:text-gold"
                          onClick={() => setOpen(false)}
                        >
                          <span className="h-px w-3 bg-gold/60" aria-hidden />
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href={info.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <Icon name="whatsapp" size={18} />
              Falar com o advogado
            </a>
            <a href={info.tel} className="btn btn-line">
              <Icon name="phone" size={16} />
              {info.phone}
            </a>
            <p className="mt-2 text-center text-xs text-cream/50">{info.hours}</p>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const current = pathname === item.href || pathname.startsWith(`${item.href}/`);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        data-active={current}
        className={`nav-link text-[0.85rem] font-medium ${current ? "text-gold" : "text-cream/80"}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={item.href}
        data-active={current}
        className={`nav-link inline-flex items-center gap-1.5 text-[0.85rem] font-medium ${current ? "text-gold" : "text-cream/80"}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <svg aria-hidden viewBox="0 0 16 16" className={`h-3.5 w-3.5 shrink-0 text-gold transition duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M3.5 6.25 8 10.75l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <div className={`absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-5 [perspective:900px] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <ul
          className={`rounded-2xl border border-gold/20 bg-ink/97 p-2 shadow-[0_40px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl transition duration-200 ${
            open ? "menu-pop visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <li className="px-3 pb-2 pt-2">
            <Link href={item.href} className="text-[0.65rem] uppercase tracking-[0.2em] text-gold hover:text-cream" onClick={() => setOpen(false)}>
              Visão geral · {item.label}
            </Link>
          </li>
          {item.children.map((child) => {
            const active = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/[0.04] hover:text-gold ${
                    active ? "text-gold" : "text-cream/85"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                  <Icon name="arrow" size={14} className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
