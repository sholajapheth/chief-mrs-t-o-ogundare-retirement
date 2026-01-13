"use client";

import { useState } from "react";
import {
  ChevronRight,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Heart,
  Cross,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const timelineData = [
  {
    year: "1966",
    title: "Birth & Early Years",
    description:
      "Born January 16, 1966 in Lagos Island to Late Pa Edward Olatunji Boyejo & Late Chief (Mrs.) Victoria Towobola Boyejo.",
    icon: Heart,
  },
  {
    year: "1972-1985",
    title: "Education Foundation",
    description:
      "St. Peter's Primary School, Faji • Subuola & Alafia Primary Schools, Ibadan • Timi Agbale Grammar School (Head Girl) • St. Anne's School, Molete (HSC)",
    icon: GraduationCap,
  },
  {
    year: "1985-1994",
    title: "Higher Education",
    description:
      "University of Ibadan: BSc Animal Science (1985-1990) • NYSC Production Manager, Sokoto (1991) • MSc Biochemistry & Nutrition (1992-1994)",
    icon: GraduationCap,
  },
  {
    year: "1996-2009",
    title: "Teaching Career Begins",
    description:
      "Started her illustrious teaching career at Iganmode Grammar School, Ota. Later obtained Postgraduate Diploma in Education and PhD (2012).",
    icon: Briefcase,
  },
  {
    year: "2009-2017",
    title: "Anglican Grammar School",
    description:
      "Continued her dedicated service at Anglican Grammar School, Ota, impacting countless students' lives.",
    icon: Briefcase,
  },
  {
    year: "2017-2025",
    title: "Leadership Roles",
    description:
      "Sango Ota Junior High School (2017-2022) • Community High School, Iroko-Ota as Vice Principal (2022-2025)",
    icon: Award,
  },
  {
    year: "2025-2026",
    title: "Principal & Retirement",
    description:
      "Appointed Principal of NUD Grammar School, Solu-Ifo (October 2025). Retiring from Ogun State Teaching Service Commission after almost 30 years of dedicated service.",
    icon: Award,
  },
];

const affiliations = [
  "ANCOPSS (All Nigeria Confederation of Principals)",
  "TRCN (Teachers Registration Council)",
  "ASUSS (Academic Staff Union)",
  "ASAN (Animal Science Association)",
  "NSAP (Nigerian Society of Animal Production)",
  "Member, Deacons Assembly - Living Faith Church (Winners Chapel)",
  "Chairperson, Zonal Fellowship Council, Zone 3",
];

export function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Her Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-2">
            About Dr. Oluwayemisi Ayinde
          </h2>
          <p className="text-lg text-primary font-serif mb-4">
            (Nee Boyejo) • Principal, NAWAIR-UD-DEEN Grammar School Senior
            Solu-Ifo
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A life dedicated to shaping minds, serving with excellence, and
            glorifying God in all things.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Biography & Photo */}
          <div>
            <div className="relative mb-8">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                style={{ marginTop: "-1em" }}
              >
                <Image
                  src="/dr-yemisi-academic-regalia.jpg"
                  alt="Dr. Oluwayemisi Bosede Ayinde in academic regalia"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg">
                <p className="font-serif text-lg font-bold">Almost 30 Years</p>
                <p className="text-sm">of Dedicated Service</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Cross className="w-6 h-6 text-primary" />
                <h3 className="font-serif text-xl font-bold">Faith & Family</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dr. Ayinde is a devoted member of the Deacons Assembly at Living
                Faith Church (Winners Chapel) and serves as Chairperson of the
                Zonal Fellowship Council, Zone 3. She is blessed to be married
                to Pastor Shola Ayinde, and together they are blessed with
                children and grandchildren.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                &ldquo;The righteous flourish like the palm tree and grow like a
                cedar in Lebanon.&rdquo;
                <span className="block text-sm text-muted-foreground mt-1">
                  — Psalm 92:12
                </span>
              </blockquote>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Career Journey
            </h3>
            <div className="space-y-4">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative pl-8 pb-6 border-l-2 cursor-pointer transition-all",
                    index === activeIndex
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Timeline Dot */}
                  <div
                    className={cn(
                      "absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      index === activeIndex
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "ml-4 transition-all",
                      index === activeIndex ? "opacity-100" : "opacity-70"
                    )}
                  >
                    <span className="text-primary font-semibold text-sm">
                      {item.year}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-foreground mt-1">
                      {item.title}
                    </h4>
                    {index === activeIndex && (
                      <p className="text-muted-foreground mt-2 animate-fadeInUp">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Affiliations */}
            <div className="mt-10 bg-secondary/5 rounded-xl p-6 border border-secondary/20">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Professional Affiliations
              </h3>
              <ul className="space-y-2">
                {affiliations.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
