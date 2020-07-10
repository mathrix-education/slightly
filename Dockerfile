FROM node:14-alpine

WORKDIR /var/www

COPY . .

RUN npm install

CMD node dist/main.js
