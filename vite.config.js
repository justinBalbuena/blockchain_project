import { defineConfig } from 'vite';

const port = process.argv[3] || 5173; // Default frontend to 5173

export default defineConfig({
  server: {
    port: parseInt(port, 10), // Convert argument to a number
  },
});