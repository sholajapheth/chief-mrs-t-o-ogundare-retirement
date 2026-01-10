import { neon } from "@neondatabase/serverless"

export interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: string
  hearts: number
}

// Initialize Neon Postgres connection
let sql: any = null
let schemaInitialized = false

function getSql() {
  if (!sql) {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    if (!connectionString) {
      console.warn("No Postgres connection string found. Using in-memory storage (data will not persist).")
      return null
    }
    sql = neon(connectionString)
  }
  return sql
}

async function ensureSchema() {
  if (schemaInitialized) return
  
  const db = getSql()
  if (!db) return
  
  try {
    await db`
      CREATE TABLE IF NOT EXISTS wishes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        relationship TEXT NOT NULL,
        message TEXT NOT NULL,
        location TEXT,
        timestamp TEXT NOT NULL,
        hearts INTEGER DEFAULT 0
      )
    `
    
    // Create index (PostgreSQL doesn't support IF NOT EXISTS for indexes, so we'll catch the error)
    try {
      await db`
        CREATE INDEX idx_timestamp ON wishes(timestamp DESC)
      `
    } catch (error: any) {
      // Index might already exist, which is fine
      if (!error.message?.includes("already exists")) {
        throw error
      }
    }
    
    schemaInitialized = true
  } catch (error) {
    console.error("Error initializing database schema:", error)
  }
}

// In-memory fallback for local development without database
let inMemoryWishes: Wish[] = []

export async function getAllWishes(): Promise<Wish[]> {
  const db = getSql()
  
  if (db) {
    try {
      await ensureSchema()
      const result = await db`
        SELECT * FROM wishes 
        ORDER BY timestamp DESC
      `
      return result as Wish[]
    } catch (error) {
      console.error("Error reading from Postgres, falling back to in-memory:", error)
      return [...inMemoryWishes].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    }
  }
  
  // In-memory fallback
  return [...inMemoryWishes].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

export async function addWish(wish: Omit<Wish, "id" | "timestamp" | "hearts">): Promise<Wish> {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
  const now = new Date().toISOString()

  const newWish: Wish = {
    id,
    ...wish,
    timestamp: now,
    hearts: 0,
  }

  const db = getSql()
  
  if (db) {
    try {
      await ensureSchema()
      await db`
        INSERT INTO wishes (id, name, relationship, message, location, timestamp, hearts)
        VALUES (${id}, ${wish.name}, ${wish.relationship}, ${wish.message}, ${wish.location || null}, ${now}, 0)
      `
    } catch (error) {
      console.error("Error writing to Postgres, falling back to in-memory:", error)
      inMemoryWishes.push(newWish)
    }
  } else {
    // In-memory fallback
    inMemoryWishes.push(newWish)
  }

  return newWish
}

export async function incrementWishHearts(id: string): Promise<Wish | null> {
  const db = getSql()
  
  if (db) {
    try {
      await ensureSchema()
      await db`
        UPDATE wishes 
        SET hearts = hearts + 1 
        WHERE id = ${id}
      `
      
      const result = await db`
        SELECT * FROM wishes 
        WHERE id = ${id}
      `
      return (result[0] as Wish) || null
    } catch (error) {
      console.error("Error updating Postgres, falling back to in-memory:", error)
      const wish = inMemoryWishes.find(w => w.id === id)
      if (wish) {
        wish.hearts += 1
        return { ...wish }
      }
      return null
    }
  }
  
  // In-memory fallback
  const wish = inMemoryWishes.find(w => w.id === id)
  if (wish) {
    wish.hearts += 1
    return { ...wish }
  }
  return null
}

export async function getWishById(id: string): Promise<Wish | null> {
  const db = getSql()
  
  if (db) {
    try {
      await ensureSchema()
      const result = await db`
        SELECT * FROM wishes 
        WHERE id = ${id}
      `
      return (result[0] as Wish) || null
    } catch (error) {
      console.error("Error reading from Postgres, falling back to in-memory:", error)
      const wish = inMemoryWishes.find(w => w.id === id)
      return wish ? { ...wish } : null
    }
  }
  
  // In-memory fallback
  const wish = inMemoryWishes.find(w => w.id === id)
  return wish ? { ...wish } : null
}
