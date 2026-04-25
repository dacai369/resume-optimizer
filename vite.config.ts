import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages 部署配置
export default defineConfig({
  plugins: [react()],
  base: '/resume-optimizer/',
})
