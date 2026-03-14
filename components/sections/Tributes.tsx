"use client";

import { motion } from "framer-motion";

/* ---------- types ---------- */

interface Tribute {
  name: string;
  relationship: string;
  message: string;
}

interface AlumniContribution {
  set: string;
  contribution: string;
}

/* ---------- data ---------- */

const TRIBUTES: Tribute[] = [
  {
    name: "Adebayo Ogundimu",
    relationship: "Former Student, 1998 Set",
    message:
      "Ma, you taught us more than Economics. You taught us to believe in ourselves. Agbado DCHS is blessed to have had you as Principal.",
  },
  {
    name: "Mrs Funke Adeyemi",
    relationship: "Colleague, Adenrele High School",
    message:
      "Thirty-five years of unwavering dedication. Temitope, your commitment to these children has been nothing short of extraordinary.",
  },
  {
    name: "Pastor Taiwo Ogundare",
    relationship: "Family",
    message:
      "A woman of faith, strength, and purpose. Your legacy in education will outlive us all. We are proud of you.",
  },
  {
    name: "Bukola Akinwale",
    relationship: "Former Student, 2003 Set",
    message:
      "You pushed us when we wanted to give up. You believed in us when we didn't believe in ourselves. Thank you, Ma.",
  },
  {
    name: "Chief Oladele Martins",
    relationship: "Community Leader, Oke Aro",
    message:
      "Chief Mrs Ogundare transformed Agbado DCHS. The infrastructure, the discipline, the academic results — all improved under her watch.",
  },
  {
    name: "Mrs Shade Okonkwo",
    relationship: "PTA Chairperson",
    message:
      "She made every parent feel like a partner in their children's education. A true leader.",
  },
];

const ALUMNI_CONTRIBUTIONS: AlumniContribution[] = [
  {
    set: "1990 Set",
    contribution:
      "Donated fencing, main gate construction, and WAEC examination sponsorship",
  },
  {
    set: "1998 Set",
    contribution:
      "Provided customised big notes and annual gifts for the Principal",
  },
  {
    set: "2003 Set",
    contribution: "Supplied laboratory stools for science classes",
  },
  {
    set: "2004 Set",
    contribution: "Funded science laboratory renovation project",
  },
  {
    set: "2010 Set",
    contribution: "Donated lawn mower for school grounds maintenance",
  },
  {
    set: "2012 Set",
    contribution: "Sponsored classroom flooring rehabilitation",
  },
  {
    set: "Hon. Famous Amos Shadrack Ethama",
    contribution: "WAEC examination sponsorship for indigent students",
  },
  {
    set: "The Hope Tribe Pavilion",
    contribution: "Sponsored 10 WAEC examination candidates",
  },
];

/* ---------- animation variants ---------- */

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const alumniCardVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

/* ---------- sub-components ---------- */

function TributeCard({ tribute, index }: { tribute: Tribute; index: number }) {
  const rotation = index % 2 === 0 ? "-1.5deg" : "1.5deg";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="relative mb-5 break-inside-avoid rounded-md p-5"
      style={{
        backgroundColor: "#EDD9BE",
        transform: `rotate(${rotation})`,
        boxShadow: "0 4px 12px rgba(160, 82, 45, 0.3)",
      }}
    >
      {/* Pin */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "-6px",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#C0392B",
          boxShadow: "0 1px 3px rgba(59, 28, 8, 0.4)",
        }}
      />

      {/* Message */}
      <p
        className="mt-2 italic leading-relaxed"
        style={{
          fontFamily: "var(--font-body), Georgia, serif",
          color: "#3B1C08",
          fontSize: "0.95rem",
        }}
      >
        &ldquo;{tribute.message}&rdquo;
      </p>

      {/* Attribution */}
      <div className="mt-4 border-t pt-3" style={{ borderColor: "rgba(59, 28, 8, 0.12)" }}>
        <p
          className="font-bold"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            color: "#3B1C08",
            fontSize: "0.95rem",
          }}
        >
          {tribute.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-accent), cursive",
            color: "#D4A017",
            fontSize: "0.9rem",
          }}
        >
          {tribute.relationship}
        </p>
      </div>
    </motion.div>
  );
}

function AlumniCard({
  item,
  index,
}: {
  item: AlumniContribution;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={alumniCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="rounded-lg p-4"
      style={{
        backgroundColor: "#3B1C08",
        border: "1px solid rgba(237, 217, 190, 0.15)",
      }}
    >
      {/* Year Set pill */}
      <span
        className="mb-2 inline-block rounded-full px-3 py-0.5"
        style={{
          fontFamily: "var(--font-accent), cursive",
          backgroundColor: "#D4A017",
          color: "#3B1C08",
          fontSize: "0.85rem",
          fontWeight: 700,
        }}
      >
        {item.set}
      </span>

      <p
        className="mt-1 leading-snug"
        style={{
          fontFamily: "var(--font-body), Georgia, serif",
          color: "#EDD9BE",
          fontSize: "0.9rem",
        }}
      >
        {item.contribution}
      </p>
    </motion.div>
  );
}

/* ---------- main component ---------- */

export default function Tributes() {
  return (
    <section
      id="tributes"
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#3B1C08",
        backgroundImage:
          "radial-gradient(circle, rgba(193,154,107,0.1) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
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
            Ọwọ́ tí a fọwọ́ kan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-2 text-lg"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#EDD9BE",
            }}
          >
            Hands That Were Touched
          </motion.p>
        </div>

        {/* Tribute cards — masonry via CSS columns */}
        <style>{`
          .tributes-masonry { columns: 1; column-gap: 1.5rem; }
          @media (min-width: 640px) {
            .tributes-masonry { columns: 2; }
          }
          @media (min-width: 1024px) {
            .tributes-masonry { columns: 3; }
          }
        `}</style>
        <div className="tributes-masonry">
          {TRIBUTES.map((tribute, i) => (
            <TributeCard key={i} tribute={tribute} index={i} />
          ))}
        </div>

        {/* Alumni Contributions */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-title font-bold text-center mb-3"
            style={{
              fontFamily: "var(--font-accent), cursive",
              color: "#D4A017",
            }}
          >
            From the Alumni — Those Who Came Back
          </motion.h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALUMNI_CONTRIBUTIONS.map((item, i) => (
              <AlumniCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
