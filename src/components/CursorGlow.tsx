"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mx = 0, my = 0, dx = 0, dy = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    function animCursor() {
      dx += (mx - dx) * 0.15;
      dy += (my - dy) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${dx - 175}px,${dy - 175}px,0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px,${my - 4}px,0)`;
      }
      rafId = requestAnimationFrame(animCursor);
    }
    rafId = requestAnimationFrame(animCursor);

    document.addEventListener("mousemove", handleMouseMove);

    // Use event delegation for hover effects
    const hoverSelector = "a,button,.project-card,.service-card,.cert-card,.highlight-card,.timeline-item";

    const matchesHover = (el: EventTarget | null): boolean => {
      return el instanceof Element && !!el.closest(hoverSelector);
    };

    const onMouseOver = (e: MouseEvent) => {
      if (matchesHover(e.target)) {
        dotRef.current?.classList.add("hovering");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (matchesHover(e.target) && !matchesHover(e.relatedTarget)) {
        dotRef.current?.classList.remove("hovering");
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" id="cursorGlow" />
      <div ref={dotRef} className="cursor-dot" id="cursorDot" />
    </>
  );
}
