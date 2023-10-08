import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import {SubscriptionRepository, UserRepository} from '../repositories/index';
import {EmailService, UserAuthService} from '../services/index';
import KnexService from '../database/KnexService';
import {loadEnv} from '../utils/loadEnv';

/**
 * Controller for registering user.
 */
async function register(req: Request, res: Response, next: NextFunction) {
  try {
    // checks if the body parameter has the email address
    const email: string = req.body.email;

    // if no, throw bad request error
    if (!email) {
      throw createError.BadRequest('Missing required parameter: email address');
    }

    // initialize user repository
    const userRepo = new UserRepository(KnexService.getInstance());

    // if uses already exist, throw conflict error
    const emailQuery = await userRepo.getUserIdByEmail(email);
    if (emailQuery) {
      throw createError.Conflict('Email address already exists');
    }

    // adds the email address to database
    await userRepo.createUser({email});

    // initialize subscription repository
    const subscriptionRepo = new SubscriptionRepository(
      KnexService.getInstance()
    );
    // when user register, create the following 4 menu subscriptions.
    await subscriptionRepo.updateMensaMenuSubscription(email, [
      'sued',
      'lmpl',
      'mohm',
      'isch',
    ]);

    // creates an entry in verifying table
    const token = await userRepo.createToBeVerifiedUser(email);
    if (!token) {
      throw createError.InternalServerError(
        `Adding ${email} to table users_verifying failed.`
      );
    }

    // sends confirmation email to the email address
    loadEnv();
    const emailService = new EmailService();
    const subject = 'Please confirm your email address';
    const rootUrl = process.env.ROOT_URL;
    if (!rootUrl) {
      throw createError.InternalServerError(
        'Can not find root url in .env file!'
      );
    }
    const verifyLink = `${rootUrl}/api/v1/users/verify/${token}`;
    const content = `
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">Thank you for subscribing to Your Daily Board</p>
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">Click the below link to confirm your email.</p>
		<a href="${verifyLink}" style="color:#ff0066;text-decoration:underline" title="" target="_blank"><span style="color:#ff0066;font-size:15px">Link to confirm email</span></a>`;
    emailService.sendEmail(email, subject, content);

    res.status(201).json({message: 'Verification email sent.'});
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for verifying user's email address.
 */
async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.params.token;
    if (!token) {
      throw createError.BadRequest('Missing required parameter: token');
    }

    const userRepo = new UserRepository(KnexService.getInstance());
    const email = await userRepo.getEmailByVerifyingToken(token);
    if (!email) {
      throw createError.BadRequest('Token not valid!');
    }

    // Deletes this email entry in users_verifying table and
    // changes is_verify status in user table to true.
    await userRepo.deleteToBeVerifiedUser(email);

    res
      .status(200)
      .send(
        '<h3 style="font: Sans-Serif">Hooray! Your email address has been confirmed!</h3>'
      );
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for unsubscribing user's email in mailing list.
 */
async function unsubscribe(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.params.email;
    if (!email) {
      throw createError.BadRequest('Missing required parameter: email address');
    }

    const userRepo = new UserRepository(KnexService.getInstance());

    await userRepo.deleteUser(email);

    res
      .status(200)
      .send(
        '<h3 style="font: Sans-Serif">You have unsubscribed. Sorry to see you go.</h3>'
      );
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for issuing auth code for given user.
 */
async function issueAuthCode(req: Request, res: Response, next: NextFunction) {
  const email: string = req.body.email;

  // Generates a auth code for this user and it expires in 15 minutes.
  // Sets the auth code in client cookie so that other requests will have the auth code.
  try {
    await UserAuthService.createAuthCodeForUser(email, 15);
    res
      .status(200)
      .json({message: 'An Email with authentication code has been sent'});
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for user login with auth code.
 * @param req Controller
 * @param res
 * @param next
 */
async function logInWithAuthCode(req: Request, res: Response) {
  // validateEmailInRequestBody and authenticateAuthCode middlewares will do the validating job.
  // After getting through the above two middlewares, cookie can be set to client.

  // email exists in request body.
  const email: string = req.body.email;
  const jwtToken = UserAuthService.issueJwtForUser(email);
  res.cookie('authentication_token', jwtToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  });
  res.sendStatus(200);
}

export {register, verify, unsubscribe, issueAuthCode, logInWithAuthCode};
