export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
        published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}
