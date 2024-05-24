import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          short_name: 'Nums',
          name: 'Nums Game',
          icons: [
            {
              src: 'icon/favicon.png',
              sizes: '32x32',
              type: 'image/png',
            },
            {
              src: 'icon/size-48.png',
              sizes: '48x48',
              type: 'image/png',
            },
            {
              src: 'icon/size-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icon/size-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
          start_url: '.',
          display: 'standalone',
          theme_color: '#06040C',
          background_color: '#06040C',
        },
        workbox: {
          // Precaching
          globPatterns: ['**/*.{js,css,html,svg,mp3}'],
          // Runtime Caching (just example)
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.myapp\.com\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24, // 1 day
                },
              },
            },
          ],
        },
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
