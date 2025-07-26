import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { coverageConfigDefaults } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      css: true,
      coverage: {
        exclude: ['**/index.ts', '**/main.tsx', 'src/components/**', '**/types/**', ...coverageConfigDefaults.exclude],
      },
      setupFiles: ['./src/test/vitest.setup.ts'],
    },
  })
);
