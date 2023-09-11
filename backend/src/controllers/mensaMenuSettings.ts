import {Request, Response, NextFunction} from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {CustomRequest} from '../middlewares/authentication';
import {SubscriptionRepository} from '../repositories';
import KnexService from '../database/KnexService';

/**
 * Controller for getting mensa menu subscriptions of given user.
 */
async function getMensaMenuSubscription(
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

    const mensaMenuSubscription =
      await subscriptionRepo.getMensaMenuSubscriptionsByUserEmail(email);
    console.log(mensaMenuSubscription);

    if (!mensaMenuSubscription) {
      throw createHttpError.InternalServerError(
        'Failed to get user mensa menu subscription'
      );
    }

    res.status(200).json({email, mensaMenuSubscription});
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for setting mensa menu subscriptions of given user.
 */
async function setMensaMenuSubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // After going through authenticateJwtToken middleware,
    // the email is in the payload property of request object
    const payload = (req as CustomRequest).decodedPayload as jwt.JwtPayload;
    const email = payload.email as string;

    const mensaIds: MensaID[] | undefined = req.body.mensaIds;
    if (!mensaIds) {
      throw createHttpError.BadRequest(
        'Missing required parameter:  mensa_ids'
      );
    }

    const knexInstance = KnexService.getInstance();
    const subscriptionRepo = new SubscriptionRepository(knexInstance);

    await subscriptionRepo.updateMensaMenuSubscription(email, mensaIds);
    res
      .status(201)
      .json({message: 'Updated mensa menu subscription successfully'});
  } catch (error) {
    next(error);
  }
}

export {getMensaMenuSubscription, setMensaMenuSubscription};
