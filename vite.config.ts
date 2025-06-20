import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // или 'localhost', но лучше указать 127.0.0.1
    port: 5173, // если нужен конкретный порт
  }
})
