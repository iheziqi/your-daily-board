import express from 'express';
import {
  getDailyBoardEmailPreview,
  getExchangeRateInfo,
  getMensaInfo,
  getMensaMenu,
  getMensaMenuDishes,
} from '../controllers';

const router = express.Router();

router.get('/mensa', getMensaInfo);

router.get('/mensa_menu', getMensaMenu);

router.get('/mensa_menu_dishes', getMensaMenuDishes);

router.get('/exchange_rate', getExchangeRateInfo);

router.get('/your_daily_board_email', getDailyBoardEmailPreview);

export default router;
