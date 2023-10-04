// dependencies
import express from 'express';
import {loadEnv} from './utils/loadEnv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

// extra security packages
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import {rateLimit} from 'express-rate-limit';

// middle wares
import {errorHandler} from './middlewares/error-handler';

// routes
import users from './routes/users';
import settings from './routes/settings';
import info from './routes/info';

// make PROCESS.ENV available
loadEnv();

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Use to limit repeated requests to public APIs and/or endpoints.
app.set('trust proxy', 1);
app.use(
  'api',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
    legacyHeaders: false, // X-RateLimit-* headers
  })
);
// security libraries
app.use(helmet());
app.use(xss());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// api routes
app.use('/api/v1/users', users);
app.use('/api/v1/settings', settings);
app.use('/api/v1/info', info);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404, 'Route not found!'));
});
// custom error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
