import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import BioCitation from "@/components/sections/BioCitation"
import CareerTimeline from "@/components/sections/CareerTimeline"
import SchoolsServed from "@/components/sections/SchoolsServed"
import Achievements from "@/components/sections/Achievements"
import Tributes from "@/components/sections/Tributes"
import Gallery from "@/components/sections/Gallery"
import Wishes from "@/components/sections/Wishes"
import { Footer } from "@/components/sections/Footer"
import { AdireDivider } from "@/components/ui/AdireDivider"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF6EF" }}>
      <Navbar />
      <Hero />
      <AdireDivider />
      <BioCitation />
      <AdireDivider />
      <CareerTimeline />
      <AdireDivider />
      <SchoolsServed />
      <AdireDivider />
      <Achievements />
      <AdireDivider />
      <Tributes />
      <AdireDivider />
      <Gallery preview />
      <AdireDivider />
      <Wishes preview />
      <AdireDivider />
      <Footer />
    </main>
  )
}
