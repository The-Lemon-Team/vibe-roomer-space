import { defineConfig } from 'prisma/config';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';

// Prefer repo-root .env, then server/.env (local-first).
loadEnv({ path: resolve(__dirname, '../.env') });
loadEnv({ path: resolve(__dirname, '.env') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrate: {
    async adapter() {
      const { Pool } = await import('pg');
      const { PrismaPg } = await import('@prisma/adapter-pg');

      // DIRECT_URL is only needed for pooled hosts (e.g. Supabase).
      // Local Postgres uses DATABASE_URL alone.
      const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

      if (!connectionString) {
        throw new Error(
          'Neither DIRECT_URL nor DATABASE_URL environment variable is set. ' +
            'Please set at least DATABASE_URL in your .env file (see .env.example).',
        );
      }

      const pool = new Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
});
