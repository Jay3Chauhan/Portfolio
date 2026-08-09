import type { Metadata } from "next";
import Link from "next/link";
import { RiseText } from "@/components/primitives/rise-text";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[80svh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="label text-whisper">Error 404</p>

      <RiseText
        as="h1"
        text="This route was never deployed."
        className="font-display text-display mt-8 block max-w-[14ch] font-light"
      />

      <p className="text-mist mt-8 max-w-[42ch] text-lg font-light">
        The page you asked for does not exist, or it moved somewhere more sensible.
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/"
          className="label border-ink text-ink hover:bg-ink hover:text-paper rounded-full border px-6 py-3.5 transition-colors duration-400"
        >
          Back home
        </Link>
        <Link
          href="/blog"
          className="label border-line text-mist hover:text-ink rounded-full border px-6 py-3.5 transition-colors duration-400"
        >
          Read something instead
        </Link>
      </div>
    </section>
  );
}
