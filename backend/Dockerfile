FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run compile

ARG PORT

EXPOSE ${PORT}

CMD [ "node", "./build/src/app.js" ]
