import KnexService from '../database/KnexService';
import MensaMenuScraper from '../scrapers/MensaMenuScraper';
import {
  fetchExchangeRate,
  getFromToCodes,
} from '../scrapers/ExchangeRateScraper';
import {
  MensaInfoRepository,
  SubscriptionRepository,
  UserRepository,
  MensaMenuRepository,
  ExchangeRepository,
} from '../repositories/index';
import {ExchangeRateService, RenderService, EmailService} from './index';

import {getDirPathOfEmailTemplate} from '../views/emails/v1/render';

export class RepoScheduledTasks {
  /**
   * Fetches everyday mensa menu and save them to database.
   */
  public static async saveMensaMenusToDatabase() {
    // Initializes repos and scraper.
    const mensaInfoRepo = new MensaInfoRepository(KnexService.getInstance());
    const mensaMenuRepo = new MensaMenuRepository(KnexService.getInstance());
    const mensaMenuScraper = new MensaMenuScraper();

    try {
      //Gets all names and urls of mensa.
      const mensaInfo = await mensaInfoRepo.getAllMensaInfo();
      const mensaIds = Object.keys(mensaInfo) as MensaID[];

      // Fetches menus on mensa websites and save them into database.
      // Using Promise.all to run the scraping and saving in parallel.
      await Promise.all(
        mensaIds.map(async mensaId => {
          const menu = await mensaMenuScraper.getMenu(mensaInfo[mensaId].url);
          await mensaMenuRepo.loadMensaMenuOfToday(menu, mensaId);
        })
      );

      console.log('Menus have been updated.');
    } catch (error) {
      console.error('An error occurred while updating menus:', error);
    }
  }

  /**
   * Fetches exchange rates and save them into database.
   */
  public static async saveExchangeRateToDatabase() {
    // Initializes repos
    const exchangeRateRepo = new ExchangeRepository(KnexService.getInstance());
    const exchangeService = new ExchangeRateService(KnexService.getInstance());

    try {
      // Gets all exchange rate types like 'EUR-CNY'.
      const fromToCodes = getFromToCodes();

      // Iterate through all exchange rate types needed to scrape,
      // fetch the exchange rates and store the promises.
      const exchangePromises = fromToCodes.map(async fromTo => {
        // Fetches exchange rate from website source.
        const exchangeRateString = await fetchExchangeRate(fromTo);

        if (!exchangeRateString) {
          console.error(
            `Error fetching exchange rate for ${fromTo}. Skipping database update.`
          );
          return;
        }

        const exchangeRateNum = parseFloat(exchangeRateString);

        const changeFromYesterday =
          await exchangeService.calculateExchangeRateVolatility(
            fromTo,
            exchangeRateNum
          );

        // The edge case is when there is no exchange rate for yesterday of this from_to type,
        // here just load undefined to database and it will be processed as null.
        await exchangeRateRepo.loadExchangeRateOfToday(
          exchangeRateNum,
          fromTo,
          changeFromYesterday!
        );
      });

      await Promise.all(exchangePromises);

      console.log('Exchange rates have been updated.');
    } catch (error) {
      console.error('An error occurred while updating exchange rates:', error);
    }
  }
}

export class ServiceScheduledTasks {
  /**
   * Sends all daily board emails every day.
   * @param versionNumber
   * @returns
   */
  public static async sendDailyBoardEmails(versionNumber: string) {
    try {
      // Initializes repo.
      const knexInstance = KnexService.getInstance();
      const userRepo = new UserRepository(knexInstance);
      const subRepo = new SubscriptionRepository(knexInstance);
      const mensaInfoRepo = new MensaInfoRepository(knexInstance);
      // Initializes services.
      const renderService = new RenderService(
        getDirPathOfEmailTemplate(),
        subRepo,
        mensaInfoRepo
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
