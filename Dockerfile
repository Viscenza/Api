FROM node:21-alpine as build
WORKDIR /app
COPY package.json yarn.lock /app
RUN yarn install
COPY . /app
RUN node ace build
ENV PORT=3333
ENV HOST=0.0.0.0
ENV NODE_ENV=development
ENV APP_KEY=w_D4PzbKXR5LYDXxXcOuzOadXCrAg-QV

FROM node:21-alpine as runner
WORKDIR /app
COPY --from=build app/build app/build
ENTRYPOINT ["node", "ace", "migration", ":", "run"]
