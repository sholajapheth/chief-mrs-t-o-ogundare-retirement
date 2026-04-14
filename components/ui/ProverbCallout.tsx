interface ProverbCalloutProps {
  quote: string;
  className?: string;
}

export function ProverbCallout({
  quote,
  className = "",
}: ProverbCalloutProps) {
  return (
    <blockquote
      className={`py-8 max-w-2xl mx-auto text-center ${className}`}
    >
      <div
        className="mb-6"
        style={{ height: "1px", backgroundColor: "#C0392B" }}
        aria-hidden="true"
      />
      <p
        className="text-2xl italic leading-relaxed"
        style={{
          fontFamily: "var(--font-accent), cursive",
          color: "#D4A017",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div
        className="mt-6"
        style={{ height: "1px", backgroundColor: "#C0392B" }}
        aria-hidden="true"
      />
    </blockquote>
  );
}
