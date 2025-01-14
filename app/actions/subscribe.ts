'use server'

import { z } from 'zod';
import pool from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  interest: z.string().min(1, "Please select an area of interest"),
});

export async function subscribeUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    interest: formData.get('interest'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, interest } = validatedFields.data;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const insertQuery = `
        INSERT INTO subscriptions (name, email, interest)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE
        SET name = EXCLUDED.name, interest = EXCLUDED.interest, updated_at = NOW()
      `;
      await client.query(insertQuery, [name, email, interest]);
      await client.query('COMMIT');
      
      // Send welcome email
      const firstName = name.split(' ')[0];
      await sendWelcomeEmail(email, firstName);

      return { success: true };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Failed to subscribe:', error);
      return { error: 'Failed to subscribe. Please try again.' };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return { error: 'Database connection failed. Please try again later.' };
  }
}

