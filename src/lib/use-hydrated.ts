"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `false` during SSR and the hydration render, `true` afterwards.
 *
 * Use this to gate any enhancement whose markup must not differ on the first
 * client render — pinned scroll, pointer effects, theme-dependent attributes.
 * Preferred over a `useState` + `useEffect` mount flag, which triggers a
 * cascading render and is flagged by `react-hooks/set-state-in-effect`.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
