FROM node:14-alpine

WORKDIR /var/www

COPY ./dist/slightly/. ./
COPY node_modules/ ./node_modules/
COPY package.json .
COPY package-lock.json .
COPY README.md .
COPY LICENSE.md .

CMD node server.js
