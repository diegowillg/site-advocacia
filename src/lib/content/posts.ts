import { cache } from "react";
import { seedPosts } from "@/lib/blog";
import { blocksToMarkdown } from "@/lib/content/markdown";
import { readJson, writeJson } from "@/lib/content/store";

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  body: string;
  cover?: { src: string; alt: string };
  published: boolean;
  updatedAt: string;
};

const seeds: Post[] = seedPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  excerpt: post.excerpt,
  date: post.date,
  body: blocksToMarkdown(post.blocks),
  published: true,
  updatedAt: `${post.date}T12:00:00.000Z`,
}));

const byNewest = (a: Post, b: Post) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt);

// Todos os posts, incluindo rascunhos (uso do painel).
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const saved = await readJson<Post[]>("posts.json");
  return [...(saved ?? seeds)].sort(byNewest);
});

// Só o que aparece no site.
export const getPosts = cache(async () => (await getAllPosts()).filter((post) => post.published));

export async function getPost(slug: string, { drafts = false } = {}) {
  const list = drafts ? await getAllPosts() : await getPosts();
  return list.find((post) => post.slug === slug);
}

export async function writePosts(posts: Post[]) {
  await writeJson("posts.json", [...posts].sort(byNewest));
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}
