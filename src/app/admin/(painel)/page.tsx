import Link from "next/link";
import { StatusBadge } from "@/app/admin/status-badge";
import { Icon, type IconName } from "@/components/icons";
import { formatPostDate } from "@/lib/blog";
import { getSavedImages } from "@/lib/content/images";
import { getAllPosts } from "@/lib/content/posts";

export default async function AdminHome() {
  const [posts, images] = await Promise.all([getAllPosts(), getSavedImages()]);
  const published = posts.filter((post) => post.published).length;
  const drafts = posts.length - published;

  const cards: { href: string; icon: IconName; title: string; text: string }[] = [
    { href: "/admin/blog/novo", icon: "document", title: "Escrever artigo", text: "Publique um novo texto no blog jurídico." },
    { href: "/admin/imagens", icon: "building", title: "Trocar imagens", text: `Fotos do site. ${Object.keys(images).length} personalizada(s).` },
    { href: "/admin/configuracoes", icon: "phone", title: "Contato e textos", text: "Telefones, endereço, horários, redes e chamada principal." },
  ];

  return (
    <>
      <p className="eyebrow">Painel</p>
      <h1 className="display mt-4 text-4xl md:text-5xl">Olá, Dr. Eduardo</h1>
      <p className="mt-3 max-w-xl text-stone">
        Tudo o que você salvar aqui aparece no site na mesma hora. Artigos em rascunho ficam visíveis só para você.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card-surface group p-6 transition hover:-translate-y-0.5">
            <span className="icon-badge">
              <Icon name={card.icon} size={20} />
            </span>
            <p className="display mt-5 text-2xl">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-stone">{card.text}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-3xl">Artigos recentes</h2>
          <p className="text-sm text-stone">
            {published} publicado(s) · {drafts} rascunho(s)
          </p>
        </div>
        <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white">
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug}>
              <Link href={`/admin/blog/${post.slug}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-cream">
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{post.title}</span>
                  <span className="text-xs text-stone">{formatPostDate(post.date)}</span>
                </span>
                <StatusBadge published={post.published} />
              </Link>
            </li>
          ))}
          {posts.length === 0 ? <li className="px-5 py-6 text-sm text-stone">Nenhum artigo ainda.</li> : null}
        </ul>
      </section>
    </>
  );
}
