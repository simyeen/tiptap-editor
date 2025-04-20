/// <reference types='vitest' />
import {defineConfig} from 'vite';

import {nxCopyAssetsPlugin} from '@nx/vite/plugins/nx-copy-assets.plugin';
import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/ui-editor',
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    /** Exclude the lib folder from the test coverage report */
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/ui-editor',
      include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: ['src/lib/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
