"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DriveNextImage } from "@/components/drive-next-image";

interface Photo {
  id: string;
  name: string;
  webViewLink: string;
  thumbnailLink?: string;
  webContentLink?: string;
  mimeType: string;
}

interface GalleryProps {
  preview?: boolean;
  /** Max photos when `preview` is true (default 20). Use a lower value on the home page to shorten the section. */
  previewLimit?: number;
}

const DEFAULT_PREVIEW_LIMIT = 20;

function PhotoSkeleton() {
  return (
    <div
      className="mb-4 w-full animate-pulse rounded-lg bg-[#5C5040]/40"
      style={{ aspectRatio: "4/3", breakInside: "avoid" as const }}
    />
  );
}

export default function Gallery({
  preview = false,
  previewLimit = DEFAULT_PREVIEW_LIMIT,
}: GalleryProps) {
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/photos");
        if (!res.ok) throw new Error("Failed to fetch photos");
        const data: Photo[] = await res.json();
        setAllPhotos(data);
      } catch {
        setAllPhotos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  const photos = preview
    ? allPhotos.slice(0, previewLimit)
    : allPhotos;
  const hasMore = preview && allPhotos.length > previewLimit;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }, [lightboxIndex, photos.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }, [lightboxIndex, photos.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <section
      id="gallery"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#3B1C08" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-accent), cursive",
              color: "#D4A017",
            }}
          >
            Her photos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-2 text-lg italic"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#EDD9BE",
            }}
          >
            Her Portraits
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center max-w-2xl mx-auto mb-14 text-base sm:text-lg italic leading-relaxed"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            color: "#EDD9BE",
          }}
        >
          35 years leave a trail of photographs — each one a chapter.
        </motion.p>

        {loading && (
          <div className="gallery-masonry-skel columns-1 gap-4 sm:columns-2 lg:columns-3">
            <style>{`
              .gallery-masonry-skel { column-gap: 1rem; }
            `}</style>
            {Array.from({
              length: preview
                ? Math.min(previewLimit, 12)
                : 9,
            }).map((_, i) => (
              <PhotoSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && photos.length === 0 && (
          <p
            className="text-center py-20 text-lg"
            style={{
              fontFamily: "var(--font-body), Georgia, serif",
              color: "#EDD9BE",
            }}
          >
            No photos found
          </p>
        )}

        {!loading && photos.length > 0 && (
          <>
            <style>{`
              .gallery-masonry { columns: 1; column-gap: 1rem; }
              @media (min-width: 640px) {
                .gallery-masonry { columns: 2; }
              }
              @media (min-width: 1024px) {
                .gallery-masonry { columns: 3; }
              }
            `}</style>
            <div className="gallery-masonry">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
                  className="mb-4 rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    breakInside: "avoid",
                    border: "3px solid rgba(212, 160, 23, 0.4)",
                    boxShadow: "inset 0 0 20px rgba(59, 28, 8, 0.4)",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(212, 160, 23, 1.0)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(212, 160, 23, 0.4)";
                  }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative w-full overflow-hidden">
                    <DriveNextImage
                      photoId={photo.id}
                      alt={photo.name}
                      size="800"
                      width={800}
                      height={600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 4}
                      loading={index < 4 ? "eager" : "lazy"}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 text-center">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-medium transition-colors no-underline hover:bg-[rgba(212,160,23,0.1)]"
                  style={{
                    borderColor: "#D4A017",
                    color: "#D4A017",
                    fontFamily: "var(--font-display), Georgia, serif",
                  }}
                >
                  View All Photos
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(59, 28, 8, 0.95)" }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full transition-opacity hover:opacity-70"
              aria-label="Close lightbox"
            >
              <X size={28} style={{ color: "#EDD9BE" }} />
            </button>

            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-opacity hover:opacity-70"
                aria-label="Previous photo"
              >
                <ChevronLeft size={36} style={{ color: "#EDD9BE" }} />
              </button>
            )}

            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-opacity hover:opacity-70"
                aria-label="Next photo"
              >
                <ChevronRight size={36} style={{ color: "#EDD9BE" }} />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mx-auto h-[min(80vh,900px)] w-full">
                <DriveNextImage
                  photoId={photos[lightboxIndex].id}
                  alt={photos[lightboxIndex].name}
                  size="1920"
                  fill
                  sizes="100vw"
                  objectFit="contain"
                  className="rounded-lg"
                  priority
                />
              </div>
            </motion.div>

            <p
              className="mt-4 text-lg"
              style={{
                fontFamily: "var(--font-accent), cursive",
                color: "#D4A017",
              }}
            >
              {lightboxIndex + 1} of {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
