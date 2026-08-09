"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Fixed index down the right edge: a tick per section, the current one drawn
 * long with its label revealed.
 *
 * Kept off the page below `xl` — at narrower widths the expanded label would
 * sit over the measure. The top bar and footer both carry the same links, so
 * nothing is lost when it is hidden.
 */
export function SectionRail() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const targets = sections
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    // Threshold-based, so React re-renders once per section crossing rather
    // than on every scroll frame.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section index"
      className="fixed top-1/2 right-3 z-50 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-end gap-1.5">
        {sections.map((item) => {
          const isActive = active === item.href;

          return (
            <li key={item.href}>
              {/* Only the ticks occupy the lane. The label is revealed on
                  hover and sits on a paper chip, because at this x it lands
                  over the right-hand column of the content beside it. */}
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="group flex h-6 items-center justify-end gap-3 pl-8"
              >
                <span
                  className={cn(
                    "label-sm bg-paper/90 rounded-full px-2 py-1 whitespace-nowrap tabular-nums opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
                    isActive ? "text-ink" : "text-mist",
                  )}
                >
                  {item.index} {item.label}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px shrink-0 origin-right transition-all duration-500",
                    isActive
                      ? "bg-ink w-7"
                      : "bg-line-strong group-hover:bg-mist w-3",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
