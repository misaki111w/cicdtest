# --- 构建阶段 ---
# 使用Node.js镜像来构建React应用
FROM node:18-alpine AS build

WORKDIR /app

# 复制package.json并安装依赖 (利用缓存)
COPY package.json ./
RUN npm install

# 复制所有前端代码
COPY . .

# 执行构建命令，生成静态文件到 /app/dist 目录
RUN npm run build

# --- 服务阶段 ---
# 使用一个轻量级的web服务器Nginx来托管构建好的静态文件
FROM nginx:stable-alpine

# 从“构建阶段”拷贝出已经打包好的静态文件到Nginx的默认网站目录
COPY --from=build /app/dist /usr/share/nginx/html

# 为了支持React Router等单页应用路由，我们需要一个自定义的Nginx配置
# (可选，但推荐) 创建一个nginx.conf文件，或者直接在这里处理
# 这里我们用一个简单的方法，让所有找不到的路径都返回index.html
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 暴露Nginx的默认端口80
EXPOSE 80

# 容器启动时，Nginx会自动在后台运行
CMD ["nginx", "-g", "daemon off;"]