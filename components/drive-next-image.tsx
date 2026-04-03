"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import { ImageOff } from "lucide-react"
import { buildDriveImageFallbackUrls } from "@/lib/drive-image-fallbacks"
import { cn } from "@/lib/utils"

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

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
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
      >
        <div className="text-center p-4">
          <ImageOff className="mx-auto mb-2 size-8 opacity-50" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    )
  }

  const src = candidates[candidateIndex]

  if (fill) {
    return (
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        style={{ objectFit }}
        onError={onError}
        priority={priority}
        loading={priority ? "eager" : loading}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
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
      style={{ objectFit }}
      onError={onError}
      priority={priority}
      loading={priority ? "eager" : loading}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      unoptimized
    />
  )
}
