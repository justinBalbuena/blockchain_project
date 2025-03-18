import { defineConfig } from 'vite';

const args = process.argv.slice(2); // Get command-line arguments
const backendPort = args.find(arg => !isNaN(arg)) || 5002; // Get first number as backend port
const frontendPort = args.find((arg, index) => index > 0 && !isNaN(arg)) || 5173; // Get second number

export default defineConfig({
  root: 'public', // Ensure Vite serves from the public directory
  server: {
    port: parseInt(frontendPort, 10), // Set the frontend server port dynamically
    proxy: {
      // Proxy requests to Express (which renders Handlebars)
      '/': `http://localhost:${backendPort}/`,
      '/game': `http://localhost:${backendPort}/game`,
      '/leaderboard': `http://localhost:${backendPort}/leaderboard`,
      '/profile': `http://localhost:${backendPort}/profile`,
    },
  },
});