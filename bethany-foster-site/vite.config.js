import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // This matches your GitHub repository name exactly
  base: '/BethanyFoster-RMT/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})