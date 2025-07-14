# 使用一个官方的Node.js基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装依赖 (利用缓存)
COPY package.json ./
# COPY package-lock.json ./
RUN npm install

# 复制所有前端代码到工作目录
COPY . .

# 暴露Vite的默认端口
EXPOSE 5173

# 容器启动时运行的命令：启动Vite开发服务器
CMD ["npm", "run", "dev"]