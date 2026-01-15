import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
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
      external: ['react', 'react-dom', 'react-dom/client', 'single-spa'],
    },
    outDir: 'dist',
    minify: false,
  },
  preview: {
    port: 5173,
    cors: true,
    strictPort: true,
  },
  base: 'http://localhost:5173/',
});
