import Link from "next/link";
import { deletePostAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/confirm-button";
import { StatusBadge } from "@/app/admin/status-badge";
import { Icon } from "@/components/icons";
import { formatPostDate } from "@/lib/blog";
import { getAllPosts } from "@/lib/content/posts";

export default async function AdminBlog({ searchParams }: PageProps<"/admin/blog">) {
  const [posts, params] = await Promise.all([getAllPosts(), searchParams]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="display mt-4 text-4xl md:text-5xl">Artigos</h1>
        </div>
        <Link href="/admin/blog/novo" className="btn btn-dark">
          <Icon name="document" size={16} />
          Novo artigo
        </Link>
      </div>

      {params.salvo ? (
        <p role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Artigo salvo.{" "}
          <Link href={`/blog/${params.salvo}`} target="_blank" className="font-semibold underline">
            Ver no site ↗
          </Link>
        </p>
      ) : null}
      {params.apagado ? (
        <p role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Artigo apagado.
        </p>
      ) : null}

      <ul className="mt-8 grid gap-3">
        {posts.map((post) => (
          <li key={post.slug} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge published={post.published} />
                <span className="text-xs text-stone">{formatPostDate(post.date)}</span>
              </div>
              <p className="display mt-2 text-2xl leading-tight">{post.title}</p>
              <p className="mt-1 truncate text-sm text-stone">/blog/{post.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {post.published ? (
                <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-outline !px-4 !py-2 text-sm">
                  Ver
                </Link>
              ) : null}
              <Link href={`/admin/blog/${post.slug}`} className="btn btn-dark !px-4 !py-2 text-sm">
                Editar
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="slug" value={post.slug} />
                <ConfirmButton message={`Apagar o artigo “${post.title}”? Esta ação não pode ser desfeita.`}>Apagar</ConfirmButton>
              </form>
            </div>
          </li>
        ))}
        {posts.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-line p-10 text-center text-stone">Nenhum artigo ainda.</li>
        ) : null}
      </ul>
    </>
  );
}
