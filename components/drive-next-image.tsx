"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import { ImageOff } from "lucide-react"
import { buildDriveImageFallbackUrls } from "@/lib/drive-image-fallbacks"
import { cn } from "@/lib/utils"

/** Warm loading surface (espresso) — matches gallery / celebration UI; avoids cold blue-gray blur. */
const PLACEHOLDER_BG = "#3B1C08"

type DriveNextImageProps = {
  photoId: string
  alt: string
  size: "800" | "1920"
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  objectFit?: "cover" | "contain"
}

export function DriveNextImage({
  photoId,
  alt,
  size,
  className,
  priority = false,
  loading = "lazy",
  fill,
  width = 400,
  height = 300,
  sizes = "(max-width: 768px) 50vw, 25vw",
  objectFit = "cover",
}: DriveNextImageProps) {
  const [candidateIndex, setCandidateIndex] = useState(0)
  const candidates = [
    `/api/photos/${photoId}?size=${size}`,
    ...buildDriveImageFallbackUrls(photoId, size),
  ]

  const onError = useCallback(() => {
    setCandidateIndex((i) => i + 1)
  }, [])

  if (candidateIndex >= candidates.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-[#C19A6B]",
          className
        )}
        style={{ backgroundColor: PLACEHOLDER_BG }}
      >
        <div className="text-center p-4">
          <ImageOff className="mx-auto mb-2 size-8 opacity-50" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    )
  }

  const src = candidates[candidateIndex]

  const loadingStyle = {
    objectFit,
    backgroundColor: PLACEHOLDER_BG,
  } as const

  if (fill) {
    return (
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        style={loadingStyle}
        onError={onError}
        priority={priority}
        loading={priority ? "eager" : loading}
        placeholder="empty"
        unoptimized
      />
    )
  }

  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      style={loadingStyle}
      onError={onError}
      priority={priority}
      loading={priority ? "eager" : loading}
      placeholder="empty"
      unoptimized
    />
  )
}
