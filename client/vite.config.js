import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Ensure you import path properly in ESM style

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5175,
    host: true,
  },
  build: {
    outDir: 'dist', // Ensure this is set to 'dist'
  },
})
