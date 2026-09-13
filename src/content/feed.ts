/**
 * Section 09 — the LinkedIn shelf. Copy only. The posts themselves arrive at
 * render time from the feed bridge in `src/lib/linkedin.ts`.
 */

export const feed = {
  index: "09",
  kicker: "Feed",
  title: "Lately, out loud.",
  lede: "The short-form half — the three most recent posts, straight off LinkedIn.",
  cta: "Follow on LinkedIn",
  /** Shown when no bridge is configured, or the bridge is unreachable. */
  fallback:
    "The live feed is quiet right now. Anything short-form goes up on LinkedIn first.",
} as const;
