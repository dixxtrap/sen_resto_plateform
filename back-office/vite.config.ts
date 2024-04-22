import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    "/v1":"https://api.test.senresto.com"
  }
}
})
