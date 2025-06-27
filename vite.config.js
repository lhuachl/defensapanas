import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Base path relativo - funciona en cualquier plataforma
  base: './',
  
  // Configuración del build simplificada
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Usar esbuild por defecto (más confiable)
    minify: 'esbuild',
    // Configuración simplificada
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        capitulo2: resolve(__dirname, 'capitulo2.html'),
        capitulo4: resolve(__dirname, 'capitulo4.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true,
    host: true
  },
  
  // Manejo de assets públicos
  publicDir: 'public',
  
  // Configuración para desarrollo
  css: {
    devSourcemap: true
  }
})
