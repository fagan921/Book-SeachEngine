import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine if we're in a production environment (Render)
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001', // Local dev backend
        secure: false,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure output is in dist folder
    sourcemap: !isProduction, // Only enable sourcemaps in dev
  },
  define: {
    'process.env.BACKEND_URL': JSON.stringify(
      isProduction ? 'https://your-render-app-url.onrender.com' : 'http://localhost:3001'
    ),
  },
});