import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 为了让Docker容器的端口映射生效
    host: '0.0.0.0', 
    port: 5173, // Vite的默认端口
    proxy: {
      // 关键配置：将所有/api开头的请求，代理到后端的地址
      '/api': {
        target: 'http://backend:5000', // Docker Compose网络中的后端服务名
        changeOrigin: true,
        // 可选：重写路径，去掉/api前缀
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})