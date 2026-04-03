import { NextResponse } from "next/server"
import { listGoogleDrivePhotos } from "@/lib/google-drive"

export async function GET() {
  try {
    const photos = await listGoogleDrivePhotos()
    return NextResponse.json(photos, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("[api/photos] Error fetching photos:", error)
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    )
  }
}
