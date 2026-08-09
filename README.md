# jaychauhan.tech

Personal site for Jay Chauhan — Backend & AI Engineer. A single-page editorial
portfolio plus a small technical blog.

The design language is Swiss editorial print: bone paper, ink type, hairline rules,
numbered sections, wide-tracked monospace micro-labels, and scroll-driven motion
that stays out of the way. Photography is replaced by drawn schematic plates,
because a backend portfolio has no product shots worth showing.

## Stack

| Concern   | Choice                                                        |
| --------- | ------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript    |
| Styling   | Tailwind CSS v4 — CSS-first config, no `tailwind.config.js`   |
| Motion    | `motion` v13 · `lenis` smooth scroll on Motion's frame loop   |
| Type      | Archivo (variable width) · Newsreader · JetBrains Mono        |
| Content   | Typed modules in `src/content/` · Markdown in `content/blog/` |
| Forms     | Web3Forms                                                     |
| Hosting   | Vercel                                                        |

Every route prerenders to static HTML.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the two keys
npm run dev
```

| Script              | Does                                  |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server on :3000                   |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint (flat config)                  |
| `npm run typecheck` | `tsc --noEmit`                        |
| `npm run format`    | Prettier, with Tailwind class sorting |

### Environment

Both are optional — the site builds and runs without them.

| Variable                           | Purpose                           |
| ---------------------------------- | --------------------------------- |
| `GOOGLE_SITE_VERIFICATION`         | Search Console ownership meta tag |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form endpoint             |

## Structure

```
content/blog/           Markdown posts with frontmatter
src/
  app/                  Routes, globals.css, sitemap/robots/manifest/OG image
  components/
    primitives/         SmoothScroll, RiseText, SplitText, Reveal, Marquee,
                        Magnetic, Counter, FigurePlate, SectionHeader
    chrome/             Nav, Footer, ScrollProgress, ThemeToggle
    sections/           One file per numbered homepage section
  content/              All portfolio copy and data, typed
  lib/                  fonts, seo, blog, utils, og-fonts
```

The homepage reads as a numbered document: `01` premise, `02` selected work
(pinned horizontal scroll), `03` the stack explorer, `04` a pinned story timeline,
`05` verifiable signals, `06` shipped apps, `07` contact.

## Editing content

All copy lives in `src/content/`. To change a project, a metric or a timeline
chapter, edit the relevant module — components never contain copy. See
`.cursor/rules/content-layer.mdc` for the accuracy bar these numbers are held to.

## Conventions

`AGENTS.md` and `.cursor/rules/` document the rules this codebase is held to:
semantic colour tokens only, transform/opacity-only animation, no `setState` in
scroll callbacks, and no `opacity: 0` above the fold. Worth reading before
contributing — several of them exist because the alternative measurably hurts
Core Web Vitals.
