"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

type Tier = "expert" | "proficient" | "familiar";

const TIER_META: Record<Tier, { label: string; width: string }> = {
  expert: { label: "Expert", width: "100%" },
  proficient: { label: "Proficient", width: "68%" },
  familiar: { label: "Familiar", width: "40%" },
};

// Tiers reflect hands-on production usage, not self-rated precision scores:
// Expert = daily driver across multiple production systems
// Proficient = regular use, shipped features independently
// Familiar = working knowledge, used on select projects
const SKILL_CATEGORIES: { title: string; skills: { name: string; tier: Tier }[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", tier: "expert" },
      { name: "Java", tier: "proficient" },
      { name: "JavaScript / Node.js", tier: "familiar" },
      { name: "Dart", tier: "familiar" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "FastAPI", tier: "expert" },
      { name: "LangChain / LangGraph", tier: "proficient" },
      { name: "Selenium", tier: "proficient" },
      { name: "REST APIs / WebSockets", tier: "expert" },
      { name: "Pydantic v2", tier: "proficient" },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "RAG Pipelines", tier: "proficient" },
      { name: "Vector Embeddings (Qdrant)", tier: "proficient" },
      { name: "LLM Integration (Groq)", tier: "proficient" },
      { name: "RAGAS Evaluation", tier: "familiar" },
    ],
  },
  {
    title: "Databases & DevOps",
    skills: [
      { name: "PostgreSQL / MySQL", tier: "expert" },
      { name: "MongoDB", tier: "proficient" },
      { name: "Docker / NGINX", tier: "proficient" },
      { name: "GCP / Azure", tier: "proficient" },
      { name: "GitHub Actions / CI/CD", tier: "familiar" },
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
      <div className="skill-tier-legend">
        {(Object.keys(TIER_META) as Tier[]).map((tier) => (
          <span key={tier} className={`skill-tier-legend-item tier-${tier}`}>
            <span className="tier-dot" /> {TIER_META[tier].label}
          </span>
        ))}
      </div>
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
                  <div
                    className={`skill-bar tier-${skill.tier}`}
                    data-width={TIER_META[skill.tier].width}
                  />
                </div>
                <span className={`skill-tier-label tier-${skill.tier}`}>
                  {TIER_META[skill.tier].label}
                </span>
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
