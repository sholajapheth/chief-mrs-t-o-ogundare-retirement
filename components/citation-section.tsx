"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const legacyAchievements = [
  "Removal of debris from collapsed storey building; construction of school tuck shop and security office",
  "Collaboration with Alumni to repair collapsed portion of school fence",
  "Legacy project: restructuring of senior school gate (obstructed by donated building)",
  "Flooring and maintenance of all classrooms and buildings",
  "Maintenance of all student, staff, and office furniture",
  "Continuous maintenance of roofs to prevent leaking",
  "First-ever Valedictory and Prize-Giving Ceremony (now annual)",
  "Revived inter-house sports competitions (now annual)",
  "First-ever Literary Festival (now annual)",
  "Inauguration of the Learners' Representative Council (LRC)",
  "First-ever Yearbook (digital e-book and printed copies)",
  "Procurement of instructional and co-curricular equipment (drum set, speaker, siren, Teacher Geometric Set)",
  "Purchase of outfits for cultural troupe; sashes and staff of office for Honourables, Speaker and Clerk",
  "Renovation of Principal's office (tiling, sliding glass, painting)",
  "Upgraded Home Economics laboratory (6kg gas cylinder and learning tools)",
  "Electrification of administrative offices from solar-powered computer room",
  "Facilitated numerous alumni and community projects",
];

const alumniActivities = [
  { set: "1990 set", detail: "Construction of collapsed part of fence, restructuring of gate; sponsorship of four candidates for 2026 WAEC" },
  { set: "1998 set", detail: "Customised big notes for prize-giving (three years); Principal's annual gift (two consecutive years)" },
  { set: "2003 set", detail: "Donation of laboratory stools" },
  { set: "2004 set", detail: "Renovation of science laboratory" },
  { set: "2010 set", detail: "Donation of a mower" },
  { set: "2012 set", detail: "Flooring of a classroom" },
  { set: "Hon. Famous Amos Shadrack Ethama (2010 set)", detail: "Sponsorship of two candidates for 2026 WAEC" },
  { set: "The Hope Tribe Pavilion", detail: "Sponsorship of ten candidates for 2026 WAEC" },
];

export function CitationSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <section id="citation" className="border-y border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Formal Citation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">
            Retirement Citation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In Celebration of 35 Years of Meritorious Service
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="mx-auto mb-12 max-w-4xl rounded-2xl border border-primary/20 bg-linear-to-r from-secondary to-accent p-8 text-center shadow-lg">
          <p className="font-serif text-xl md:text-2xl italic text-white leading-relaxed">
            &ldquo;A woman of great and large heart, an icon of educational excellence, and a legacy that will continue to inspire generations.&rdquo;
          </p>
          <p className="mt-3 text-sm text-white/80">— In honour of Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Service Span</p>
              <p className="mt-1 font-serif text-3xl font-bold text-foreground">35 Years</p>
              <p className="mt-1 text-sm text-muted-foreground">1991 - 2026</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Schools Served</p>
              <p className="mt-1 font-serif text-3xl font-bold text-foreground">7</p>
              <p className="mt-1 text-sm text-muted-foreground">Across Ogun State Teaching Service</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Title & Recognition</p>
              <p className="mt-1 text-sm text-foreground">FIWAGBOYE, Egbe Akomolede (2025)</p>
              <p className="mt-2 text-sm text-muted-foreground">Exemplary Leadership Award (2024)</p>
            </div>
          </aside>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className={cn("relative overflow-hidden", !isExpanded && "max-h-[520px]")}>
              <div className="space-y-6 text-foreground/90">
                <h3 className="font-serif text-xl font-bold text-foreground">Introduction</h3>
                <p>
                  Today, we gather to celebrate and honour the illustrious career of Chief (Mrs) Temitope Oluwakemi Ogundare, Principal of Agbado District Comprehensive High School, Senior, Oke Aro, as she gracefully retires after thirty-five remarkable years of dedicated and meritorious service to education and society.
                </p>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Early Life</h3>
                <p>
                  Born the third daughter into the family of Pa Olatunji and Mrs Grace Olaosebikan (of blessed memory), from the distinguished Egba lineage of Itoko and Ake, Chief (Mrs) Temitope Oluwakemi Ogundare entered this world nearly six decades ago. From her earliest years, she exhibited discipline, intelligence, and a strong sense of responsibility — qualities that would later define her professional life and personal character.
                </p>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Educational Background</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>New Eden Primary School, Ibadan: Primary 1–3</li>
                  <li>UAC School, Eleja – Primary 4</li>
                  <li>Mrs Kuti Primary School, Isabo – Primary 5–6</li>
                  <li>Abeokuta Grammar School, Idi Aba – 1981–1986</li>
                  <li>Federal College of Education (FCE), Osiele – 1987 (Mathematics & English)</li>
                  <li>University of Ado-Ekiti – Bachelor of Education (B.Ed) in English Language</li>
                </ul>
                <p>Her academic foundation laid the groundwork for a life dedicated to teaching, leadership, and lifelong learning.</p>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Work Experience</h3>
                <p>
                  Chief (Mrs) Ogundare joined the Ogun State Teaching Service Commission on May 29, 1991, and began shaping young minds with passion and commitment. She served at: Adenrele High School (1991–2002); Ajuwon High School, Senior (2002–2006); Adenrele High School, Senior (2006–2014); Ifo High School, Junior (2014–2018); Anglican Grammar School, Junior, Okenla – Vice Principal (2018–2020); Anglican Grammar School, Senior, Okenla – Vice Principal (2020–2023); Agbado District Comprehensive High School, Senior, Oke Aro – Principal (2023–2026). Throughout her career, she taught English and Mathematics with dedication, inspiring countless students and mentoring fellow teachers.
                </p>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Marital & Spiritual Life</h3>
                <p>
                  A devoted family woman, she is happily married and blessed with children, balancing professional life with family responsibilities with grace and excellence. A pillar of her church, she serves as a Minister at Reconciliation Gospel Ministry, Ifo. Coming from a family rooted in the Anglican faith, she actively leads women and children in Christian faith and practice, mentoring many within and beyond her community.
                </p>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Hobbies</h3>
                <p>
                  Her personal interests include: impacting knowledge, exploring and discovering new ideas, reading, sports, and traveling and tourism.
                </p>

                <div className="mt-10 pt-8 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAchievements(!showAchievements)}
                    className="flex items-center gap-2 text-primary font-semibold hover:underline"
                  >
                    <Award className="w-5 h-5" />
                    Notable Achievements at Agbado District Comprehensive High School
                    {showAchievements ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showAchievements && (
                    <ol className="list-decimal pl-6 mt-4 space-y-2 text-muted-foreground">
                      {legacyAchievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  )}
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Activities of ADCHS Alumni and Other Philanthropists
                  </h3>
                  <ul className="mt-4 space-y-3 text-muted-foreground">
                    {alumniActivities.map((item, i) => (
                      <li key={i}>
                        <span className="font-semibold text-foreground">{item.set}:</span> {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Awards and Recognition</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Participated in the Road Safety Commission Essay Competition in secondary school (Form 4, 1984) and emerged third at state level</li>
                  <li>Exemplary Leadership Award, Adiyan Alausa Area CDC (2024)</li>
                  <li>Chieftaincy Title: FIWAGBOYE, Ogun State Chapter of Egbe Akomolede (2025)</li>
                  <li>Service to ANCOPSS, Ifo — Financial Secretary (2024)</li>
                  <li>Service to ANCOPSS, Ifo — General Secretary (2025 to date)</li>
                </ul>

                <h3 className="font-serif text-xl font-bold text-foreground mt-8">Conclusion</h3>
                <p>
                  After thirty-five years of meritorious service, Chief (Mrs) Temitope Oluwakemi Ogundare retires not only as a distinguished educationist but as a visionary leader, a mentor of generations, a devoted family woman, and a woman of faith, integrity, and generosity. Her legacy lives on in the schools she transformed, the students she inspired, the teachers she mentored, and the community she served.
                </p>
                <p className="font-serif text-lg font-bold text-primary mt-6">
                  Ladies and Gentlemen, please rise to honour: Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE — a woman of great and large heart, an icon of educational excellence, and a legacy that will continue to inspire generations.
                </p>
              </div>
              {!isExpanded && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-card to-transparent" />
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-full"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Read full citation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
