import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const paths = [
    "",
    "/direito-imobiliario",
    "/protecao-patrimonial",
    "/urgencias",
    ...services.map((service) => `/${service.group}/${service.slug}`),
    "/imovel-rural",
    "/escritorio",
    "/blog",
    "/contato",
    "/politica-de-privacidade",
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
