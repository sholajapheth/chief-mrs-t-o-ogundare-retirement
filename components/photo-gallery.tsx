"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const categories = [
  { id: "all", label: "All Photos" },
  { id: "childhood", label: "Early Years" },
  { id: "career", label: "Career Journey" },
  { id: "family", label: "Family Moments" },
  { id: "recent", label: "Recent Photos" },
]

const photos = [
  {
    id: 1,
    src: "/vintage-nigerian-family-photo-1970s-with-children.jpg",
    category: "childhood",
    caption: "Young Yemisi with family, Lagos 1970s",
  },
  {
    id: 2,
    src: "/nigerian-woman-graduation-ceremony-university-conv.jpg",
    category: "career",
    caption: "University of Ibadan Graduation, 1990",
  },
  {
    id: 3,
    src: "/nigerian-family-portrait-elegant-traditional-attir.jpg",
    category: "family",
    caption: "Family Portrait - The Ayinde Family",
  },
  {
    id: 4,
    src: "/nigerian-woman-teacher-classroom-students-interact.jpg",
    category: "career",
    caption: "Teaching at Iganmode Grammar School",
  },
  {
    id: 5,
    src: "/nigerian-woman-in-traditional-aso-oke-formal-event.jpg",
    category: "recent",
    caption: "Special Celebration, 2024",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    category: "family",
    caption: "Wedding Anniversary Celebration",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    category: "career",
    caption: "Award Recognition Ceremony",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=800&width=600",
    category: "career",
    caption: "PhD Graduation, 2012",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800",
    category: "recent",
    caption: "Living Faith Church Fellowship",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=600&width=800",
    category: "family",
    caption: "Grandchildren - Our Greatest Joy",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=800&width=600",
    category: "career",
    caption: "With Students at Anglican Grammar School",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=800",
    category: "recent",
    caption: "Birthday Celebration, 2025",
  },
]

export function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const filteredPhotos = activeCategory === "all" ? photos : photos.filter((p) => p.category === activeCategory)

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
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{photo.caption}</p>
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
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={filteredPhotos[currentPhotoIndex].src || "/placeholder.svg"}
                  alt={filteredPhotos[currentPhotoIndex].caption}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-white font-medium">{filteredPhotos[currentPhotoIndex].caption}</p>
                <p className="text-white/60 text-sm mt-1">
                  {currentPhotoIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
