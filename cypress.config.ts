import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:3001/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
