"use client";

import { useEffect, useState, useRef } from "react";
import { Award, BookOpen, Heart, Users } from "lucide-react";

const staticStats = [
  { icon: Award, value: 35, label: "Years of Service", suffix: "" },
  { icon: BookOpen, value: 7, label: "Schools Served", suffix: "" },
  { icon: Users, value: 1000, label: "Students Impacted", suffix: "+" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const previousValueRef = useRef(value);

  useEffect(() => {
    // If value changed after initial animation, update immediately
    if (hasAnimated.current && previousValueRef.current !== value) {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      setCount(value);
      previousValueRef.current = value;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          previousValueRef.current = value;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          // Clear any existing animation
          if (animationRef.current) {
            clearInterval(animationRef.current);
          }
          
          animationRef.current = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              if (animationRef.current) {
                clearInterval(animationRef.current);
                animationRef.current = null;
              }
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [value]);

  return (
    <div
      ref={ref}
      className="font-serif text-4xl md:text-5xl font-bold text-primary"
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function StatsCounter() {
  const [wishesCount, setWishesCount] = useState(0);

  useEffect(() => {
    const fetchWishesCount = async () => {
      try {
        const res = await fetch("/api/wishes");
        if (res.ok) {
          const data = await res.json();
          setWishesCount(data.length || 0);
          console.log("wishes ", data);
        }
      } catch (error) {
        console.error("Failed to load wishes count:", error);
      }
    };
    fetchWishesCount();
  }, []);

  const stats = [
    ...staticStats,
    { icon: Heart, value: wishesCount, label: "Messages Received", suffix: "" },
  ];

  return (
    <section className="bg-linear-to-r from-secondary to-accent py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Legacy by the numbers</p>
          <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">A Life of Impact and Service</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
