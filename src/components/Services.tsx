"use client";

import {
  Banknote,
  BrainCircuit,
  Cloud,
  Database,
  Terminal as TerminalIcon,
  Workflow,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const SERVICES = [
  {
    number: "01",
    icon: TerminalIcon,
    title: "Backend Engineering",
    desc: "Building production-grade microservices with Python and FastAPI — async APIs, WebSocket streams, JWT/OAuth security, and NGINX reverse proxy deployments.",
    metric: "8+ backend services in production",
    delay: 0,
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Generative AI & RAG",
    desc: "Designing RAG pipelines with LangChain, vector databases (Qdrant), and LLM integration (Groq LLaMA). Citation-enforced grounding with RAGAS evaluation benchmarks.",
    metric: "20+ regulatory documents indexed",
    delay: 1,
  },
  {
    number: "03",
    icon: Banknote,
    title: "Fintech Solutions",
    desc: "Developing secure financial backends with real-time data streaming, market analytics, portfolio tracking, Account Aggregator integration, and regulatory compliance.",
    metric: "Powers 3 live apps, 1k–10k concurrent users",
    delay: 2,
  },
  {
    number: "04",
    icon: Workflow,
    title: "API & Data Pipelines",
    desc: "Designing REST/WebSocket APIs, real-time data pipelines, Selenium scrapers, and CronJob-based data sync systems with Redis caching for high-frequency workflows.",
    metric: "Real-time WebSocket market data streams",
    delay: 0,
  },
  {
    number: "05",
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Containerized deployments with Docker, NGINX load balancing, GCP/Azure cloud services, GitHub Actions CI/CD, and production monitoring infrastructure.",
    metric: "30% fewer production defects via CI/CD",
    delay: 1,
  },
  {
    number: "06",
    icon: Database,
    title: "Database Architecture",
    desc: "Multi-database design spanning PostgreSQL, MySQL, and MongoDB for structured financial data, high-frequency transactions, and vector storage for AI applications.",
    metric: "PostgreSQL, MySQL, MongoDB & Qdrant",
    delay: 2,
  },
];

const CP_TECH = ["Python", "LangChain", "Qdrant", "Groq LLaMA", "FastAPI"];

const CP_STATS = [
  { label: "Type", value: "RAG System" },
  { label: "LLM", value: "Groq LLaMA-3.3-70B" },
  { label: "Vector DB", value: "Qdrant Cloud" },
  { label: "Status", value: "Active Development", color: "#22c55e" },
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
            From backend architecture to AI integration, I build scalable
            systems end-to-end.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={i} delay={s.delay}>
              <div className="service-card">
                <span className="s-number">{s.number}</span>
                <div className="s-icon">
                  <s.icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="s-metric">{s.metric}</div>
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
              <h3>ComplianceIQ — Regulatory RAG System</h3>
              <p>
                An intelligent RBI/SEBI regulatory compliance system powered by
                RAG pipelines. Ingests regulatory PDFs, performs category-filtered
                vector retrieval, and generates citation-grounded answers using
                Groq LLaMA for the Indian fintech ecosystem.
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
