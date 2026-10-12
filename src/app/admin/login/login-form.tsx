"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import { inputClass } from "@/app/admin/styles";
import { Field, Notice, SubmitButton } from "@/app/admin/ui";

export function LoginForm() {
  const [state, action] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="grid gap-4">
      <Field label="E-mail">
        <input name="email" type="email" required autoComplete="username" className={inputClass} />
      </Field>
      <Field label="Senha">
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </Field>
      <Notice state={state} />
      <SubmitButton pending="Entrando…" className="mt-1 w-full">
        Entrar
      </SubmitButton>
    </form>
  );
}
