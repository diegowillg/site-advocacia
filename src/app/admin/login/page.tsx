import Image from "next/image";
import { redirect } from "next/navigation";
import logo from "@/assets/logo.png";
import { LoginForm } from "@/app/admin/login/login-form";
import { getSession, isConfigured } from "@/lib/auth/session";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  const configured = isConfigured();

  return (
    <main className="grain bg-night relative flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Image src={logo} alt="" width={72} height={72} priority className="h-18 w-18 object-contain" />
          <h1 className="display mt-4 text-3xl text-cream">Painel do site</h1>
          <p className="mt-1 text-sm text-cream/55">Acesso restrito ao escritório</p>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-cream p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
          {configured ? (
            <LoginForm />
          ) : (
            <div className="space-y-3 text-sm leading-6 text-ink/80">
              <p className="font-semibold text-ink">O acesso ainda não foi configurado.</p>
              <p>
                No servidor, rode <code className="rounded bg-sand px-1.5 py-0.5">npm run admin:senha -- &quot;sua senha&quot;</code> e copie as linhas geradas para o
                arquivo <code className="rounded bg-sand px-1.5 py-0.5">.env</code>, junto com <code className="rounded bg-sand px-1.5 py-0.5">ADMIN_EMAIL</code>. Depois reinicie o site.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
