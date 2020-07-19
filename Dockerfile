FROM node:14-alpine

WORKDIR /var/www

COPY ./dist/slightly/. ./

RUN apk add tree && tree .

COPY package.json .
COPY package-lock.json .
COPY README.md .

RUN npm install --only=prod

CMD node server.js
