import { listGoogleDrivePhotos } from "@/lib/google-drive"

export async function GET() {
  try {
    const photos = await listGoogleDrivePhotos()
    return Response.json(photos)
  } catch (error) {
    console.error("[v0] Error fetching photos:", error)
    return Response.json({ error: "Failed to fetch photos" }, { status: 500 })
  }
}
