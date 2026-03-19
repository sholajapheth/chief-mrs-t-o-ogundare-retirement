"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Mic, Music, Cake, MessageSquare, CalendarPlus, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

type ProgramItem = {
  section: "Thanksgiving Service & Pen-down Ceremony" | "Reception"
  title: string
  description: string
  icon: typeof Users
  time?: string
  duration?: string
}

const programItems: ProgramItem[] = [
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "1. Arrival of Guests",
    description: "Guests arrive and are ushered to their seats.",
    duration: "15 mins",
    icon: Users,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "2. Entrance of the Celebrant",
    description: "Processional entrance of the celebrant.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "3. Opening Prayer",
    description: "Opening prayer for the thanksgiving service.",
    duration: "5 mins",
    icon: BookOpen,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "4. Praise, Worship & Hymn",
    description: "Praise and worship session with hymns.",
    duration: "10 mins",
    icon: Music,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "5. Welcome Address - Pen-down Chairman",
    description: "Welcome remarks by the Pen-down Chairman.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "6. Introduction of Dignitaries",
    description: "Acknowledgment of distinguished guests.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "7. School Choir Ministration",
    description: "Special ministration by the school choir.",
    duration: "10 mins",
    icon: Music,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "8. Tribute Session",
    description:
      "Tributes from colleagues, students' representatives, family, in-laws, church, and community.",
    duration: "15 mins",
    icon: Mic,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "9. Message",
    description: "Special message to the congregation and celebrant.",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "10. Prayer for the Celebrant",
    description: "Special prayer for the celebrant and family.",
    duration: "8 mins",
    icon: BookOpen,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "11. Citation of Honour",
    description: "Formal recognition of achievements and service.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "12. Pen-down Ceremony & Handing Over",
    description: "Symbolic pen-down and handing-over proceedings.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "13. Welcome to the Senior Citizens' Club",
    description: "Formal welcome into the Senior Citizens' Club.",
    duration: "8 mins",
    icon: Users,
  },
  {
    section: "Thanksgiving Service & Pen-down Ceremony",
    title: "14. Pull-Out",
    description: "Processional pull-out from the thanksgiving segment.",
    duration: "5 mins",
    icon: MessageSquare,
  },
  {
    section: "Reception",
    title: "1. Grand Entrance of the Celebrant",
    description: "Reception entrance of the celebrant.",
    duration: "10 mins",
    icon: Users,
  },
  {
    section: "Reception",
    title: "2. Anthems - State, School & ANCOPSS",
    description: "Anthem renditions for state, school, and ANCOPSS.",
    duration: "8 mins",
    icon: Music,
  },
  {
    section: "Reception",
    title: "3. Chairman's Welcome Address",
    description: "Welcome remarks by the Chairman.",
    duration: "8 mins",
    icon: Mic,
  },
  {
    section: "Reception",
    title: "4. Cultural Dance Presentation",
    description: "Cultural dance presentation.",
    duration: "10 mins",
    icon: Music,
  },
  {
    section: "Reception",
    title: "5. Through the Eyes of Friends",
    description: "Stories and memories about the celebrant.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    section: "Reception",
    title: "6. This Is Your Life",
    description:
      "Highlights of the celebrant's journey and achievements, including Ewi presentation.",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    section: "Reception",
    title: "7. Students' Presentation",
    description: "Presentation by students.",
    duration: "8 mins",
    icon: Users,
  },
  {
    section: "Reception",
    title: "8. Teachers' Presentation",
    description: "Presentation by teachers and staff.",
    duration: "8 mins",
    icon: Users,
  },
  {
    section: "Reception",
    title: "9. Light Moments with the Celebrant",
    description:
      "Humorous imitation of the celebrant's memorable style and habits.",
    duration: "8 mins",
    icon: MessageSquare,
  },
  {
    section: "Reception",
    title: "10. Celebrant's Dance",
    description: "Special dance moment with the celebrant.",
    duration: "8 mins",
    icon: Music,
  },
  {
    section: "Reception",
    title: "11. Cutting of the Cake",
    description: "Cake cutting ceremony.",
    duration: "10 mins",
    icon: Cake,
  },
  {
    section: "Reception",
    title: "12. Presentation of Gifts",
    description: "Presentation of gifts to the celebrant.",
    duration: "12 mins",
    icon: MessageSquare,
  },
  {
    section: "Reception",
    title: "13. Order of Photographs",
    description: "Official photograph sessions.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    section: "Reception",
    title: "14. Toast to the Celebrant",
    description: "Formal toast in honour of the celebrant.",
    duration: "6 mins",
    icon: Mic,
  },
  {
    section: "Reception",
    title: "15. Celebrant's Response / Vote of Thanks",
    description: "Response and appreciation by the celebrant.",
    duration: "8 mins",
    icon: Mic,
  },
  {
    section: "Reception",
    title: "16. Closing Prayer",
    description: "Final closing prayer.",
    duration: "5 mins",
    icon: BookOpen,
  },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const eventDate = new Date("2026-05-30T12:00:00")

    const updateTimer = () => {
      const now = new Date()
      const diff = eventDate.getTime() - now.getTime()

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-secondary text-secondary-foreground w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg">
            <span className="font-serif text-2xl md:text-3xl font-bold">{value}</span>
          </div>
          <span className="text-muted-foreground text-sm mt-2 block capitalize">{unit}</span>
        </div>
      ))}
    </div>
  )
}

export function ProgramTimeline() {
  const handleAddToCalendar = () => {
    const event = {
      title: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE — Retirement Celebration",
      start: "2026-05-30T12:00:00",
      end: "2026-05-30T17:30:00",
      description: "In Celebration of 35 Years of Meritorious Service. Agbado District Comprehensive High School, Senior, Oke Aro.",
      location: "AGBADO DISTRICT COMPREHENSIVE HIGH SCHOOL, SENIOR, OKE ARO",
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, "")}/${event.end.replace(/[-:]/g, "")}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

    window.open(googleCalendarUrl, "_blank")
  }

  return (
    <section id="program" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">The Big Day</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">Program of Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us for a day filled with celebration, gratitude, and thanksgiving.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {/* Countdown Timer */}
        <div className="mb-16">
          <p className="text-center text-muted-foreground mb-4">Countdown to the Celebration</p>
          <CountdownTimer />
        </div>

        {/* Add to Calendar */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={handleAddToCalendar}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8"
          >
            <CalendarPlus className="mr-2 h-5 w-5" />
            Add to Calendar
          </Button>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {programItems.map((item, index) => (
            <div key={index}>
              {(index === 0 || item.section !== programItems[index - 1]?.section) && (
                <div className="mb-4 mt-8 first:mt-0">
                  <h3 className="font-serif text-2xl font-bold text-foreground">{item.section}</h3>
                </div>
              )}
              <div
                className={cn(
                  "relative flex gap-6 pb-8",
                  index !== programItems.length - 1 && "border-l-2 border-primary/30 ml-6",
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <Card className="ml-12 flex-1 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    {(item.time || item.duration) && (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        {item.time ? (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">{item.time}</span>
                          </div>
                        ) : (
                          <div />
                        )}
                        {item.duration ? (
                          <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                            {item.duration}
                          </span>
                        ) : null}
                      </div>
                    )}
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
