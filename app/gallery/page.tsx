import Navbar from "@/components/sections/Navbar"
import Gallery from "@/components/sections/Gallery"
import { Footer } from "@/components/sections/Footer"

export default function GalleryPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF6EF" }}>
      <Navbar />
      <div className="pt-16">
        <Gallery />
      </div>
      <Footer />
    </main>
  )
}
