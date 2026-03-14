import Navbar from "@/components/sections/Navbar"
import Wishes from "@/components/sections/Wishes"
import { Footer } from "@/components/sections/Footer"

export default function WishesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF6EF" }}>
      <Navbar />
      <div className="pt-16">
        <Wishes />
      </div>
      <Footer />
    </main>
  )
}
