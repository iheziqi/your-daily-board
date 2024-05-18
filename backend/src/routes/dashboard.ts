import express from 'express';
import {dbTrainTicketPrice} from '../controllers';

const router = express.Router();

router.get('/db-train-ticket-price', dbTrainTicketPrice);

export default router;
