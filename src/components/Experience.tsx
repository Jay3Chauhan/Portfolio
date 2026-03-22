"use client";

import ScrollReveal from "./ScrollReveal";

const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "Arhamshare Pvt Ltd.",
    date: "2023 — Present",
    points: [
      "Developing a trading application using Flutter for smooth, performant UX across iOS and Android devices.",
      "Implemented StreamBuilder for real-time stock data updates and market movements within the app.",
      "Utilized Provider for efficient state management, ensuring data consistency throughout the application.",
      "Designed and built data visualization interfaces for effective market trend analysis.",
    ],
  },
  {
    role: "Google Developer Student Club — Lead",
    company: "Google",
    date: "2022 — 2023",
    points: [
      "Founded GDSC on campus, aligning with club objectives and streamlining team collaboration.",
      "Led 17 students, organized 10+ events — achieved 191.8% growth with 508 official members.",
      "Cultivated partnerships with community organizations resulting in impactful collaborations.",
    ],
  },
  {
    role: "Microsoft Engage Intern 2022",
    company: "Microsoft, Bangalore",
    date: "2022",
    points: [
      "Developed a browser-based Face Recognition attendance system using Django, Python, and OpenCV.",
      "Built the system to capture faces and store attendance data with multi-face simultaneous detection.",
    ],
  },
  {
    role: "GDSC WoW Gujarat Organizer",
    company: "GDSC, India",
    date: "2022",
    points: [
      "Planned and executed the first offline GDSC WOW event in Gujarat — team of 70, 800+ attendees.",
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
