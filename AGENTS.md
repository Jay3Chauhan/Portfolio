<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Jay Chauhan — Portfolio

A single-page editorial portfolio plus a small blog. The visual language is Swiss
editorial print: bone paper, ink type, hairline rules, numbered sections, wide-tracked
monospace micro-labels, and scroll-driven motion that stays out of the way.

## Stack

| Concern     | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js 16, App Router, Turbopack, React 19                  |
| Styling     | Tailwind CSS v4 — CSS-first config in `src/app/globals.css`  |
| Motion      | `motion` v13 (`motion/react`), `lenis` for smooth scroll     |
| Content     | Typed modules in `src/content/`, Markdown in `content/blog/` |
| Package mgr | npm                                                          |

## Commands

```bash
npm run dev            # dev server (Turbopack)
npm run build          # production build — must pass before any PR
npm run lint           # ESLint flat config
npm run format         # Prettier write
npm run typecheck      # tsc --noEmit
```

## Layout

```
src/
  app/          Routes. Server Components by default.
  components/
    primitives/ Reusable motion + layout building blocks
    chrome/     Nav, footer, scroll progress, theme toggle
    sections/   One file per numbered homepage section
  content/      ALL copy and data. Typed. No copy lives in components.
  lib/          fonts, seo, blog, utils
```

## Non-negotiables

1. **Content lives in `src/content/`.** Never hardcode a project name, metric,
   date or paragraph inside a component. If a section needs new copy, add a typed
   field to the relevant content module first.
2. **Never hardcode a colour.** Use the semantic Tailwind tokens (`bg-paper`,
   `text-ink`, `text-mist`, `border-line`, `text-pine`). New colours go in the
   `:root` / `.dark` blocks of `globals.css` and get a `@theme inline` mapping so
   both themes stay in lockstep.
3. **Animate only `transform` and `opacity`.** Anything animating `width`,
   `height`, `top` or `margin` on scroll produces layout shift on every frame.
4. **Never `setState` in a scroll callback.** Write to a `MotionValue`, or use a
   threshold/`whileInView` so React re-renders a handful of times, not 60×/second.
5. **Above-the-fold text does not start at `opacity: 0`.** Motion's `initial`
   serialises into the SSR markup, so an invisible hero delays LCP until hydration.
   Use `RiseText` (CSS keyframes, no JS) above the fold and `SplitText` below it.
6. **Every claim on the page must be verifiable.** Numbers in `src/content/` come
   from real work. Do not invent metrics, testimonials or clients.
7. **Run `npm run build` before declaring done.** Type errors surface there, not
   in `next dev`.

## Accessibility contract

- Split-text components put the full string on the parent's `aria-label` and mark
  every visual fragment `aria-hidden`.
- Decorative marquees, oversized ghost numerals and figure watermarks are
  `aria-hidden`.
- Pinned/horizontal scroll sections degrade to a plain scrollable rail under
  `prefers-reduced-motion` — see the `pinned` guard in `sections/work.tsx`.
- Interactive controls need visible `:focus-visible` state; the global outline is
  defined once in `globals.css`.
