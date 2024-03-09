FROM node:21-alpine as build
WORKDIR /app
COPY package.json yarn.lock /app
RUN yarn install
COPY . /app
RUN node ace build

FROM node:21-alpine
WORKDIR /app
COPY --from=build app/build app/build
ENTRYPOINT ["node", "ace", "migration", ":", "run"]
