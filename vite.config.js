// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/leeweijie.github.io/'
  plugins: [react()],
  // Add more configurations here
})
