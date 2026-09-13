"use client";

import { useLayoutEffect } from "react";
import { applyTheme, readStoredTheme } from "@/lib/theme";

/**
 * Re-applies a stored override before the first client paint. First-time
 * visitors have nothing stored, so `light-dark()` already matched the OS
 * and this is a no-op — no flash, no script tag.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(readStoredTheme());
  }, []);

  return null;
}
