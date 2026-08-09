import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  reverse?: boolean;
  duration?: number;
};

/**
 * Infinite ticker. The track holds two identical copies and translates by
 * exactly -50%, so the loop is seamless. Pure CSS — no scroll listener, no
 * rAF, and it stops dead under `prefers-reduced-motion`.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = "·",
  reverse = false,
  duration = 42,
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn("fade-edges-x relative flex overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className={cn("flex items-center", itemClassName)}>
            {item}
            {/* Inherits currentColor so the separator picks up the same tint as
                the items — the ghost wordmark would otherwise show a solid dot
                floating over 9%-opacity letters. */}
            <span className="px-[0.9em] select-none">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
