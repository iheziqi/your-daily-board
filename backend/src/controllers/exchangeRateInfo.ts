import {Request, Response, NextFunction} from 'express';
import {getFromToCodes} from '../scrapers/ExchangeRateScraper';

/**
 * Controller for getting exchange rate information.
 */
async function getExchangeRateInfo(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).json(getFromToCodes());
  } catch (error) {
    next(error);
  }
}

export {getExchangeRateInfo};
