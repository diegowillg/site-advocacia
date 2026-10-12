import type { ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
};

// Markup only. The motion comes from <TiltController />, a single listener for the whole page.
export function Tilt({ children, className = "", intensity = 8, glare = true }: TiltProps) {
  return (
    <div className={`stage h-full ${className}`}>
      <div className="tilt-face h-full rounded-[1.1rem]" data-tilt={intensity}>
        {children}
        {glare ? <span aria-hidden className="tilt-glare" /> : null}
      </div>
    </div>
  );
}

export function Panel({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "ink";
  className?: string;
}) {
  const skin = tone === "ink" ? "card-ink" : "card-surface";
  return (
    <Tilt>
      <div className={`${skin} h-full p-6 md:p-7 ${className}`}>{children}</div>
    </Tilt>
  );
}
