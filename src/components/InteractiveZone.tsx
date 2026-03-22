"use client";

import { useEffect, useRef } from "react";

// ── Physics body type ──────────────────────────────────────────────────────
interface PhysicsBody {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;     // rotation angle (deg)
  vr: number;    // rotational velocity
  radius: number; // collision radius
  mass: number;
  initialized: boolean;
  isActive: boolean; // currently being dragged
}

// ── Blob shape data ────────────────────────────────────────────────────────
const SHAPES = [
  {
    id: "pgS0",
    style: { width: "280px", height: "280px", left: "5%", top: "8%" },
    path: "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.3,-32.5,89.8,-16.3,88.4,-0.8C87,14.6,81.7,29.3,73.5,42.1C65.3,55,54.2,66.1,41,73.2C27.7,80.3,13.9,83.5,-0.9,85C-15.6,86.5,-31.3,86.3,-44.2,79.6C-57.2,73,-67.4,59.8,-74.8,45.6C-82.2,31.3,-86.7,15.7,-86.5,0.1C-86.3,-15.5,-81.4,-30.9,-73,-43.8C-64.6,-56.6,-52.7,-66.8,-39.5,-74.5C-26.2,-82.2,-13.1,-87.4,1.2,-89.5C15.5,-91.6,30.5,-83.5,44.7,-76.4Z",
    fill: "#c9f31d",
    stroke: undefined,
  },
  {
    id: "pgS1",
    style: { width: "240px", height: "240px", right: "8%", top: "5%" },
    path: "M39.9,-65.7C52.4,-60.5,63.5,-50.7,71.4,-38.4C79.3,-26.1,84,-11.3,83.1,3C82.2,17.2,75.6,31,66.1,42.4C56.6,53.8,44.1,62.8,30.5,68.4C16.8,74,-8,76.2,-23.6,70.7C-39.2,65.2,-45.6,52,-55.5,39.4C-65.5,26.8,-79,14.4,-82.8,-1.1C-86.6,-16.5,-80.6,-35.2,-69.4,-47.3C-58.2,-59.4,-41.7,-65,-27.5,-69.2C-13.3,-73.4,1.4,-76.2,15.3,-74.9C29.1,-73.6,27.5,-70.9,39.9,-65.7Z",
    fill: "rgba(201,243,29,0.12)",
    stroke: "rgba(201,243,29,0.35)",
  },
  {
    id: "pgS2",
    style: { width: "220px", height: "220px", left: "30%", top: "55%" },
    path: "M45.3,-78C59.1,-71.1,71,-60,78.6,-46.4C86.3,-32.8,89.8,-16.4,89.2,-0.3C88.7,15.7,84.2,31.5,75.6,44.3C67,57.2,54.3,67.2,40.1,73.8C25.9,80.3,10.3,83.3,-4.3,81.3C-18.9,79.3,-32.4,72.3,-45.8,63.9C-59.1,55.5,-72.3,45.7,-79.2,32.5C-86.1,19.3,-86.7,2.7,-83.8,-12.8C-80.8,-28.3,-74.3,-42.7,-63.8,-53.5C-53.2,-64.2,-38.6,-71.3,-24.3,-77.2C-10,-83.1,3.9,-87.8,18.2,-86.4C32.4,-85,31.6,-84.8,45.3,-78Z",
    fill: "#1a1a1e",
    stroke: "#2a2a32",
  },
  {
    id: "pgS3",
    style: { width: "190px", height: "190px", right: "25%", bottom: "10%" },
    path: "M47.7,-73.2C62.1,-68.4,74.3,-56.2,80.8,-41.6C87.3,-27,88.1,-10,84.5,5.3C80.9,20.6,72.8,34.1,63,45.9C53.3,57.7,41.8,67.7,28.5,73.7C15.1,79.6,-0.1,81.5,-14.8,78.4C-29.5,75.3,-43.6,67.3,-55.1,56.2C-66.5,45.1,-75.3,30.9,-79.2,15.2C-83.1,-0.5,-82.2,-17.6,-75.4,-31.4C-68.6,-45.2,-55.9,-55.7,-42.3,-61C-28.6,-66.4,-14.3,-66.7,1.1,-68.5C16.5,-70.4,33.3,-78,47.7,-73.2Z",
    fill: "rgba(201,243,29,0.08)",
    stroke: "rgba(201,243,29,0.2)",
    strokeDasharray: "4 3",
  },
  {
    id: "pgS4",
    style: { width: "160px", height: "160px", left: "60%", top: "10%" },
    path: "M42.1,-72.3C55.8,-64.8,68.6,-55.5,76.3,-43C84,-30.5,86.5,-15.3,85.3,-0.7C84.1,13.9,79.1,27.8,71.1,40C63.1,52.2,52,62.6,39.1,69.5C26.2,76.5,11.4,79.8,-2.3,79C-16,78.2,-28.6,73.2,-41.7,66.4C-54.8,59.5,-68.3,50.8,-76.2,38.2C-84.1,25.6,-86.3,9.1,-84.1,-6.3C-81.9,-21.7,-75.3,-36.1,-65,-46.8C-54.6,-57.5,-40.5,-64.5,-27,-70.8C-13.4,-77.2,-0.4,-82.9,13,-82C26.5,-81.1,28.5,-79.8,42.1,-72.3Z",
    fill: "rgba(201,243,29,0.08)",
    stroke: undefined,
  },
  {
    id: "pgS5",
    style: { width: "320px", height: "320px", left: "45%", top: "20%" },
    path: "M38.5,-59.8C52.9,-57.2,69.4,-51.8,77.4,-40.5C85.3,-29.3,84.7,-12.1,80.5,3.1C76.3,18.2,68.6,31.3,59.1,42.5C49.7,53.7,38.5,63,25.8,68C13,73,-1.3,73.6,-16,71.8C-30.7,70,-45.8,65.8,-56.4,56.1C-67,46.3,-73.1,31.1,-76.7,15C-80.2,-1.1,-81.2,-18.1,-75.1,-31.7C-69,-45.3,-55.9,-55.5,-42.2,-58.5C-28.4,-61.5,-14.2,-57.3,-0.6,-56.2C13,-55.2,24.1,-62.4,38.5,-59.8Z",
    fill: "rgba(201,243,29,0.04)",
    stroke: undefined,
  },
];

const PILLS = [
  { id: "pgP0", label: "Flutter Expert", style: { left: "8%", bottom: "25%" }, rotate: -15 },
  { id: "pgP1", label: "Fintech Builder", style: { right: "5%", top: "50%" }, rotate: 12 },
  { id: "pgP2", label: "Open to Work", style: { left: "35%", bottom: "8%" }, rotate: -5 },
  { id: "pgP3", label: "View Projects", style: { right: "30%", top: "8%" }, rotate: 8 },
];

export default function InteractiveZone() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const runningRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const dragCountRef = useRef(0);

  useEffect(() => {
    const pg = sectionRef.current;
    if (!pg) return;

    const allEls = Array.from(
      pg.querySelectorAll<HTMLElement>(".pg-shape, .pg-pill")
    );
    const counterEl = pg.querySelector<HTMLElement>(".counter-val");

    // ── Build physics bodies ──────────────────────────────────────────────
    const bodies: PhysicsBody[] = allEls.map((el) => ({
      el,
      x: 0, y: 0, vx: 0, vy: 0,
      r: 0, vr: 0,
      radius: 0,
      mass: 1,
      initialized: false,
      isActive: false,
    }));
    bodiesRef.current = bodies;

    // ── Init positions from DOM layout ────────────────────────────────────
    function initPositions() {
      const pRect = pg!.getBoundingClientRect();
      bodies.forEach((b) => {
        if (b.initialized) return;
        const r = b.el.getBoundingClientRect();
        b.x = r.left - pRect.left;
        b.y = r.top - pRect.top;
        b.radius = Math.max(r.width, r.height) * 0.45;
        b.mass = b.radius * 0.01;
        const m = b.el.style.transform.match(/rotate\(([-\d.]+)deg\)/);
        b.r = m ? parseFloat(m[1]) : 0;
        b.initialized = true;
        applyTransform(b);
      });
    }

    function applyTransform(b: PhysicsBody) {
      b.el.style.position = "absolute";
      b.el.style.left = "0";
      b.el.style.top = "0";
      b.el.style.right = "auto";
      b.el.style.bottom = "auto";
      b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.r}deg)`;
    }

    // ── Collision resolution ──────────────────────────────────────────────
    function resolveCollisions() {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j];
          if (!a.initialized || !b.initialized) continue;

          const aw = a.el.offsetWidth || 1;
          const ah = a.el.offsetHeight || 1;
          const bw = b.el.offsetWidth || 1;
          const bh = b.el.offsetHeight || 1;

          const ax = a.x + aw * 0.5;
          const ay = a.y + ah * 0.5;
          const bx = b.x + bw * 0.5;
          const by = b.y + bh * 0.5;

          const dx = bx - ax;
          const dy = by - ay;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          const minDist = a.radius + b.radius;

          if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            const totalMass = a.mass + b.mass;
            const aRatio = a.isActive ? 0 : b.isActive ? 1 : b.mass / totalMass;
            const bRatio = b.isActive ? 0 : a.isActive ? 1 : a.mass / totalMass;

            a.x -= nx * overlap * aRatio;
            a.y -= ny * overlap * aRatio;
            b.x += nx * overlap * bRatio;
            b.y += ny * overlap * bRatio;

            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const relVelNorm = rvx * nx + rvy * ny;

            if (relVelNorm < 0) {
              const restitution = 0.65;
              const impulse = (-(1 + restitution) * relVelNorm) / totalMass;

              if (!a.isActive) {
                a.vx -= impulse * b.mass * nx;
                a.vy -= impulse * b.mass * ny;
                a.vr += nx * ny * impulse * 8;
              }
              if (!b.isActive) {
                b.vx += impulse * a.mass * nx;
                b.vy += impulse * a.mass * ny;
                b.vr -= nx * ny * impulse * 8;
              }
            }
          }
        }
      }
    }

    // ── Wall bouncing ─────────────────────────────────────────────────────
    function bounceWalls() {
      const pRect = pg!.getBoundingClientRect();
      bodies.forEach((b) => {
        if (!b.initialized || b.isActive) return;
        const w = b.el.offsetWidth || 1;
        const h = b.el.offsetHeight || 1;
        const bounce = 0.5;

        if (b.x < -w * 0.4) { b.x = -w * 0.4; b.vx = Math.abs(b.vx) * bounce; b.vr *= -0.5; }
        if (b.x > pRect.width - w * 0.6) { b.x = pRect.width - w * 0.6; b.vx = -Math.abs(b.vx) * bounce; b.vr *= -0.5; }
        if (b.y < -h * 0.4) { b.y = -h * 0.4; b.vy = Math.abs(b.vy) * bounce; b.vr *= -0.5; }
        if (b.y > pRect.height - h * 0.6) { b.y = pRect.height - h * 0.6; b.vy = -Math.abs(b.vy) * bounce; b.vr *= -0.5; }
      });
    }

    // ── Physics loop ──────────────────────────────────────────────────────
    const FRICTION = 0.97;
    const ROT_FRICTION = 0.96;

    function physicsStep() {
      if (!runningRef.current) return;

      bodies.forEach((b) => {
        if (!b.initialized || b.isActive) return;
        b.vx *= FRICTION;
        b.vy *= FRICTION;
        b.vr *= ROT_FRICTION;
        b.x += b.vx;
        b.y += b.vy;
        b.r += b.vr;
      });

      resolveCollisions();
      resolveCollisions(); // double pass for stability

      bounceWalls();

      bodies.forEach((b) => {
        if (b.initialized) applyTransform(b);
      });

      animFrameRef.current = requestAnimationFrame(physicsStep);
    }

    // ── Drag handling ─────────────────────────────────────────────────────
    let activeDrag: PhysicsBody | null = null;
    let offsetX = 0, offsetY = 0;
    let prevCX = 0, prevCY = 0, prevTime = 0;

    function findBody(el: EventTarget | null): PhysicsBody | undefined {
      if (!el) return undefined;
      const target = (el as HTMLElement).closest<HTMLElement>(".pg-shape, .pg-pill");
      return bodies.find((b) => b.el === target || b.el.contains(target));
    }

    function onDown(e: MouseEvent | TouchEvent) {
      const raw = e.target as HTMLElement;
      const target = raw.closest<HTMLElement>(".pg-shape, .pg-pill");
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();

      const body = bodies.find((b) => b.el === target || b.el.contains(target));
      if (!body) return;

      activeDrag = body;
      body.isActive = true;
      body.vx = 0; body.vy = 0; body.vr = 0;
      body.el.classList.add("dragging");

      const touch = (e as TouchEvent).touches?.[0];
      const cx = touch ? touch.clientX : (e as MouseEvent).clientX;
      const cy = touch ? touch.clientY : (e as MouseEvent).clientY;
      const pRect = pg!.getBoundingClientRect();
      offsetX = cx - pRect.left - body.x;
      offsetY = cy - pRect.top - body.y;
      prevCX = cx; prevCY = cy;
      prevTime = performance.now();
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!activeDrag) return;
      e.preventDefault();

      const touch = (e as TouchEvent).touches?.[0];
      const cx = touch ? touch.clientX : (e as MouseEvent).clientX;
      const cy = touch ? touch.clientY : (e as MouseEvent).clientY;
      const now = performance.now();
      const dt = Math.max(1, now - prevTime);
      const pRect = pg!.getBoundingClientRect();

      activeDrag.vx = ((cx - prevCX) / dt) * 16;
      activeDrag.vy = ((cy - prevCY) / dt) * 16;
      activeDrag.x = cx - pRect.left - offsetX;
      activeDrag.y = cy - pRect.top - offsetY;
      applyTransform(activeDrag);

      resolveCollisions();
      bounceWalls();
      bodies.forEach((b) => {
        if (b.initialized && b !== activeDrag) applyTransform(b);
      });

      prevCX = cx; prevCY = cy;
      prevTime = now;
    }

    function onUp() {
      if (!activeDrag) return;
      const body = activeDrag;
      activeDrag = null;
      body.isActive = false;
      body.el.classList.remove("dragging");

      dragCountRef.current++;
      if (counterEl) counterEl.textContent = String(dragCountRef.current);

      // fling boost
      body.vx *= 3;
      body.vy *= 3;
      body.vr = body.vx * 0.25;
    }

    // ── Intersection observer to pause when off-screen ────────────────────
    let inited = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!inited) {
            inited = true;
            requestAnimationFrame(() => initPositions());
          }
          if (!runningRef.current) {
            runningRef.current = true;
            animFrameRef.current = requestAnimationFrame(physicsStep);
          }
        } else {
          runningRef.current = false;
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(pg);

    pg.addEventListener("mousedown", onDown as EventListener);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onUp);
    pg.addEventListener("touchstart", onDown as EventListener, { passive: false });
    window.addEventListener("touchmove", onMove as EventListener, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      obs.disconnect();
      pg.removeEventListener("mousedown", onDown as EventListener);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp);
      pg.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section className="playground" id="playground" ref={sectionRef}>
      {/* SVG Blob Shapes */}
      {SHAPES.map((s) => (
        <div
          key={s.id}
          className="pg-shape"
          id={s.id}
          style={s.style as React.CSSProperties}
        >
          <svg viewBox="0 0 200 200">
            <path
              d={s.path}
              fill={s.fill}
              stroke={s.stroke}
              strokeWidth={s.stroke ? 1.5 : undefined}
              strokeDasharray={(s as { strokeDasharray?: string }).strokeDasharray}
              transform="translate(100 100)"
            />
          </svg>
        </div>
      ))}

      {/* Pill labels */}
      {PILLS.map((p) => (
        <div
          key={p.id}
          className="pg-pill"
          id={p.id}
          style={{
            ...(p.style as React.CSSProperties),
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.label}
        </div>
      ))}

      {/* Centre text */}
      <div className="playground-content">
        <div className="section-label">Interactive Zone</div>
        <h2 className="section-title">Go Ahead, Play Around</h2>
        <p className="pg-subtitle">
          This isn&apos;t just a portfolio — drag the shapes.
        </p>
        <div className="pg-hint">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2" />
            <path d="M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v7" />
            <path d="M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8" />
            <path d="M18 8a2 2 0 012 2v7.5a5.5 5.5 0 01-11 0v-2.73" />
          </svg>
          Grab &amp; fling the shapes
        </div>
      </div>

      {/* Interaction counter */}
      <div className="pg-counter">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2" />
          <path d="M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v7" />
          <path d="M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8" />
          <path d="M18 8a2 2 0 012 2v7.5a5.5 5.5 0 01-11 0v-2.73" />
        </svg>
        Interactions: <span className="counter-val" id="dragCounter">0</span>
      </div>
    </section>
  );
}
