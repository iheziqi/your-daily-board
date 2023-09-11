import express from 'express';
import {
  getMensaMenuSubscription,
  setMensaMenuSubscription,
} from '../controllers/mensaMenuSettings';
import {authenticateJwtToken} from '../middlewares/authentication';

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

router.post('/exchange_rate');

export default router;
