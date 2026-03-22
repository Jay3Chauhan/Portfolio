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
                Crafting Digital Experiences That Matter
              </h2>
              <p>
                As a{" "}
                <strong>
                  Software Engineer and Mobile Application Developer
                </strong>{" "}
                with a solid grounding in Computer Science and Engineering from{" "}
                <strong>Gujarat Technological University (GTU)</strong>, I excel in
                crafting high-performance apps using Flutter, Node.js and Firebase.
              </p>
              <p>
                My expertise encompasses{" "}
                <strong>Java, C, Python</strong> and cloud services like{" "}
                <strong>Azure and Google Cloud Platform</strong>, allowing me to
                deliver scalable and secure solutions. Currently, I&apos;m building
                cutting-edge fintech trading applications at{" "}
                <strong>Arhamshare</strong>.
              </p>
              <p>
                Driven by a passion for innovation, I&apos;m committed to
                developing user-centric mobile applications that address
                real-world challenges. I thrive in the ever-evolving tech
                landscape, continuously enhancing my skills to deliver impactful
                results.
              </p>

              <div className="about-highlights">
                <div className="highlight-card">
                  <div className="h-icon">📱</div>
                  <h4>Mobile First</h4>
                  <p>Cross-platform apps with native performance</p>
                </div>
                <div className="highlight-card">
                  <div className="h-icon">🔥</div>
                  <h4>Firebase Expert</h4>
                  <p>Auth, Firestore, Cloud Functions, FCM</p>
                </div>
                <div className="highlight-card">
                  <div className="h-icon">☁️</div>
                  <h4>Cloud Native</h4>
                  <p>Azure &amp; GCP certified solutions</p>
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
                  src="https://cdn.jsdelivr.net/gh/Jay3Chauhan/Portfolio@master/images/pic1.png"
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
