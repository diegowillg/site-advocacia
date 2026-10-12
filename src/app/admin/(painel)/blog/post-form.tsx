"use client";

import Image from "next/image";
import { useActionState, useRef, useState } from "react";
import { savePostAction } from "@/app/admin/actions";
import { inputClass } from "@/app/admin/styles";
import { Field, Notice, SubmitButton } from "@/app/admin/ui";
import { PostBody } from "@/components/post-body";
import type { Post } from "@/lib/content/posts";

const HELP = [
  ["## Título da seção", "título"],
  ["- item", "lista"],
  ["1. item", "lista numerada"],
  ["**texto**", "negrito"],
  ["[texto](https://…)", "link"],
  ["> frase", "destaque"],
];

export function PostForm({ post }: { post?: Post }) {
  const [state, action] = useActionState(savePostAction, undefined);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [body, setBody] = useState(post?.body ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  function wrap(before: string, after = "", placeholder = "texto") {
    const el = textarea.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = body.slice(start, end) || placeholder;
    const next = body.slice(0, start) + before + selected + after + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function linePrefix(prefix: string) {
    const el = textarea.current;
    if (!el) return;
    const start = body.lastIndexOf("\n", el.selectionStart - 1) + 1;
    const needsGap = start > 0 && body.slice(0, start).trim() && !body.slice(0, start).endsWith("\n\n");
    const next = body.slice(0, start) + (needsGap ? "\n" : "") + prefix + body.slice(start);
    setBody(next);
    requestAnimationFrame(() => el.focus());
  }

  return (
    <form action={action} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />

      <div className="grid min-w-0 gap-6">
        <Field label="Título">
          <input
            name="title"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
            className={`${inputClass} !font-serif !text-2xl`}
            placeholder="Ex.: O que fazer quando o imóvel vai a leilão"
          />
        </Field>

        <div className="rounded-2xl border border-line bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
            <div className="flex flex-wrap gap-1" role="toolbar" aria-label="Formatação">
              <ToolButton onClick={() => linePrefix("## ")}>Título</ToolButton>
              <ToolButton onClick={() => wrap("**", "**")}>
                <b>N</b>
              </ToolButton>
              <ToolButton onClick={() => wrap("*", "*")}>
                <i>I</i>
              </ToolButton>
              <ToolButton onClick={() => linePrefix("- ")}>• Lista</ToolButton>
              <ToolButton onClick={() => linePrefix("1. ")}>1. Lista</ToolButton>
              <ToolButton onClick={() => linePrefix("> ")}>Destaque</ToolButton>
              <ToolButton onClick={() => wrap("[", "](https://)", "texto do link")}>Link</ToolButton>
            </div>
            <div className="flex rounded-lg bg-paper p-0.5 text-sm">
              {(["write", "preview"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={`rounded-md px-3 py-1 ${tab === value ? "bg-white font-semibold shadow-sm" : "text-stone"}`}
                >
                  {value === "write" ? "Escrever" : "Pré-visualizar"}
                </button>
              ))}
            </div>
          </div>
          <textarea
            ref={textarea}
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            rows={22}
            className={`block w-full resize-y rounded-b-2xl border-0 bg-white px-5 py-4 font-mono text-[0.92rem] leading-7 outline-none ${tab === "preview" ? "hidden" : ""}`}
            placeholder={"Escreva o artigo aqui.\n\nDeixe uma linha em branco entre os parágrafos.\n\n## Use dois # para um título de seção"}
          />
          {tab === "preview" ? (
            <div className="min-h-[24rem] px-6 py-6">
              {body.trim() ? <PostBody source={body} /> : <p className="text-stone">Nada para mostrar ainda.</p>}
            </div>
          ) : null}
          <details className="border-t border-line px-5 py-3 text-xs text-stone">
            <summary className="cursor-pointer font-semibold text-ink">Como formatar</summary>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {HELP.map(([code, label]) => (
                <li key={code}>
                  <code className="rounded bg-paper px-1.5 py-0.5 text-ink">{code}</code> {label}
                </li>
              ))}
              <li className="sm:col-span-2">Deixe uma linha em branco entre parágrafos.</li>
            </ul>
          </details>
        </div>

        <Field label="Resumo" hint="Aparece nos cartões do blog e da página inicial. Se ficar vazio, usamos o começo do texto.">
          <textarea name="excerpt" rows={3} value={excerpt} onChange={(event) => setExcerpt(event.target.value)} className={inputClass} maxLength={400} />
        </Field>
        <Field label="Descrição para o Google" hint="Uma ou duas frases (até ~160 caracteres) que aparecem nos resultados de busca.">
          <textarea name="description" rows={2} value={description} onChange={(event) => setDescription(event.target.value)} className={inputClass} maxLength={300} />
        </Field>
      </div>

      <aside className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-6 xl:sticky xl:top-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 rounded-2xl border border-line bg-white p-5">
          <label className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold">Publicado</span>
              <span className="text-xs text-stone">Desligado = rascunho</span>
            </span>
            <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-5 w-5 accent-[var(--color-wine)]" />
          </label>
          <Field label="Data">
            <input type="date" name="date" required defaultValue={post?.date ?? today} className={inputClass} />
          </Field>
          <Field label="Endereço (slug)" hint={<span className="break-all">O link fica: /blog/{slug || "…"}</span>}>
            <input
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(slugify(event.target.value));
              }}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 rounded-2xl border border-line bg-white p-5">
          <p className="text-sm font-semibold">Imagem de capa (opcional)</p>
          {coverPreview || post?.cover ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-paper">
              {coverPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <Image src={post!.cover!.src} alt="" fill sizes="288px" className="object-cover" />
              )}
            </div>
          ) : null}
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setCoverPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="w-full min-w-0 max-w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-cream"
          />
          <Field label="Descrição da imagem" hint="Para acessibilidade e Google.">
            <input name="coverAlt" defaultValue={post?.cover?.alt} className={inputClass} />
          </Field>
          {post?.cover ? (
            <label className="flex items-center gap-2 text-sm text-red-700">
              <input type="checkbox" name="removeCover" className="accent-red-700" />
              Remover a capa
            </label>
          ) : null}
        </div>

        <Notice state={state} />
        <SubmitButton className="w-full">{post ? "Salvar alterações" : "Publicar artigo"}</SubmitButton>
      </aside>
    </form>
  );
}

function ToolButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="rounded-md px-2.5 py-1.5 text-sm text-ink/80 transition hover:bg-paper hover:text-ink">
      {children}
    </button>
  );
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .slice(0, 90);
}
