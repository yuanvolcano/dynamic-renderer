import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome61'
  }
})
