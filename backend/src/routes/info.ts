import express from 'express';
import {getMensaInfo} from '../controllers';

const router = express.Router();

router.get('/mensa', getMensaInfo);

export default router;
