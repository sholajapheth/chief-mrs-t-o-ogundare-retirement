"use client";

import { useEffect, useState } from "react";
import { getEventStartDate } from "@/lib/event";

export function EventCountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = getEventStartDate();

    const updateTimer = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-xl shadow-lg sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20"
            style={{
              backgroundColor: "#3B1C08",
              border: "2px solid rgba(212, 160, 23, 0.5)",
            }}
          >
            <span
              className="text-2xl font-bold md:text-3xl"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                color: "#EDD9BE",
              }}
            >
              {value}
            </span>
          </div>
          <span
            className="mt-2 block text-sm capitalize"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#5C5040",
            }}
          >
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
