FROM node:14-alpine
WORKDIR /usr/src/app/api
COPY . .
RUN yarn
EXPOSE 8080
CMD ["node", "index.js"]