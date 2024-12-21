import express from 'express';
import {
  getMensaMenuSubscription,
  setMensaMenuSubscription,
  getExchangeRateSubscription,
  setExchangeRateSubscription,
} from '../controllers';
import { authenticateJwtToken } from '../middlewares/authentication';

const router = express.Router();

router.get(
  '/mensa_menu_subscription',
  authenticateJwtToken,
  getMensaMenuSubscription
);

router.post(
  '/mensa_menu_subscription',
  authenticateJwtToken,
  setMensaMenuSubscription
);

router.get(
  '/exchange_rate_subscription',
  authenticateJwtToken,
  getExchangeRateSubscription
);

router.post(
  '/exchange_rate_subscription',
  authenticateJwtToken,
  setExchangeRateSubscription
);

export default router;
