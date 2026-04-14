"use client";

import { motion } from "framer-motion";
import { ChieftaincyCrown } from "@/components/ui/ChieftaincyCrown";
import { ProverbCallout } from "@/components/ui/ProverbCallout";

/* ---------- inline SVG icon components ---------- */

function BuildingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C0392B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-4h6v4" />
      <path d="M9 10h1" />
      <path d="M14 10h1" />
      <path d="M9 14h1" />
      <path d="M14 14h1" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2D4A1E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

function ScrollIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 112 2h12v2" />
      <path d="M19 17V5a2 2 0 00-2-2H6" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A0522D"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 17l-1.5 1.5a2.12 2.12 0 01-3 0 2.12 2.12 0 010-3L11 11" />
      <path d="M15.5 11L17 9.5a2.12 2.12 0 000-3 2.12 2.12 0 00-3 0L9.5 11" />
      <path d="M2 11l4-4" />
      <path d="M18 7l4-4" />
      <path d="M2 11h4" />
      <path d="M18 7h4" />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="#D4A017"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- data ---------- */

const CATEGORIES = [
  {
    title: "Infrastructure & Safety",
    icon: <BuildingIcon />,
    tint: "rgba(192, 57, 43, 0.08)",
    items: [
      "Supervised renovation of dilapidated blocks and school buildings",
      "Provided infrastructure for 10 exam halls and classrooms",
      "Introduced CCTV surveillance system for school security",
      "Established perimeter fencing and secured school premises",
      "Refurbished science laboratories and ICT facilities",
    ],
  },
  {
    title: "Academic & Co-curricular",
    icon: <BookIcon />,
    tint: "rgba(45, 74, 30, 0.08)",
    items: [
      "Improved WAEC/NECO results significantly during her tenure",
      "Established inter-house sports and debate competitions",
      "Championed reading culture with library expansion",
      "Introduced ICT-based learning tools",
      "Organized career counselling seminars for senior students",
    ],
  },
  {
    title: "Administration",
    icon: <ScrollIcon />,
    tint: "rgba(212, 160, 23, 0.08)",
    items: [
      "Maintained discipline and academic standards across all postings",
      "Implemented transparent financial management systems",
      "Established staff welfare programs and professional development",
      "Built strong relationships with the Teaching Service Commission",
      "Ensured smooth school transitions during administrative changes",
    ],
  },
  {
    title: "Community & Alumni",
    icon: <HandshakeIcon />,
    tint: "rgba(160, 82, 45, 0.08)",
    items: [
      "Mobilized alumni sets for school development contributions",
      "Engaged parents through regular PTA meetings and open days",
      "Partnered with community leaders for school security",
      "Facilitated WAEC sponsorship for indigent students",
      "Built lasting bridges between school and community",
    ],
  },
] as const;

const AWARDS = [
  {
    name: "Road Safety Commission Essay Competition",
    detail: "Written in secondary school (Form 4, 1984); 3rd place, state level",
    year: "1984",
    featured: false,
  },
  {
    name: "Exemplary Leadership Award",
    detail: "Adiyan Alausa Area CDC",
    year: "2024",
    featured: false,
  },
  {
    name: "ANCOPSS, Ifo — Financial Secretary",
    detail: "Service since 2024",
    year: "2024",
    featured: false,
  },
  {
    name: "ANCOPSS, Ifo — General Secretary",
    detail: "2025 to date",
    year: "2025",
    featured: false,
  },
  {
    name: 'Chieftaincy Title: FIWAGBOYE',
    detail: "Egbe Akomolede, Ogun State",
    year: "2025",
    featured: true,
  },
] as const;

/* ---------- component ---------- */

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#FAF6EF" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="text-center mb-14">
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
            Her achievements
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
            Her successes
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="rounded-xl p-6 sm:p-8"
              style={{ backgroundColor: cat.tint }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                {cat.icon}
                <h3
                  className="text-base font-semibold leading-tight"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    color: "#3B1C08",
                  }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {cat.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="group flex items-start gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[rgba(192,57,43,0.04)]"
                    style={{
                      borderLeft: "2px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = "#C0392B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = "transparent";
                    }}
                  >
                    <CheckmarkIcon />
                    <span
                      className="text-[0.95rem] leading-snug"
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        color: "#3B1C08",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Awards sub-section */}
        <div className="mb-14">
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-title font-bold text-center mb-8"
            style={{
              fontFamily: "var(--font-accent), cursive",
              color: "#D4A017",
            }}
          >
            Honours and awards
          </motion.h3>
          <p
            className="text-center text-sm mb-8"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#5C5040",
            }}
          >
            Marks of Honour
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
            {AWARDS.map((award, ai) => (
              <motion.div
                key={ai}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ai * 0.12 }}
                className={`
                  flex-1 rounded-lg p-6 text-center
                  ${award.featured ? "max-w-sm mx-auto sm:mx-0" : ""}
                `}
                style={
                  award.featured
                    ? {
                        backgroundColor: "#3B1C08",
                        border: "2px solid #D4A017",
                      }
                    : {
                        backgroundColor: "#FAF6EF",
                        borderTop: "3px solid #D4A017",
                        boxShadow: "0 1px 4px rgba(59, 28, 8, 0.06)",
                      }
                }
              >
                {award.featured && (
                  <div className="flex justify-center mb-4">
                    <ChieftaincyCrown size={48} />
                  </div>
                )}

                <h4
                  className="text-base font-medium mb-2 leading-snug"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    color: award.featured ? "#EDD9BE" : "#3B1C08",
                  }}
                >
                  {award.name}
                </h4>

                <p
                  className="text-sm mb-2"
                  style={{
                    fontFamily: "var(--font-body), Georgia, serif",
                    color: award.featured ? "#D4A017" : "#5C5040",
                  }}
                >
                  {award.detail}
                </p>

                <span
                  className="text-lg"
                  style={{
                    fontFamily: "var(--font-accent), cursive",
                    color: "#D4A017",
                  }}
                >
                  {award.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proverb */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProverbCallout quote="One tree does not make a forest." />
        </motion.div>
      </div>
    </section>
  );
}
