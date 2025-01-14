/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig((env) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/mamudae',
    server: {
      port: 4200,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
        },
      },
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: env.mode === 'production' ? '../../dist/libs/maple-pick/assets/' : '../../libs/maple-pick/public/assets/',
            dest: '.',
          },
        ],
      }),
      react(),
      nxViteTsPaths(),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/apps/mamudae',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
