FROM node:11-alpine

LABEL version="1.0"
LABEL description="This is basic Ndde.js API starter."

ENV API_PORT=3000
ENV NODE_ENV=production
ENV REDIS_HOST=redis
ENV REDIS_PASSWORD=test
# ENV DB_URI="mongodb://${mongodb_container}:27017/db-${app_env}"
RUN npm i -g pm2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start:production" ]
