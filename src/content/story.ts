/** Figure plates are drawn as SVG schematics — see `components/primitives/figure-plate.tsx`. */
export type PlateKind = "network" | "device" | "services" | "pipeline" | "retrieval";

export type Chapter = {
  year: string;
  index: string;
  title: string;
  body: string;
  caption: string;
  plate: PlateKind;
  marker: string;
};

export const chapters: Chapter[] = [
  {
    year: "2022",
    index: "01",
    title: "A club that did not exist yet.",
    body: "Founded the Google Developer Student Club on campus and led seventeen students through ten-plus events, five partnerships and three industry speaker sessions. In parallel, as a Microsoft Engage mentee, built a browser-based attendance system in Django and OpenCV that recognised several faces at once and did it 7% faster than the reference build.",
    caption: "GDSC founding cohort and the Engage face-recognition build",
    plate: "network",
    marker: "Google DSC Lead · Microsoft Engage",
  },
  {
    year: "2023",
    index: "02",
    title: "Five hundred and eight.",
    body: "The club closed the year at 508 official members — 191.8% growth — which taught me more about systems than any single codebase has. Over the winter, an internship at Toshal Infotech put me in Flutter, refining UI and UX for a 15% lift in engagement, cutting crashes by a quarter, and shipping three Agile sprints on time.",
    caption: "191.8% membership growth; Flutter internship at Toshal Infotech",
    plate: "device",
    marker: "508 members · Toshal Infotech",
  },
  {
    year: "2024",
    index: "03",
    title: "Market open, and it has to hold.",
    body: "Joined Arhamshare in January and started building FastAPI microservices for trading. Live market data over WebSockets, Redis caching underneath, NGINX handling SSL termination and load balancing for one to ten thousand users. Trado shipped to the App Store and Google Play the same year.",
    caption: "Trado backend architecture — services, streams and cache",
    plate: "services",
    marker: "Arhamshare · Trado ships",
  },
  {
    year: "2025",
    index: "04",
    title: "Two more products, and the consent rails under them.",
    body: "Built the mutual fund platform end to end — NAV tracking, scheme discovery, portfolio aggregation, kept current by Selenium scrapers on CronJobs. Then integrated the Finvu SDK with the RBI Account Aggregator framework, implementing FIP and FIU consent flows to ReBIT spec and securing eight-plus services with JWT and OAuth 2.0.",
    caption: "NAV sync pipeline and the Account Aggregator consent flow",
    plate: "pipeline",
    marker: "ArhamShare: MF · GrowMint · AA",
  },
  {
    year: "2026",
    index: "05",
    title: "Teaching a model to cite its sources.",
    body: "ComplianceIQ began as a question about trust: can a language model answer a regulatory question without inventing the circular it came from. Twenty-plus RBI and SEBI documents in Qdrant, category-filtered retrieval through LangChain, Groq LLaMA-3.3-70B generating under citation constraints, and RAGAS keeping the faithfulness score honest.",
    caption: "ComplianceIQ retrieval path — ingest, filter, ground, cite",
    plate: "retrieval",
    marker: "ComplianceIQ · RAG in production",
  },
];
