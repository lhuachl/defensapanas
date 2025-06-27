import { defineConfig } from 'vite'

export default defineConfig({
  // Base path relativo - funciona en cualquier plataforma
  base: './',
  
  // Configuración del build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generar manifest para mejor control de assets
    manifest: false,
    // Optimizar para producción
    minify: 'terser',
    rollupOptions: {
      output: {
        // Organizar los archivos generados
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    open: true,
    host: true
  },
  
  // Resolver aliases para rutas más limpias
  resolve: {
    alias: {
      '@': '/src',
      '@public': '/public'
    }
  },
  
  // Manejo de assets públicos
  publicDir: 'public',
  
  // Configuración para desarrollo
  css: {
    devSourcemap: true
  }
})
