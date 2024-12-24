import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@convergencelabs/monaco-collab-ext'], // Exclude this dependency from being bundled
    },
  },
  optimizeDeps: {
    include: ['@convergencelabs/monaco-collab-ext'], // Ensure it's pre-bundled for dev
  },
});
