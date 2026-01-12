import { Navigation } from "@/components/navigation"
import { WishesWall } from "@/components/wishes-wall"
import { Footer } from "@/components/footer"

export default function WishesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <WishesWall />
      <Footer />
    </main>
  )
}
