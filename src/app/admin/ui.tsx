"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import type { FormState } from "@/app/admin/actions";

export function SubmitButton({ children, pending = "Salvando…", className = "" }: { children: ReactNode; pending?: string; className?: string }) {
  const { pending: busy } = useFormStatus();
  return (
    <button type="submit" disabled={busy} className={`btn btn-dark disabled:cursor-wait disabled:opacity-60 ${className}`}>
      {busy ? pending : children}
    </button>
  );
}

export function Notice({ state }: { state: FormState }) {
  if (!state?.error && !state?.ok) return null;
  return (
    <p
      role={state.error ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm ${
        state.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {state.error ?? state.ok}
    </p>
  );
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid min-w-0 gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint ? <span className="text-xs leading-5 text-stone">{hint}</span> : null}
    </label>
  );
}
