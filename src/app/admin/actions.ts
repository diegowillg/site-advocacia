"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  clearFailures,
  endSession,
  isConfigured,
  loginBlocked,
  registerFailure,
  requireAdmin,
  startSession,
} from "@/lib/auth/session";
import { hasFile, storeImage } from "@/lib/content/image-upload";
import { autoExcerpt } from "@/lib/content/markdown";
import { getSavedImages, imageSlots, isImageSlot, saveImages } from "@/lib/content/images";
import { getAllPosts, slugify, writePosts, type Post } from "@/lib/content/posts";
import { defaultSettings, getSettings, saveSettings, type Settings, type Social } from "@/lib/content/settings";
import { removeUpload } from "@/lib/content/store";

export type FormState = { error?: string; ok?: string } | undefined;

function text(form: FormData, key: string, max = 5000) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

function refreshSite() {
  revalidatePath("/", "layout");
}

/* ---------------- Sessão ---------------- */

export async function loginAction(_state: FormState, form: FormData): Promise<FormState> {
  if (!isConfigured()) return { error: "O acesso ao painel ainda não foi configurado no servidor (.env)." };
  const list = await headers();
  const ip = list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "local";
  if (loginBlocked(ip)) return { error: "Muitas tentativas. Aguarde 15 minutos e tente de novo." };

  const ok = await checkCredentials(text(form, "email", 200), String(form.get("password") ?? ""));
  if (!ok) {
    registerFailure(ip);
    return { error: "E-mail ou senha incorretos." };
  }
  clearFailures(ip);
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

/* ---------------- Blog ---------------- */

export async function savePostAction(_state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const original = text(form, "originalSlug", 120);
  const title = text(form, "title", 200);
  const body = text(form, "body", 100_000);
  const slug = slugify(text(form, "slug", 120) || title);
  const date = text(form, "date", 10);

  if (!title) return { error: "Informe o título." };
  if (!slug) return { error: "Informe um endereço (slug) válido." };
  if (!body) return { error: "O texto do artigo está vazio." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Data inválida." };

  const posts = await getAllPosts();
  const current = original ? posts.find((post) => post.slug === original) : undefined;
  if (original && !current) return { error: "Este artigo não existe mais. Recarregue a página." };
  if (posts.some((post) => post.slug === slug && post.slug !== original)) {
    return { error: "Já existe outro artigo com este endereço. Altere o slug." };
  }

  let cover = current?.cover;
  const coverAlt = text(form, "coverAlt", 200) || title;
  try {
    const file = form.get("cover");
    if (hasFile(file)) {
      await removeUpload(cover?.src);
      cover = { src: await storeImage(file, `blog-${slug}`, 1600), alt: coverAlt };
    } else if (form.get("removeCover") === "on") {
      await removeUpload(cover?.src);
      cover = undefined;
    } else if (cover) {
      cover = { ...cover, alt: coverAlt };
    }
  } catch (error) {
    return { error: (error as Error).message };
  }

  const excerpt = text(form, "excerpt", 400);
  const post: Post = {
    slug,
    title,
    date,
    body,
    excerpt: excerpt || autoExcerpt(body),
    description: text(form, "description", 300) || excerpt || title,
    published: form.get("published") === "on",
    cover,
    updatedAt: new Date().toISOString(),
  };

  await writePosts([...posts.filter((item) => item.slug !== original && item.slug !== slug), post]);
  refreshSite();
  redirect(`/admin/blog?salvo=${encodeURIComponent(slug)}`);
}

export async function deletePostAction(form: FormData) {
  await requireAdmin();
  const slug = text(form, "slug", 120);
  const posts = await getAllPosts();
  const target = posts.find((post) => post.slug === slug);
  if (target) {
    await removeUpload(target.cover?.src);
    await writePosts(posts.filter((post) => post.slug !== slug));
    refreshSite();
  }
  redirect("/admin/blog?apagado=1");
}

/* ---------------- Imagens ---------------- */

export async function saveImageAction(_state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const slot = text(form, "slot", 40);
  if (!isImageSlot(slot)) return { error: "Imagem desconhecida." };
  const saved = await getSavedImages();
  const current = saved[slot];
  const alt = text(form, "alt", 200) || current?.alt || imageSlots[slot].alt;
  const file = form.get("file");

  let src = current?.src;
  if (hasFile(file)) {
    try {
      src = await storeImage(file, slot);
    } catch (error) {
      return { error: (error as Error).message };
    }
    await removeUpload(current?.src);
  }
  await saveImages({ ...saved, [slot]: { src: src ?? imageSlots[slot].src, alt } });
  refreshSite();
  return { ok: hasFile(file) ? "Imagem trocada." : "Descrição salva." };
}

export async function resetImageAction(form: FormData) {
  await requireAdmin();
  const slot = text(form, "slot", 40);
  if (!isImageSlot(slot)) return;
  const saved = await getSavedImages();
  await removeUpload(saved[slot]?.src);
  delete saved[slot];
  await saveImages(saved);
  refreshSite();
  redirect("/admin/imagens?restaurado=1");
}

/* ---------------- Informações do site ---------------- */

// Brasil: DDD + 8 ou 9 dígitos, com ou sem o 55 na frente.
function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^(55)?[1-9]{2}9?\d{8}$/.test(digits);
}

export async function saveSettingsAction(_state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const current = await getSettings();
  const next: Settings = { ...current };

  const stringKeys = Object.keys(defaultSettings).filter(
    (key) => typeof defaultSettings[key as keyof Settings] === "string",
  ) as (keyof Settings)[];
  for (const key of stringKeys) {
    if (form.has(key)) (next as Record<string, unknown>)[key] = text(form, key, 600);
  }

  const rating = Number(text(form, "googleRating", 5).replace(",", "."));
  const total = Number.parseInt(text(form, "googleTotal", 8), 10);
  if (Number.isNaN(rating) || rating < 1 || rating > 5) return { error: "A nota do Google deve ficar entre 1 e 5." };
  if (Number.isNaN(total) || total < 0) return { error: "Quantidade de avaliações inválida." };
  next.googleRating = rating;
  next.googleTotal = total;

  const socials: Social[] = [];
  for (const line of text(form, "socials", 4000).split("\n")) {
    const [name, href] = line.split("|").map((part) => part.trim());
    if (!name && !href) continue;
    if (!name || !/^https?:\/\//i.test(href ?? "")) return { error: `Rede social inválida: “${line.trim()}”. Use Nome | https://…` };
    socials.push({ name, href });
  }
  next.socials = socials;

  if (!validPhone(next.whatsapp)) return { error: "WhatsApp inválido. Use DDD + número, ex.: (34) 99964-7010." };
  if (!validPhone(next.phone)) return { error: "Telefone inválido. Use DDD + número, ex.: (34) 3333-4444." };
  for (const key of ["catalogUrl", "googleProfileUrl"] as const) {
    if (next[key] && !/^https:\/\//i.test(next[key])) return { error: "Os links precisam começar com https://" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) return { error: "E-mail inválido." };
  if (!next.heroTitle) return { error: "O título da página inicial não pode ficar vazio." };

  await saveSettings(next);
  refreshSite();
  return { ok: "Informações salvas. O site já foi atualizado." };
}
