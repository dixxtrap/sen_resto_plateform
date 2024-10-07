import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  optimizeDeps: {
    exclude: ['async-mutex'], // Exclure le module de l'optimisation
  },
  build: {
    outDir: 'dist', // Output directory
    assetsDir: 'assets', // Assets directory
    // Other build options
  },
server:{
  port:3001,
  proxy:{
    "/v1":"http://localhost:3000"
  }
},
preview:{
  port:3001,
  proxy:{
    "/v1":"http://184.73.166.128:3000"
  }
}
})
