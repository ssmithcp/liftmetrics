# LiftMetrics

Liftmetrics is a portfolio site written using the MERN stack: mongodb, express, react and node. It uses redux and react router of course and the ever exciting tailwind css utility first library.

I wrote this app many months ago, between January 21' and April 21'. I've learned *a lot* since writing this and this site isn't reflective of my current ability or style. Specifically, now I prefer typescript, my css has improved as well as my overall grasp on react and hooks in particular. Please use this as proof of my ability to build a site by myself and my ability to write consistent clean code.  I'm currently refactoring the site - watch for updates!

This app is currently live at: [liftmetrics.net](https://www.liftmetrics.net/)

## Setup

This site uses mongodb for persistent storage. You can set up a local mongo instance or use a hosted solution like mongo atlas.
I use atlas for dev and production. Get a free account here: [MongoDB Atlas](https://www.mongodb.com/try)

Once registered, get a connection string to connect: [Get connection string](https://docs.mongodb.com/guides/cloud/connectionstring/)

## ENV variables

'mongoURI', 'isDev' and 'jwtSecret' config variables need to be set to run. To develop locally, I suggest adding the following to your ~/.bashrc file

`export MONGO_URI="MONGO_CONNECTION_STRING_HERE"`

`export JWT_SECRET="ANY_STRING_HERE"`

`export NODE_CONFIG="{\"mongoURI\":\"${MONGO_URI}\",\"isDev\":true,\"jwtSecret\":\"${JWT_SECRET}\"}"`

## Run site locally in development mode

After the environment variables have been set

- Install dependencies with `npm i && npm --prefix client install`
- Then start the client and server with `npm run dev`
- If the index page doesn't open automatically, it is hosted at [localhost:3000](http://localhost:3000)

## Run site in production mode

Set up environment variables then, but change `isDev` value to 'false' like `export NODE_CONFIG="{\"mongoURI\":\"${MONGO_URI}\",\"isDev\":false,\"jwtSecret\":\"${JWT_SECRET}\"}"`
then run `npm i && npm run heroku-postbuild && npm start`.

Node is started on port 5000 by default; you can view the homepage at [localhost:5000](http://localhost:5000)

## Run from docker image

Install and configure docker locally; this was tested using docker on linux (ubuntu).

Assuming MONGO_URI and JWT_SECRET are in your exported environment and you're in the root liftmetrics directory, build the docker image with

`docker image build --build-arg MONGO_URI=$MONGO_URI --build-arg JWT_SECRET=$JWT_SECRET -t liftmetrics .`

Then start it with (assuming it will run on local port 80)

`docker container run -p 80:5000 liftmetrics`

_Note: this docker image is configured to run locally and is vulnerable to XSS in a production environment_

To run locally without HTTPS, the access_token cookie must not have the "Secure" flag set so that the cookie can be returned and saved in the browser. To use the container in a production environment, remove 'isDocker:true' from the docker file, rebuild the image, and use HTTPS.
