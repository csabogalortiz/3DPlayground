import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: '/3DPlayground/',   // 👈 must match your repo name
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  }
})
