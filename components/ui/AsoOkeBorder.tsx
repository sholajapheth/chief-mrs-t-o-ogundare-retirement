interface AsoOkeBorderProps {
  className?: string;
}

export function AsoOkeBorder({ className = "" }: AsoOkeBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{
        height: "8px",
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          #C0392B 0px,
          #C0392B 2px,
          #D4A017 2px,
          #D4A017 4px,
          #2D4A1E 4px,
          #2D4A1E 6px,
          #D4A017 6px,
          #D4A017 8px
        )`,
      }}
    />
  );
}
