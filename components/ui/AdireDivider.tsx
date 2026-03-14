interface AdireDividerProps {
  className?: string;
}

export function AdireDivider({ className = "" }: AdireDividerProps) {
  return (
    <svg
      aria-hidden="true"
      className={`w-full h-6 ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 400 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.9 }}
    >
      <defs>
        <pattern
          id="adire-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <rect width="24" height="24" fill="#C0392B" />
          {/* Diamond shape */}
          <polygon points="12,2 22,12 12,22 2,12" fill="#1B2A6B" />
          <polygon points="12,5 19,12 12,19 5,12" fill="#C0392B" />
          {/* Small crosses at corners */}
          <line x1="0" y1="0" x2="4" y2="4" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="4" y1="0" x2="0" y2="4" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="20" y1="0" x2="24" y2="4" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="24" y1="0" x2="20" y2="4" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="4" y2="24" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="4" y1="20" x2="0" y2="24" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="24" y2="24" stroke="#D4A017" strokeWidth="1.5" />
          <line x1="24" y1="20" x2="20" y2="24" stroke="#D4A017" strokeWidth="1.5" />
          {/* Center dot */}
          <circle cx="12" cy="12" r="2" fill="#D4A017" />
        </pattern>
      </defs>
      <rect width="400" height="24" fill="url(#adire-pattern)" />
    </svg>
  );
}
