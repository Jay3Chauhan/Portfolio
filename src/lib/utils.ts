/** Minimal class joiner. Deliberately dependency-free — no clsx, no tailwind-merge. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Wrap `value` into the half-open range [min, max). Used by the velocity
 * marquee to loop a translate percentage without ever resetting to a seam.
 */
export function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function formatDate(input: string): string {
  return new Date(input).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Compact form for index rows, where a full date would crowd the grid. */
export function formatDateShort(input: string): string {
  return new Date(input).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
