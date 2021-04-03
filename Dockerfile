FROM node:12-alpine as build-deps
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run-script build

FROM nginx:1.19-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN chmod +x env.sh

EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]