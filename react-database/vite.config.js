import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/utility/database/',  // Základní cesta
  plugins: [react()],
  server: {
    open: true,
    historyApiFallback: true, // Podpora pro React Router
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'utility/database/assets/[name].js',  // Upravené bez úvodního /
        chunkFileNames: 'utility/database/assets/[name].js',  // Upravené bez úvodního /
        assetFileNames: 'utility/database/assets/[name].[ext]',  // Upravené bez úvodního /
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});