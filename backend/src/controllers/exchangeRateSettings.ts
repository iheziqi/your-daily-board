import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../middlewares/authentication';
import { SubscriptionRepository } from '../repositories';
import KnexService from '../database/KnexService';

/**
 * Controller for getting exchange rate subscriptions of given user.
 */
async function getExchangeRateSubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // After going through authenticateJwtToken middleware,
    // the email is in the payload property of request object
    const payload = (req as CustomRequest).decodedPayload as jwt.JwtPayload;
    const email = payload.email as string;

    const knexInstance = KnexService.getInstance();
    const subscriptionRepo = new SubscriptionRepository(knexInstance);

    const exchangeRateSubscriptions =
      await subscriptionRepo.getExchangeRateSubscriptionsByUserEmail(email);

    if (!exchangeRateSubscriptions) {
      throw createHttpError.InternalServerError(
        'Failed to get user mensa menu subscription'
      );
    }

    res.status(200).json({ email, exchangeRateSubscriptions });
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for setting mensa menu subscriptions of given user.
 */
async function setExchangeRateSubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // After going through authenticateJwtToken middleware,
    // the email is in the payload property of request object
    const payload = (req as CustomRequest).decodedPayload as jwt.JwtPayload;
    const email = payload.email as string;

    const exchangeRateIds: from_to[] | undefined = req.body.fromTos;
    if (!exchangeRateIds) {
      throw createHttpError.BadRequest('Missing required parameter:  fromTos');
    }

    const knexInstance = KnexService.getInstance();
    const subscriptionRepo = new SubscriptionRepository(knexInstance);

    await subscriptionRepo.updateExchangeRateSubscription(
      email,
      exchangeRateIds
    );

    res
      .status(201)
      .json({ message: 'Updated exchange rate subscription successfully' });
  } catch (error) {
    next(error);
  }
}

export { getExchangeRateSubscription, setExchangeRateSubscription };
