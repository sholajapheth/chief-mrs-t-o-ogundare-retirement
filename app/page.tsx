import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import EventCountdownSection from "@/components/sections/EventCountdownSection";
import BioCitation from "@/components/sections/BioCitation";
import CareerTimeline from "@/components/sections/CareerTimeline";
import { ProgramTimeline } from "@/components/program-timeline";
import SchoolsServed from "@/components/sections/SchoolsServed";
import Achievements from "@/components/sections/Achievements";
import Tributes from "@/components/sections/Tributes";
import Gallery from "@/components/sections/Gallery";
import Wishes from "@/components/sections/Wishes";
import { Footer } from "@/components/sections/Footer";
import { AdireDivider } from "@/components/ui/AdireDivider";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAF6EF" }}>
      <Navbar />
      <Hero />
      <AdireDivider />
      <EventCountdownSection />
      <AdireDivider />
      <BioCitation />
      <AdireDivider />
      <CareerTimeline />
      <AdireDivider />
      <ProgramTimeline />
      <AdireDivider />
      <SchoolsServed />
      <AdireDivider />
      <Achievements />
      <AdireDivider />
      <Tributes />
      <AdireDivider />
      <Wishes preview />
      <AdireDivider />
      <Gallery preview previewLimit={8} />
      <AdireDivider />
      <Footer />
    </main>
  );
}
