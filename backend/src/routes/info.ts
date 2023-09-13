import express from 'express';
import {getExchangeRateInfo, getMensaInfo} from '../controllers';

const router = express.Router();

router.get('/mensa', getMensaInfo);

router.get('/exchange_rate', getExchangeRateInfo);

export default router;
