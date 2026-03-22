"use client";

import { useEffect } from "react";

function closestEl(e: Event, selector: string): HTMLElement | null {
  let t = e.target;
  // Handle SVG elements, text nodes, and non-Element targets
  if (t instanceof Node && !(t instanceof Element)) {
    t = t.parentElement;
  }
  if (!(t instanceof Element)) return null;
  return t.closest<HTMLElement>(selector);
}

export default function InteractiveEffects() {
  useEffect(() => {
    // Magnetic buttons via event delegation
    const onMagneticMove = (e: MouseEvent) => {
      const btn = closestEl(e, ".btn-magnetic");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px,${y * 0.15}px)`;
    };
    const onMagneticLeave = (e: MouseEvent) => {
      const btn = closestEl(e, ".btn-magnetic");
      if (btn) btn.style.transform = "translate(0,0)";
    };

    // Tilt cards via event delegation
    const onTiltMove = (e: MouseEvent) => {
      const card = closestEl(e, ".service-card,.project-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
    };
    const onTiltLeave = (e: MouseEvent) => {
      const card = closestEl(e, ".service-card,.project-card");
      if (card) {
        card.style.transform =
          "perspective(600px) rotateX(0) rotateY(0) translateY(0)";
      }
    };

    document.addEventListener("mousemove", onMagneticMove);
    document.addEventListener("mouseleave", onMagneticLeave, true);
    document.addEventListener("mousemove", onTiltMove);
    document.addEventListener("mouseleave", onTiltLeave, true);

    // Smooth scroll for anchor links
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = closestEl(e, 'a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      e.preventDefault();
      const dest = document.querySelector(anchor.getAttribute("href") || "");
      if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("mousemove", onMagneticMove);
      document.removeEventListener("mouseleave", onMagneticLeave, true);
      document.removeEventListener("mousemove", onTiltMove);
      document.removeEventListener("mouseleave", onTiltLeave, true);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return null;
}
