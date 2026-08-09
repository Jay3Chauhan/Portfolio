export type Discipline = {
  id: string;
  name: string;
  /** Rendered in italic serif beneath the name, like a binomial. */
  classification: string;
  description: string;
  source: string;
  role: string;
  /** Relative share of build time. All four sum to `LOAD_TOTAL`. */
  load: number;
  tools: string[];
};

export const LOAD_TOTAL = 400;

export const disciplines: Discipline[] = [
  {
    id: "services",
    name: "Services",
    classification: "Python · FastAPI",
    description:
      "Async APIs, WebSocket streams and the microservice boundaries between them. This is the part that has to stay awake — request in, correct answer out, under load, at market open.",
    source: "Arhamshare, daily since 2024",
    role: "The load-bearing wall",
    load: 132,
    tools: ["Python", "FastAPI", "Pydantic v2", "WebSockets", "REST"],
  },
  {
    id: "retrieval",
    name: "Retrieval",
    classification: "LangChain · Qdrant · Groq",
    description:
      "Embeddings, vector search and grounded generation. A model is only as trustworthy as the passage it is holding, so retrieval quality gets measured rather than assumed.",
    source: "ComplianceIQ, 20+ regulatory documents",
    role: "Applied intelligence",
    load: 84,
    tools: ["LangChain", "Qdrant", "Groq LLaMA", "RAGAS", "Embeddings"],
  },
  {
    id: "state",
    name: "State",
    classification: "PostgreSQL · MongoDB · Redis",
    description:
      "Schema design for financial data across relational, document and in-memory stores. High-frequency transactional workflows are unforgiving about the shape you chose six months ago.",
    source: "Trading, mutual fund and AA workloads",
    role: "Durability and speed",
    load: 108,
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Schema design"],
  },
  {
    id: "delivery",
    name: "Delivery",
    classification: "Docker · NGINX · CI/CD",
    description:
      "Containers, reverse proxies, SSL termination and the pipelines that move code without drama. Testing across 40+ components cut production defects by 30%, which is the whole argument for doing it.",
    source: "Production deployments, GCP and Azure",
    role: "Ship it, keep it up",
    load: 76,
    tools: ["Docker", "NGINX", "GitHub Actions", "GCP", "Azure"],
  },
];

export const stackStatement = "Four disciplines. Production weight. Nothing decorative.";
