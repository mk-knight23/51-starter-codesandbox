import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/composables': path.resolve(__dirname, './src/composables'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/content': path.resolve(__dirname, './src/content'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/types': path.resolve(__dirname, './src/types')
    }
  }
})
