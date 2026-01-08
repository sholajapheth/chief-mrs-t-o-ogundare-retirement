import { Heart, Facebook, Twitter, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Her", href: "#about" },
  { label: "Tributes", href: "#tributes" },
  { label: "Wishes Wall", href: "#wishes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Program", href: "#program" },
  { label: "Venue", href: "#venue" },
]

export function Footer() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = "Join us in celebrating Dr. Oluwayemisi Bosede Ayinde's 60th Birthday & Retirement!"

  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-2xl">✦</span>
              <span className="font-serif text-xl font-bold">Dr. Yemisi at 60</span>
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed mb-4">
              Celebrating a life of purpose, dedication to education, and unwavering faith in God.
            </p>
            <p className="text-secondary-foreground/70 italic text-sm">
              &ldquo;To God be the Glory. Great things He has done.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Share */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Share This Celebration</h3>
            <p className="text-secondary-foreground/70 mb-4">
              Help us spread the joy by sharing this celebration with friends and family.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-secondary-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                asChild
              >
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-secondary-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                asChild
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-secondary-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                asChild
              >
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-secondary-foreground/60 text-sm flex items-center justify-center gap-1">
            Website created with <Heart className="w-4 h-4 text-primary fill-primary" /> for Dr. Yemisi&apos;s
            celebration
          </p>
          <p className="text-secondary-foreground/40 text-xs mt-2">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
