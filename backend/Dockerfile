# 使用官方 Python 基础镜像
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 复制依赖文件并安装依赖
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 复制所有后端代码到工作目录
COPY . .

# 暴露 Flask 默认端口
EXPOSE 5000

# 启动 Flask 服务
CMD ["python", "app.py"]