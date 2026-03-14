import Navbar from "@/components/sections/Navbar"
import Tributes from "@/components/sections/Tributes"
import { Footer } from "@/components/sections/Footer"

export default function MessagesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF6EF" }}>
      <Navbar />
      <div className="pt-16">
        <Tributes />
      </div>
      <Footer />
    </main>
  )
}
