"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DriveNextImage } from "@/components/drive-next-image"

interface GoogleDrivePhoto {
  id: string
  name: string
  webViewLink: string
  thumbnailLink?: string
  webContentLink?: string
  mimeType: string
}

function PhotoSkeleton() {
  return (
    <div className="aspect-square w-full animate-pulse rounded-xl bg-[#C19A6B]/35" />
  )
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
        setPhotos(data.slice(0, 15))
      } catch (error) {
        console.error("[photo-preview] Error loading photos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Memories</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">Photo Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual journey through 35 years of service, love, and legacy.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <PhotoSkeleton key={i} />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No photos found. Please check your Google Drive folder.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl"
                >
                  <DriveNextImage
                    photoId={photo.id}
                    alt={photo.name}
                    size="800"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
