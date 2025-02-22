import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config' // Importa defineConfig do Vitest diretamente

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
})
