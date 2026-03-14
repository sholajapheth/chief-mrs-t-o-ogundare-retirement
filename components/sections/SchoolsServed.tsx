"use client";

import { motion } from "framer-motion";
import { AsoOkeBorder } from "@/components/ui/AsoOkeBorder";

const SCHOOLS = [
  {
    name: "Adenrele High School",
    initials: "AHS",
    years: "1991–2002",
    role: "Teacher",
    location: "Ogun State, Nigeria",
    quote: "Twelve years of dedication to Adenrele's students.",
  },
  {
    name: "Ajuwon High School, Senior",
    initials: "AJHS",
    years: "2002–2006",
    role: "Teacher",
    location: "Ogun State, Nigeria",
    quote: "Building foundations at Ajuwon.",
  },
  {
    name: "Adenrele High School, Senior",
    initials: "AHS",
    years: "2006–2014",
    role: "Teacher",
    location: "Ogun State, Nigeria",
    quote: "Returning with deeper expertise.",
  },
  {
    name: "Ifo High School, Junior",
    initials: "IHS",
    years: "2014–2018",
    role: "Teacher",
    location: "Ogun State, Nigeria",
    quote: "Guiding the youngest learners.",
  },
  {
    name: "Anglican Grammar School, Junior, Okenla",
    initials: "AGS",
    years: "2018–2020",
    role: "Vice Principal",
    location: "Ogun State, Nigeria",
    quote: "Stepping into leadership.",
  },
  {
    name: "Anglican Grammar School, Senior, Okenla",
    initials: "AGS",
    years: "2020–2023",
    role: "Vice Principal",
    location: "Ogun State, Nigeria",
    quote: "Leading the senior school.",
  },
  {
    name: "Agbado Dist. Comprehensive High School",
    initials: "ADCHS",
    years: "2023–2026",
    role: "Principal",
    location: "Ogun State, Nigeria",
    quote: "The crown of her career.",
  },
] as const;

export default function SchoolsServed() {
  return (
    <section
      id="schools"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#EDD9BE" }}
    >
      {/* Section heading */}
      <div className="mx-auto max-w-7xl text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-display font-bold"
          style={{
            fontFamily: "var(--font-accent), cursive",
            color: "#D4A017",
          }}
        >
          Àwọn Ilé-Ẹ̀kọ́ Rẹ̀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-lg"
          style={{
            fontFamily: "var(--font-body), Georgia, serif",
            color: "#3B1C08",
          }}
        >
          Her Classrooms
        </motion.p>
      </div>

      {/* Carousel (horizontal scroll on desktop, vertical stack on mobile) */}
      <div className="mx-auto max-w-7xl">
        <div
          className="
            flex flex-col gap-6
            md:flex-row md:gap-6 md:overflow-x-auto md:snap-x md:snap-mandatory
            md:pb-4 md:-mx-2 md:px-2
          "
          style={{ scrollbarWidth: "thin", scrollbarColor: "#D4A017 transparent" }}
        >
          {SCHOOLS.map((school, i) => {
            const isOdd = i % 2 === 0;
            const cardBg = isOdd ? "#C0392B" : "#2D4A1E";
            const pillBg = isOdd ? "#2D4A1E" : "#C0392B";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="
                  relative flex-shrink-0 overflow-hidden rounded-lg
                  w-full md:w-[320px] md:snap-start
                "
                style={{ backgroundColor: cardBg }}
              >
                <AsoOkeBorder />

                <div className="relative px-6 py-8">
                  {/* Watermark number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-2 right-4 select-none"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontWeight: 900,
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: "rgba(237, 217, 190, 0.1)",
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Initials circle */}
                  <div
                    className="relative mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2"
                    style={{ borderColor: "#D4A017" }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        color: "#D4A017",
                      }}
                    >
                      {school.initials}
                    </span>
                  </div>

                  {/* School name */}
                  <h3
                    className="relative text-center leading-snug mb-2"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      color: "#EDD9BE",
                      fontSize: "1.15rem",
                    }}
                  >
                    {school.name}
                  </h3>

                  {/* Location */}
                  <p
                    className="relative text-center text-sm mb-4"
                    style={{
                      fontFamily: "var(--font-accent), cursive",
                      color: "#D4A017",
                    }}
                  >
                    {school.location}
                  </p>

                  {/* Years pill */}
                  <div className="relative flex justify-center mb-3">
                    <span
                      className="rounded-full px-4 py-1 text-xs font-medium tracking-wide"
                      style={{
                        backgroundColor: pillBg,
                        color: "#EDD9BE",
                        fontFamily: "var(--font-body), Georgia, serif",
                      }}
                    >
                      {school.years}
                    </span>
                  </div>

                  {/* Role */}
                  <p
                    className="relative text-center text-sm italic mb-4"
                    style={{
                      fontFamily: "var(--font-body), Georgia, serif",
                      color: "#C19A6B",
                    }}
                  >
                    {school.role}
                  </p>

                  {/* Editorial quote */}
                  <p
                    className="relative text-center text-sm italic"
                    style={{
                      fontFamily: "var(--font-body), Georgia, serif",
                      color: "rgba(237, 217, 190, 0.7)",
                    }}
                  >
                    &ldquo;{school.quote}&rdquo;
                  </p>
                </div>

                <AsoOkeBorder />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
