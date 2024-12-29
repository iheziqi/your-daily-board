import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, errors } = winston.format;

const combinedLogRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', // rotate everyday
  zippedArchive: true,
});

const errorLogRotateTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: 'error-logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD', // rotate everyday
  maxFiles: '30d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [combinedLogRotateTransport, errorLogRotateTransport],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'error-logs/exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'error-logs/rejections.log' }),
  ],
});
