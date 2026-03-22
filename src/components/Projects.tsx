"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  category: string;
  type: string;
  github?: string;
  featured?: boolean;
  delay?: number;
};

const PROJECTS: Project[] = [
  {
    title: "EventHub — Event Management Platform",
    desc: "A one-stop event management platform (Android-iOS) connecting users with artists, decorators, DJs, and more. Features secure payments, messaging, ratings, and fast service.",
    tech: ["Flutter", "Firebase", "Cloud Functions", "Stripe API"],
    category: "mobile",
    type: "Featured Project",
    github: "https://github.com/Jay3Chauhan/ceremo.git",
    featured: true,
  },
  {
    title: "SkyView — Weather Platform",
    desc: "Real-time weather app with forecasts, geolocation, dynamic backgrounds, alerts, and offline support.",
    tech: ["Flutter", "REST APIs", "Dart"],
    category: "mobile",
    type: "Mobile App",
    github: "https://github.com/Jay3Chauhan/Weather-Detection.git",
  },
  {
    title: "SocialSync — Content Manager",
    desc: "Create, edit, and schedule posts across platforms from one dashboard with analytics and insights.",
    tech: ["Flutter", "Firebase", "Social APIs"],
    category: "mobile",
    type: "Mobile App",
    github: "https://github.com/Jay3Chauhan/Social-Media-Scheduler.git",
    delay: 1,
  },
  {
    title: "FaceTrack — Recognition System",
    desc: "Django app using OpenCV for automatic face detection and attendance marking. Multi-face support with search.",
    tech: ["Django", "Python", "OpenCV"],
    category: "web",
    type: "Web App",
    github: "https://github.com/Jay3Chauhan/MicrosoftEngage2022-FaceAttendenceProject.git",
  },
  {
    title: "InstaClone — Social Network",
    desc: "Full social networking app with profiles, uploads, DMs, push notifications, and hashtags.",
    tech: ["Flutter", "Firebase", "Cloud Storage"],
    category: "mobile",
    type: "Mobile App",
    github: "https://github.com/Jay3Chauhan/instagram-flutter-clone.git",
    delay: 1,
  },
  {
    title: "E-Commerce + FAQ Bot",
    desc: "Prototype store with integrated AI FAQ bot, product catalog, and cart. Deployed on Azure.",
    tech: ["HTML/CSS", "JavaScript", "Azure"],
    category: "web",
    type: "Web App",
    github: "https://github.com/Jay3Chauhan/FRT-WEBSITE-AZURE.git",
    delay: 2,
  },
  {
    title: "YouTube Downloader",
    desc: "Lightweight CLI tool for downloading YouTube videos. Built with pytube — no additional dependencies needed.",
    tech: ["Python", "pytube", "CLI"],
    category: "python",
    type: "Python Tool",
    github: "https://github.com/Jay3Chauhan/YoutubeDownloader.git",
  },
  {
    title: "Instagram Media Scraper",
    desc: "Scraping tool for reels, stories, highlights, captions, and view counts. Uses Selenium & Pandas.",
    tech: ["Python", "Selenium", "Pandas"],
    category: "python",
    type: "Python Tool",
    github: "https://github.com/Jay3Chauhan/Instagram-Downloader.git",
    delay: 1,
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "Web Apps", value: "web" },
  { label: "Python Tools", value: "python" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

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
                    <span className="fp-icon">🎪</span>
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ width: "fit-content", padding: "0.7rem 1.5rem", fontSize: "0.82rem" }}
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal key={i} delay={project.delay || 0}>
                <div className="project-card" data-cat={project.category}>
                  <div className="project-card-header">
                    <span className="project-type">{project.type}</span>
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub - ${project.title}`}
                        >
                          ⟨/⟩
                        </a>
                      )}
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
