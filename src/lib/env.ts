import { z } from 'zod'

/**
 * Environment variable schema validation
 *
 * This ensures all required environment variables are present and valid
 * at application startup, preventing runtime errors from missing configuration.
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Better Auth
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL must be a valid URL'),
  BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET is required'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  // Node Environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

/**
 * Parsed and validated environment variables
 *
 * Import this instead of using `process.env` directly to ensure type safety
 * and validation at runtime.
 */
export const env = envSchema.parse(process.env)

/**
 * Type for environment variables
 */
export type Env = z.infer<typeof envSchema>
