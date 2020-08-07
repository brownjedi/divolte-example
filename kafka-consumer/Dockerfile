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

# build assets
RUN npm run build

# remove any dev dependencies
RUN npm prune --production

# orchestration image
FROM node:14-alpine as kafka-consumer

# set the work directory
WORKDIR /usr/src/app

# copy assets
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# set user
USER node

CMD ["npm", "start"]
