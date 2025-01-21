import { NextResponse } from "next/server"
import { getPool } from "@/lib/db"

export async function GET(request: Request) {
  const pool = getPool()
  try {
    const result = await pool.query("SELECT * FROM subscriptions ORDER BY created_at DESC")
    return NextResponse.json({ subscriptions: result.rows }, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

