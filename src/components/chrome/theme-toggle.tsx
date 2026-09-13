"use client";

import { useSyncExternalStore } from "react";
import {
  applyTheme,
  schemeIsDark,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

function subscribeToScheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export function ThemeToggle({ className }: { className?: string }) {
  const hydrated = useHydrated();

  const dark = useSyncExternalStore(subscribeToScheme, schemeIsDark, () => false);

  function toggle() {
    const next: Theme = dark ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // The switch itself is 34×18; the hit area is padded out to 44px so it
      // clears the minimum touch target without changing the visual.
      className={cn(
        "-mx-2 flex min-h-11 min-w-11 items-center justify-center px-2",
        className,
      )}
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
