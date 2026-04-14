"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { DriveNextImage } from "@/components/drive-next-image";
import { VirtualizedPhotoGrid } from "@/components/virtualized-photo-grid";

interface GoogleDrivePhoto {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink?: string;
  webContentLink?: string;
  mimeType: string;
}

const VIRTUAL_THRESHOLD = 50;

function PhotoSkeleton() {
  return (
    <div className="aspect-square w-full animate-pulse rounded-xl bg-[#C19A6B]/35" />
  );
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<GoogleDrivePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("[photo-gallery] Error loading photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = photos;

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? filteredPhotos.length - 1 : prev - 1
      );
    } else {
      setCurrentPhotoIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Memories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">
            Photo Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual journey through 35 years of service, love, and legacy.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <PhotoSkeleton key={i} />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No photos found. Please check your Google Drive folder.
            </p>
          </div>
        ) : filteredPhotos.length > VIRTUAL_THRESHOLD ? (
          <VirtualizedPhotoGrid
            photos={filteredPhotos}
            onPhotoClick={openLightbox}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl text-left shadow-md transition-all hover:shadow-xl"
                onClick={() => openLightbox(index)}
              >
                <DriveNextImage
                  photoId={photo.id}
                  alt={photo.name}
                  size="800"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute top-4 right-4">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {lightboxOpen && filteredPhotos[currentPhotoIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
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

            <div className="max-w-4xl max-h-[80vh] mx-4 w-full">
              <div className="relative mx-auto h-[min(70vh,900px)] w-full">
                <DriveNextImage
                  photoId={filteredPhotos[currentPhotoIndex].id}
                  alt={filteredPhotos[currentPhotoIndex].name}
                  size="1920"
                  fill
                  sizes="100vw"
                  objectFit="contain"
                  className="rounded-lg"
                  priority
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm mt-1">
                  {currentPhotoIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
