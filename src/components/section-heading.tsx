import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""} ${dark ? "on-dark" : ""} ${className}`}>
      <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className={`display mt-5 text-4xl md:text-[3.4rem] ${dark ? "text-cream" : "text-ink"}`}>{title}</h2>
      {lede ? (
        <p className={`mt-5 text-base leading-7 md:text-lg md:leading-8 ${dark ? "text-cream/70" : "text-stone"} ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
