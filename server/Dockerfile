FROM node:20

WORKDIR /app

COPY ./server/package*.json ./


RUN npm install --production


COPY server .


RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "start:prod"]
