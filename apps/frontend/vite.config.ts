import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@gd-components': path.resolve(__dirname, 'src/shared/components'),
      '@gd-types': path.resolve(__dirname, 'src/shared/types'),
      '@gd-constants': path.resolve(__dirname, 'src/shared/constants'),
      '@gd-utils': path.resolve(__dirname, 'src/shared/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/index" as *;`
      }
    }
  }
});
