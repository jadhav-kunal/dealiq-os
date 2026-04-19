import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/asu-api': {
        target: 'https://openai.rc.asu.edu',
        changeOrigin: true,
        secure: false,          // ← ignores invalid SSL cert
        rewrite: (path) => path.replace(/^\/asu-api/, ''),
      },
    },
  },
})