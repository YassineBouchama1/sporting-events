FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm ci && npm i -g @nestjs/cli


COPY . .


RUN npm run build

FROM node:20-alpine

WORKDIR /app

# copy built assets and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./


RUN npm ci --only=production && npm i -g @nestjs/cli

EXPOSE 4000

CMD ["npm", "run", "start:dev"]