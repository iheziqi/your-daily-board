import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof createError.HttpError) {
    // Handle HTTP errors with specific status codes and messages
    return res.status(err.statusCode).json({
      error: true,
      errorCode: err.status,
      message: err.message,
    });
  } else {
    // Handle unexpected errors with a generic message and log them
    console.error(`Unexpected error: ${err.stack}`);
    return res.status(500).json({
      error: true,
      errorCode: 'INTERNAL_ERROR', // Use a custom code for internal errors
      message: 'Something went wrong. Please try again later.',
    });
  }
}
