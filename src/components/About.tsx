"use client";

import Image from "next/image";
import { Boxes, BrainCircuit, Cloud, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const HIGHLIGHTS = [
  {
    icon: Boxes,
    title: "Python & FastAPI",
    desc: "Microservices, REST APIs, async backends",
  },
  {
    icon: BrainCircuit,
    title: "GenAI & RAG",
    desc: "LangChain, Qdrant, Groq LLaMA, embeddings",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Docker, NGINX, GCP, Azure, CI/CD",
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="section-container">
        <div className="about-grid">
          <ScrollReveal>
            <div className="about-text">
              <div className="section-label">About Me</div>
              <h2 className="section-title">
                Engineering Intelligent Systems That Scale
              </h2>
              <p>
                As a{" "}
                <strong>
                  Software Engineer specializing in Backend &amp; AI
                </strong>{" "}
                with a solid grounding in Computer Science and Engineering from{" "}
                <strong>Gujarat Technological University (GTU)</strong>, I build
                production-grade backends using Python, FastAPI, and microservices
                architecture.
              </p>
              <p>
                My expertise spans{" "}
                <strong>RAG pipelines, LangChain, LLM integration</strong> and
                multi-database environments with{" "}
                <strong>PostgreSQL, MySQL, and MongoDB</strong>. Currently, I&apos;m
                building fintech microservices, trading platforms, and AI-powered
                financial applications at{" "}
                <strong>Arhamshare</strong>.
              </p>
              <p>
                Driven by a passion for AI and backend engineering, I&apos;m
                committed to building intelligent, scalable systems that solve
                real-world problems — from real-time data pipelines to
                GenAI-powered regulatory compliance tools.
              </p>

              <div className="about-highlights">
                {HIGHLIGHTS.map((h) => (
                  <div className="highlight-card" key={h.title}>
                    <div className="h-icon">
                      <h.icon size={20} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h4>{h.title}</h4>
                    <p>{h.desc}</p>
                  </div>
                ))}
              </div>

              <div className="leadership-callout">
                <div className="h-icon leadership-icon">
                  <Users size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h4>Community Leadership</h4>
                  <p>
                    Grew Google Developer Student Club to <strong>508+ members</strong> (191.8%
                    growth) as campus Lead — beyond the code, building teams and
                    programs that scale.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="about-image-container">
              <div className="about-image-frame">
                <Image
                  src="https://cdn.jsdelivr.net/gh/Jay3Chauhan/portfolio-assets@main/pic1.png"
                  alt="Jay Chauhan"
                  width={400}
                  height={480}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="overlay" />
              </div>
              <div className="about-floating-card">
                <div className="label">Current Role</div>
                <div className="value">SDE @ Arhamshare</div>
              </div>
              <div className="about-floating-card2">
                <div className="label">Education</div>
                <div className="value">B.E — GTU</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
