"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Lenis drives the real native scroll position, so Motion's `useScroll`,
 * `position: sticky` and IntersectionObserver all keep working untouched.
 *
 * Lenis runs off Motion's frame loop rather than its own rAF so the two
 * libraries share one batched read/write pass instead of thrashing layout
 * against each other.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.11,
        smoothWheel: true,
        syncTouch: false,
        // Off by default in Lenis — without this, hash links stop working.
        anchors: { offset: -80 },
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
