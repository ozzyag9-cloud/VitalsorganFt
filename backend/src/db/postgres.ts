import pg from 'pg';
import { env } from '../config/env.js';

export const pool = new pg.Pool({ connectionString: env.DATABASE_URL, max: 10, idleTimeoutMillis: 30_000 });

export async function checkPostgres() {
  const result = await pool.query<{ ok: number }>('select 1 as ok');
  return result.rows[0]?.ok === 1;
}
