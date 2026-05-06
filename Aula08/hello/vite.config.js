import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      
      // Quando você fizer uma requisição para '/v1/exemplo'
      // o Vite vai redirecionar para 'https://ngrok-free.dev'
      '/v1': {
        target: 'http://dig-huntress-arming.ngrok-free.dev',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        changeOrigin: true,
        secure: false, // Útil se o SSL do ngrok der erro no local
    }}}
})
