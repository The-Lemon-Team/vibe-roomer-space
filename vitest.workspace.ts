import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'frontend',
      include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    },
  },
  {
    test: {
      name: 'backend',
      environment: 'node',
      include: ['server/src/**/*.test.ts', 'server/src/**/*.spec.ts'],
    },
  },
]);
