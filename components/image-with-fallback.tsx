"use client"

import { useState, useCallback, useMemo } from "react"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { buildDriveImageFallbackUrls } from "@/lib/drive-image-fallbacks"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackUrls?: string[]
  /** When set, appends Drive thumbnail / lh3 / uc fallbacks after `fallbackUrls`. */
  drivePhotoId?: string
  driveSize?: string
  onError?: () => void
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackUrls = [],
  drivePhotoId,
  driveSize = "800",
  onError,
}: ImageWithFallbackProps) {
  const effectiveFallbacks = useMemo(() => {
    const list = [...fallbackUrls]
    if (drivePhotoId) {
      list.push(...buildDriveImageFallbackUrls(drivePhotoId, driveSize))
    }
    return list
  }, [fallbackUrls, drivePhotoId, driveSize])

  const [currentSrc, setCurrentSrc] = useState(src)
  const [errorCount, setErrorCount] = useState(0)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    if (errorCount < effectiveFallbacks.length) {
      const nextUrl = effectiveFallbacks[errorCount]
      setCurrentSrc(nextUrl)
      setErrorCount((prev) => prev + 1)
    } else {
      setHasError(true)
      onError?.()
    }
  }, [errorCount, effectiveFallbacks, onError])

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
      >
        <div className="text-center p-4">
          <ImageOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  )
}
