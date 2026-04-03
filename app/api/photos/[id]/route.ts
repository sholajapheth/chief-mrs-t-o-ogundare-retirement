import { GOOGLE_DRIVE_API_KEY } from "@/lib/google-drive"

const CACHE_CONTROL =
  "public, max-age=86400, stale-while-revalidate=3600"

function isLikelyImageResponse(
  contentType: string | null,
  blobType: string,
  size: number
): boolean {
  if (contentType?.includes("text/html")) return false
  if (contentType?.startsWith("image/")) return true
  if (blobType.startsWith("image/")) return true
  return size > 256
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fileId = id
    const searchParams = new URL(request.url).searchParams
    const size = searchParams.get("size") ?? "1920"
    const apiKey = GOOGLE_DRIVE_API_KEY || process.env.GOOGLE_DRIVE_API_KEY

    if (!apiKey) {
      return new Response("API key not configured", { status: 500 })
    }

    const attempts: (() => Promise<Response>)[] = [
      () =>
        fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}/thumbnail?sz=w${size}-h${size}&key=${apiKey}`,
          {
            redirect: "follow",
            headers: { Accept: "image/*" },
          }
        ),
      () =>
        fetch(
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}-h${size}`,
          { redirect: "follow", headers: { Accept: "image/*" } }
        ),
      () =>
        fetch(`https://drive.google.com/uc?export=view&id=${fileId}`, {
          redirect: "follow",
          headers: { Accept: "image/*" },
        }),
      () =>
        fetch(`https://lh3.googleusercontent.com/d/${fileId}=w${size}`, {
          redirect: "follow",
          headers: { Accept: "image/*" },
        }),
    ]

    for (const attempt of attempts) {
      try {
        const res = await attempt()
        if (!res.ok) continue

        const contentType = res.headers.get("content-type")
        const imageBlob = await res.blob()

        if (
          !isLikelyImageResponse(
            contentType,
            imageBlob.type,
            imageBlob.size
          )
        ) {
          continue
        }

        const outType =
          contentType?.startsWith("image/") || imageBlob.type.startsWith("image/")
            ? contentType || imageBlob.type || "image/jpeg"
            : imageBlob.type || contentType || "image/jpeg"

        return new Response(imageBlob, {
          headers: {
            "Content-Type": outType.split(";")[0].trim(),
            "Cache-Control": CACHE_CONTROL,
          },
        })
      } catch {
        continue
      }
    }

    return new Response("Image not found", { status: 404 })
  } catch (error) {
    console.error("[api/photos/[id]] Error fetching image:", error)
    return new Response("Failed to fetch image", { status: 500 })
  }
}
