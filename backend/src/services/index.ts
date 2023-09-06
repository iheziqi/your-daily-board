import RenderService from './RenderService';
import EmailService from './EmailService';
import ExchangeRateService from './ExchangeRateService';

export {RenderService, EmailService, ExchangeRateService};

import KnexService from '../database/KnexService';
import {UserRepository} from '../repositories/index';
import {getDirPathOfEmailTemplate} from '../views/emails/v1/render';

export class ServiceScheduledTasks {
  /**
   * Sends all daily board emails every day.
   * @param versionNumber
   * @returns
   */
  public static async sendDailyBoardEmails(versionNumber: string) {
    try {
      // Initializes repo.
      const userRepo = new UserRepository(KnexService.getInstance());
      // Initializes services.
      const renderService = new RenderService(
        getDirPathOfEmailTemplate(),
        KnexService.getInstance()
      );
      const emailService = new EmailService();

      // Gets all users' email in database.
      let usersData = await userRepo.getAllUsersData();

      if (!usersData || usersData.length === 0) {
        console.warn('No users found in the database. No emails will be sent.');
        return; // Return early if there are no users.
      }

      // Filters email addresses that has been confirmed.
      usersData = usersData.filter(user => {
        return user.is_verified === 1;
      });

      // Batch users for email sending.
      const batchSize = 10;

      for (let i = 0; i < usersData.length; i += batchSize) {
        const batch = usersData.slice(i, i + batchSize);

        // Use Promise.all to send emails in parallel within the batch.
        await Promise.all(
          batch.map(async data => {
            const emailAddress = data.email;
            const emailHTML =
              await renderService.renderYourDailyBoardEmailForUser(
                emailAddress,
                versionNumber
              );
            await emailService.sendEmail(
              emailAddress,
              'Check out daily mensa menu and more!',
              emailHTML
            );
          })
        );

        console.log(`Sent ${batch.length} emails in this batch.`);
      }

      console.log('All daily board emails have been sent.');
    } catch (error) {
      console.log('An error occurred while sending daily board emails:', error);
    }
  }
}
