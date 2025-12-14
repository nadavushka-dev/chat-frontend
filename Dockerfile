FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_APP_NAME

RUN npm run build

FROM caddy:2-alpine

COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddt/Cadddyfile

EXPOSE 80 443

CMD [ "caddy", "run", --config", "/stc/caddy/Caddyfile" ]
