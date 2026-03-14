"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Mic, Music, Cake, MessageSquare, CalendarPlus, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const programItems = [
  {
    time: "12:00 PM",
    title: "1. Arrival of Principals",
    description: "Principals arrive and register.",
    duration: "15 mins",
    icon: Users,
  },
  {
    time: "12:15 PM",
    title: "2. Arrival of Guests",
    description: "Welcome guests and sign the guestbook.",
    duration: "15 mins",
    icon: Users,
  },
  {
    time: "12:30 PM",
    title: "3. Arrival of Celebrant, Family and Friends",
    description: "Grand entrance of Chief (Mrs) Ogundare with her family.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    time: "12:40 PM",
    title: "4. Opening Prayer, Praise & Worship/Hymn",
    description: "Invocation and blessings for the celebration.",
    hymn: "To God be the glory, great things He hath done",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    time: "12:50 PM",
    title: "5. Anthems - State and ANCOPSS",
    description: "National and professional anthems performed.",
    duration: "5 mins",
    icon: Music,
  },
  {
    time: "12:55 PM",
    title: "6. Introduction of Dignitaries",
    description: "Acknowledgment of distinguished guests.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    time: "1:05 PM",
    title: "7. Welcome Speech",
    description: "Master of Ceremony welcomes all guests.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    time: "1:15 PM",
    title: "8. Chairman of the Day's Speech",
    description: "Remarks from the event's chairperson.",
    duration: "15 mins",
    icon: Mic,
  },
  {
    time: "1:30 PM",
    title: "9. Other Dignitaries Speech",
    description: "Remarks from other distinguished guests.",
    duration: "20 mins",
    icon: Mic,
  },
  {
    time: "1:50 PM",
    title: "10. Cultural Dance",
    description: "Traditional cultural performances.",
    duration: "15 mins",
    icon: Music,
  },
  {
    time: "2:05 PM",
    title: "11. Choreography",
    description: "Special choreographed performance.",
    duration: "10 mins",
    icon: Music,
  },
  {
    time: "2:15 PM",
    title: "12. Short Exhortation",
    description: "Inspirational message for the celebrant.",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    time: "2:25 PM",
    title: "13. About the Celebrant",
    description: "Biography and life journey of Chief (Mrs) Ogundare.",
    duration: "15 mins",
    icon: BookOpen,
  },
  {
    time: "2:40 PM",
    title: "14. Citation of the Celebrant",
    description: "Formal recognition of achievements and service.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    time: "2:50 PM",
    title: "15. Recitation of Alma Mater Anthem",
    description: "Alma mater anthem performance.",
    duration: "5 mins",
    icon: Music,
  },
  {
    time: "2:55 PM",
    title: "16. Teacher's Presentation",
    description: "Presentation by teaching colleagues.",
    duration: "15 mins",
    icon: Mic,
  },
  {
    time: "3:10 PM",
    title: "17. Prayer Session for the Retiree & Family",
    description: "Special prayers for the celebrant and family.",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    time: "3:20 PM",
    title: "18. Pen Down",
    description: "Symbolic retirement moment.",
    duration: "5 mins",
    icon: MessageSquare,
  },
  {
    time: "3:25 PM",
    title: "19. Cutting of Cake & Photography",
    description: "Cake cutting ceremony and photo sessions.",
    duration: "20 mins",
    icon: Cake,
  },
  {
    time: "3:45 PM",
    title: "20. Presentation of Gifts",
    description: "Presentation of gifts to the celebrant.",
    duration: "15 mins",
    icon: MessageSquare,
  },
  {
    time: "4:00 PM",
    title: "21. Welcome to the Senior Citizen's Club",
    description: "Special welcome and induction.",
    duration: "10 mins",
    icon: Users,
  },
  {
    time: "4:10 PM",
    title: "22. Celebrant's Response & Vote of Thanks",
    description: "Words of gratitude from Chief (Mrs) Ogundare.",
    duration: "10 mins",
    icon: Mic,
  },
  {
    time: "4:20 PM",
    title: "23. Closing Prayer & Hymn",
    description: "Final blessings and prayers.",
    hymn: "Guide me, O my great Redeemer",
    duration: "5 mins",
    icon: BookOpen,
  },
  {
    time: "4:25 PM",
    title: "24. Dance! Dance!! Dance!!!",
    description: "Music, dancing, and celebration.",
    duration: "1+ hour",
    icon: Music,
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
            <div
              key={index}
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">{item.time}</span>
                    </div>
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                  {(item as any).hymn && (
                    <p className="text-primary text-sm font-medium mt-2 flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      {(item as any).hymn}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
