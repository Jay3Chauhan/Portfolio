"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "Dart", level: 92 },
      { name: "C", level: 90 },
      { name: "Python", level: 86 },
      { name: "Java", level: 80 },
      { name: "JavaScript", level: 78 },
    ],
  },
  {
    title: "Frameworks & Tools",
    skills: [
      { name: "Flutter", level: 93 },
      { name: "Firebase", level: 88 },
      { name: "Node.js", level: 75 },
      { name: "Git / GitHub", level: 84 },
      { name: "REST APIs", level: 86 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Google Cloud (GCP)", level: 80 },
      { name: "Microsoft Azure", level: 78 },
      { name: "MongoDB Atlas", level: 82 },
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
                <div className="orbit-item" style={{ top: -12, left: "50%", transform: "translateX(-50%)" }}>Flutter</div>
                <div className="orbit-item" style={{ bottom: -12, left: "50%", transform: "translateX(-50%)" }}>Firebase</div>
                <div className="orbit-item" style={{ left: -20, top: "50%", transform: "translateY(-50%)" }}>Dart</div>
                <div className="orbit-item" style={{ right: -20, top: "50%", transform: "translateY(-50%)" }}>Git</div>
              </div>
              <div className="orbit-ring" style={{ width: 320, height: 320 }}>
                <div className="orbit-item" style={{ top: -12, left: "30%" }}>Python</div>
                <div className="orbit-item" style={{ bottom: -12, right: "15%" }}>Java</div>
                <div className="orbit-item" style={{ left: -30, top: "35%" }}>Azure</div>
                <div className="orbit-item" style={{ right: -20, bottom: "30%" }}>GCP</div>
                <div className="orbit-item" style={{ top: "20%", right: "5%" }}>Node.js</div>
              </div>
              <div className="orbit-ring" style={{ width: 420, height: 420 }}>
                <div className="orbit-item" style={{ top: -12, right: "20%" }}>OpenCV</div>
                <div className="orbit-item" style={{ bottom: -12, left: "25%" }}>Django</div>
                <div className="orbit-item" style={{ left: -30, bottom: "30%" }}>REST APIs</div>
                <div className="orbit-item" style={{ right: -35, top: "40%" }}>Stripe</div>
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
