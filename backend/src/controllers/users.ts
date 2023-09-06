import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import {UserRepository} from '../repositories/index';
import {EmailService} from '../services/index';
import KnexService from '../database/KnexService';
import {loadEnv} from '../utils/loadEnv';

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    // checks if the body parameter has the email address
    const email: string = req.body.email;

    // if no, throw bad request error
    if (!email) {
      throw createError(400, 'Missing required parameter: email address');
    }

    // adds the email address to database
    const userRepo = new UserRepository(KnexService.getInstance());
    await userRepo.createUser({email});

    // creates an entry in verifying table
    const token = await userRepo.createToBeVerifiedUser(email);
    if (!token) {
      throw createError(
        500,
        `Adding ${email} to table users_verifying failed.`
      );
    }

    // sends confirmation email to the email address
    loadEnv();
    const emailService = new EmailService();
    const subject = 'Please confirm your email address';
    const rootUrl = process.env.ROOT_URL;
    if (!rootUrl) {
      throw createError(500, 'Can not find root url!');
    }
    const verifyLink = `${rootUrl}/api/v1/users/verify/${token}`;
    const content = `
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">Thank you for subscribing Your Daily Board</p>
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">Click the below link to confirm your email.</p>
		<a href="${verifyLink}" style="color:#ff0066;text-decoration:underline" title="" target="_blank"><span style="color:#ff0066;font-size:15px">Link to confirm email</span></a>`;
    emailService.sendEmail(email, subject, content);

    res.status(200).json({msg: 'Verification email sent.'});
  } catch (error) {
    next(error);
  }
}

async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.params.token;
    if (!token) {
      throw createError(400, 'Missing required parameter: token');
    }

    const userRepo = new UserRepository(KnexService.getInstance());
    const email = await userRepo.getEmailByVerifyingToken(token);
    if (!email) {
      throw createError(400, 'Token not valid!');
    }

    // Deletes this email entry in users_verifying table and
    // changes is_verify status in user table to true.
    await userRepo.deleteToBeVerifiedUser(email);

    res
      .status(200)
      .send('<h3>Hooray! Your email address has been confirmed!</h3>');
  } catch (error) {
    next(error);
  }
}

export {register, verify};
