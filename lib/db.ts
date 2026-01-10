interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: string
  hearts: number
}

const wishes: Wish[] = []

export function getAllWishes(): Wish[] {
  return wishes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function addWish(wish: Omit<Wish, "id" | "timestamp" | "hearts">): Wish {
  const id = Date.now().toString()
  const now = new Date().toISOString()

  const newWish: Wish = {
    id,
    ...wish,
    timestamp: now,
    hearts: 0,
  }

  wishes.push(newWish)
  return newWish
}

export function incrementWishHearts(id: string): Wish | null {
  const wish = wishes.find((w) => w.id === id)
  if (wish) {
    wish.hearts += 1
  }
  return wish || null
}

export type { Wish }
