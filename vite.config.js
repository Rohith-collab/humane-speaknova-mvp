import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Use defineConfig to include plugins and server options together
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // Allows access from external devices
    port: 5173
  }
})
