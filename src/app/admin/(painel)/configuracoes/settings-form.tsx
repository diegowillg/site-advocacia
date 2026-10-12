"use client";

import { useActionState, useState } from "react";
import { saveSettingsAction } from "@/app/admin/actions";
import { inputClass } from "@/app/admin/styles";
import { Field, Notice, SubmitButton } from "@/app/admin/ui";
import type { Settings } from "@/lib/content/settings";

type Key = Exclude<keyof Settings, "socials">;
type FieldDef = { key: Key; label: string; hint?: string; long?: boolean; wide?: boolean; type?: string };

const SECTIONS: { title: string; text?: string; fields: FieldDef[] }[] = [
  {
    title: "Página inicial",
    text: "Coloque entre asteriscos a palavra que deve aparecer em dourado. Ex.: Defenda seu imóvel *antes* que o prazo acabe",
    fields: [
      { key: "heroEyebrow", label: "Linha acima do título", wide: true },
      { key: "heroTitle", label: "Título principal", wide: true },
      { key: "heroSubtitle", label: "Texto abaixo do título", long: true, wide: true },
    ],
  },
  {
    title: "Contato",
    fields: [
      { key: "whatsapp", label: "WhatsApp", hint: "Com DDD. Ex.: (34) 99964-7010" },
      { key: "phone", label: "Telefone", hint: "Com DDD." },
      { key: "email", label: "E-mail", type: "email" },
      { key: "catalogUrl", label: "Link do catálogo no WhatsApp", type: "url" },
    ],
  },
  {
    title: "Endereço e horário",
    fields: [
      { key: "building", label: "Edifício" },
      { key: "street", label: "Rua, número e sala" },
      { key: "neighborhood", label: "Bairro" },
      { key: "city", label: "Cidade/UF" },
      { key: "cep", label: "CEP" },
      { key: "hours", label: "Horário (completo)", hint: "Ex.: Segunda a sábado, das 8h às 21h" },
      { key: "hoursShort", label: "Horário (curto)", hint: "Ex.: Seg. a sáb., 8h às 21h" },
    ],
  },
  {
    title: "Advogados",
    fields: [
      { key: "name", label: "Nome de exibição" },
      { key: "oab", label: "OAB" },
      { key: "role", label: "Especialidade" },
      { key: "firm", label: "Nome do escritório" },
      { key: "partnerName", label: "Sócio" },
      { key: "partnerOab", label: "OAB do sócio" },
    ],
  },
  {
    title: "Google",
    text: "O site tenta ler a nota e as avaliações direto do Google. Estes números são usados quando o Google não responde.",
    fields: [
      { key: "googleRating", label: "Nota", hint: "De 1 a 5. Ex.: 5,0" },
      { key: "googleTotal", label: "Quantidade de avaliações", type: "number" },
      { key: "googleProfileUrl", label: "Link do perfil no Google", type: "url", wide: true },
    ],
  },
];

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action] = useActionState(saveSettingsAction, undefined);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(settings).filter(([key]) => key !== "socials").map(([key, value]) => [key, String(value)])),
  );
  const [socials, setSocials] = useState(settings.socials.map((item) => `${item.name} | ${item.href}`).join("\n"));

  const set = (key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  return (
    <form action={action} className="grid gap-8">
      {SECTIONS.map((section) => (
        <fieldset key={section.title} className="rounded-2xl border border-line bg-white p-5 md:p-7">
          <legend className="display px-2 text-2xl">{section.title}</legend>
          {section.text ? <p className="mb-5 text-sm text-stone">{section.text}</p> : null}
          <div className="grid gap-5 md:grid-cols-2">
            {section.fields.map((field) => (
              <Field key={field.key} label={field.label} hint={field.hint} className={field.wide ? "md:col-span-2" : ""}>
                {field.long ? (
                  <textarea name={field.key} rows={3} value={values[field.key]} onChange={set(field.key)} className={inputClass} />
                ) : (
                  <input
                    name={field.key}
                    type={field.type ?? "text"}
                    value={values[field.key]}
                    onChange={set(field.key)}
                    className={inputClass}
                  />
                )}
              </Field>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className="rounded-2xl border border-line bg-white p-5 md:p-7">
        <legend className="display px-2 text-2xl">Redes sociais</legend>
        <Field label="Uma rede por linha, no formato Nome | link" hint="Apague a linha para remover a rede. A ordem aqui é a ordem no site.">
          <textarea
            name="socials"
            rows={9}
            value={socials}
            onChange={(event) => setSocials(event.target.value)}
            className={`${inputClass} font-mono text-sm`}
          />
        </Field>
      </fieldset>

      <div className="sticky bottom-4 z-10 grid gap-3 rounded-2xl border border-line bg-cream/95 p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur md:flex md:items-center md:justify-between">
        <Notice state={state} />
        <SubmitButton className="md:ml-auto">Salvar informações</SubmitButton>
      </div>
    </form>
  );
}
