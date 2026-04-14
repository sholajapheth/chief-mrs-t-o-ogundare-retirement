"use client";

import { motion } from "framer-motion";
import { EventCountdownTimer } from "@/components/event-countdown";
import {
  formatEventDateLine,
  formatEventTimeLine,
} from "@/lib/event";

export default function EventCountdownSection() {
  return (
    <section
      id="event"
      className="relative scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      style={{ backgroundColor: "#FAF6EF" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-body), Georgia, serif",
            color: "#C0392B",
          }}
        >
          The Big Day
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl"
          style={{
            fontFamily: "var(--font-accent), cursive",
            color: "#D4A017",
          }}
        >
          Countdown to the celebration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-3 max-w-xl text-base italic"
          style={{
            fontFamily: "var(--font-body), Georgia, serif",
            color: "#5C5040",
          }}
        >
          Join us for the retirement celebration — save the date below.
        </motion.p>

        <div className="my-10">
          <EventCountdownTimer />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-lg rounded-lg border px-6 py-5"
          style={{
            borderColor: "rgba(212, 160, 23, 0.45)",
            backgroundColor: "rgba(237, 217, 190, 0.25)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#8B6914",
            }}
          >
            Event date
          </p>
          <p
            className="mt-2 text-xl font-semibold sm:text-2xl"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              color: "#3B1C08",
            }}
          >
            {formatEventDateLine()}
          </p>
          <p
            className="mt-1 text-lg"
            style={{
              fontFamily: "var(--font-accent), cursive",
              color: "#A0522D",
            }}
          >
            {formatEventTimeLine()} (WAT)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
