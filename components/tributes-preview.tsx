"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronDown, ChevronUp, Star, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { allTributes } from "@/lib/tributes-data"

function TributeCard({ tribute }: { tribute: (typeof allTributes)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        tribute.featured && "border-primary/30 bg-primary/5",
      )}
    >
      <CardContent className="p-6">
        {tribute.featured && (
          <div className="flex items-center gap-1 text-primary text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Featured Message
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-serif text-lg font-bold text-foreground mb-2">{tribute.author}</h3>
          <span className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full">
            {tribute.relationship}
          </span>
        </div>

        <div className="relative">
          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
          <p className="text-muted-foreground leading-relaxed pl-6 italic whitespace-pre-line">
            {isExpanded ? tribute.full : tribute.excerpt}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-4 text-primary hover:text-primary/80"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Read Full Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function TributesPreview() {
  // Show top 8 messages (featured first, then others)
  const topTributes = [
    ...allTributes.filter((t) => t.featured),
    ...allTributes.filter((t) => !t.featured),
  ].slice(0, 8)

  return (
    <section id="tributes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Words of Love</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">
            Congratulatory Messages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Messages of love, gratitude, and appreciation from family, colleagues, and friends.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {/* Hierarchical Grid - Top 8 Messages */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mb-8">
          {topTributes.map((tribute) => (
            <div key={tribute.id} className="break-inside-avoid mb-6">
              <TributeCard tribute={tribute} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link href="/messages">
            <Button size="lg" variant="outline" className="group">
              View All Messages
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Scripture */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-background border border-border rounded-xl px-8 py-6 shadow-sm">
            <Quote className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="font-serif text-xl italic text-foreground max-w-xl">
              &ldquo;The path of the righteous is like the morning sun, shining ever brighter till the full light of
              day.&rdquo;
            </p>
            <span className="text-muted-foreground text-sm mt-2 block">— Proverbs 4:18</span>
          </div>
        </div>
      </div>
    </section>
  )
}
