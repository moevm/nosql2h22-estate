FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 1337

CMD [ "node", "src/server.js" ]
