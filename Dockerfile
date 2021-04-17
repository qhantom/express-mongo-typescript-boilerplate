FROM node:15.14.0-alpine3.13

WORKDIR /usr/src/app

# Environment variables
ENV NODE_ENV=production

ENV SERVER_PORT=3000

ENV DATABASE_URI=mongodb://mongo/boilerplate_database

ENV JWT_SECRET=ssshhh
ENV JWT_EXPIRATION_HOURS=24

ENV SMTP_HOST=smtp.ethereal.email
ENV SMTP_PORT=587
ENV SMTP_USERNAME=your@mail.com
ENV SMTP_PASSWORD=password
ENV EMAIL_FROM=boiler@plate.dev

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ["./dist", "./ecosystem.config.json", "./"] 

USER node
COPY --chown=node:node . /usr/src/app

CMD ["npm", "start"]