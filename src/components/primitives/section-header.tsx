import { SplitText } from "@/components/primitives/split-text";
import { RuleLine } from "@/components/primitives/split-text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  kicker: string;
  title?: string;
  lede?: string;
  className?: string;
  align?: "left" | "wide";
};

/**
 * The recurring section masthead: a hairline, a numbered kicker, then the
 * display title. Used verbatim by every top-level section so the rhythm of the
 * page stays predictable.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  lede,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={cn("gutter", className)}>
      <RuleLine />
      <div className="flex items-baseline gap-3 pt-4">
        <span className="label text-ink">{index}</span>
        <span aria-hidden="true" className="text-whisper text-[0.7rem]">
          /
        </span>
        <span className="label text-mist">{kicker}</span>
      </div>

      {title ? (
        <SplitText
          as="h2"
          text={title}
          className={cn(
            "font-display text-title mt-10 max-w-[16ch] font-light",
            align === "wide" && "max-w-[22ch]",
          )}
        />
      ) : null}

      {lede ? (
        <SplitText
          as="p"
          text={lede}
          stagger={0.012}
          className="text-lead text-mist mt-8 max-w-[46ch] font-light"
        />
      ) : null}
    </header>
  );
}
