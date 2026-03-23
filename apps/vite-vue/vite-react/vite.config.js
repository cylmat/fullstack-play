import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://vite.dev/config/shared-options.html

export default defineConfig({
  // root: 'src',              // Vite will look for index.html 
  // publicDir: 'public',   // Static assets served 

  plugins: [react({
    include: "**/*.tsx",
  }), vue()],
  server: {
    host: '0.0.0.0',
    // watch: {
    //   usePolling: true // on docker makes file watching reliable across containers or networked filesystems.
    // },
  }
})

// hmr: {
    //   host: 'localhost', // or your LAN IP or custom domain
    //   port: 5173,        // same as dev server port
    //   protocol: 'ws'     // or 'wss' if using HTTPS
    // },