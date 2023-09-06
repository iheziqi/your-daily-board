import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof createError.HttpError) {
    return res.status(err.statusCode).json({msg: err.message});
  }
  return res.status(500).json({msg: 'something went wrong!'});
}
