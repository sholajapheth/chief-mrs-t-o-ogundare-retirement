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
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'image-with-fallback.tsx:handleError',message:'Image load error',data:{currentSrc,errorCount,fallbackUrlsCount:fallbackUrls.length,alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (errorCount < fallbackUrls.length) {
      // Try next fallback URL
      const nextUrl = fallbackUrls[errorCount]
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'image-with-fallback.tsx:handleError',message:'Trying fallback URL',data:{nextUrl,fallbackIndex:errorCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      setCurrentSrc(nextUrl)
      setErrorCount((prev) => prev + 1)
    } else {
      // All fallbacks exhausted, show placeholder
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/9c7e7409-d0f2-4206-bdde-4028020ae789',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'image-with-fallback.tsx:handleError',message:'All fallbacks exhausted',data:{alt},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
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
