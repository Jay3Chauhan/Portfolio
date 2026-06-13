"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 94 },
      { name: "Java", level: 80 },
      { name: "JavaScript / Node.js", level: 78 },
      { name: "Dart", level: 75 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "FastAPI", level: 93 },
      { name: "LangChain / LangGraph", level: 88 },
      { name: "Selenium", level: 82 },
      { name: "REST APIs / WebSockets", level: 90 },
      { name: "Pydantic v2", level: 86 },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "RAG Pipelines", level: 88 },
      { name: "Vector Embeddings (Qdrant)", level: 85 },
      { name: "LLM Integration (Groq)", level: 84 },
      { name: "RAGAS Evaluation", level: 78 },
    ],
  },
  {
    title: "Databases & DevOps",
    skills: [
      { name: "PostgreSQL / MySQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Docker / NGINX", level: 84 },
      { name: "GCP / Azure", level: 80 },
      { name: "GitHub Actions / CI/CD", level: 78 },
    ],
  },
];

function SkillBars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll<HTMLElement>(".skill-bar");
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width || "0%";
            }, i * 100);
          });
        }
      },
      { threshold: 0.2 }
    );

    const categories = ref.current?.querySelectorAll(".skill-category");
    categories?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {SKILL_CATEGORIES.map((cat, i) => (
        <ScrollReveal key={i}>
          <div className="skill-category">
            <div className="skill-category-title">
              <span className="cat-dot" /> {cat.title}
            </div>
            {cat.skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar-container">
                  <div className="skill-bar" data-width={`${skill.level}%`} />
                </div>
                <span className="skill-percent">{skill.level}%</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function GitHubGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || grid.children.length > 0) return;
    const levels = ["", "l1", "l2", "l3", "l4"];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 52; col++) {
        const cell = document.createElement("div");
        cell.className = "gh-cell";
        const rand = Math.random();
        if (rand > 0.7) cell.classList.add(levels[Math.floor(Math.random() * 4) + 1]);
        grid.appendChild(cell);
      }
    }
  }, []);

  return <div ref={gridRef} className="github-grid" id="githubGrid" />;
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Skills</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Technical Expertise</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            My technical toolkit built through years of hands-on development and
            continuous learning.
          </p>
        </ScrollReveal>

        <div className="skills-layout">
          <div>
            <SkillBars />
          </div>

          <ScrollReveal>
            <div className="skills-orbit">
              <div className="skills-center">
                Core<br />Skills
              </div>
              <div className="orbit-ring" style={{ width: 200, height: 200 }}>
                <div className="orbit-item" style={{ top: -12, left: "50%", transform: "translateX(-50%)" }}>Python</div>
                <div className="orbit-item" style={{ bottom: -12, left: "50%", transform: "translateX(-50%)" }}>FastAPI</div>
                <div className="orbit-item" style={{ left: -30, top: "50%", transform: "translateY(-50%)" }}>LangChain</div>
                <div className="orbit-item" style={{ right: -20, top: "50%", transform: "translateY(-50%)" }}>RAG</div>
              </div>
              <div className="orbit-ring" style={{ width: 320, height: 320 }}>
                <div className="orbit-item" style={{ top: -12, left: "30%" }}>PostgreSQL</div>
                <div className="orbit-item" style={{ bottom: -12, right: "15%" }}>MongoDB</div>
                <div className="orbit-item" style={{ left: -30, top: "35%" }}>Docker</div>
                <div className="orbit-item" style={{ right: -20, bottom: "30%" }}>Qdrant</div>
                <div className="orbit-item" style={{ top: "20%", right: "5%" }}>Groq</div>
              </div>
              <div className="orbit-ring" style={{ width: 420, height: 420 }}>
                <div className="orbit-item" style={{ top: -12, right: "20%" }}>NGINX</div>
                <div className="orbit-item" style={{ bottom: -12, left: "25%" }}>Redis</div>
                <div className="orbit-item" style={{ left: -30, bottom: "30%" }}>WebSockets</div>
                <div className="orbit-item" style={{ right: -45, top: "40%" }}>Selenium</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="github-activity">
            <div className="github-header">
              <h3>GitHub Contributions</h3>
              <a
                href="https://github.com/Jay3Chauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}
              >
                @Jay3Chauhan →
              </a>
            </div>
            <GitHubGrid />
            <div className="github-legend">
              <span>Less</span>
              <div className="gh-legend-cell" style={{ background: "var(--border)" }} />
              <div className="gh-legend-cell l1" />
              <div className="gh-legend-cell l2" />
              <div className="gh-legend-cell l3" />
              <div className="gh-legend-cell l4" />
              <span>More</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
