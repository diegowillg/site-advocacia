import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Icon } from "@/components/icons";
import { jsonLdHtml } from "@/components/json-ld";
import { PostBody } from "@/components/post-body";
import { formatPostDate } from "@/lib/blog";
import { getImages } from "@/lib/content/images";
import { getPost, getPosts } from "@/lib/content/posts";
import { getSettings } from "@/lib/content/settings";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover.src, alt: post.cover.alt }] } : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts, settings, images] = await Promise.all([getPost(slug), getPosts(), getSettings(), getImages()]);
  if (!post) notFound();
  const others = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: settings.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    ...(post.cover ? { image: `${site.url}${post.cover.src}` } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(article)} />
      <header className="grain on-dark bg-night relative overflow-hidden text-cream">
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-16 pt-12 md:pb-20 md:pt-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-cream/55 hover:text-gold">
            <Icon name="arrow" size={14} className="rotate-180" />
            Blog jurídico
          </Link>
          <h1 className="display mt-8 text-[2.6rem] text-cream md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-cream/70">{post.description}</p>
          <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
            <Image src={images.eduardo.src} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/40" />
            <div className="text-sm">
              <p className="font-semibold text-cream">{settings.name}</p>
              <p className="text-cream/55">
                {settings.oab} · {formatPostDate(post.date)}
              </p>
            </div>
          </div>
        </div>
        <div aria-hidden className="gold-rule relative z-10" />
      </header>

      <article className="mx-auto w-full max-w-3xl px-5 py-16 md:py-20">
        {post.cover ? (
          <figure className="frame-gold relative mb-12 aspect-[16/9] overflow-hidden rounded-[1.2rem]">
            <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </figure>
        ) : null}
        <PostBody source={post.body} />
        <aside className="mt-14 flex gap-4 rounded-2xl border border-gold/40 bg-[#fbf6ea] p-6 text-sm leading-6 text-ink/75">
          <Icon name="scale" size={22} className="shrink-0 text-gold-deep" />
          <p>
            Conteúdo informativo. Não constitui consulta jurídica nem garante resultado. Cada caso depende dos documentos e das circunstâncias. {settings.name}, {settings.oab}.
          </p>
        </aside>

        {others.length ? (
          <nav aria-label="Outros artigos" className="mt-14 border-t border-line pt-10">
            <p className="eyebrow">Continue lendo</p>
            <ul className="mt-6 grid gap-4">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={`/blog/${item.slug}`} className="group flex items-center justify-between gap-6">
                    <span className="display text-2xl transition group-hover:text-wine md:text-3xl">{item.title}</span>
                    <Icon name="arrow" size={18} className="shrink-0 text-wine transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
      <CtaBand title="Quer uma análise do seu caso?" />
    </>
  );
}
