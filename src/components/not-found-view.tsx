import Link from "next/link";
import { Icon } from "@/components/icons";

export function NotFoundView({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="grain on-dark bg-night relative overflow-hidden text-cream">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-28 text-center md:py-36">
        <p className="display gold-text text-[7rem] leading-none md:text-[10rem]">404</p>
        <p className="eyebrow mt-6 justify-center">Página não encontrada</p>
        <h1 className="display mt-5 text-4xl text-cream md:text-5xl">Esse endereço não existe</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-cream/65">
          O conteúdo pode ter mudado de lugar. Volte ao início ou fale direto com o escritório.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-gold">
            Ir para a página inicial
          </Link>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <Icon name="whatsapp" size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
