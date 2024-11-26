FROM node:20

WORKDIR /app

# Step 3: Copy package.json and package-lock.json 
COPY ./client/package*.json ./


RUN npm install --production


COPY ./client ./


RUN npm run build


EXPOSE 3000


CMD ["npm", "start"]
