/**
 * Single source of truth for identity, contact details and navigation.
 * Every section reads from `src/content/*` — never hardcode copy in a component.
 */

export const identity = {
  firstName: "Jay",
  lastName: "Chauhan",
  fullName: "Jay Chauhan",
  wordmark: "JAY CHAUHAN",
  role: "Backend & AI Engineer",
  company: "Arhamshare",
  location: "Surat, Gujarat, India",
  availability: "Open to backend & AI roles — remote or India",
  tagline: ["Build it quiet.", "Keep it up."],
  /** One-line positioning used under the hero. */
  premise:
    "Production backends and applied AI, built to hold under load. Python and FastAPI services shipped from Surat, running wherever the money moves.",
} as const;

export const contact = {
  email: "contact@jaychauhan.tech",
  phone: "+919408254415",
  phoneDisplay: "+91 94082 54415",
  resumeUrl: "https://drive.google.com/file/d/1EddxDs0TL6hxAp9qMkkvwT8korQZP9wa/view",
} as const;

export const socials = [
  { label: "GitHub", handle: "Jay3Chauhan", href: "https://github.com/Jay3Chauhan" },
  {
    label: "LinkedIn",
    handle: "jay-chauhan",
    href: "https://www.linkedin.com/in/jay-chauhan-5a65921ba/",
  },
  { label: "X", handle: "@Jay3_Chauhan", href: "https://twitter.com/Jay3_Chauhan" },
  {
    label: "Credly",
    handle: "jay3_chauhan",
    href: "https://www.credly.com/users/jay3_chauhan",
  },
] as const;

/**
 * The full page index, shared by the top bar, the mobile sheet, the section
 * rail and the footer. Numbering is contiguous on purpose — a bar reading
 * "05 STORY 07 LIVE" looks like a bug rather than an edit.
 */
export const sections = [
  { label: "Work", href: "#work", index: "02" },
  { label: "Stack", href: "#stack", index: "03" },
  { label: "Approach", href: "#approach", index: "04" },
  { label: "Story", href: "#story", index: "05" },
  { label: "Signals", href: "#signals", index: "06" },
  { label: "Live", href: "#production", index: "07" },
  { label: "Writing", href: "#writing", index: "08" },
] as const;


/** Headline figures. Rendered as an animated counter strip under the hero. */
export const figures = [
  { value: 2, suffix: "+", label: "Years in production", note: "Since Jan 2024" },
  { value: 8, suffix: "+", label: "Backend services", note: "Secured, JWT / OAuth 2.0" },
  { value: 3, suffix: "", label: "Apps live on stores", note: "iOS and Android" },
  { value: 10, suffix: "k", label: "Peak concurrent users", note: "1k–10k range" },
] as const;

/** Fragments for the ticker that runs beneath the hero. */
export const ticker = [
  "Python",
  "FastAPI",
  "LangChain",
  "Qdrant",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "NGINX",
  "WebSockets",
  "RAG pipelines",
  "Account Aggregator",
] as const;
