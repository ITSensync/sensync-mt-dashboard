# Gunakan image resmi Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy file konfigurasi dan install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy semua file project ke dalam container
COPY . .

# Build Next.js (jadi static atau SSR tergantung config)
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Salin hasil build dari tahap builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5006

# Jalankan server
CMD ["npm", "start", "--", "-p 5006"]