FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --omit=dev

EXPOSE 8080

CMD [ "node", "server.js" ]
