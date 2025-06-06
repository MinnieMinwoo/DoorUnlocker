# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]
