import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000
  }
 // server: {
 //   port: 5177, 
 // }
})

