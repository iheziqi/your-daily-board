import express from 'express';
import {
  register,
  verify,
  unsubscribe,
  issueAuthCode,
  logInWithAuthCode,
} from '../controllers';
import {
  validateAuthCode,
  validateEmailInRequestBody,
} from '../middlewares/authentication';

const router = express.Router();

router.post('/register', register);

router.get('/verify/:token', verify);

router.get('/unsubscribe/:email', unsubscribe);

router.post('/issue_auth_code', validateEmailInRequestBody, issueAuthCode);

router.post(
  '/login',
  [validateEmailInRequestBody, validateAuthCode],
  logInWithAuthCode
);

export default router;
