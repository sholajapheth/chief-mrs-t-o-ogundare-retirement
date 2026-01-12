import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TributesPreview } from "@/components/tributes-preview"
import { WishesPreview } from "@/components/wishes-preview"
import { PhotoPreview } from "@/components/photo-preview"
import { ProgramTimeline } from "@/components/program-timeline"
import { VenueSection } from "@/components/venue-section"
import { Footer } from "@/components/footer"
import { StatsCounter } from "@/components/stats-counter"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsCounter />
      <AboutSection />
      <TributesPreview />
      <WishesPreview />
      <PhotoPreview />
      <ProgramTimeline />
      <VenueSection />
      <Footer />
    </main>
  )
}
