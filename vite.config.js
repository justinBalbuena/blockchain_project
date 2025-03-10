import { defineConfig } from 'vite';
import portfinder from 'portfinder';

export default defineConfig(async ({ command, mode }) => {
  const port = await portfinder.getPortPromise({ port: 3000 });

  process.env.PORT = port;

  return {
    server: {
      port: port,
    },
  };
});