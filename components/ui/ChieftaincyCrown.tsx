interface ChieftaincyCrownProps {
  size?: number;
  className?: string;
}

export function ChieftaincyCrown({
  size = 64,
  className = "",
}: ChieftaincyCrownProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-crown-pulse ${className}`}
    >
      {/* Crown base band */}
      <rect x="12" y="44" width="40" height="6" rx="1" fill="#D4A017" />
      {/* Five-point crown body */}
      <polygon
        points="12,44 8,18 20,30 32,10 44,30 56,18 52,44"
        fill="#D4A017"
      />
      {/* Jewel accents at each point */}
      <circle cx="8" cy="18" r="3" fill="#D4A017" />
      <circle cx="32" cy="10" r="3" fill="#D4A017" />
      <circle cx="56" cy="18" r="3" fill="#D4A017" />
      <circle cx="20" cy="30" r="2" fill="#C0392B" />
      <circle cx="44" cy="30" r="2" fill="#C0392B" />
    </svg>
  );
}
