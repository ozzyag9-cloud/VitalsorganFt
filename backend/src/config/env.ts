import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv({ path: '../.env' });
loadEnv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url().default('postgres://postgres:postgres@localhost:5432/proof_of_life'),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  LOG_LEVEL: z.string().default('info'),
});

export const env = envSchema.parse(process.env);
