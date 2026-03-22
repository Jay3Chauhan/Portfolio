"use client";

import ScrollReveal from "./ScrollReveal";

const SERVICES = [
  {
    number: "01",
    icon: "📱",
    title: "Mobile App Development",
    desc: "Building high-performance, cross-platform applications using Flutter with beautiful UI, smooth animations, and native-like performance on both iOS and Android.",
    delay: 0,
  },
  {
    number: "02",
    icon: "🏦",
    title: "Fintech Solutions",
    desc: "Developing secure financial applications with real-time data streaming, market analytics, portfolio tracking, and compliance with industry security standards.",
    delay: 1,
  },
  {
    number: "03",
    icon: "☁️",
    title: "Cloud & Backend",
    desc: "Architecting scalable backend systems with Firebase, Node.js, and Python. Cloud deployment on Azure and GCP with CI/CD pipelines and monitoring.",
    delay: 2,
  },
  {
    number: "04",
    icon: "🔌",
    title: "API Integration",
    desc: "Connecting applications to third-party services, payment gateways, social APIs, and custom REST endpoints with proper error handling and caching.",
    delay: 0,
  },
  {
    number: "05",
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Creating intuitive, accessible interfaces with attention to detail — animations, micro-interactions, responsive layouts, and user-centered design principles.",
    delay: 1,
  },
  {
    number: "06",
    icon: "🤖",
    title: "AI & ML Integration",
    desc: "Integrating machine learning models into applications — face recognition, predictive analytics, and AI-powered features using TensorFlow and OpenCV.",
    delay: 2,
  },
];

const CP_TECH = ["Flutter", "FastAPI", "MongoDB", "Firebase", "Finvu SDK"];

const CP_STATS = [
  { label: "Platform", value: "iOS + Android" },
  { label: "Backend", value: "Python FastAPI" },
  { label: "Database", value: "MongoDB Atlas" },
  { label: "Status", value: "In Development", color: "#22c55e" },
];

export default function Services() {
  return (
    <section id="services">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">What I Do</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Services &amp; Expertise</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            From concept to deployment, I cover the full spectrum of mobile and
            web development.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={i} delay={s.delay}>
              <div className="service-card">
                <span className="s-number">{s.number}</span>
                <div className="s-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="current-project">
            <div className="current-project-info">
              <div className="cp-label">
                <span className="cp-live" />
                Currently Building
              </div>
              <h3>Finculate — Wealth Monitor</h3>
              <p>
                A comprehensive wealth monitoring and portfolio tracking
                application integrating with Account Aggregator services.
                Real-time financial insights, investment tracking, and secure
                data handling built for the Indian fintech ecosystem.
              </p>
              <div className="cp-tech">
                {CP_TECH.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="current-project-visual">
              {CP_STATS.map((stat) => (
                <div key={stat.label} className="cp-stat">
                  <span className="cp-stat-label">{stat.label}</span>
                  <span
                    className="cp-stat-value"
                    style={stat.color ? { color: stat.color } : undefined}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
