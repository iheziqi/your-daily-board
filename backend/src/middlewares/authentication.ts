import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {UserRepository} from '../repositories';
import UserAuthService from '../services/UserAuthService';
import KnexService from '../database/KnexService';
import {dateToUnixTimestamp} from '../utils/helpers';
import {loadEnv} from '../utils/loadEnv';

loadEnv();

export interface CustomRequest extends Request {
  decodedPayload: jwt.JwtPayload;
}

/**
 * Middleware for validating the email address in request body.
 */
export async function validateEmailInRequestBody(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    // checks if the body parameter has the email address
    const email: string = req.body.email;

    if (!email) {
      // if no, throw bad request error
      throw createHttpError.BadRequest(
        'Missing required parameter: email address'
      );
    }

    // checks if the email in database
    const userRepo = new UserRepository(KnexService.getInstance());
    const userId = await userRepo.getUserIdByEmail(email);

    if (!userId) {
      throw createHttpError.NotFound('Email address does not exist');
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware for authenticating auth code.
 */
export async function validateAuthCode(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const email: string = req.body.email;

    // let authCode: number;
    // if (req.cookies.authentication_code) {
    //   // first try to get the auth code from cookie
    //   // this states that client has already logged in
    //   authCode = parseInt(req.cookies.authentication_code.toString());
    // } else {
    //   // if the auth code does not exist in cookie,
    //   // try to access it in the request body
    //   // this states that client try to log in
    //   authCode = parseInt(req.body.authentication_code.toString());
    // }
    let authCode: number | string = req.body.authentication_code;

    if (!authCode) {
      throw createHttpError.Unauthorized(
        'Missing required parameter: authentication code'
      );
    }

    if (typeof authCode === 'string') {
      authCode = parseInt(authCode);
    }

    // Gets authentication data from database.
    const authData = await UserAuthService.getUserAuthData(email);

    if (!authData) {
      throw createHttpError.InternalServerError(
        'Failed to get authentication data from table users_authentication'
      );
    }

    const toBeEmail = authData.email;
    const toBeAuthCode = authData.authentication_code;

    // checks email address
    if (email !== toBeEmail) {
      throw createHttpError.Unauthorized('Invalid Email address');
    }

    // checks auth code
    if (authCode !== toBeAuthCode) {
      throw createHttpError.Unauthorized(
        'Invalid authentication code: code is wrong'
      );
    }

    // checks if it is expired
    const currentTimeStamp = dateToUnixTimestamp(new Date());
    const expireInTimeStamp = authData.expiration_timestamp;

    if (currentTimeStamp > expireInTimeStamp) {
      throw createHttpError.Unauthorized(
        'Invalid authentication code: code is expired'
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware for authenticating JWT token.
 */
export function authenticateJwtToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.authentication_token;

    if (!token) {
      throw createHttpError.Unauthorized();
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw createHttpError.InternalServerError(
        'Failed to get SECRET_KEY from environment variables'
      );
    }

    /**
     * Callback function for jwt.verify()
     */
    const verifyCallback: jwt.VerifyCallback = (err, decoded) => {
      if (err) {
        throw createHttpError.Unauthorized(err.message);
      }
      if (!decoded) {
        throw createHttpError.Unauthorized();
      }
      const email = (decoded as jwt.JwtPayload).email as string;
      // If there is no email in the payload, throw unauthorized.
      if (!email) {
        throw createHttpError.Unauthorized();
      }
      // Attaches the payload in the request parameter so that
      // next middleware or controller in the call stack can have access to it
      (req as CustomRequest).decodedPayload = decoded as jwt.JwtPayload;
    };

    jwt.verify(token, secretKey, verifyCallback);

    next();
  } catch (error) {
    next(error);
  }
}
