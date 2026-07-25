"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
}

const ACCENT = { r: 201, g: 243, b: 29 };

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let rafId = 0;
    let running = true;

    // Pointer in CSS pixels; -10000 means "inactive".
    const pointer = { x: -10000, y: -10000, active: false };
    // Smoothed parallax offset driven by pointer position.
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    function nodeCount() {
      if (width < 600) return 26;
      if (width < 1000) return 44;
      return 70;
    }

    function seedNodes() {
      const count = nodeCount();
      nodes = Array.from({ length: count }, () => {
        const z = Math.random(); // depth 0 (far) .. 1 (near)
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.18 * (0.4 + z),
          vy: (Math.random() - 0.5) * 0.18 * (0.4 + z),
          r: 0.6 + z * 1.8,
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      // Ease parallax toward target.
      parallax.x += (parallax.tx - parallax.x) * 0.06;
      parallax.y += (parallax.ty - parallax.y) * 0.06;

      const linkDist = width < 700 ? 120 : 160;
      const linkDistSq = linkDist * linkDist;

      // Update positions.
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Draw connections (depth-aware opacity).
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + parallax.x * (0.3 + a.z);
        const ay = a.y + parallax.y * (0.3 + a.z);

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + parallax.x * (0.3 + b.z);
          const by = b.y + parallax.y * (0.3 + b.z);
          const dx = ax - bx;
          const dy = ay - by;
          const distSq = dx * dx + dy * dy;
          if (distSq < linkDistSq) {
            const t = 1 - distSq / linkDistSq;
            const alpha = t * 0.18 * (0.4 + (a.z + b.z) / 2);
            ctx!.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.stroke();
          }
        }
      }

      // Pointer interaction: connect + glow nearby nodes.
      if (pointer.active) {
        const reach = 200;
        const reachSq = reach * reach;
        for (const n of nodes) {
          const nx = n.x + parallax.x * (0.3 + n.z);
          const ny = n.y + parallax.y * (0.3 + n.z);
          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < reachSq) {
            const t = 1 - distSq / reachSq;
            ctx!.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${t * 0.5})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(nx, ny);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes.
      for (const n of nodes) {
        const nx = n.x + parallax.x * (0.3 + n.z);
        const ny = n.y + parallax.y * (0.3 + n.z);
        let glow = 0.35 + n.z * 0.45;
        if (pointer.active) {
          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) glow = Math.min(1, glow + (1 - d / 200) * 0.5);
        }
        ctx!.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${glow})`;
        ctx!.beginPath();
        ctx!.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (running && !reduceMotion) {
        rafId = requestAnimationFrame(step);
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      parallax.tx = (pointer.x - width / 2) * -0.04;
      parallax.ty = (pointer.y - height / 2) * -0.04;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -10000;
      pointer.y = -10000;
      parallax.tx = 0;
      parallax.ty = 0;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();

    if (!isTouch) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave, { passive: true });
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      step(); // single static frame
    } else {
      rafId = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
