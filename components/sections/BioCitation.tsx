"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProverbCallout } from "@/components/ui/ProverbCallout";

const educationTimeline = [
  {
    school: "St. Peter's Anglican Primary School, Oke Bola, Ibadan",
    years: "1970–1976",
    type: "Primary Education",
  },
  {
    school: "Lagelu Grammar School, Ibadan",
    years: "1976–1981",
    type: "Secondary Education",
  },
  {
    school: "Federal College of Education (Special), Oyo",
    years: "NCE (Economics & Mathematics)",
    type: "College of Education",
  },
  {
    school: "University of Ado-Ekiti (now EKSU)",
    years: "B.Ed.",
    type: "University",
  },
  {
    school: "Tai Solarin University of Education, Ijagun",
    years: "M.Ed.",
    type: "Postgraduate",
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
                From Ibadan to Oke Aro — A Life Shaped by Purpose
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
                  Chief (Mrs) Temitope Oluwakemi Ogundare was born to the family
                  of Pa Joshua Olusola Akinola and the late Mrs Felicia Mojirade
                  Akinola (née Abimbola) of Oke Ejigbo, Ejigbo, Osun State. She
                  hails from a lineage rooted in faith, discipline, and service.
                </p>
                <p>
                  Her academic journey began at St. Peter&rsquo;s Anglican
                  Primary School, Oke Bola, Ibadan (1970–1976), and continued at
                  Lagelu Grammar School, Ibadan (1976–1981). She then attended
                  the Federal College of Education (Special), Oyo, where she
                  obtained her NCE in Economics and Mathematics. Her thirst for
                  knowledge led her to the University of Ado-Ekiti (now EKSU) for
                  her B.Ed., and later to Tai Solarin University of Education,
                  Ijagun, for her M.Ed.
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
                A devoted member of the Reconciliation Gospel Ministry, Ifo —
                leading women and children in faith and community service.
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
                A devoted wife and mother. Married to Mr Ogundare, together
                raising a family that reflects the same values of discipline,
                faith, and service she has championed throughout her career.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Proverb */}
        <div className="mt-16">
          <ProverbCallout
            yoruba="Agbado tó bá pọn tán, kò sọ ara rẹ̀ di ẹyẹ."
            english="A ripe corn does not call itself a bird; its worth speaks for itself."
          />
        </div>
      </div>
    </section>
  );
}
