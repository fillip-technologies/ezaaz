import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const defaultApi = mode === 'development'
    ? 'http://localhost:5000/api'
    : 'https://apiezazclinic.fillipsoftware.com/api'
  const rawApi = (env.VITE_API_URL || defaultApi).trim()
  const target = rawApi.replace(/\/api\/?$/, '') || (mode === 'development' ? 'http://localhost:5000' : 'https://apiezazclinic.fillipsoftware.com')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      // Dev proxy forwards API and upload asset calls to the backend without CORS issues
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
