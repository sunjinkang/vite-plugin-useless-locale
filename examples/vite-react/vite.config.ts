import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import uselessLocale from 'vite-plugin-useless-locale';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), uselessLocale({ localePath: './src/locale' })],
});
