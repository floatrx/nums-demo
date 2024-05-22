import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [react(), VitePWA()],
    server: {
      port: parseInt(process.env.VITE_PORT || '4000'),
    },
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    esbuild: {
      // configure this value when the browser version of the development environment is lower
      // minimum support es2015
      // https://esbuild.github.io/api/#target
      target: 'es2020',
      include: /\.(ts|tsx)$/,
    },
    build: {
      target: 'es2020',
      modulePreload: false,
      minify: true,
      sourcemap: false,
    },
  };
});
