FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
#env args
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
COPY ./credentials/server.crt /etc/nginx/ssl/server.crt 
COPY ./credentials/server.key /etc/nginx/ssl/server.key

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]