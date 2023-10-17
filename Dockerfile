FROM node:18-alpine

WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000

