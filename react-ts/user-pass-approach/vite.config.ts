import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy":
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; " +
          "worker-src 'self' https://wasm.regulaforensics.com blob:; " +
          "font-src 'self' https://incandescent-fairy-1c2024.netlify.app;"
    },
  },
})
