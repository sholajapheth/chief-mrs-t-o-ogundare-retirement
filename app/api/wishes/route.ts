import { getAllWishes, addWish } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const wishes = await getAllWishes()
    return NextResponse.json(wishes)
  } catch (error) {
    console.error("Error fetching wishes:", error)
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, relationship, message, location } = body

    if (!name || !relationship || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const wish = await addWish({
      name,
      relationship,
      message,
      location: location || undefined,
    })

    return NextResponse.json(wish, { status: 201 })
  } catch (error) {
    console.error("Error creating wish:", error)
    return NextResponse.json({ error: "Failed to create wish" }, { status: 500 })
  }
}
