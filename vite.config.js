import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  // If building on Vercel, use root. Otherwise, use the GitHub repo path.
  base: process.env.VERCEL ? '/' : '/germanvocabs/',
})