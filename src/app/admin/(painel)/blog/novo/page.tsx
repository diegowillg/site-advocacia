import Link from "next/link";
import { PostForm } from "@/app/admin/(painel)/blog/post-form";

export default function NewPostPage() {
  return (
    <>
      <Link href="/admin/blog" className="text-sm text-stone hover:text-wine">
        ← Artigos
      </Link>
      <h1 className="display mt-3 text-4xl">Novo artigo</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </>
  );
}
