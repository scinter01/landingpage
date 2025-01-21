import { Pool } from "pg"

let pool: Pool

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      port: Number.parseInt(process.env.PGPORT || "5432", 10),
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  }
  return pool
}

