import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/',
  publicDir: '../public/',
  base: '/3DPlayground/', // must match repo name
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
