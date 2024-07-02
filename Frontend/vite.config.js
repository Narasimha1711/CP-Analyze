import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // external: ['react-chartjs-2', 'chart.js'],
      output: {
        manualChunks: {
          chartjs: ['chart.js'],
        },
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  // server: {
  //   proxy: {
  //     '/api' : {
  //       // target: 'http://localhost:9000', // Backend server address
  //       target: 'https://cp-analyze.vercel.app', // Backend server address
  //       changeOrigin: true, // Update the host header to the target URL
  //       secure: false, // Allow proxying to SSL backend servers with self-signed certificates
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})