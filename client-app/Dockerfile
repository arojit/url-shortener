FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm test

CMD ["npm", "start"]