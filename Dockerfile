FROM node:14
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE+ENV"="development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node","server.js"]