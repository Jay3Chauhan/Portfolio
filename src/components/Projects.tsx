"use client";

import { useState } from "react";
import { ChevronDown, Lock, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  category: string;
  type: string;
  github?: string;
  /** Proprietary employer project — no public repo exists; show a badge instead of a dead link. */
  private?: boolean;
  featured?: boolean;
  delay?: number;
};

const PROJECTS: Project[] = [
  {
    title: "ComplianceIQ — RBI/SEBI Regulatory RAG System",
    desc: "Ingested 20+ RBI/SEBI PDFs into Qdrant Cloud with 500-token overlapping chunks and metadata indexing. Built LangChain retrieval pipeline with category filters and deployed Groq LLaMA-3.3-70B with citation-enforced grounding. Benchmarked with RAGAS achieving strong faithfulness scores.",
    tech: ["Python", "LangChain", "Qdrant", "Groq LLaMA", "RAGAS"],
    category: "ai",
    type: "Featured Project",
    private: true,
    featured: true,
  },
  {
    title: "Trado — Trading Platform Backend",
    desc: "Modular FastAPI microservices for equity trading, portfolio tracking, IPO listings, screeners, and FII/DII data. WebSocket streams for live market data, Redis caching, and real-time P&L calculation engine.",
    tech: ["FastAPI", "WebSockets", "Redis", "Docker", "NGINX"],
    category: "backend",
    type: "Backend System",
    private: true,
  },
  {
    title: "Mutual Fund Platform — Backend",
    desc: "Complete MF platform backend covering NAV tracking, scheme discovery, and portfolio aggregation. Built Selenium scrapers + CronJobs for auto-syncing fund data from external sources.",
    tech: ["FastAPI", "Selenium", "PostgreSQL", "MongoDB", "CronJobs"],
    category: "backend",
    type: "Backend System",
    private: true,
    delay: 1,
  },
  {
    title: "Account Aggregator Integration",
    desc: "Integrated Finvu SDK with RBI Account Aggregator framework implementing end-to-end FIP/FIU consent flows per ReBIT API specs. JWT/OAuth 2.0 security across 8+ services.",
    tech: ["FastAPI", "Finvu SDK", "JWT/OAuth", "ReBIT API"],
    category: "backend",
    type: "Backend System",
    private: true,
    delay: 2,
  },
];

/** Early learning projects — kept for transparency, visually de-emphasized so they
 *  don't sit at equal weight to production fintech systems above. */
const EARLY_PROJECTS: Project[] = [
  {
    title: "FaceTrack — Recognition System",
    desc: "Django app using OpenCV for automatic face detection and attendance marking. Multi-face support with 7% speed improvement. Built during Microsoft Engage 2022.",
    tech: ["Django", "Python", "OpenCV"],
    category: "ai",
    type: "AI/ML App",
    github: "https://github.com/Jay3Chauhan/MicrosoftEngage2022-FaceAttendenceProject.git",
  },
  {
    title: "Instagram Media Scraper",
    desc: "Scraping tool for reels, stories, highlights, captions, and view counts. Uses Selenium & Pandas for data extraction and processing.",
    tech: ["Python", "Selenium", "Pandas"],
    category: "python",
    type: "Python Tool",
    github: "https://github.com/Jay3Chauhan/Instagram-Downloader.git",
  },
  {
    title: "YouTube Downloader",
    desc: "Lightweight CLI tool for downloading YouTube videos. Built with pytube — clean, minimal dependencies.",
    tech: ["Python", "pytube", "CLI"],
    category: "python",
    type: "Python Tool",
    github: "https://github.com/Jay3Chauhan/YoutubeDownloader.git",
  },
  {
    title: "E-Commerce + FAQ Bot",
    desc: "Prototype store with integrated AI FAQ bot, product catalog, and cart. Deployed on Azure with cloud services.",
    tech: ["HTML/CSS", "JavaScript", "Azure"],
    category: "python",
    type: "Web App",
    github: "https://github.com/Jay3Chauhan/FRT-WEBSITE-AZURE.git",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Backend Systems", value: "backend" },
  { label: "AI / GenAI", value: "ai" },
  { label: "Python Tools", value: "python" },
];

function ProjectLinks({ project }: { project: Project }) {
  if (project.private) {
    return (
      <span className="project-private-badge" title="Proprietary employer project — no public repository">
        <Lock size={12} strokeWidth={2.5} aria-hidden="true" /> Private
      </span>
    );
  }
  if (project.github) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`GitHub - ${project.title}`}
      >
        ⟨/⟩
      </a>
    );
  }
  return null;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showEarly, setShowEarly] = useState(false);

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const filteredEarly =
    activeFilter === "all"
      ? EARLY_PROJECTS
      : EARLY_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Projects</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Selected Work</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            Here are some of my notable projects showcasing technical depth and
            creative problem-solving.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="projects-filter">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${activeFilter === f.value ? "active" : ""}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="projects-grid" id="projectsGrid">
          {filtered.map((project, i) =>
            project.featured ? (
              <ScrollReveal key={i}>
                <div className="featured-project" data-cat={project.category}>
                  <div className="featured-project-visual">
                    <Sparkles size={72} strokeWidth={1.25} className="fp-icon" aria-hidden="true" />
                  </div>
                  <div className="featured-project-content">
                    <div className="featured-badge">★ {project.type}</div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    {project.private ? (
                      <span className="project-private-badge featured-private-badge">
                        <Lock size={13} strokeWidth={2.5} aria-hidden="true" /> Private — employer/personal codebase not public
                      </span>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ width: "fit-content", padding: "0.7rem 1.5rem", fontSize: "0.82rem" }}
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal key={i} delay={project.delay || 0}>
                <div className="project-card" data-cat={project.category}>
                  <div className="project-card-header">
                    <span className="project-type">{project.type}</span>
                    <div className="project-links">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                  <div className="project-card-body">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                  <div className="project-card-footer">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          )}
        </div>

        {filteredEarly.length > 0 && (
          <div className="early-projects">
            <button
              className="early-projects-toggle"
              onClick={() => setShowEarly((v) => !v)}
              aria-expanded={showEarly}
              aria-controls="earlyProjectsGrid"
            >
              <ChevronDown
                size={16}
                strokeWidth={2.5}
                className={`early-projects-chevron ${showEarly ? "open" : ""}`}
                aria-hidden="true"
              />
              {showEarly ? "Hide" : "Show"} Early Projects &amp; Learning Archive
              <span className="early-projects-count">{filteredEarly.length}</span>
            </button>

            {showEarly && (
              <div className="projects-grid early-projects-grid" id="earlyProjectsGrid">
                {filteredEarly.map((project, i) => (
                  <ScrollReveal key={i}>
                    <div className="project-card project-card-early" data-cat={project.category}>
                      <div className="project-card-header">
                        <span className="project-type">{project.type}</span>
                        <div className="project-links">
                          <ProjectLinks project={project} />
                        </div>
                      </div>
                      <div className="project-card-body">
                        <h3>{project.title}</h3>
                        <p>{project.desc}</p>
                      </div>
                      <div className="project-card-footer">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        )}

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href="https://github.com/Jay3Chauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View More on GitHub{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
