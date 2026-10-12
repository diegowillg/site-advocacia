"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { saveImageAction } from "@/app/admin/actions";
import { inputClass } from "@/app/admin/styles";
import { Field, Notice, SubmitButton } from "@/app/admin/ui";

export function ImageSlotForm({
  slot,
  label,
  usage,
  image,
  custom,
}: {
  slot: string;
  label: string;
  usage: string;
  image: { src: string; alt: string };
  custom: boolean;
}) {
  const [state, action] = useActionState(saveImageAction, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState(image.alt);

  return (
    <form action={action} className="grid">
      <input type="hidden" name="slot" value={slot} />
      <div className="relative aspect-[4/3] bg-paper">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[0.68rem] font-semibold text-cream backdrop-blur">
          {preview ? "Prévia (ainda não salva)" : custom ? "Personalizada" : "Original"}
        </span>
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="display text-2xl">{label}</p>
          <p className="mt-1 text-xs text-stone">Onde aparece: {usage}</p>
        </div>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="w-full min-w-0 max-w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:text-cream"
        />
        <Field label="Descrição da foto" hint="Lida por leitores de tela e pelo Google.">
          <input name="alt" value={alt} onChange={(event) => setAlt(event.target.value)} className={inputClass} />
        </Field>
        <Notice state={state} />
        <SubmitButton pending="Enviando…">{preview ? "Trocar imagem" : "Salvar"}</SubmitButton>
      </div>
    </form>
  );
}
