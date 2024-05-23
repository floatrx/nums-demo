import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'node:path';

// Load existing manifest.json
const manifestPath = path.resolve(__dirname, 'public/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'], // you can include more assets like 'robots.txt', 'apple-touch-icon.png', etc.
        manifest, // use the loaded manifest
      }),
    ],
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/global";',
        },
      },
      modules: {
        exportGlobals: true,
        scopeBehaviour: 'local',
        generateScopedName: '[local]-[hash:base64:4]',
      },
    },
  };
});
