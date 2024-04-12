import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    proxy: {
      "/v1": "http://localhost:3000/" 
    } 
  },
  preview:{
    port:3002,
    proxy:{
      "/v1":"http://54.234.195.123:3000/"
    }
}}
)
