# jaychauhan.tech

Personal site for Jay Chauhan — Backend & AI Engineer. A single-page editorial
portfolio plus a small technical blog.

The design language is Swiss editorial print: bone paper, ink type, hairline
rules, numbered sections, wide-tracked monospace micro-labels, and scroll-driven
motion that stays out of the way.

## Stack

| Concern   | Choice                                                        |
| --------- | ------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript    |
| Styling   | Tailwind CSS v4 — CSS-first config in `src/app/globals.css`   |
| Motion    | `motion` v13 · `lenis` on Motion's frame loop                 |
| Type      | Archivo · Newsreader · JetBrains Mono                         |
| Content   | Typed modules in `src/content/` · Markdown in `content/blog/` |
| Mail      | Resend, via a server action                                   |
| Hosting   | Vercel                                                        |

Pages prerender to static HTML. The contact form is a server action. The LinkedIn
shelf is ISR when a feed URL is set.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

| Script              | Does                       |
| ------------------- | -------------------------- |
| `npm run dev`       | Dev server on :3000        |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm run lint`      | ESLint (flat config)       |
| `npm run typecheck` | `tsc --noEmit`             |
| `npm run format`    | Prettier                   |

Secrets, Search Console, Resend, the LinkedIn bridge, and Vercel DNS live in
**[docs/setup.md](docs/setup.md)**. None of them are required to run locally.

## Layout

```
content/blog/           Markdown posts
docs/                   Operator setup (env, mail, SEO, deploy)
src/
  app/                  Routes, globals.css, sitemap / robots / OG
  app/actions/          Server actions (contact)
  components/
    primitives/         Motion and layout building blocks
    chrome/             Nav, footer, theme, rails
    sections/           One file per numbered homepage section
  content/              All portfolio copy, typed
  lib/                  fonts, seo, blog, linkedin, theme
```

The homepage reads as a numbered document: `01` premise, `02` work, `03` stack,
`04` approach, `05` story, `06` signals, `07` live apps, `08` writing, `09` feed,
`10` contact, then the unnumbered type tray.

## Conventions

`AGENTS.md` and `.cursor/rules/` are the rules this codebase is held to: content
in `src/content/`, semantic colour tokens only, transform/opacity-only animation,
no `setState` in scroll callbacks, and no `opacity: 0` above the fold.
