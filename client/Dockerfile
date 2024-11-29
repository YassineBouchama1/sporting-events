
FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# here copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules


RUN npm ci --only=production


EXPOSE 3000

CMD ["npm", "start"]