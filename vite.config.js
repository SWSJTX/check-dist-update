import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.js',
      name: 'check-update',
      fileName: 'check-update'
    }
  }
})
