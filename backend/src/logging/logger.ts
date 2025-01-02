import winston from 'winston';
import { logger as devLogger } from './logger.development';
import { logger as prodLogger } from './logger.production';

let logger: winston.Logger;

if (process.env.NODE_ENV === 'production') {
  logger = prodLogger;
} else {
  logger = devLogger;
}

export { logger };
