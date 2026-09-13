/**
 * Theme is a CSS `color-scheme` pin on `<html>`, not a React script.
 *
 * Tokens use `light-dark()`, so the first paint follows the OS with no JS.
 * A stored choice adds `.light` or `.dark` to override that. Putting a JS
 * `<script>` in the layout is what React 19 flags — JSON-LD is a data block
 * and is fine; an executable script is not.
 */

export const THEME_STORAGE_KEY = "jc-theme";

export type Theme = "light" | "dark";

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme | null) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

export function schemeIsDark(): boolean {
  if (document.documentElement.classList.contains("dark")) return true;
  if (document.documentElement.classList.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
