"use client";

import { useEffect } from "react";

const LIFT = "18px";

// One delegated pointer listener drives every .tilt-face on the page.
export function TiltController() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    function reset(face: HTMLElement) {
      face.classList.remove("is-active");
      face.style.setProperty("--rx", "0deg");
      face.style.setProperty("--ry", "0deg");
      face.style.setProperty("--tz", "0px");
    }

    function onMove(event: PointerEvent) {
      const face = (event.target as Element | null)?.closest?.<HTMLElement>(".tilt-face") ?? null;
      if (active && active !== face) reset(active);
      active = face;
      if (!face) return;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = face.getBoundingClientRect();
        const x = (clientX - box.left) / box.width;
        const y = (clientY - box.top) / box.height;
        const intensity = Number(face.dataset.tilt) || 8;
        face.classList.add("is-active");
        face.style.setProperty("--rx", `${((0.5 - y) * intensity).toFixed(2)}deg`);
        face.style.setProperty("--ry", `${((x - 0.5) * intensity).toFixed(2)}deg`);
        face.style.setProperty("--tz", LIFT);
        face.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        face.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      });
    }

    function onLeave() {
      cancelAnimationFrame(frame);
      if (active) reset(active);
      active = null;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
