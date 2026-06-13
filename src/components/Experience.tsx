"use client";

import ScrollReveal from "./ScrollReveal";

const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "Arhamshare Pvt Ltd.",
    date: "Jan 2024 — Present",
    points: [
      "Built FastAPI microservices for trading, mutual fund, and Account Aggregator data workflows; configured NGINX with SSL termination and load balancing serving 1k–10k users.",
      "Integrated Finvu SDK with RBI Account Aggregator framework, implementing end-to-end FIP/FIU consent flows; secured 8+ backend services with JWT/OAuth 2.0.",
      "Developed full Mutual Fund platform backend — NAV tracking, scheme discovery, portfolio aggregation; built Selenium scrapers + CronJobs for auto-sync from external sources.",
      "Designed MySQL, PostgreSQL, and MongoDB schemas for financial data and high-frequency transactional workflows; prototyped LLM-based financial Q&A for user-facing insights.",
      "Reduced production defects by 30% across 40+ components via unit/regression testing; contributed to Agile sprints, code reviews, and API architecture documentation.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Toshal Infotech Pvt. Ltd.",
    date: "Jul 2023 — Sep 2023",
    points: [
      "Collaborated with senior developers to enhance UI/UX in Flutter, boosting user engagement by 15%.",
      "Optimized code to reduce app crashes by 25%; contributed to 3 major Agile sprints with 100% on-time delivery.",
    ],
  },
  {
    role: "Microsoft Engage Mentee 2022",
    company: "Microsoft",
    date: "Apr 2022 — Jun 2022",
    points: [
      "Created a browser-based Face Recognition attendance system using Django, Python, and OpenCV with 7% speed improvement.",
      "Built the system to capture faces and store attendance data with multi-face simultaneous detection.",
    ],
  },
  {
    role: "Google Developer Student Club — Lead",
    company: "Google",
    date: "2022 — 2023",
    points: [
      "Founded GDSC on campus — led 17 students, organized 10+ events, achieved 191.8% growth with 508 official members.",
      "Cultivated 5+ partnerships with organizations and hosted 3+ industry speaker sessions for 120+ club members.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Experience</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Where I&apos;ve Worked</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            A journey through tech leadership, innovation, and building products
            that impact thousands of users.
          </p>
        </ScrollReveal>

        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <ScrollReveal key={i}>
              <div className="timeline-item">
                <div className="timeline-header">
                  <div>
                    <div className="timeline-role">{exp.role}</div>
                    <div className="timeline-company">{exp.company}</div>
                  </div>
                  <div className="timeline-date">{exp.date}</div>
                </div>
                <ul className="timeline-points">
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
