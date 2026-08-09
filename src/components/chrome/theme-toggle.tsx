"use client";

import { useSyncExternalStore } from "react";
import { useHydrated } from "@/lib/use-hydrated";

export const THEME_STORAGE_KEY = "jc-theme";

/**
 * Runs before first paint to stamp the theme class on <html>, so the page
 * never flashes the wrong palette. Inlined in the document head.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

/** The <html> class is the source of truth, so read it rather than mirroring it. */
function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ className }: { className?: string }) {
  const hydrated = useHydrated();

  const dark = useSyncExternalStore(
    subscribeToThemeClass,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable — the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={hydrated ? dark : undefined}
    >
      <span
        aria-hidden="true"
        className="border-line-strong relative block h-[18px] w-[34px] rounded-full border transition-colors"
      >
        <span
          className="bg-ink absolute top-1/2 left-[3px] h-[10px] w-[10px] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translate(${dark ? 16 : 0}px, -50%)` }}
        />
      </span>
    </button>
  );
}
