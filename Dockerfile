FROM node:22-alpine

WORKDIR /app

# Salin manifest dependency
COPY package.json package-lock.json ./

# Install dependency production saja
RUN npm ci --omit=dev

# Salin source code backend
COPY src ./src

# Backend menggunakan port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
