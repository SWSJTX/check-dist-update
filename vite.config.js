import { defineConfig } from 'vite'
import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.js',
      name: 'check-update',
      fileName: 'check-update'
    },
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          exclude: 'node_modules/**',
          extensions: [...DEFAULT_EXTENSIONS]
        })
      ]
    }
  }
})
