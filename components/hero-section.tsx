"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Calendar } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const eventDate = new Date("2026-01-16");
    const today = new Date();
    const diff = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/elegant-golden-celebration-background-with-soft-bo.jpg"
          alt="Celebration background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-primary/30 text-6xl animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-40 right-10 text-primary/30 text-4xl animate-pulse delay-300">
        ✦
      </div>
      <div className="absolute top-1/3 right-20 text-primary/20 text-3xl animate-pulse delay-500">
        ✦
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Event Date Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8 animate-fadeInUp">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">
              Friday, January 16, 2026
            </span>
            {daysLeft > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {daysLeft} days to go
              </span>
            )}
          </div>

          {/* Portrait */}
          <div
            className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 animate-fadeInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/50 to-primary/30 blur-lg opacity-60" />
            <div className="relative w-full h-full rounded-full border-4 border-primary shadow-2xl overflow-hidden">
              <Image
                src="/dr-yemisi-portrait.jpg"
                alt="Dr. Oluwayemisi Bosede Ayinde"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-lg font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              60
            </div>
          </div>

          {/* Main Title */}
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Dr. Oluwayemisi Bosede Ayinde
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-2 text-white/90">
              (Nee Boyejo)
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-primary font-serif italic mb-2 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Principal, NAWAIR-UD-DEEN Grammar School Senior Solu-Ifo
          </p>
          <p
            className="text-lg md:text-xl text-white/90 font-serif mb-6 animate-fadeInUp"
            style={{ animationDelay: "0.3s" }}
          >
            Celebrating 60 Years of Grace & Almost 30 Years of Dedicated Service
          </p>

          {/* Scripture Quote */}
          <div
            className="max-w-2xl mx-auto mb-10 animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <blockquote className="text-white/80 text-lg md:text-xl italic font-serif">
              &ldquo;To God be the Glory. Great things He has done.&rdquo;
            </blockquote>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <a href="#wishes">
                <Heart className="mr-2 h-5 w-5" />
                Leave Your Wishes
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full backdrop-blur-sm bg-transparent"
            >
              <a href="#program">View Program</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
}
