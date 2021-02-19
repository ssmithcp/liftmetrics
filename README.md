# LiftMetrics

## Setup

This site uses mongodb for persistent storage. You can set up a local mongo instance or use a hosted solution like mongo atlas.
I use atlas for dev and production. Get a free account here: [MongoDB Atlas](https://www.mongodb.com/try)

Once registered, get a connection string to connect: [Get connection string](https://docs.mongodb.com/guides/cloud/connectionstring/)

## ENV variables

'mongoURI', 'isDev' and 'jwtSecret' config variables need to be set to run. To develop locally, I suggest adding the following to your .bashrc file

`export MONGO_URI="MONGO_CONNECTION_STRING_HERE"`

`export JWT_SECRET="ANY_STRING_HERE"`

`export NODE_CONFIG="{\"mongoURI\":\"${MONGO_URI}\",\"isDev\":true,\"jwtSecret\":\"${JWT_SECRET}\"}"`

## Run site locally in development mode

After the environment variables have been set, install dependencies with `npm i` then run with `npm run dev`

## Run site in production mode

Set up environment variables then, but change `isDev` value to 'false' like `export NODE_CONFIG="{\"mongoURI\":\"${MONGO_URI}\",\"isDev\":false,\"jwtSecret\":\"${JWT_SECRET}\"}"`
then run `npm i && npm run heroku-postbuild && npm start`. Node is started on port 5000 by default; you can view the homepage at [localhost:5000](http://localhost:5000)
