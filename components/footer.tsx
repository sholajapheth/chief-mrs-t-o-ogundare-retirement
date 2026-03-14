import { Heart, Facebook, Twitter, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Citation", href: "#citation" },
  { label: "Congratulatory Messages", href: "#tributes" },
  { label: "Messages Wall", href: "#wishes" },
  { label: "Gallery", href: "#gallery" },
  { label: "Program", href: "#program" },
  { label: "Venue", href: "#venue" },
];

export function Footer() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText =
    "Join us in celebrating Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE — 35 Years of Meritorious Service!";

  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-2xl">✦</span>
              <span className="font-serif text-xl font-bold">
                Chief Mrs Ogundare
              </span>
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed mb-4">
              In celebration of 35 years of meritorious service in education — a legacy that will continue to inspire generations.
            </p>
            <p className="text-secondary-foreground/70 italic text-sm">
              &ldquo;A woman of great and large heart, an icon of educational excellence.&rdquo;
            </p>
            <div className="mt-6 pt-6 border-t border-secondary-foreground/10 space-y-2">
              <p className="text-secondary-foreground/70 text-sm font-semibold">
                Enquiries:
              </p>
              <p className="text-secondary-foreground/70 text-sm">
                Contact: Gbemi
              </p>
              <p className="text-secondary-foreground/70 text-sm">
                Phone: +234 816 800 5925
              </p>
              <p className="text-secondary-foreground/70 text-sm break-all">
                Email: gbemiova@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Share */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">
              Share This Celebration
            </h3>
            <p className="text-secondary-foreground/70 mb-4">
              Help us spread the joy by sharing this celebration with friends
              and family.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-secondary-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                asChild
              >
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`}
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
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareText
                  )}&url=${encodeURIComponent(shareUrl)}`}
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
                  href={`https://wa.me/?text=${encodeURIComponent(
                    shareText + " " + shareUrl
                  )}`}
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

        {/* Thank You Message */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <div className="bg-primary/10 rounded-lg p-6 text-center max-w-3xl mx-auto">
            <p className="text-secondary-foreground leading-relaxed">
              With grateful hearts, the family of{" "}
              <span className="font-bold">Chief (Mrs) Temitope Oluwakemi Ogundare</span> thank
              the Almighty God and everyone who contributed to making this
              retirement celebration a memorable one.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-secondary-foreground/10 text-center">
          <p className="text-secondary-foreground/60 text-sm flex items-center justify-center gap-1">
            Website created with{" "}
            <Heart className="w-4 h-4 text-primary fill-primary" /> for Chief Mrs Ogundare&apos;s retirement celebration
          </p>
          <p className="text-secondary-foreground/40 text-xs mt-2">
            © 2026 All Rights Reserved
          </p>
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="text-xs text-secondary-foreground/50">
              Developed by{" "}
              <a
                href="https://sholajapheth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                Shola Japheth
              </a>
            </span>
            <span className="text-xs text-secondary-foreground/30">
              <a
                href="mailto:sholajapheth@gmail.com"
                className="underline hover:text-primary"
              >
                sholajapheth@gmail.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
