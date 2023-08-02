import { defineConfig } from 'vite';
import optimizer from 'vite-plugin-optimizer';

export default defineConfig({
  plugins: [
    optimizer({
      fs: () => ({
        find: /^(node:)?fs$/,
        code: `const fs = require('fs'); export { fs as default }`,
      }),
    }),
  ],
  build: {
    target: 'modules',
    lib: {
      entry: './src/index',
      name: 'vite-plugin-useless-locale',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
  },
});
