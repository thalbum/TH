import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  publicDir: 'public',
  build: { outDir: 'output/netlify', emptyOutDir: true, assetsInlineLimit: 0 },
  server: { host: true, fs: { allow: ['.'] } }
});
