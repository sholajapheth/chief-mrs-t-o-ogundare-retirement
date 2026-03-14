"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/image-with-fallback";

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
}

const PREVIEW_LIMIT = 20;

function buildFallbackUrls(photoId: string): string[] {
  return [
    `https://drive.google.com/thumbnail?id=${photoId}&sz=w800-h800`,
    `https://drive.google.com/uc?export=view&id=${photoId}`,
  ];
}

export default function Gallery({ preview = false }: GalleryProps) {
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

  const photos = preview ? allPhotos.slice(0, PREVIEW_LIMIT) : allPhotos;
  const hasMore = preview && allPhotos.length > PREVIEW_LIMIT;

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
        {/* Heading */}
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
            Àwọn Àwòrán Rẹ̀
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

        {/* Intro */}
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2
              className="animate-spin"
              size={40}
              style={{ color: "#D4A017" }}
            />
          </div>
        )}

        {/* Empty */}
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

        {/* Masonry grid */}
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
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={`/api/photos/${photo.id}?size=800`}
                      alt={photo.name}
                      fallbackUrls={buildFallbackUrls(photo.id)}
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

      {/* Lightbox */}
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
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full transition-opacity hover:opacity-70"
              aria-label="Close lightbox"
            >
              <X size={28} style={{ color: "#EDD9BE" }} />
            </button>

            {/* Previous */}
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

            {/* Next */}
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

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full px-12 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={`/api/photos/${photos[lightboxIndex].id}?size=1920`}
                alt={photos[lightboxIndex].name}
                fallbackUrls={buildFallbackUrls(photos[lightboxIndex].id)}
                className="w-full max-h-[80vh] object-contain rounded-lg mx-auto block"
              />
            </motion.div>

            {/* Counter */}
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
