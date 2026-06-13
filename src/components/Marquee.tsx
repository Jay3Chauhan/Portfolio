const TECH_ITEMS = [
  "Python", "FastAPI", "LangChain", "RAG Pipelines", "Qdrant",
  "PostgreSQL", "Docker", "NGINX", "WebSockets", "MongoDB",
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
