FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN node ace build

FROM node:18-alpine as runner
WORKDIR /app
ENV PORT=3333
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV DRIVE_DISK=local
ENV APP_KEY=w_D4PzbKXR5LYDXxXcOuzOadXCrAg-QV

ENV DB_CONNECTION=mysql://root:qaZIKOflAbZCCJGKduxQkuCVGtLEjaZQ@roundhouse.proxy.rlwy.net:58195/todoo
COPY --from=build /app/build /app
COPY --from=build /app/node_modules /app/node_modules
EXPOSE 3333
ENTRYPOINT ["/bin/sh", "-c", "node /app/ace migration:run --force && node /app/server.js"]
