import { cn } from "@/lib/utils";

type RiseTextProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Above-the-fold text reveal, animated in pure CSS.
 *
 * Deliberately not a Motion component: `initial={{ opacity: 0 }}` would
 * server-render the hero invisible and gate LCP on hydration. This renders
 * visible markup and animates without JavaScript. Use `SplitText` below the
 * fold where that tradeoff doesn't apply.
 */
export function RiseText({
  text,
  as: Tag = "span",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: RiseTextProps) {
  const words = text.split(" ").filter(Boolean);

  return (
    <Tag className={className}>
      {/* The accessible copy of the string; the fragments below are decoration. */}
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className={cn("inline-flex overflow-hidden align-bottom", lineClassName)}
        >
          <span
            className="animate-rise inline-block will-change-transform"
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
