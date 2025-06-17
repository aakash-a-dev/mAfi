import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // Prevent code splitting for verification script
      }
    },
    minify: 'esbuild',
    sourcemap: true
  }
});