"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";

// Rolagem nativa (arrastar no celular) + botões que avançam um cartão por vez.
export function ReviewScroller({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function step(direction: 1 | -1) {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap) || 0;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={track}
        className="-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <ArrowButton label="Avaliação anterior" disabled={edges.start} onClick={() => step(-1)}>
          <Icon name="arrow" size={18} className="rotate-180" />
        </ArrowButton>
        <ArrowButton label="Próxima avaliação" disabled={edges.end} onClick={() => step(1)}>
          <Icon name="arrow" size={18} />
        </ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/70 text-ink shadow-[0_10px_20px_-14px_rgba(12,11,12,0.5)] transition hover:border-wine hover:bg-wine hover:text-cream disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
