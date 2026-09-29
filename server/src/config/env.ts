import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: process.env.ENV_FILE || '../.env' })

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  SESSION_DAYS: z.coerce.number().int().positive().default(30),
})

export const env = schema.parse(process.env)
