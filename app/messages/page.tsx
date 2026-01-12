import { Navigation } from "@/components/navigation"
import { TributesSection } from "@/components/tributes-section"
import { Footer } from "@/components/footer"

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <TributesSection />
      <Footer />
    </main>
  )
}
