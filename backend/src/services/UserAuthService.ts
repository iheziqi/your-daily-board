import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import crypto from 'crypto';
import KnexService from '../database/KnexService';
import EmailServiceProvider from './email/EmailServiceFactory';
import { dateToUnixTimestamp } from '../utils/helpers';
import { loadEnv } from '../utils/loadEnv';

loadEnv();

class UserAuthService {
  /**
   * Generates random 4 digits integer as authentication code.
   * @returns 4-digits random code from  1000 to 9999
   */
  private static generateAuthCode() {
    // randomInt(max), max <integer> End of random range (exclusive).
    // Return a random integer n such that min <= n < max.
    return crypto.randomInt(1000, 10000);
  }

  /**
   * Generates a authentication code for user,
   * stores the code and expiration timestamp to database,
   * sends an email with auth code to the user.
   * @param email
   * @param expireIn minutes in which the auth code will be expired
   */
  public static async createAuthCodeForUser(email: string, expireIn: number) {
    const knexInstance = KnexService.getInstance();
    const authCode = UserAuthService.generateAuthCode();
    const emailService = EmailServiceProvider.getInstance().getEmailService();

    // Calculates the expiration time.
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + expireIn);

    // Gets the unix timestamp of expiration time.
    const expirationTimeStamp = dateToUnixTimestamp(expirationTime);

    // Stores the auth code into database.
    await knexInstance.transaction(async trx => {
      // First delete the current code if it exists
      await trx<DUserAuthentication>('users_authentication')
        .del()
        .where({ email });
      await trx<DUserAuthentication>('users_authentication').insert({
        email,
        authentication_code: authCode,
        expiration_timestamp: expirationTimeStamp,
      });
    });

    // Sends the auth code to user.
    const emailSubject = `${authCode} is your login code`;
    const emailContent = `
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">Your login code is ${authCode}.</p>
		<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#455463;line-height:20px;margin:0 0 1em 0">It will be expired in ${expireIn} minutes.</p>`;
    await emailService.sendEmail({
      to: email,
      subject: emailSubject,
      html: emailContent,
    });
  }

  /**
   * Gets data in table users_authentication.
   * @param email
   * @returns
   */
  public static async getUserAuthData(
    email: string
  ): Promise<DUserAuthentication | undefined> {
    const knexInstance = KnexService.getInstance();
    const queryResult = await knexInstance<DUserAuthentication>(
      'users_authentication'
    )
      .select()
      .where({ email })
      .first();

    return queryResult;
  }

  /**
   * Distributes JWT token for user
   * @param email email address of user
   */
  public static issueJwtForUser(email: string) {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw createHttpError.InternalServerError(
        'Failed to get SECRET_KEY from environment variable'
      );
    }

    const token = jwt.sign(
      {
        email: email,
      },
      secretKey,
      { expiresIn: '7d' }
    );

    return token;
  }
}

export default UserAuthService;
