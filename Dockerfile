FROM node:21-alpine as build
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build


FROM node:21-alpine as runner
WORKDIR /app
ENV PORT=3333
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV DRIVE_DISK=local
ENV DB_CONNECTION=mysql
ENV MYSQL_HOST=mysql
COPY --from=build /app/build /app
ENTRYPOINT ["node", "ace", "migration:run"]
