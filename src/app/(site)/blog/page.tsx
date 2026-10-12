import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Panel } from "@/components/tilt";
import { formatPostDate } from "@/lib/blog";
import { getImages } from "@/lib/content/images";
import { getPosts } from "@/lib/content/posts";

export const metadata: Metadata = {
  description:
    "Análises sobre contratos imobiliários, regularização, leilões, penhoras e proteção patrimonial em Uberaba e região.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, images] = await Promise.all([getPosts(), getImages()]);

  return (
    <>
      <PageHero
        eyebrow="Conteúdo informativo"
        title="Blog jurídico"
        lede="Textos sobre contratos imobiliários, regularização, leilões, penhoras, execuções e proteção patrimonial. Cada caso concreto depende dos documentos."
        image={images.reunioes}
      />
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-14 md:py-28">
        {posts.length === 0 ? (
          <p className="text-center text-stone">Nenhum artigo publicado ainda.</p>
        ) : null}
        {posts.map((post, index) => (
          <article key={post.slug} className="reveal-3d">
            <Panel className={post.cover ? "!p-0" : "md:!p-12"}>
              <Link
                href={`/blog/${post.slug}`}
                className={`go-card ${post.cover ? "md:grid md:grid-cols-[20rem_1fr]" : "md:grid md:grid-cols-[8rem_1fr] md:gap-10"}`}
              >
                {post.cover ? (
                  <span className="relative block aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-full">
                    <Image src={post.cover.src} alt={post.cover.alt} fill sizes="(min-width: 768px) 320px, 100vw" className="object-cover" />
                  </span>
                ) : (
                  <span className="display hidden text-7xl leading-none text-line md:block">{String(index + 1).padStart(2, "0")}</span>
                )}
                <span className={`flex flex-col ${post.cover ? "p-6 md:p-10" : ""}`}>
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone">
                    <Icon name="document" size={15} className="text-wine" />
                    {formatPostDate(post.date)}
                  </span>
                  <span className="display mt-4 text-3xl md:text-[2.6rem] md:leading-tight">{post.title}</span>
                  <span className="mt-4 max-w-3xl leading-7 text-stone">{post.excerpt}</span>
                  <span className="go-label">
                    Ler artigo
                    <Icon name="arrow" size={15} />
                  </span>
                </span>
              </Link>
            </Panel>
          </article>
        ))}
      </section>
      <CtaBand title="Quer uma análise do seu caso?" />
    </>
  );
}
