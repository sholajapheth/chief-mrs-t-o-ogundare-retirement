"use client";

import { GraduationCap, Briefcase, Award, Users, Heart, Cross } from "lucide-react";
import Image from "next/image";

const timelineData = [
  {
    year: "Early Life",
    title: "Birth & Family",
    description:
      "Born the third daughter into the family of Pa Olatunji and Mrs Grace Olaosebikan (of blessed memory), from the distinguished Egba lineage of Itoko and Ake. From her earliest years she exhibited discipline, intelligence, and a strong sense of responsibility.",
    icon: Heart,
  },
  {
    year: "Primary & Secondary",
    title: "Educational Foundation",
    description:
      "New Eden Primary School, Ibadan (Primary 1–3). UAC School, Eleja (Primary 4). Mrs Kuti Primary School, Isabo (Primary 5–6). Abeokuta Grammar School, Idi Aba (1981–1986).",
    icon: GraduationCap,
  },
  {
    year: "Tertiary",
    title: "Higher Education",
    description:
      "Federal College of Education (FCE), Osiele – 1987 (Mathematics & English) • University of Ado-Ekiti – Bachelor of Education (B.Ed) in English Language. Her academic foundation laid the groundwork for a life dedicated to teaching, leadership, and lifelong learning.",
    icon: GraduationCap,
  },
  {
    year: "1991–2002",
    title: "Adenrele High School",
    description:
      "Joined the Ogun State Teaching Service Commission on May 29, 1991. Began shaping young minds with passion and commitment at Adenrele High School.",
    icon: Briefcase,
  },
  {
    year: "2002–2014",
    title: "Ajuwon & Adenrele Senior",
    description:
      "Ajuwon High School, Senior (2002–2006) • Adenrele High School, Senior (2006–2014). Taught English and Mathematics with dedication, inspiring countless students and mentoring fellow teachers.",
    icon: Briefcase,
  },
  {
    year: "2014–2023",
    title: "Ifo, Anglican Grammar, Okenla",
    description:
      "Ifo High School, Junior (2014–2018) • Anglican Grammar School, Junior, Okenla – Vice Principal (2018–2020) • Anglican Grammar School, Senior, Okenla – Vice Principal (2020–2023).",
    icon: Briefcase,
  },
  {
    year: "2023–2026",
    title: "Principal & Retirement",
    description:
      "Agbado District Comprehensive High School, Senior, Oke Aro – Principal (2023–2026). Retiring after thirty-five remarkable years of dedicated and meritorious service to education and society.",
    icon: Award,
  },
];

const affiliations = [
  "Minister, Reconciliation Gospel Ministry, Ifo",
  "Egbe Akomolede (Ogun State) – Chieftaincy Title: FIWAGBOYE (2025)",
  "Family rooted in the Anglican faith",
  "Leads women and children in Christian faith and practice",
  "Ogun State Teaching Service Commission (1991–2026)",
];

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Her Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-2">
            About Chief (Mrs) Temitope Oluwakemi Ogundare
          </h2>
          <p className="text-lg text-primary font-serif mb-4">
            FIWAGBOYE • Principal, Agbado District Comprehensive High School, Senior, Oke Aro
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A life dedicated to education, leadership, faith, and service — a legacy that will continue to inspire generations.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="relative mb-8">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="/birthday-portrait-closeup-shot.jpeg"
                  alt="Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 right-4 rounded-lg bg-primary px-6 py-3 text-primary-foreground shadow-lg">
                <p className="font-serif text-lg font-bold">35 Years</p>
                <p className="text-sm">of Meritorious Service</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Cross className="w-6 h-6 text-primary" />
                <h3 className="font-serif text-xl font-bold">Faith & Family</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A pillar of her church, Chief (Mrs) Ogundare serves as a Minister at Reconciliation Gospel Ministry, Ifo. Coming from a family rooted in the Anglican faith, she actively leads women and children in Christian faith and practice, mentoring many within and beyond her community.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                A devoted family woman, she is happily married and blessed with children. She has balanced her professional life with her family responsibilities with grace and excellence.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-2">
                Her personal interests include: impacting knowledge, exploring and discovering new ideas, reading, sports, and traveling and tourism.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic text-foreground mt-4">
                &ldquo;The righteous flourish like the palm tree and grow like a cedar in Lebanon.&rdquo;
                <span className="block text-sm text-muted-foreground mt-1">
                  — Psalm 92:12
                </span>
              </blockquote>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Career Journey Timeline
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{item.year}</span>
                  <h4 className="mt-1 font-serif text-lg font-bold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-secondary/20 bg-secondary/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-foreground">
                <Users className="w-5 h-5 text-primary" />
                Affiliations & Service
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {affiliations.map((item, index) => (
                  <li key={index} className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
                    {item}
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
