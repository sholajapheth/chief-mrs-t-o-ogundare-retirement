"use client"

import { useRef, useEffect, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { DriveNextImage } from "@/components/drive-next-image"
import { ZoomIn } from "lucide-react"

export type VirtualPhoto = {
  id: string
  name: string
}

type VirtualizedPhotoGridProps = {
  photos: VirtualPhoto[]
  onPhotoClick: (index: number) => void
}

const ROW_GAP = 16
const EST_ROW = 200

function useColumnCount() {
  const [cols, setCols] = useState(4)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCols(2)
      else if (w < 1024) setCols(3)
      else setCols(4)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return cols
}

export function VirtualizedPhotoGrid({
  photos,
  onPhotoClick,
}: VirtualizedPhotoGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const cols = useColumnCount()
  const rowCount = Math.ceil(photos.length / cols)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => EST_ROW + ROW_GAP,
    overscan: 4,
  })

  return (
    <div
      ref={parentRef}
      className="relative max-h-[min(85vh,1200px)] overflow-auto rounded-lg"
    >
      <div
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index
          const start = rowIndex * cols
          const rowPhotos = photos.slice(start, start + cols)

          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 w-full"
              style={{
                position: "absolute",
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {rowPhotos.map((photo, i) => {
                  const globalIndex = start + i
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl text-left shadow-md transition-all hover:shadow-xl"
                      onClick={() => onPhotoClick(globalIndex)}
                    >
                      <DriveNextImage
                        photoId={photo.id}
                        alt={photo.name}
                        size="800"
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={globalIndex < 4}
                        loading={globalIndex < 4 ? "eager" : "lazy"}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute right-4 top-4">
                          <ZoomIn className="size-6 text-white" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
