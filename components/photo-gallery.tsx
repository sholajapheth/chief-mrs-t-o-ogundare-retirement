"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface GoogleDrivePhoto {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
}

const categories = [
  { id: "all", label: "All Photos" },
  { id: "childhood", label: "Early Years" },
  { id: "career", label: "Career Journey" },
  { id: "family", label: "Family Moments" },
  { id: "recent", label: "Recent Photos" },
]

export function PhotoGallery() {
  const [photos, setPhotos] = useState<GoogleDrivePhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos")
        if (!response.ok) throw new Error("Failed to fetch photos")
        const data = await response.json()
        setPhotos(data)
      } catch (error) {
        console.error("[v0] Error loading photos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const filteredPhotos = photos

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
    } else {
      setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
    }
  }

  const getPhotoUrl = (photo: GoogleDrivePhoto, isFullSize: boolean = false): string => {
    const isHeic = photo.mimeType?.toLowerCase().includes('heic') || photo.mimeType?.toLowerCase().includes('heif')
    const isJpeg = photo.mimeType?.toLowerCase().includes('jpeg') || photo.mimeType?.toLowerCase().includes('jpg')
    const size = isFullSize ? "1920" : "800"
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'photo-gallery.tsx:69',message:'getPhotoUrl called',data:{photoId:photo.id,photoName:photo.name,mimeType:photo.mimeType,isHeic,isJpeg,hasThumbnailLink:!!photo.thumbnailLink,hasWebContentLink:!!photo.webContentLink,isFullSize},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Use API route for ALL images (not just HEIC) to ensure proper authentication
    // This fixes the issue where thumbnailLink URLs fail due to authentication requirements
    const url = `/api/photos/${photo.id}?size=${size}`
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'photo-gallery.tsx:76',message:'Using API route for image',data:{url,photoId:photo.id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return url
  }

  const getFallbackUrls = (photo: GoogleDrivePhoto, isFullSize: boolean = false): string[] => {
    const size = isFullSize ? "1920" : "800"
    const fallbacks: string[] = []
    
    // Try Google Drive thumbnail API
    fallbacks.push(`https://drive.google.com/thumbnail?id=${photo.id}&sz=w${size}-h${size}`)
    
    // Try direct view URL
    fallbacks.push(`https://drive.google.com/uc?export=view&id=${photo.id}`)
    
    // Try alternative view URL
    fallbacks.push(`https://drive.google.com/uc?id=${photo.id}`)
    
    return fallbacks
  }

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Memories</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">Photo Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual journey through 60 years of life, love, and legacy.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-6",
                activeCategory === category.id && "bg-primary text-primary-foreground",
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={getPhotoUrl(photo, false)}
                alt={photo.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                fallbackUrls={getFallbackUrls(photo, false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{photo.name}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={() => navigateLightbox("prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={() => navigateLightbox("next")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="max-w-4xl max-h-[80vh] mx-4">
              <div className="relative w-full">
                <ImageWithFallback
                  src={getPhotoUrl(filteredPhotos[currentPhotoIndex], true)}
                  alt={filteredPhotos[currentPhotoIndex].name}
                  className="max-w-full max-h-[70vh] mx-auto rounded-lg"
                  fallbackUrls={getFallbackUrls(filteredPhotos[currentPhotoIndex], true)}
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-white font-medium">{filteredPhotos[currentPhotoIndex].name}</p>
                <p className="text-white/60 text-sm mt-1">
                  {currentPhotoIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No photos found. Please check your Google Drive folder.</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
