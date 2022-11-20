FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install --omit=dev

EXPOSE 1337

CMD [ "node", "src/server.js" ]
