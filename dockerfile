FROM node:22-alpine

WORKDIR /app

COPY ./prisma-app/package.json /app

RUN npm install