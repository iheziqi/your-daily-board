# Your Daily Board 每日看饭

![Vercel](https://vercelbadge.vercel.app/api/iheziqi/your-daily-board)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

<img src="https://github.com/iheziqi/your-daily-board/assets/52439236/fd1a33a7-eeb5-417d-8f3a-b2fb1a761e52" style="height: 250px"/>

A daily email newsletter of the refectory, cafeteria, cafebar menus from the Studierendenwerk Nürnberg-Erlangen website.

## link

Do you study in the metropolis Nuremberg, go to university refectories daily, and don't know what to eat? 

Subscribe to an email newsletter that sends you all menus of uni refectories on a daily basis.

Sign up [here](https://yourdailyboard.vercel.app).

## Table of Content

[About The App](#about-the-app)

[Screenshots](#screenshots)

[Technologies](#technologies)

[Setup](#setup)

[License](#license)

## About The App

I don't bother to check menus of university refectories on websites every day so I decided to automate menu collection from [Studierendenwerk websites](https://www.werkswelt.de/index.php).
Now this newsletter app integrates all menus of refectories, cafeterias, and cafebars published on the website of Studierendenwerk Nürnberg-Erlangen.
A daily email newsletter is sent to subscribers according to their subscriptions. No need to do the tedious check every day!

## Screenshots
<img src="https://github.com/iheziqi/your-daily-board/assets/52439236/1e6c8eb5-7f49-4f55-9440-3beecfafbbb5" style="height: 600px"/>

## Technologies
Frontend: 
- Vite
- React 18
- React Router V6
- TailwindCSS, DaisyUI


Backend:
- Node and TypeScript
- ts-node for development and testing
- Express
- Knex
- SQLite

## Setup
### Backend

#### Running with docker
Backend of this app is fully containerized. You can run it with docker compose.

Just run the following command in the root directory of the project:

```bash
cd backend
docker compose up --build
```

#### Running without docker

Clone the repository and get into the backend directory.
run:

```bash
npm install
```

then compile the TypeScript into JavaScript:

```bash
npm compile
```

After compilation, set up the .env file in the **build** folder

```text
# SMTP server to send email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# secret key for JWT
SECRET_KEY=[generate a secret key using a libary like Crypto in Node, something like `crypto.randomBytes(64).toString('hex');`]

# root url of the backend
ROOT_URL=[root url of the backend, if you start the backend and frontend on the same machine, it is http://localhost:5000]

# frontend url
FRONTEND_URL=[frontend URL, if you start the frontend and backend on the same machine, it is http://localhost:5173]

# node environment
NODE_ENV=[development or production]
```


Then run the database setup script setup-database.js in the src/build/config folder, it will run all database migrations and seeds.

```bash
node setup-database.js
```


Lastly, go to the src folder inside the build directory, and there is a script entrypoint.sh to start all backend services, run it:

```bash
./src/entrypoint.sh
```

Or if you use PM2:

```bash
pm2 start app.js
```

### Frontend
#### For development:

```bash
npm run dev
```

#### For deployment:

You have a lot of options. Usually, host service is the best choice because you don't need to worry about the building process.

There is a docker-compose.yml file in the root directory of the project, it will build the frontend and backend and run them.

```bash
docker compose up --build
```

## License
Apache License @ Ziqi He

