FROM node:14-alpine

WORKDIR /var/www

COPY ./dist/slightly/. ./

COPY package.json .
COPY package-lock.json .
COPY README.md .

RUN npm install --only=prod

CMD node server.js
