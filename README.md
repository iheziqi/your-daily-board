# your-daily-board
![Vercel](https://vercelbadge.vercel.app/api/iheziqi/your-daily-board)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

A daily newsletter of refectory menus from various Studierendenwerk Nürnberg-Erlange websites.

## link

Do you study at metropolis Nuremberg, go to university refectories everyday and don't know what to eat? 

Subscribe to a email newsletter that sends you all menus of uni refectories on a daily basis.

Sign up [here](yourdailyboard.vercel.app).

## Table of Content

[About The App](#about-the-app)

[Screenshots](#screenshots)

[Technologies](#technologies)

[Setup](#setup)

[License](#license)

## About The App

I don't bother to check menus of university refectories on websites everyday so I decided to automate menu collection from [Studierendenwerk websites](https://www.werkswelt.de/index.php).
Now this newsletter app intergates all menus of refectories, cafeterias and cafebars published on the website of Studierendenwerk Nürnberg-Erlangen.
A daily email newsletter is sent to subscribers according to their subscriptions. No need to do the tedious check everyday!

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
- MySQL

## Setup
### Backend
First please make sure MySQL is installed on your machine.

Clone the repository and get into the backend directory.
run:

```bash
npm install
```

then compile the TypeScript into JavaScript:

```bash
npm compile
```

After compilation, setup the .env file in the **build** folder

```text
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_TYPE=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

SECRET_KEY=[generate a secret key using a libary like Crypto in Node, something like `crypto.randomBytes(64).toString('hex');`]

ROOT_URL=http://localhost:5000 [please notice that if you change the port in package.json, also remeber to change the port here]
FRONTEND_URL=[frontend url, if you start the frontend and backend on the same machine, it is http://localhost:5173]
```

Lastly, go to the src folder inside the build directory:

```bash
npm run start
```

Or if you use PM2:

```bash
pm2 start app.js
```

### Frontend
For development:

```bash
npm run dev
```

For deployment, you have a lot of options. Usually host service is best choice because you don't need to worry about the building process.

Or if you want to build the frontend by youself, just like building any vite project:

```bash
npm run build
```

## License
Apache License @ Ziqi He

