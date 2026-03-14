import type { ReactNode } from "react";

const variantColors = {
  crimson: "#C0392B",
  forest: "#2D4A1E",
  espresso: "#3B1C08",
  gold: "#D4A017",
} as const;

function buildPatternUrl(color: string): string {
  const encoded = encodeURIComponent(color);
  const svg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='none'/%3E%3Ccircle cx='20' cy='20' r='8' stroke='${encoded}' stroke-width='1' fill='none'/%3E%3Crect x='6' y='6' width='28' height='28' stroke='${encoded}' stroke-width='0.8' fill='none'/%3E%3Ccircle cx='20' cy='20' r='3' fill='${encoded}'/%3E%3Cline x1='0' y1='0' x2='6' y2='6' stroke='${encoded}' stroke-width='0.5'/%3E%3Cline x1='34' y1='6' x2='40' y2='0' stroke='${encoded}' stroke-width='0.5'/%3E%3Cline x1='0' y1='40' x2='6' y2='34' stroke='${encoded}' stroke-width='0.5'/%3E%3Cline x1='34' y1='34' x2='40' y2='40' stroke='${encoded}' stroke-width='0.5'/%3E%3C/svg%3E`;
  return `url("data:image/svg+xml,${svg}")`;
}

interface AnkaraPatternCardProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variantColors;
}

export function AnkaraPatternCard({
  children,
  className = "",
  variant = "crimson",
}: AnkaraPatternCardProps) {
  const patternColor = variantColors[variant];

  return (
    <div
      className={`relative rounded-lg p-6 overflow-hidden ${className}`}
      style={{
        backgroundColor: "#EDD9BE",
        boxShadow: "0 2px 8px rgba(59, 28, 8, 0.12)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: buildPatternUrl(patternColor),
          backgroundRepeat: "repeat",
          opacity: 0.05,
        }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
