import express from 'express';
import {register, verify, unsubscribe} from '../controllers/users';

const router = express.Router();

router.post('/register', register);

router.get('/verify/:token', verify);

router.get('/unsubscribe/:email', unsubscribe);

export default router;
