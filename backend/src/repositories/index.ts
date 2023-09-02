import ExchangeRepository from './ExchangeRepository';
import MensaInfoRepository from './MensaInfoRepository';
import MensaMenuRepository from './MensaMenuRepository';
import SubscriptionRepository from './SubscriptionRepository';
import UserRepository from './UserRepository';
export {
  ExchangeRepository,
  MensaInfoRepository,
  MensaMenuRepository,
  SubscriptionRepository,
  UserRepository,
};

import KnexService from '../database/KnexService';
import MensaMenuScraper from '../scrapers/MensaMenuScraper';
import {
  fetchExchangeRate,
  getFromToCodes,
} from '../scrapers/ExchangeRateScraper';
import ExchangeRateService from '../services/ExchangeRateService';

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
      const mensaInfo = mensaInfoRepo.getAllMensaInfo();
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

        if (exchangeRateString !== undefined) {
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
        } else {
          console.error(
            `Error fetching exchange rate for ${fromTo}. Skipping database update.`
          );
          return;
        }
      });

      await Promise.all(exchangePromises);

      console.log('Exchange rates have been updated.');
    } catch (error) {
      console.error('An error occurred while updating exchange rates:', error);
    }
  }
}
