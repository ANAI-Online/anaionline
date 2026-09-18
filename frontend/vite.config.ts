import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:demo` genera un único HTML con datos de demostración (sin backend).
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'demo' ? [viteSingleFile()] : [])],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:4000' },
  },
  build: mode === 'demo' ? { outDir: 'dist-demo' } : undefined,
}))
