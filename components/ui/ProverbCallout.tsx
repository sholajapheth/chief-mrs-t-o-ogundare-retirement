interface ProverbCalloutProps {
  yoruba: string;
  english: string;
  className?: string;
}

export function ProverbCallout({
  yoruba,
  english,
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
        className="text-2xl italic leading-relaxed mb-3"
        style={{
          fontFamily: "var(--font-accent), cursive",
          color: "#D4A017",
        }}
      >
        &ldquo;{yoruba}&rdquo;
      </p>
      <p
        className="text-base italic"
        style={{
          fontFamily: "var(--font-body), Georgia, serif",
          color: "#5C5040",
        }}
      >
        — {english}
      </p>
      <div
        className="mt-6"
        style={{ height: "1px", backgroundColor: "#C0392B" }}
        aria-hidden="true"
      />
    </blockquote>
  );
}
