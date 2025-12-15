FROM node:20-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_APP_NAME

RUN npm run build

FROM caddy:2-alpine

COPY --from=build /app/dist /srv

EXPOSE 80

CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]
