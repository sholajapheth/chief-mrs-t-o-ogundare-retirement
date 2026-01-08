"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Shirt, Car, Phone, Mail } from "lucide-react"
import Image from "next/image"

export function VenueSection() {
  return (
    <section id="venue" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Location</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">Event Venue</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We look forward to celebrating with you at this beautiful venue.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map / Venue Image */}
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image src="/placeholder.svg?height=600&width=800" alt="Event Venue" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-serif text-2xl font-bold mb-2">[Venue Name]</h3>
              <p className="text-white/80">[Venue Address, City, State]</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-6">Event Details</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Date & Time</h4>
                      <p className="text-muted-foreground">Friday, January 9, 2026</p>
                      <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Venue</h4>
                      <p className="text-muted-foreground">[Venue Name]</p>
                      <p className="text-muted-foreground">[Full Address]</p>
                      <Button variant="link" className="text-primary p-0 h-auto mt-1">
                        Get Directions →
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shirt className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Dress Code</h4>
                      <p className="text-muted-foreground">Formal / Semi-Formal Attire</p>
                      <p className="text-muted-foreground text-sm">Traditional attire welcomed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Parking</h4>
                      <p className="text-muted-foreground">Ample parking space available at the venue</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">For Inquiries</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+234"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>[Phone Number]</span>
                  </a>
                  <a
                    href="mailto:"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>[Email Address]</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Scripture */}
            <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
              <p className="font-serif text-lg italic text-foreground text-center">
                &ldquo;They will still bear fruit in old age, they will stay fresh and green.&rdquo;
              </p>
              <span className="text-muted-foreground text-sm text-center block mt-2">— Psalm 92:14</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
