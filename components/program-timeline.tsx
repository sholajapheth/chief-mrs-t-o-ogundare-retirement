"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Mic, Music, Cake, Camera, MessageSquare, CalendarPlus, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const programItems = [
  {
    time: "10:00 AM",
    title: "Arrival & Registration",
    description: "Guests arrive and sign the guestbook. Welcome refreshments served.",
    duration: "30 mins",
    icon: Users,
  },
  {
    time: "10:30 AM",
    title: "Opening Prayer",
    description: "Invocation and blessings for the celebration.",
    duration: "10 mins",
    icon: BookOpen,
  },
  {
    time: "10:45 AM",
    title: "Welcome Address",
    description: "Master of Ceremony welcomes all guests and introduces the program.",
    duration: "15 mins",
    icon: Mic,
  },
  {
    time: "11:00 AM",
    title: "Biography Reading",
    description: "A journey through Dr. Ayinde's remarkable life and achievements.",
    duration: "20 mins",
    icon: BookOpen,
  },
  {
    time: "11:20 AM",
    title: "Tributes & Speeches",
    description: "Heartfelt words from family, colleagues, and friends.",
    duration: "45 mins",
    icon: MessageSquare,
  },
  {
    time: "12:05 PM",
    title: "Special Performances",
    description: "Musical presentations and cultural entertainment.",
    duration: "30 mins",
    icon: Music,
  },
  {
    time: "12:35 PM",
    title: "Cake Cutting Ceremony",
    description: "The celebrant cuts her 60th birthday cake.",
    duration: "15 mins",
    icon: Cake,
  },
  {
    time: "12:50 PM",
    title: "Toast & Appreciation",
    description: "Raising glasses to honor Dr. Ayinde's legacy.",
    duration: "10 mins",
    icon: MessageSquare,
  },
  {
    time: "1:00 PM",
    title: "Photograph Sessions",
    description: "Group photos with family, colleagues, and guests.",
    duration: "30 mins",
    icon: Camera,
  },
  {
    time: "1:30 PM",
    title: "Reception & Refreshments",
    description: "Enjoy delicious food, fellowship, and celebration.",
    duration: "2 hours",
    icon: Users,
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
    const eventDate = new Date("2026-01-09T10:00:00")

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
      title: "Dr. Oluwayemisi Bosede Ayinde's 60th Birthday & Retirement Celebration",
      start: "2026-01-09T10:00:00",
      end: "2026-01-09T16:00:00",
      description: "Celebrating 60 Years of Grace & 29 Years of Dedicated Service",
      location: "[Venue Name & Address]",
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
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
