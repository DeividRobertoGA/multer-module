# 1. Base Image
FROM node:24.16

# 2. Working Directory
WORKDIR /app

# 3. Install Dependencies
COPY package*.json .
RUN npm install

# 5. Copy Application Code
COPY . .

# 6. Network Port Documentation
EXPOSE 3000

# 7. Container Startup Command
CMD ["npm", "run", "start"]