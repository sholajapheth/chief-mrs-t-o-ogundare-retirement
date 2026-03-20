"use client";

import { motion } from "framer-motion";
import { ChieftaincyCrown } from "@/components/ui/ChieftaincyCrown";
import { AsoOkeBorder } from "@/components/ui/AsoOkeBorder";
import { CountUpNumber } from "@/components/ui/CountUpNumber";

const ADIRE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%231B2A6B' stroke-width='1'/%3E%3Cpath d='M20 8L32 20L20 32L8 20Z' fill='none' stroke='%231B2A6B' stroke-width='0.5'/%3E%3C/svg%3E")`;

const NAME_LINES = ["Temitope", "Oluwakemi", "Ogundare"] as const;

const STATS: { end: number; suffix?: string; label: string }[] = [
  { end: 35, label: "Years" },
  { end: 7, label: "Schools" },
  { end: 1000, suffix: "+", label: "Students" },
  { end: 1, label: "Legacy" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: "#3B1C08" }}
    >
      {/* Adire pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: ADIRE_SVG,
          backgroundRepeat: "repeat",
          opacity: 0.08,
        }}
      />

      {/* Top Aso-Oke border */}
      <AsoOkeBorder className="relative z-10" />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        {/* Yoruba motto */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm tracking-[0.2em] text-[var(--color-gold)] sm:text-base"
          style={{ fontFamily: "var(--font-accent), cursive" }}
        >
          Ìmọ̀ ní Ipò Ọlá &bull; 1991 &ndash; 2026
        </motion.p>

        {/* Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <ChieftaincyCrown size={64} className="text-[var(--color-gold)]" />
        </motion.div>

        {/* Name */}
        <h1
          className="text-hero font-[900]"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="block text-[var(--color-linen)] font-light opacity-40"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Chief (Mrs)
          </motion.span>

          {NAME_LINES.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.15 }}
              className="block text-[var(--color-linen)]"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-3 text-xl tracking-[0.15em] text-[var(--color-gold)]"
          style={{ fontFamily: "var(--font-accent), cursive" }}
        >
          FIWAGBOYE
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 max-w-xl text-[1.25rem] italic text-[var(--color-caramel)]"
          style={{ fontFamily: "var(--font-body), Georgia, serif" }}
        >
          35 Years of Shaping Minds · Principal, Educator, Chieftain
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 240 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="mx-auto mt-8 h-px bg-[var(--color-gold)]"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-x-8">
              <div className="flex flex-col items-center">
                <CountUpNumber
                  end={stat.end}
                  suffix={stat.suffix}
                  className="text-3xl font-[900] text-[var(--color-gold)] sm:text-4xl"
                />
                <span
                  className="mt-1 text-[0.8rem] tracking-wider text-[var(--color-linen)]"
                  style={{ fontFamily: "var(--font-body), Georgia, serif" }}
                >
                  {stat.label}
                </span>
              </div>
              {i < STATS.length - 1 && (
                <span
                  className="hidden text-lg text-[var(--color-linen)]/30 sm:inline"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#bio"
            className="rounded-full bg-[var(--color-crimson)] px-8 py-3 font-medium text-[var(--color-linen)] transition-colors hover:bg-[#a83024] no-underline"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Celebrate Her
          </a>
          <a
            href="#wishes"
            className="rounded-full border border-[var(--color-crimson)] px-8 py-3 font-medium text-[var(--color-linen)] transition-colors hover:bg-[var(--color-crimson)]/10 no-underline"
            style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          >
            Fọwọ́ sí ìforúkọsílẹ̀ · Sign the Register
          </a>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="text-sm text-[var(--color-linen)]/50"
            style={{ fontFamily: "var(--font-accent), cursive" }}
          >
            Yọ̀ sí ìsàlẹ̀
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-gold)]/60"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Bottom Aso-Oke border */}
      <AsoOkeBorder className="relative z-10" />
    </section>
  );
}
