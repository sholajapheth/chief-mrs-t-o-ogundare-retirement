import { Navigation } from "@/components/navigation"
import { PhotoGallery } from "@/components/photo-gallery"
import { Footer } from "@/components/footer"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PhotoGallery />
      <Footer />
    </main>
  )
}
