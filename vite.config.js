import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs',//想要把dist修改成什么名字在这边改
  },
  plugins: [vue()],
})
