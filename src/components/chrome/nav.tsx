"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/chrome/theme-toggle";
import { Magnetic } from "@/components/primitives/magnetic";
import { identity, sections } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Threshold crossing only — this sets state a handful of times per session,
  // not on every scroll frame.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 40);
  });

  useEffect(() => {
    const targets = sections
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500",
          condensed
            ? "bg-paper/80 border-line border-b backdrop-blur-xl"
            : "border-b border-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="gutter flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            className="wordmark text-ink text-[0.95rem] leading-none whitespace-nowrap"
            aria-label={`${identity.fullName} — home`}
          >
            {identity.wordmark}
            <span className="text-pine">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
            {sections.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "label link-wipe transition-colors duration-300",
                  active === item.href ? "text-ink" : "text-mist hover:text-ink",
                )}
                aria-current={active === item.href ? "true" : undefined}
              >
                <span className="text-whisper mr-1.5 tabular-nums">{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <ThemeToggle className="cursor-pointer" />

            <Magnetic strength={0.2} className="hidden sm:inline-block">
              <a
                href="#contact"
                className="label border-ink text-ink hover:bg-ink hover:text-paper inline-block rounded-full border px-4 py-2.5 transition-colors duration-400"
              >
                Contact
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="label text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="menu"
            className="bg-paper fixed inset-0 z-[80] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="gutter flex items-center justify-between"
              style={{ height: "var(--nav-h)" }}
            >
              <span className="wordmark text-[0.95rem]">{identity.wordmark}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="label text-ink"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            {/* The sheet has room for the full index, so it lists every
                section rather than the trimmed set the bar shows. */}
            <nav aria-label="Mobile menu" className="gutter mt-6 flex flex-col">
              {sections.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rule-b font-display flex items-baseline gap-4 py-4 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight font-light"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.05, duration: 0.6 }}
                >
                  <span className="label-sm text-whisper">{item.index}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="gutter mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="label border-ink text-ink rounded-full border px-4 py-2.5"
              >
                Contact
              </a>
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="label link-wipe text-mist"
              >
                All writing →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
