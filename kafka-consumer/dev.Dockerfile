# build image
FROM node:14-alpine as build

## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache python make g++

# registry url
ARG NPM_REGISTRY_URL=https://registry.npmjs.org/

# set the work directory
WORKDIR /usr/src/app

# copy package.json and lerna.json
COPY ./package*.json ./

RUN npm set registry $NPM_REGISTRY_URL

# RUN npm install for node js dependencies
RUN npm install --unsafe-perm

COPY . .

CMD ["npm", "run", "develop"]
