"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import { Stars } from "@/components/icons";

type Hero3DProps = {
  rating: string;
  total: number;
  oab: string;
  photo: { src: string; alt: string };
};

export function Hero3D({ rating, total, oab, photo }: Hero3DProps) {
  const rig = useRef<HTMLDivElement>(null);
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    const element = rig.current;
    if (!element) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !fine.matches) return;

    const zone = element.closest("section") ?? document.body;
    let frame = 0;

    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!element) return;
        const box = zone.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        setIdle(false);
        element.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
        element.style.setProperty("--ry", `${(x * 18).toFixed(2)}deg`);
        element.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
        element.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
      });
    }

    function onLeave() {
      cancelAnimationFrame(frame);
      element?.style.setProperty("--rx", "0deg");
      element?.style.setProperty("--ry", "0deg");
      setIdle(true);
    }

    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="hero-stage relative mx-auto w-full max-w-[26rem] py-6 lg:max-w-none">
      <div ref={rig} className={`hero-rig ${idle ? "is-idle" : ""}`}>
        {/* Back plate: offset gold frame for depth */}
        <div
          aria-hidden
          className="z-layer absolute inset-0 translate-x-5 translate-y-5 rounded-[1.6rem] border border-gold/35"
          style={{ ["--z" as string]: "-60px" }}
        />
        <div
          aria-hidden
          className="z-layer absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(140,29,39,0.45),transparent)] blur-2xl"
          style={{ ["--z" as string]: "-120px" }}
        />

        {/* Portrait */}
        <div className="z-layer frame-gold relative overflow-hidden rounded-[1.6rem] shadow-[0_60px_80px_-40px_rgba(0,0,0,0.95)]" style={{ ["--z" as string]: "0px" }}>
          <div className="relative aspect-[4/5]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              className="object-cover object-[50%_30%]"
              sizes="(min-width: 1024px) 440px, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <span aria-hidden className="tilt-glare !opacity-100" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="display text-2xl text-cream sm:text-3xl">Dr. Eduardo Corrêa Bonifácio</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">Advogado · Direito Imobiliário</p>
          </div>
        </div>

        {/* Floating: Google rating */}
        <div
          className="z-layer absolute -left-4 top-10 rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:-left-10"
          style={{ ["--z" as string]: "80px" }}
        >
          <div className="flex items-center gap-3">
            <p className="display text-4xl leading-none text-cream">{rating}</p>
            <div>
              <Stars size={13} className="text-gold" />
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-cream/65">{total} avaliações no Google</p>
            </div>
          </div>
        </div>

        {/* Floating: OAB seal */}
        <div
          className="z-layer absolute -right-3 top-[50%] flex items-center gap-3 rounded-2xl border border-gold/30 bg-gradient-to-br from-[#1f1a17] to-ink px-4 py-3 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] sm:-right-8"
          style={{ ["--z" as string]: "60px" }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-ink">
            <Image src={logo} alt="" width={30} height={30} className="h-7 w-7 object-contain" />
          </span>
          <div>
            <p className="text-sm font-semibold text-cream">{oab}</p>
            <p className="text-[0.68rem] uppercase tracking-[0.14em] text-gold/80">Ordem dos Advogados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
