"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

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
                <div className="highlight-card">
                  <div className="h-icon">🐍</div>
                  <h4>Python &amp; FastAPI</h4>
                  <p>Microservices, REST APIs, async backends</p>
                </div>
                <div className="highlight-card">
                  <div className="h-icon">🤖</div>
                  <h4>GenAI &amp; RAG</h4>
                  <p>LangChain, Qdrant, Groq LLaMA, embeddings</p>
                </div>
                <div className="highlight-card">
                  <div className="h-icon">☁️</div>
                  <h4>Cloud &amp; DevOps</h4>
                  <p>Docker, NGINX, GCP, Azure, CI/CD</p>
                </div>
                <div className="highlight-card">
                  <div className="h-icon">👥</div>
                  <h4>Community Leader</h4>
                  <p>508+ members as Google DSC Lead</p>
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
