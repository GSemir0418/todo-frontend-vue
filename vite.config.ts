import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    open: true,
    proxy: {
      '/dev': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, '')
      }
    }
  }
})
