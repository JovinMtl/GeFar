import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    // Enabling this allows the server to be accessible over LAN
    host: true, // Set host to true to bind to all network interfaces
    port: 5173, // Default port (can change if needed)
    strictPort: false // Allows fallback to another port if 5173 is in use
  }
})
