"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Send, Search, PartyPopper, ImageIcon, Video, MessageSquare, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: Date
  hearts: number
  hasImage?: boolean
  imageUrl?: string
}

const sampleWishes: Wish[] = [
  {
    id: "1",
    name: "Engr. David Okonkwo",
    relationship: "Colleague",
    message:
      "Happy 60th birthday, Ma! Your dedication to education has inspired generations. May God continue to bless you abundantly!",
    location: "Lagos, Nigeria",
    timestamp: new Date("2026-01-10"),
    hearts: 24,
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    relationship: "Friend",
    message:
      "Celebrating an extraordinary woman on this milestone! Your grace, wisdom, and kindness have touched so many lives. Here's to many more years of blessing!",
    location: "London, UK",
    timestamp: new Date("2026-01-11"),
    hearts: 18,
    hasImage: true,
    imageUrl: "/birthday-flowers-arrangement.jpg",
  },
  {
    id: "3",
    name: "Adebisi Family",
    relationship: "Family",
    message:
      "Aunty Yemisi, we are so proud of all you have accomplished. Your life is a testimony of God's faithfulness. Happy birthday and happy retirement! 🎉",
    location: "Ibadan, Nigeria",
    timestamp: new Date("2026-01-12"),
    hearts: 32,
  },
  {
    id: "4",
    name: "Class of 2005, Iganmode Grammar School",
    relationship: "Student",
    message:
      "To the best Biology teacher we ever had! You made learning fun and believed in each of us. Thank you for everything, Ma!",
    location: "Various Locations",
    timestamp: new Date("2026-01-13"),
    hearts: 45,
  },
]

const relationshipOptions = ["Family", "Colleague", "Friend", "Church Member", "Student", "Other"]

const filterOptions = [
  { value: "all", label: "All Wishes", icon: MessageSquare },
  { value: "photos", label: "With Photos", icon: ImageIcon },
  { value: "videos", label: "With Videos", icon: Video },
]

export function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>(sampleWishes)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    email: "",
    location: "",
    message: "",
  })

  const filteredWishes = wishes.filter((wish) => {
    if (filter === "photos" && !wish.hasImage) return false
    if (
      searchQuery &&
      !wish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !wish.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.relationship || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newWish: Wish = {
      id: Date.now().toString(),
      name: formData.name,
      relationship: formData.relationship,
      message: formData.message,
      location: formData.location,
      timestamp: new Date(),
      hearts: 0,
    }

    setWishes([newWish, ...wishes])
    setFormData({ name: "", relationship: "", email: "", location: "", message: "" })
    setIsSubmitting(false)
    setShowConfetti(true)

    toast({
      title: "Wish Sent! 🎉",
      description: "Thank you for your beautiful message for Dr. Ayinde!",
    })

    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleHeart = (id: string) => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, hearts: wish.hearts + 1 } : wish)))
  }

  return (
    <section id="wishes" className="py-20 bg-background relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-[confetti_3s_ease-out_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `100%`,
                backgroundColor: ["#D4AF37", "#4B0082", "#8B4513", "#FF6B6B", "#4ECDC4"][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Submission Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <PartyPopper className="w-6 h-6 text-primary" />
                  <h3 className="font-serif text-xl font-bold">Leave Your Wishes</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) => setFormData({ ...formData, relationship: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationshipOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your heartfelt message here..."
                      className="mt-1 min-h-[120px]"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/500 characters</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Your Wishes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Wishes Display */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search wishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                    className={cn(filter === option.value && "bg-primary text-primary-foreground")}
                  >
                    <option.icon className="w-4 h-4 mr-1" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Total Counter */}
            <p className="text-muted-foreground mb-4">{filteredWishes.length} wishes shared</p>

            {/* Wishes Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredWishes.map((wish, index) => (
                <Card
                  key={wish.id}
                  className="overflow-hidden hover:shadow-lg transition-all animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    {wish.hasImage && wish.imageUrl && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={wish.imageUrl || "/placeholder.svg"}
                          alt="Wish attachment"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{wish.name}</h4>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                          {wish.relationship}
                        </span>
                      </div>
                      {wish.location && <span className="text-xs text-muted-foreground">{wish.location}</span>}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{wish.message}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {wish.timestamp.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
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
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
