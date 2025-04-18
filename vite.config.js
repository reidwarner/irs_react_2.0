import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    base: isProduction ? '/irs/' : '/',
    build: {
      sourcemap: false,
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {  // Assuming your API calls are prefixed with "/api"
          target: 'http://localhost:5000',  // Container's address (use the container's IP or localhost)
          changeOrigin: true,  // Needed to change the origin of the request
          rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Adjust path if needed
        },
      },
    },
  }
});