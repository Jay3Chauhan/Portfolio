"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * `false` during SSR and on anything narrower than `lg`. Pinned horizontal
 * scroll, Lenis, and the sticky footer are desktop enhancements — flipping
 * them on after hydrate on a phone is what created the empty 100svh runways.
 */
export function useDesktop(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
