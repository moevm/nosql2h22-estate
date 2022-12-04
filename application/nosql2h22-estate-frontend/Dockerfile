FROM node:16
RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD npm run start
