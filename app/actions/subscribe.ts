"use server"

import { z } from "zod"
import { getPool } from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  interests: z.string().min(1, "Please select at least one area of interest"),
  stem_subjects: z.string().optional(),
})

export async function subscribeUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    interests: formData.get("interests"),
    stem_subjects: formData.get("stem_subjects"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { name, email, interests, stem_subjects } = validatedFields.data

  const pool = getPool()
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    const insertQuery = `
      INSERT INTO subscriptions (name, email, interests, stem_subjects)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE
      SET name = EXCLUDED.name, interests = EXCLUDED.interests, stem_subjects = EXCLUDED.stem_subjects, updated_at = NOW()
    `
    await client.query(insertQuery, [name, email, interests, stem_subjects || null])
    await client.query("COMMIT")

    // Send welcome email
    const firstName = name.split(" ")[0]
    await sendWelcomeEmail(email, firstName)

    return { success: true }
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Failed to subscribe:", error)
    return { error: "Failed to subscribe. Please try again." }
  } finally {
    client.release()
  }
}

