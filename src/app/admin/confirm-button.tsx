"use client";

import type { ReactNode } from "react";

export function ConfirmButton({ message, children }: { message: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className="btn !px-4 !py-2 text-sm text-red-700 ring-1 ring-red-200 hover:bg-red-50"
    >
      {children}
    </button>
  );
}
