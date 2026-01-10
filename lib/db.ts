import Database from "better-sqlite3"
import { join } from "path"
import { existsSync, mkdirSync } from "fs"

// Ensure data directory exists
const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const dbPath = join(dataDir, "wishes.db")

// Initialize database connection (singleton pattern for Next.js)
let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath)
    
    // Initialize the database schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS wishes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        relationship TEXT NOT NULL,
        message TEXT NOT NULL,
        location TEXT,
        timestamp TEXT NOT NULL,
        hearts INTEGER DEFAULT 0
      );
      
      CREATE INDEX IF NOT EXISTS idx_timestamp ON wishes(timestamp DESC);
    `)
  }
  return db
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
  const stmt = database.prepare("SELECT * FROM wishes ORDER BY timestamp DESC")
  return stmt.all() as Wish[]
}

export function addWish(wish: Omit<Wish, "id" | "timestamp" | "hearts">): Wish {
  const database = getDb()
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
  const now = new Date().toISOString()

  const stmt = database.prepare(`
    INSERT INTO wishes (id, name, relationship, message, location, timestamp, hearts)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `)

  stmt.run(id, wish.name, wish.relationship, wish.message, wish.location || null, now)

  const newWish: Wish = {
    id,
    ...wish,
    timestamp: now,
    hearts: 0,
  }

  return newWish
}

export function incrementWishHearts(id: string): Wish | null {
  const database = getDb()
  // SQLite doesn't support RETURNING in older versions, so we need to do it in two steps
  const updateStmt = database.prepare("UPDATE wishes SET hearts = hearts + 1 WHERE id = ?")
  updateStmt.run(id)
  
  const selectStmt = database.prepare("SELECT * FROM wishes WHERE id = ?")
  const result = selectStmt.get(id) as Wish | undefined
  return result || null
}

export function getWishById(id: string): Wish | null {
  const database = getDb()
  const stmt = database.prepare("SELECT * FROM wishes WHERE id = ?")
  const result = stmt.get(id) as Wish | undefined
  return result || null
}
