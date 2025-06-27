import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  // Configuración base diferente según el entorno
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
  const baseUrl = isGitHubPages ? '/defensapanas/' : './'
  
  return {
    // Base path - diferente para GitHub Pages y otros deployments
    base: baseUrl,
    
    // Configuración del build
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'esbuild',
      // Asegurar que los assets sean encontrados
      assetsInlineLimit: 0,
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
  }
})
