FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run compile

# Grant execute permissions to entrypoint.sh
RUN chmod +x ./build/src/entrypoint.sh

ARG PORT

EXPOSE ${PORT}

# Command to run the entry point script
CMD ["./build/src/entrypoint.sh"]
