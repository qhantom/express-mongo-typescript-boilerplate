FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY ./dist .
COPY ./ecosystem.config.json .
COPY ./.env .

EXPOSE 3000

CMD ["npm", "start"]