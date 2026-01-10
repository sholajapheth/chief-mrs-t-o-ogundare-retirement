import { incrementWishHearts } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const wish = incrementWishHearts(id)

    if (!wish) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 })
    }

    return NextResponse.json(wish)
  } catch (error) {
    console.error("Error incrementing hearts:", error)
    return NextResponse.json({ error: "Failed to increment hearts" }, { status: 500 })
  }
}
