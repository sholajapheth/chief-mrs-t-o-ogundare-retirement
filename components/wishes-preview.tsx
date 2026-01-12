"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, Loader2, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: string
  hearts: number
}

export function WishesPreview() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("/api/wishes")
        if (res.ok) {
          const data = await res.json()
          // Get top 5 most recent wishes
          setWishes(data.slice(0, 5))
        }
      } catch (error) {
        console.error("Failed to load wishes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWishes()
  }, [])

  const handleHeart = async (id: string) => {
    // Optimistic update
    setWishes(wishes.map((w) => (w.id === id ? { ...w, hearts: w.hearts + 1 } : w)))
    
    // Persist to database
    try {
      const res = await fetch(`/api/wishes/${id}/heart`, { method: "POST" })
      if (res.ok) {
        const updated = await res.json()
        setWishes(wishes.map((w) => (w.id === id ? { ...w, hearts: updated.hearts } : w)))
      } else {
        setWishes(wishes.map((w) => (w.id === id ? { ...w, hearts: Math.max(0, w.hearts - 1) } : w)))
      }
    } catch (error) {
      console.error("Error liking wish:", error)
      setWishes(wishes.map((w) => (w.id === id ? { ...w, hearts: Math.max(0, w.hearts - 1) } : w)))
    }
  }

  return (
    <section id="wishes" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Share Your Love</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">Digital Wishes Wall</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leave a heartfelt message for Dr. Ayinde on this special occasion.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : wishes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No wishes yet. Be the first to share!</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Top 5 Wishes Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {wishes.map((wish) => (
                <Card key={wish.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{wish.name}</h4>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                          {wish.relationship}
                        </span>
                      </div>
                      {wish.location && <span className="text-xs text-muted-foreground">{wish.location}</span>}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{wish.message}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {new Date(wish.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80"
                        onClick={() => handleHeart(wish.id)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {wish.hearts}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <Link href="/wishes">
                <Button size="lg" variant="outline" className="group">
                  View All Wishes
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
