"use client"

import { useState, useCallback } from "react"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackUrls?: string[]
  onError?: () => void
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackUrls = [],
  onError,
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [errorCount, setErrorCount] = useState(0)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    if (errorCount < fallbackUrls.length) {
      // Try next fallback URL
      const nextUrl = fallbackUrls[errorCount]
      setCurrentSrc(nextUrl)
      setErrorCount((prev) => prev + 1)
    } else {
      // All fallbacks exhausted, show placeholder
      setHasError(true)
      if (onError) {
        onError()
      }
    }
  }, [errorCount, fallbackUrls, onError, currentSrc, alt])

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
