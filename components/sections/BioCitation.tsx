"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProverbCallout } from "@/components/ui/ProverbCallout";

const educationTimeline = [
  {
    school: "New Eden Primary School, Ibadan",
    years: "Primary 1–3",
    type: "Primary Education",
  },
  {
    school: "UAC School, Eleja",
    years: "Primary 4",
    type: "Primary Education",
  },
  {
    school: "Mrs Kuti Primary School, Isabo",
    years: "Primary 5–6",
    type: "Primary Education",
  },
  {
    school: "Abeokuta Grammar School, Idi Aba",
    years: "1981–1986",
    type: "Secondary School",
  },
  {
    school: "Federal College of Education (FCE), Osiele",
    years: "1987 • Mathematics & English",
    type: "Teacher Education",
  },
  {
    school: "University of Ado-Ekiti",
    years: "B.Ed. in English Language",
    type: "University",
  },
];

const statPills = [
  "35 Years Service",
  "7 Schools",
  "Principal Since 2023",
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function BioCitation() {
  return (
    <section
      id="bio"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#FAF6EF" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-2xl uppercase tracking-widest md:text-3xl"
            style={{
              fontFamily: "var(--font-accent)",
              color: "#D4A017",
            }}
          >
            Àkọsílẹ̀ Ìgbésí Ayé
          </h2>
          <p
            className="mt-1 text-sm tracking-wide"
            style={{
              fontFamily: "var(--font-body)",
              color: "#5C5040",
            }}
          >
            The Record of a Life
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* LEFT COLUMN — Portrait */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center lg:w-[40%]"
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                border: "4px solid #D4A017",
                boxShadow: "6px 6px 0 #A0522D",
              }}
            >
              <Image
                src="/birthday-portrait.jpeg"
                alt="Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE"
                width={400}
                height={520}
                className="object-cover"
                priority
              />
            </div>

            {/* Nameplate */}
            <div
              className="mt-4 w-full rounded-md px-4 py-3 text-center"
              style={{ backgroundColor: "#3B1C08" }}
            >
              <p
                className="text-sm font-medium tracking-wide md:text-base"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#D4A017",
                }}
              >
                Chief (Mrs) T.O. Ogundare, FIWAGBOYE
              </p>
            </div>

            {/* Stat pills */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {statPills.map((stat) => (
                <span
                  key={stat}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "#C0392B",
                    color: "#EDD9BE",
                  }}
                >
                  {stat}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Bio content */}
          <div className="lg:w-[60%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Eyebrow */}
              <p
                className="text-lg"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "#D4A017",
                }}
              >
                Her Story
              </p>

              {/* Heading */}
              <h2
                className="text-display mt-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#3B1C08",
                }}
              >
                A Life of Purpose, Discipline, and Service
              </h2>

              {/* Bio paragraphs */}
              <div
                className="mt-6 space-y-5"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.125rem",
                  color: "#5C5040",
                  lineHeight: 1.85,
                }}
              >
                <p>
                  Born the third daughter into the family of Pa Olatunji and
                  Mrs Grace Olaosebikan (of blessed memory), Chief (Mrs)
                  Temitope Oluwakemi Ogundare is of the distinguished Egba
                  lineage of Itoko and Ake. From her earliest years, she
                  displayed discipline, intelligence, and a strong sense of
                  responsibility.
                </p>
                <p>
                  She joined the Ogun State Teaching Service Commission on May
                  29, 1991, and began shaping young minds with passion and
                  commitment. Across seven schools — from Adenrele High School
                  to her final post as Principal of Agbado District
                  Comprehensive High School, Senior, Oke Aro — she served with
                  distinction, teaching English and Mathematics while mentoring
                  colleagues and students.
                </p>
              </div>
            </motion.div>

            {/* Education timeline */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <h3
                className="mb-4 text-lg font-medium uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "#D4A017",
                }}
              >
                Education
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {educationTimeline.map((item) => (
                  <div
                    key={item.school}
                    className="rounded-lg border p-4"
                    style={{
                      backgroundColor: "rgba(237, 217, 190, 0.25)",
                      borderColor: "rgba(212, 160, 23, 0.2)",
                    }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "#3B1C08",
                      }}
                    >
                      {item.school}
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{
                        fontFamily: "var(--font-accent)",
                        color: "#D4A017",
                      }}
                    >
                      {item.years}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "#5C5040",
                      }}
                    >
                      {item.type}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Spiritual life callout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 rounded-lg p-6"
              style={{ backgroundColor: "#2D4A1E" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 2v16M2 10h16"
                    stroke="#D4A017"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-accent)",
                    color: "#D4A017",
                  }}
                >
                  Spiritual Life
                </span>
              </div>
              <p
                className="text-sm leading-relaxed md:text-base"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#EDD9BE",
                  lineHeight: 1.75,
                }}
              >
                A pillar of Reconciliation Gospel Ministry, Ifo, she serves as
                a Minister and actively leads women and children in Christian
                faith and practice, mentoring many within and beyond her
                community.
              </p>
            </motion.div>

            {/* Marriage & Family callout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 rounded-lg p-6"
              style={{ backgroundColor: "#A0522D" }}
            >
              <p
                className="text-sm leading-relaxed md:text-base"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#EDD9BE",
                  lineHeight: 1.75,
                }}
              >
                Proudly married to a man of honour, she and her husband are
                raising a family founded on the same principles of discipline,
                faith, and service that have defined her career.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Proverb */}
        <div className="mt-16">
          <ProverbCallout
            yoruba="Iṣẹ́ ni òògùn ìṣẹ́."
            english="Work is the antidote to poverty."
          />
        </div>
      </div>
    </section>
  );
}
