import Database from "better-sqlite3"
import path from "path"

let db: Database.Database | null = null

export function getDb() {
  if (!db) {
    const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "wishes.db")
    db = new Database(dbPath)
    db.pragma("journal_mode = WAL")
    initializeDatabase()
  }
  return db
}

function initializeDatabase() {
  const database = getDb()

  database.exec(`
    CREATE TABLE IF NOT EXISTS wishes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      relationship TEXT NOT NULL,
      message TEXT NOT NULL,
      location TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      hearts INTEGER DEFAULT 0
    )
  `)
}

export interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: string
  hearts: number
}

export function getAllWishes(): Wish[] {
  const database = getDb()
  return database.prepare("SELECT * FROM wishes ORDER BY timestamp DESC").all() as Wish[]
}

export function addWish(wish: Omit<Wish, "id" | "timestamp" | "hearts">): Wish {
  const database = getDb()
  const id = Date.now().toString()
  const now = new Date().toISOString()

  database
    .prepare(
      "INSERT INTO wishes (id, name, relationship, message, location, timestamp, hearts) VALUES (?, ?, ?, ?, ?, ?, 0)",
    )
    .run(id, wish.name, wish.relationship, wish.message, wish.location || null, now)

  return {
    id,
    ...wish,
    timestamp: now,
    hearts: 0,
  }
}

export function incrementWishHearts(id: string): Wish | null {
  const database = getDb()
  database.prepare("UPDATE wishes SET hearts = hearts + 1 WHERE id = ?").run(id)
  return database.prepare("SELECT * FROM wishes WHERE id = ?").get(id) as Wish | null
}
