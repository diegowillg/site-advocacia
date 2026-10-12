import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/app/admin/(painel)/blog/post-form";
import { getPost } from "@/lib/content/posts";

export default async function EditPostPage({ params }: PageProps<"/admin/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug, { drafts: true });
  if (!post) notFound();

  return (
    <>
      <Link href="/admin/blog" className="text-sm text-stone hover:text-wine">
        ← Artigos
      </Link>
      <h1 className="display mt-3 text-4xl">Editar artigo</h1>
      <div className="mt-8">
        <PostForm key={post.updatedAt} post={post} />
      </div>
    </>
  );
}
