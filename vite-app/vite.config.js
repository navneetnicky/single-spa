import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
    origin: 'http://localhost:5173',
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        format: 'system',
        entryFileNames: 'myapp-vite.js',
      },
      preserveEntrySignatures: 'strict',
      external: ['single-spa'],  // Only single-spa is external, React will be bundled
    },
    outDir: 'dist',
    minify: false,
    watch: {},
  },
  preview: {
    port: 5173,
    cors: true,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  base: '/',
});
