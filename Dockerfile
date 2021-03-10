FROM node:15.3.0-alpine3.12

WORKDIR /usr/src/app

ARG MONGO_URI
ARG JWT_SECRET

ENV NODE_CONFIG="{\"mongoURI\":\"${MONGO_URI}\",\"isDev\":false,\"jwtSecret\":\"${JWT_SECRET}\",\"isDocker\":true}"

EXPOSE 5000

COPY package*.json ./
COPY . .

RUN npm i && npm run heroku-postbuild

CMD [ "npm", "run", "start" ]