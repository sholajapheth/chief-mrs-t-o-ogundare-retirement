import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TributesSection } from "@/components/tributes-section"
import { WishesWall } from "@/components/wishes-wall"
import { PhotoGallery } from "@/components/photo-gallery"
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
      <TributesSection />
      <WishesWall />
      <PhotoGallery />
      <ProgramTimeline />
      <VenueSection />
      <Footer />
    </main>
  )
}
