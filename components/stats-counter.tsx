"use client"

import { useEffect, useState, useRef } from "react"
import { Award, BookOpen, Heart, Users } from "lucide-react"

const stats = [
  { icon: Award, value: 60, label: "Years of Life", suffix: "" },
  { icon: BookOpen, value: 29, label: "Years of Service", suffix: "" },
  { icon: Users, value: 5000, label: "Students Impacted", suffix: "+" },
  { icon: Heart, value: 0, label: "Wishes Received", suffix: "", dynamic: true },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground font-bold">60 Years of Blessings</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
