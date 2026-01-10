"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface GoogleDrivePhoto {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
}

export function PhotoPreview() {
  const [photos, setPhotos] = useState<GoogleDrivePhoto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos")
        if (!response.ok) throw new Error("Failed to fetch photos")
        const data = await response.json()
        // Only take the first 15 photos
        setPhotos(data.slice(0, 15))
      } catch (error) {
        console.error("[v0] Error loading photos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const getPhotoUrl = (photo: GoogleDrivePhoto): string => {
    const isHeic = photo.mimeType?.toLowerCase().includes('heic') || photo.mimeType?.toLowerCase().includes('heif')
    const isJpeg = photo.mimeType?.toLowerCase().includes('jpeg') || photo.mimeType?.toLowerCase().includes('jpg')
    const size = "800"
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'photo-preview.tsx:getPhotoUrl',message:'getPhotoUrl called',data:{photoId:photo.id,photoName:photo.name,mimeType:photo.mimeType,isHeic,isJpeg,hasThumbnailLink:!!photo.thumbnailLink,hasWebContentLink:!!photo.webContentLink},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Use API route for ALL images (not just HEIC) to ensure proper authentication
    // This fixes the issue where thumbnailLink URLs fail due to authentication requirements
    const url = `/api/photos/${photo.id}?size=${size}`
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'photo-preview.tsx:getPhotoUrl',message:'Using API route for image',data:{url,photoId:photo.id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return url
  }

  const getFallbackUrls = (photo: GoogleDrivePhoto): string[] => {
    const fallbacks: string[] = []
    
    // Try Google Drive thumbnail API
    fallbacks.push(`https://drive.google.com/thumbnail?id=${photo.id}&sz=w800-h800`)
    
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No photos found. Please check your Google Drive folder.</p>
          </div>
        ) : (
          <>
            {/* Photo Grid - Limited to 15 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <ImageWithFallback
                    src={getPhotoUrl(photo)}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    fallbackUrls={getFallbackUrls(photo)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center">
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="group">
                  View All Photos
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
