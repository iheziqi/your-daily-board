import express from 'express';
import createError from 'http-errors';
import {UserRepository} from '../repositories/index';

const router = express.Router();

router.get('/register', (req, res, next) => {
  try {
    // checks if the body parameter has the email address
    const email: string = req.body;

    // if no, throw bad request error
    if (!email) {
      throw createError(400, 'Missing required parameter: email address');
    }

    // adds the email address to database

    // creates an entry in verifying table

    // sends confirmation email to the email address

    res.status(200).json({msg: 'Verification email sent.'});
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:token', (req, res, next) => {
  res.status(200).json({msg: 'Email address has been confirmed.'});
});

export default router;
