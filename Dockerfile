FROM node:20-alpine

WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install


RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000

