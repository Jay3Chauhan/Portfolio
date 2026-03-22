import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 800,
          color: "var(--accent)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "var(--text-secondary)",
          maxWidth: "400px",
        }}
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary" style={{ marginTop: "1rem" }}>
        Back to Home
      </Link>
    </section>
  );
}
