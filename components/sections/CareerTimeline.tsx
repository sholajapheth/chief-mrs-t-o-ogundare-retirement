"use client";

import { motion } from "framer-motion";
import { ProverbCallout } from "@/components/ui/ProverbCallout";

interface School {
  number: number;
  name: string;
  role: string;
  years: string;
  tagline: string;
  isCrown?: boolean;
}

const schools: School[] = [
  {
    number: 1,
    name: "Adenrele High School",
    role: "Teacher",
    years: "1991–2002",
    tagline: "Where the Journey Began",
  },
  {
    number: 2,
    name: "Ajuwon High School, Senior",
    role: "Teacher",
    years: "2002–2006",
    tagline: "A Decade of Growth",
  },
  {
    number: 3,
    name: "Adenrele High School, Senior",
    role: "Teacher",
    years: "2006–2014",
    tagline: "Returning with Authority",
  },
  {
    number: 4,
    name: "Ifo High School, Junior",
    role: "Teacher",
    years: "2014–2018",
    tagline: "Nurturing the Young",
  },
  {
    number: 5,
    name: "Anglican Grammar School, Junior, Okenla",
    role: "Vice Principal",
    years: "2018–2020",
    tagline: "Rising to Vice",
  },
  {
    number: 6,
    name: "Anglican Grammar School, Senior, Okenla",
    role: "Vice Principal",
    years: "2020–2023",
    tagline: "Leading the Senior School",
  },
  {
    number: 7,
    name: "Agbado Dist. Comprehensive High School, Senior",
    role: "Principal",
    years: "2023–2026",
    tagline: "The Crown: Principal",
    isCrown: true,
  },
];

function SchoolCard({
  school,
  index,
}: {
  school: School;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`relative flex w-full items-start gap-6 md:w-[calc(50%-2rem)] ${
        isLeft ? "md:self-start" : "md:self-end"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-lg p-5"
        style={{
          backgroundColor: "rgba(237, 217, 190, 0.08)",
          border: school.isCrown
            ? "2px solid #D4A017"
            : "1px solid rgba(212, 160, 23, 0.2)",
          width: "100%",
        }}
      >
        {/* Watermark number */}
        <span
          className="pointer-events-none absolute -top-2 left-3 select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: school.isCrown ? "5rem" : "4rem",
            color: "rgba(212, 160, 23, 0.15)",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {school.number}
        </span>

        <div className="relative z-10">
          {/* School name */}
          <h3
            className="text-lg font-medium md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "#EDD9BE",
              fontSize: school.isCrown ? "1.35rem" : "1.25rem",
            }}
          >
            {school.name}
          </h3>

          {/* Role */}
          <p
            className="mt-1 italic"
            style={{
              fontFamily: "var(--font-body)",
              color: "#C19A6B",
              fontSize: "1rem",
            }}
          >
            {school.role}
          </p>

          {/* Years pill */}
          <span
            className="mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: "#C0392B",
              color: "#EDD9BE",
            }}
          >
            {school.years}
          </span>

          {/* Tagline */}
          <p
            className="mt-2 italic"
            style={{
              fontFamily: "var(--font-body)",
              color: "#D4A017",
              fontSize: "0.85rem",
            }}
          >
            {school.tagline}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CareerTimeline() {
  return (
    <section id="timeline" className="py-20 md:py-28" style={{ backgroundColor: "#3B1C08" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2
            className="text-2xl uppercase tracking-widest md:text-3xl"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#D4A017",
            }}
          >
            Ìtàn Iṣẹ́ Rẹ̀
          </h2>
          <p
            className="mt-1 text-sm italic"
            style={{
              fontFamily: "var(--font-body)",
              color: "#EDD9BE",
            }}
          >
            The Journey of Her Work
          </p>
        </motion.div>

        {/* Top text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <p
            className="text-lg"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#D4A017",
            }}
          >
            May 29, 1991 — Ogun State Teaching Service Commission
          </p>
          <p
            className="mt-1 text-sm"
            style={{
              fontFamily: "var(--font-body)",
              color: "#EDD9BE",
            }}
          >
            She picked up the chalk and never looked back.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line (desktop) */}
          <div
            className="absolute left-4 top-0 hidden h-full md:left-1/2 md:block"
            style={{
              width: "3px",
              background: "linear-gradient(to bottom, #D4A017, #C0392B)",
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile vertical line */}
          <div
            className="absolute left-4 top-0 h-full md:hidden"
            style={{
              width: "3px",
              background: "linear-gradient(to bottom, #D4A017, #C0392B)",
            }}
            aria-hidden="true"
          />

          {/* School cards */}
          <div className="flex flex-col gap-8 pl-10 md:flex-wrap md:items-stretch md:gap-10 md:pl-0">
            {schools.map((school, i) => (
              <SchoolCard key={school.number} school={school} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center text-lg font-medium md:text-xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "#D4A017",
          }}
        >
          35 Years. One Purpose. Thousands of Lives Changed.
        </motion.p>

        {/* Proverb */}
        <div className="mt-14">
          <ProverbCallout
            yoruba="Ìgbésí ayé ni iṣẹ́ ẹni, ẹni tó bá ṣiṣẹ́ dáadáa, wọ́n á mọ̀ ọ́n."
            english="A person is known by their work; one who works well is honoured."
          />
        </div>
      </div>
    </section>
  );
}
