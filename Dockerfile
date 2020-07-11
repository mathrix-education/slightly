FROM node:14-alpine

WORKDIR /var/www

COPY . .

RUN npm install --only=prod

CMD node dist/server.js
