import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, errors } = winston.format;

const combinedLogRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/cron-combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD', // rotate everyday
  maxFiles: '14d', // automatically delete after 14 days
  zippedArchive: true, // use gzip for archive
});

const errorLogRotateTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: 'error-logs/cron-error-%DATE%.log',
  datePattern: 'YYYY-MM-DD', // rotate everyday
  maxFiles: '30d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [combinedLogRotateTransport, errorLogRotateTransport],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'error-logs/cron-exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'error-logs/cron-rejections.log' }),
  ],
});
