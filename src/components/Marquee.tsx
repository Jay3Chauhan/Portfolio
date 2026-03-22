const TECH_ITEMS = [
  "Flutter", "Firebase", "Dart", "Node.js", "Python",
  "Java", "Azure", "GCP", "REST APIs", "MongoDB",
];

export default function Marquee() {
  // Duplicate items twice for seamless marquee loop (matching original HTML)
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
