import express from 'express';
import {
  getDailyBoardEmailPreview,
  getExchangeRateInfo,
  getMensaInfo,
} from '../controllers';

const router = express.Router();

router.get('/mensa', getMensaInfo);

router.get('/exchange_rate', getExchangeRateInfo);

router.get('/your_daily_board_email', getDailyBoardEmailPreview);

export default router;
