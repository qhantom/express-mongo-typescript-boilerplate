FROM node:15.14.0-alpine3.13 as builder

WORKDIR /home/node

COPY . .

RUN npm install
RUN npm run build

FROM node:15.14.0-alpine3.13

WORKDIR /home/node

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

USER node

COPY --from=builder /home/node/dist ./
COPY --chown=node:node package.json package-lock.json ecosystem.config.json ./

RUN npm install --production


CMD ["npm", "start"]