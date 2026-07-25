"use client";

import { Mail, MapPin, Phone, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/seo";

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Contact</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Let&apos;s Build Something Together</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            I&apos;m always interested in hearing about new projects and
            opportunities.
          </p>
        </ScrollReveal>

        <div className="contact-layout">
          <ScrollReveal>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value">
                    <a href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <div className="contact-item-value">
                    {siteConfig.location}
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-value">
                    <a href={`tel:${siteConfig.phone}`}>+91 94082 54415</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Globe size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <div className="contact-item-label">Website</div>
                  <div className="contact-item-value">
                    <a
                      href={siteConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      jaychauhan.tech
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="contact-cta">
              <h3>
                Have an idea?
                <br />
                Let&apos;s make it real.
              </h3>
              <p>
                Whether you need a mobile app, want to collaborate, or just want
                to say hello — I&apos;d love to hear from you.
              </p>
              <ContactForm />
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/jay-chauhan-5a65921ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  <span>in</span>
                </a>
                <a
                  href="https://github.com/Jay3Chauhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <span>GH</span>
                </a>
                <a
                  href="https://twitter.com/Jay3_Chauhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Twitter"
                >
                  <span>𝕏</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
