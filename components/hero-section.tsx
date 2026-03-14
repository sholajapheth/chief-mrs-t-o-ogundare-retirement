"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Calendar } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const eventDate = new Date("2026-05-30");
    const today = new Date();
    const diff = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-secondary pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(199,60,47,0.24),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(211,188,169,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(63,95,31,0.3),transparent_42%)]" />
      <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold tracking-wide">Saturday, May 30, 2026</span>
              {daysLeft > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {daysLeft} days
                </span>
              )}
            </div>

            <h1 className="font-serif text-4xl font-black leading-tight md:text-6xl">
              Chief (Mrs) Temitope Oluwakemi Ogundare
            </h1>
            <p className="mt-2 text-xl font-semibold text-primary md:text-2xl">FIWAGBOYE</p>
            <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
              Principal, Agbado District Comprehensive High School, Senior, Oke Aro
            </p>
            <p className="mt-2 font-serif text-lg italic text-white/90 md:text-xl">
              In Celebration of 35 Years of Meritorious Service
            </p>

            <blockquote className="mt-8 max-w-2xl border-l-4 border-primary/70 pl-4 font-serif text-lg italic text-white/85">
              &ldquo;A woman of great and large heart, an icon of educational excellence, and a legacy that will continue to inspire generations.&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
              >
                <a href="#wishes">
                  <Heart className="mr-2 h-5 w-5" />
                  Leave Your Message
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white/40 bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                <a href="#program">View Program</a>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="mb-4 rounded-2xl bg-secondary/70 px-4 py-2 text-center text-sm font-semibold text-primary">
                Retirement Citation Honouree
              </div>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl border-4 border-primary/80">
                <Image
                  src="/birthday-portrait.jpeg"
                  alt="Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  35 Years of Service
                </span>
                <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-white">
                  1991 - 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#about" className="text-white/70 transition-colors hover:text-white">
            <ChevronDown className="h-8 w-8 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
