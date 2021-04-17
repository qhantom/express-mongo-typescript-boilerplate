FROM node:15.14.0-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY ./dist .
COPY ./ecosystem.config.json .
COPY ./.env .

USER node

CMD ["npm", "start"]