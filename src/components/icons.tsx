import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const icons = {
  home: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </Base>
  ),
  shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3z" />
      <path d="m8.8 12 2.2 2.2 4.4-4.4" />
    </Base>
  ),
  alert: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2" />
      <path d="M9 2.5h6" />
    </Base>
  ),
  scale: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M4 7h16" />
      <path d="m6 7-3 7a3.5 3.5 0 0 0 6 0L6 7z" />
      <path d="m18 7-3 7a3.5 3.5 0 0 0 6 0l-3-7z" />
    </Base>
  ),
  document: (p: IconProps) => (
    <Base {...p}>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h5" />
    </Base>
  ),
  gavel: (p: IconProps) => (
    <Base {...p}>
      <path d="m14 5 5 5" />
      <path d="m11.5 7.5 5 5" />
      <path d="m12.8 6.2 3-3 5 5-3 3" />
      <path d="M13 11 4 20" />
      <path d="M3 21h9" />
    </Base>
  ),
  lock: (p: IconProps) => (
    <Base {...p}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <path d="M12 14.5v2.5" />
    </Base>
  ),
  field: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 20h18" />
      <path d="M5 20c0-4 2-7 7-7s7 3 7 7" />
      <path d="M12 13V4" />
      <path d="M12 8c-2 0-3.5-1.2-3.5-3.5C10.5 4.5 12 5.7 12 8z" />
      <path d="M12 7c2 0 3.5-1.2 3.5-3.5C13.5 3.5 12 4.7 12 7z" />
    </Base>
  ),
  building: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21" />
      <path d="M15 10h3.5A1.5 1.5 0 0 1 20 11.5V21" />
      <path d="M3 21h18" />
      <path d="M8 8h3M8 11.5h3M8 15h3" />
    </Base>
  ),
  pin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Base>
  ),
  phone: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a1.5 1.5 0 0 1-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 0 1 5 4z" />
    </Base>
  ),
  mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </Base>
  ),
  clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  user: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" />
    </Base>
  ),
  globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5z" />
    </Base>
  ),
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  ),
  arrow: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  ),
  contract: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 11h6M9 14h6" />
      <path d="M9 18c1-1 1.8-1 2.5 0s1.5 1 2.5 0" />
    </Base>
  ),
  key: (p: IconProps) => (
    <Base {...p}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8.5-8.5" />
      <path d="m16 7 2.5 2.5" />
      <path d="m14 9 2 2" />
    </Base>
  ),
  bank: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 20.5h18" />
    </Base>
  ),
  star: ({ size = 16, ...p }: IconProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
      <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8z" />
    </svg>
  ),
  whatsapp: ({ size = 20, ...p }: IconProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden {...p}>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.32 4.95L2 22l5.37-1.4a10.1 10.1 0 0 0 4.67 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.87c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41.86-.41h.62c.2 0 .46-.07.72.55.28.66.94 2.28 1.02 2.44.08.17.14.36.03.58-.1.22-.16.36-.31.55-.16.2-.33.43-.47.58-.16.16-.32.33-.14.64.18.31.81 1.33 1.74 2.16 1.2 1.06 2.2 1.4 2.52 1.55.31.16.5.13.68-.08.18-.2.78-.9 1-1.21.2-.31.42-.26.7-.16.28.1 1.79.84 2.1.99.3.16.5.23.58.36.07.13.07.76-.17 1.44z" />
    </svg>
  ),
  google: ({ size = 18, ...p }: IconProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...p}>
      <path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.75 2.99-4.33 2.99-7.33z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9z" />
      <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98z" />
    </svg>
  ),
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component {...props} />;
}

export function Stars({ value = 5, size = 15, className = "" }: { value?: number; size?: number; className?: string }) {
  const filled = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <icons.star key={index} size={size} className={index < filled ? "text-gold" : "text-current opacity-25"} />
      ))}
    </span>
  );
}
