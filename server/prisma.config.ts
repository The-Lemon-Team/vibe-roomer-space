import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  migrate: {
    async adapter() {
      const { Pool } = await import('pg');
      const { PrismaPg } = await import('@prisma/adapter-pg');

      // DIRECT_URL is the non-pooled connection required for Prisma Migrate.
      // Falls back to DATABASE_URL if DIRECT_URL is not set.
      const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

      if (!connectionString) {
        throw new Error(
          'Neither DIRECT_URL nor DATABASE_URL environment variable is set. ' +
          'Please set at least DATABASE_URL in your .env file.',
        );
      }

      const pool = new Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
});
