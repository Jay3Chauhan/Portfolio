"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const CDN = "https://cdn.jsdelivr.net/gh/Jay3Chauhan/Portfolio@Portfolio-2/images";

type Cert = {
  issuer: string;
  name: string;
  date: string;
  link?: string;
  badge?: string;
  delay: number;
};

const CERTS: Cert[] = [{
  issuer: "Microsoft",
  name: "Azure Fundamentals (AZ-900)",
  date: "March 2022",
  link: "https://learn.microsoft.com/api/credentials/share/en-us/JAYCHAUHAN-8382/DBAD3B24E1341B0B?sharingId=studentamb_258492",
  badge: `https://learn.microsoft.com/en-gb/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg`,
  delay: 0,
},
{
  issuer: "GitHub",
  name: "GitHub Foundations",
  date: "May 2025",
  link: "https://www.credly.com/badges/54431621-358e-4780-aa7f-d2666b765b50/public_url",
  badge: "https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png",
  delay: 1,
},
{
  issuer: "Google Cloud",
  name: "Cloud Security & Operations",
  date: "Nov 2023",
  link: "https://www.cloudskillsboost.google/public_profiles/ad06f077-e2b5-4403-b1fe-547a6e3e0f96/badges/6368276",
  badge: "https://cdn.qwiklabs.com/AJPPrEvWhPR1qcqjZCSEssIWODQooxa41OEkkOtcry0%3D",
  delay: 2,
},
{
  issuer: "Google Cloud",
  name: "Infrastructure & App Modernization",
  date: "Nov 2023",
  link: "https://www.cloudskillsboost.google/public_profiles/ad06f077-e2b5-4403-b1fe-547a6e3e0f96/badges/6368127",
  badge: "https://cdn.qwiklabs.com/2%2FU8FMWu4MIRz1BJSNKVz4M3VoEhyWy%2FexcrHNVDmww%3D",
  delay: 3,
},
{
  issuer: "AWS",
  name: "Introduction to Generative AI",
  date: "March 2025",
  link: "https://www.credly.com/badges/cb55237a-aeb9-40a5-8cf8-04430341791b",
  badge: "https://images.credly.com/size/340x340/images/e50c657a-edd9-4c93-b1cf-2b6634b54abf/blob",
  delay: 4,
},


{
  issuer: "Google",
  name: "GDSC Lead Certificate",
  date: "2022-2023",
  badge: `${CDN}/gdsccertifecate.jpg`,
  delay: 0,
},
{
  issuer: "Cisco",
  name: "Introduction to Cybersecurity",
  date: "2022",
  badge: `${CDN}/cyber.jpg`,
  delay: 1,
},
{
  issuer: "Infosys",
  name: "Python Database Connection — MariaDB",
  date: "2022",
  badge: `${CDN}/Mariadb.jpg`,
  delay: 2,
},
];

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="section-container">
        <ScrollReveal>
          <div className="section-label">Certifications</div>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section-title">Credentials &amp; Badges</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section-desc">
            Professional certifications validating continuous learning and
            technical expertise.
          </p>
        </ScrollReveal>

        <div className="certs-grid">
          {CERTS.map((cert, i) => (
            <ScrollReveal key={i} delay={cert.delay}>
              <div className="cert-card">
                {cert.badge && (
                  <div className="cert-badge-wrap">
                    <Image
                      src={cert.badge}
                      alt={cert.name}
                      width={200}
                      height={200}
                      className="cert-badge-img"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-date">{cert.date}</div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify"
                  >
                    Verify →
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a
              href="https://www.credly.com/users/jay3_chauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View All on Credly{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
