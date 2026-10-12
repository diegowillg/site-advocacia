"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";

const items: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Início", icon: "home" },
  { href: "/admin/blog", label: "Blog", icon: "document" },
  { href: "/admin/imagens", label: "Imagens", icon: "building" },
  { href: "/admin/configuracoes", label: "Contato e textos", icon: "contract" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Painel" className="overflow-x-auto border-t border-white/10 lg:border-0">
      <ul className="flex gap-1 px-3 py-2 lg:grid lg:px-3 lg:py-0">
        {items.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active ? "bg-white/10 text-gold" : "text-cream/75 hover:bg-white/5 hover:text-cream"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
