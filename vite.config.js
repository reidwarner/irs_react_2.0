import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/locations': {
        target: "http://localhost:3000"
      },
      '/blog': {
        target: "http://localhost:3000"
      }
    }
  }
})
