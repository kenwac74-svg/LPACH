import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Standalone UI mockup: no server keys or backend environment values are bundled.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
});
