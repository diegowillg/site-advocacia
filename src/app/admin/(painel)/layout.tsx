import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/app/admin/(painel)/nav";
import { requireAdmin } from "@/lib/auth/session";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdmin();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-ink text-cream lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block lg:px-6 lg:py-7">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span>
              <span className="display block text-lg leading-none">Painel do site</span>
              <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.2em] text-gold">Dr. Eduardo Bonifácio</span>
            </span>
          </Link>
          <Link href="/" target="_blank" className="text-xs text-cream/60 underline-offset-4 hover:text-gold hover:underline lg:hidden">
            Ver site
          </Link>
        </div>
        <AdminNav />
        <div className="hidden border-t border-white/10 px-6 py-5 text-xs text-cream/50 lg:absolute lg:inset-x-0 lg:bottom-0 lg:block">
          <p className="truncate">{session.sub}</p>
          <div className="mt-3 flex items-center justify-between">
            <Link href="/" target="_blank" className="hover:text-gold">
              Ver site ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-gold">
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <main className="mx-auto w-full max-w-5xl px-5 py-8 md:px-10 md:py-12">{children}</main>
        <form action={logoutAction} className="px-5 pb-10 text-center lg:hidden">
          <button type="submit" className="text-sm text-stone underline underline-offset-4">
            Sair do painel
          </button>
        </form>
      </div>
    </div>
  );
}
