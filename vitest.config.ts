import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.spec.ts'],
    globals: true,
    root: './',
    hookTimeout: 1_000 * 60 * 60,
  },
  plugins: [swc.vite()],
});
